import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI client (server-side only)
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey),
    timestamp: new Date().toISOString(),
  });
});

// AI Advisory & School Diagnostic Assistant Endpoint
app.post('/api/ai-advisory', async (req, res) => {
  try {
    const { schoolName, district, prompt, context } = req.body;

    if (!ai) {
      // High-fidelity fallback diagnostic response when API key is not configured
      const fallbackAnalysis = `【花蓮縣115精進計畫・智囊系統建議】
針對「${schoolName || '諮詢學校'}」（所屬：${district || '花蓮縣'}）之現況分析：
1. 核心弱點定位：根據會考數據與師資結構，該校首要應突破之處在於學生核心學力待加強比率偏高，以及代理教師教學陪伴之連續性。
2. 精進子計畫精準對接：
   - 必辦（一）：優先導入「專-01-1 陪伴教師社群」與「專-01-2 教學共備工作坊」，建立 1 對 1 週共備與月觀課機制，穩定班級經營。
   - 必辦（二）：健體與非專長科目教師應配發「專-05 背包滿載」資源包（雲端教材包 + ORID 桌遊提問策略 + AI 協作教案）。
   - 必辦（三）：運用「診-02」與 KIDMAP 試題認知圖譜，拆解會考英數學習迷思，引進「異-01 國中數學 AI 優質化共學教室」。
   - 自選亮點：建議加入「異-02 跨校共好小校生態圈」，若距離鄰校 30 分鐘內可選擇「A餐共力圈」，偏遠小校可評估「C餐混齡教學」。
3. 行政減量與政策支持：依據教育處伴行者原則，免除紙本公文，採雲端成果微件備查，以行政減量換取教學創新成效！`;

      return res.json({
        success: true,
        text: fallbackAnalysis,
        isFallback: true,
      });
    }

    const systemInstruction = `你是一位熟悉「花蓮縣115學年度精進計畫（教學精進，協力同行 —— 從深化到永續，點亮每一座教育微光）」的資深教育專家與督學顧問。
請依據計畫之核心脈絡進行專業、精闢且具體可行的深度分析與改善建議：
- 花蓮在地挑戰：南北137.5公里狹長地形、100人以下小校占2/3、代理教師比率約23%且高流動率(國中271人、國小470人)、新任教務主任占1/5、會考英語待加強46.15%、數學待加強39.40%。
- 三大推動面向：課程發展、專業成長、學習成效。
- 3層面 × 11策略 × 子計畫對應（課-01~07, 專-01~07, 協-01~02, 異-01~02, 素-01~04, 診-01~02, 研-01, 輔-02~03）。
- 三大必辦重點：
  (1) 代理代課雙軌支持（專-01-1陪伴社群每週共備月觀課、專-01-2開學前教案共備工作坊、素-04正向AI教室）
  (2) 非專長授課教師增能（專-05健教背包滿載：雲端包、ORID桌遊、AI教案、協-02雙語健教線上平台）
  (3) 會考迷思分析運用（診-01/02 KIDMAP診斷 ➔ 輔導團轉化 ➔ 異-01數學AI共學與徵件 ➔ 輔-03分級入校陪伴）
- 一項自選亮點：跨校共好創新轉型（異-02 小校教育生態圈，菜單制A餐共力圈/B餐合班/C餐混齡，行政減量公文免紙本）。
- 三軌支持鏈（督學政策、輔導團專業、承辦校執行，課發中心為樞紐）。

回答時請採用條理分明、溫暖且具高度教育專業深度的繁體中文（台灣教育術語），提出針針見血的具體改善解方。`;

    const userMessage = prompt || `請針對學校「${schoolName}」（分區：${district}，背景指標：${JSON.stringify(context || {})}），提供精準的校際成果診斷分析與具體改善策略，包含對接哪些子計畫、如何落實三項必辦重點與自選亮點。`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userMessage,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({
      success: true,
      text: response.text,
      isFallback: false,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      success: false,
      error: error.message || '生成分析時發生錯誤',
    });
  }
});

// Setup Vite middleware in dev or static files in production
async function start() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[AI Studio] Server running on http://0.0.0.0:${PORT}`);
  });
}

start().catch(console.error);
