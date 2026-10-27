import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  Users,
  Compass,
  Building2,
  GraduationCap,
  Sparkles,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export const ActionRecommendations: React.FC = () => {
  const [activeRole, setActiveRole] = useState<'admin' | 'center' | 'school' | 'teacher'>('admin');
  const [copied, setCopied] = useState<boolean>(false);
  const [reportPreviewOpen, setReportPreviewOpen] = useState<boolean>(true);

  const fullReportMarkdown = `# 花蓮縣115學年度精進教學與校際成果深度分析及改善建議公文級報告

**發文主體**：花蓮縣政府教育處 課程教學科 暨 課程發展中心
**發表時間**：2026年8月（115學年度）
**指導理念**：「教學精進，協力同行 —— 從深化到永續，點亮每一座教育微光」

---

## 壹、花蓮教育土壤現況與校際成果核心挑戰

本縣南北狹長達 137.5 公里，地理縱深形成嚴峻的資源傳遞障礙；全縣 100 人以下小型學校高達 66.7%（占 2/3），師資編制緊縮導致專業孤立。經綜合盤點 114-115 學年度校際成果，主要困境如下：

1. **師資流動與代理比率過高**：
   全縣每 4~5 位教師即有 1 位是代理代課教師（國中 271 人、國小 470 人，合計 741 人，比率達 23.0%）。中南區招考不易，正式教師返鄉調動頻繁，代理教師缺乏系統性長程陪伴，倉促上陣面臨班級經營與親師溝通危機。
2. **會考核心學力待加強比率偏高**：
   國中教育會考英語科待加強（C級）比率達 46.15%、數學科待加強比率達 39.40%，與全國常模有明顯差距。過去學校學力改善多停留在「看分數做題海補救」，缺乏透過試題反應與認知圖譜進行「迷思概念精準診斷」。
3. **中階領導與非專長配課斷層**：
   全縣新任教務主任占 1/5（20.0%），課綱推動行政負荷沉重；國中健體領域（尤其健康教育）、藝術與科技等科別，小校常僅 1 人，配課教師照本宣科，課堂缺乏互動。

---

## 貳、115學年度「3層面 × 11項策略」總體解方架構

本年度為 113-115 中長程藍圖之「收敘之年」，延續既有成果深化為可永續發展的教育生態系：
- **推動面向一：課程發展** —— 課程領導（課-01~07）、跨校協作（異-02、協-01）、社群深化（專-01-1陪伴社群）。
- **推動面向二：專業成長** —— 落實素養教學（素-01雙閱讀、素-03安全、專-06媒體識讀）、精準教師專業（專-01-2開學共備、專-05健教增能、協-02雙語平台）、SEL深耕（素-02）、差異化AI協作（素-04、異-01）。
- **推動面向三：學習成效** —— 診斷評量（診-01/02 KIDMAP）、追蹤輔導（輔-03分級入校諮詢）、教育研究資料庫。

---

## 參、三項必辦重點與一項自選亮點具體處方

### 【必辦一：代理代課教師雙軌支持系統】
- **專-01-1 陪伴教師社群**：建立資深教師與代理教師一對一「每週共備、每月入班觀課回饋」長程網絡；每月定期辦理陪伴者督導工作坊。
- **專-01-2 教學共備工作坊**：開學前舉辦實戰研習，輔導團帶領「設計 ➔ 試教 ➔ 微整形」，返校即產出當學期即用教案。
- **素-04 正向AI教室**：以生成式 AI 輔助模擬班級經營與衝突應對劇本。

### 【必辦二：非專長授課「背包滿載」增能矩陣】
- **裝備一（雲端教材包）**：健教十大主題線上 5 分鐘重點大補帖，課前快速掌握重點。
- **裝備二（ORID 桌遊與提問策略）**：結合四層次焦點討論法，擺脫單向講述。
- **裝備三（AI 協作實戰教案）**：分組共備當日產出即用教案與評量尺規。
- **協-02 雙語平台**：英語融入健教情境互動，擴充跨域武器庫。

### 【必辦三：會考英數「破解迷思」四步轉化工作流】
1. **數據診斷**：以 KIDMAP 認知圖譜精準標定長難句修飾、負負得正、幾何反例等核心盲點。
2. **輔導團轉化**：輔導團解析命題迷思，轉化為啟發式探究教材。
3. **課堂實踐與徵件**：異-01 數學 AI 優質化共學教室落地，全縣徵件建立微件知識庫。
4. **分級入校**：輔-03 入校諮詢，針對第三級高待加強校對準弱點開方。

### 【自選亮點：異-02 跨校共好小校教育生態圈】
- **菜單制協作模式**：
  * **A餐（小校共力圈）**：30 分鐘車程內鄰校實體共備與跨校共學。
  * **B餐（跨校合班上課）**：遠距混成雙向共授，讓微型班級感受大班討論動能。
  * **C餐（單一小校混齡教學）**：高山原鄉微型校跨年級主題課程。
- **雙軌底盤與行政減量**：
  * 極簡 1 頁線上申請、公文減量全縣統籌核定、雲端成果免紙本。
  * 經費補助交通費，法規放寬跨校節數採計，省下 40% 行政時間！

---

## 肆、四大利害關係人具體分工行動綱領

1. **教育處決策層**：
   - 落實「伴行者」角色，持續鬆綁跨校法規，保障代理教師長程支持經費。
   - 三層級推動組織（推動小組、執行小組、核心小組）齒輪常態運作。
2. **課發中心與輔導團**：
   - 強化三軌入校支持（政策、專業、執行），課發中心扮演全縣研發樞紐。
   - 加速 KIDMAP 試題認知圖譜全縣推廣，協助學校轉化為課堂教案。
3. **學校行政端（教務主任/校長）**：
   - 主動盤點校內非專長配課科數，為新聘代理教師媒合陪伴良師。
   - 加入跨校共力圈（A/B/C餐），排定每週領域共備專屬時段。
4. **現場第一線教師**：
   - 善用開學前共備產出之教案與雲端教材包，告別孤軍奮戰。
   - 運用 AI 共學教室實踐差異化教學，看見每位學生的迷思盲點。

---
花蓮縣政府教育處 課程教學科 敬製
`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullReportMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadReport = () => {
    const blob = new Blob([fullReportMarkdown], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '花蓮縣115學年度精進教學與校際成果深度分析及改善建議報告.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  const printReport = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Title */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-teal-600"></span>
              分層角色精準改善行動指南 與 政策報告生成
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              為決策層、課發輔導團、學校行政端與第一線教師量身打造的執行清單，並支援公文級摘要報告匯出
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={copyToClipboard}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? '已複製報告' : '複製 Markdown'}</span>
            </button>
            <button
              onClick={downloadReport}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>下載檔案</span>
            </button>
            <button
              onClick={printReport}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-sm transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>列印 / 存為 PDF</span>
            </button>
          </div>
        </div>

        {/* 4 Role Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
          <button
            onClick={() => setActiveRole('admin')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeRole === 'admin'
                ? 'bg-indigo-50 border-indigo-400 text-indigo-950 shadow-2xs font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-indigo-600" />
              <span className="text-xs">教育處決策層</span>
            </div>
            <div className="text-[11px] text-slate-500 font-normal">處長/科長/法規底盤</div>
          </button>

          <button
            onClick={() => setActiveRole('center')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeRole === 'center'
                ? 'bg-teal-50 border-teal-400 text-teal-950 shadow-2xs font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Compass className="w-4 h-4 text-teal-600" />
              <span className="text-xs">課發中心與輔導團</span>
            </div>
            <div className="text-[11px] text-slate-500 font-normal">課程督學/專家分團</div>
          </button>

          <button
            onClick={() => setActiveRole('school')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeRole === 'school'
                ? 'bg-amber-50 border-amber-400 text-amber-950 shadow-2xs font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <Building2 className="w-4 h-4 text-amber-600" />
              <span className="text-xs">學校行政端</span>
            </div>
            <div className="text-[11px] text-slate-500 font-normal">校長/教務主任/中階領導</div>
          </button>

          <button
            onClick={() => setActiveRole('teacher')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeRole === 'teacher'
                ? 'bg-rose-50 border-rose-400 text-rose-950 shadow-2xs font-bold'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2 mb-1">
              <GraduationCap className="w-4 h-4 text-rose-600" />
              <span className="text-xs">第一線教師</span>
            </div>
            <div className="text-[11px] text-slate-500 font-normal">代理代課/非專長配課</div>
          </button>
        </div>

        {/* Role Content Display */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 text-xs">
          {activeRole === 'admin' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-sm text-indigo-950">
                  【教育處決策層】伴行支持與制度保障行動指引
                </span>
                <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded font-semibold">
                  角色定位：伴行者 × 制度保障底盤
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-indigo-900 block">1. 法規鬆綁與授權：</span>
                  <p className="text-slate-600 leading-relaxed">
                    全面採認跨校共備授課節數、補助跨校共力圈教師差旅交通費，免除微型校為單一計畫重複行文，採「共力圈聯合申辦一案核定」。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-indigo-900 block">2. 行政實質減量落地：</span>
                  <p className="text-slate-600 leading-relaxed">
                    推行極簡 1 頁線上表單，全面免除紙本公文簽核；課程計畫與微件成果上傳雲端平台即視為備查，釋放校長與教務主任行政能量。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-indigo-900 block">3. 三層級組織協調：</span>
                  <p className="text-slate-600 leading-relaxed">
                    處長親自主持每月推動小組會議，橫向整合學管、特幼、設施及原民教育資源，及時排除偏鄉現場阻礙。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'center' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-sm text-teal-950">
                  【課發中心與國教輔導團】樞紐專業研發與入校陪伴指引
                </span>
                <span className="text-[10px] bg-teal-100 text-teal-800 px-2 py-0.5 rounded font-semibold">
                  角色定位：研發樞紐 × 專業陪伴
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-900 block">1. KIDMAP 迷思深耕轉化：</span>
                  <p className="text-slate-600 leading-relaxed">
                    統整全縣會考英數各題型之認知圖譜，編印「迷思破解實戰教材」，並巡迴各分區帶領領域召集人進行命題試題拆解。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-900 block">2. 輔-03 分級入校諮詢：</span>
                  <p className="text-slate-600 leading-relaxed">
                    對第三級密集輔導校指派常駐認輔督學與輔導員，每學期至少到校 3 次入班觀課與共同議課，直指課堂教學弱點。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-teal-900 block">3. 陪伴者督導工作坊：</span>
                  <p className="text-slate-600 leading-relaxed">
                    落實「陪伴者也被陪伴」理念，每月定期召開資深陪伴教師工作坊，給予情緒心理支持與微格輔導技術增能。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'school' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-sm text-amber-950">
                  【學校行政端（校長/主任）】課程領導與社群護航行動指引
                </span>
                <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-semibold">
                  角色定位：中階課程領導 × 社群守護者
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-amber-900 block">1. 課表排定與共備保障：</span>
                  <p className="text-slate-600 leading-relaxed">
                    各校在排課階段務必預留「領域共同不排課時段」，確保教師每週至少有 1 次 80 分鐘完整社群共備時間。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-amber-900 block">2. 非專長授課盤點與配裝：</span>
                  <p className="text-slate-600 leading-relaxed">
                    開學前全面盤點健體、藝術、科技配課師資名冊，主動配發「專-05 背包滿載」雲端教材包與 ORID 提問卡。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-amber-900 block">3. 菜單適配與跨校牽手：</span>
                  <p className="text-slate-600 leading-relaxed">
                    微型小校主動依據地理車程選擇 A餐（共力圈）、B餐（合班）或 C餐（混齡），打破單兵作戰的校園孤島。
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRole === 'teacher' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="font-bold text-sm text-rose-950">
                  【第一線教師（代理/非專長）】背包滿載成就課堂實踐指引
                </span>
                <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-semibold">
                  角色定位：課堂實踐家 × 帶得走的武器
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-rose-900 block">1. 開學前教案微整形：</span>
                  <p className="text-slate-600 leading-relaxed">
                    積極參與專-01-2 工作坊，與輔導團攜手將前輩優良教案進行微整形，帶著返校第一週即可上線的學習單安心開學。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-rose-900 block">2. 善用 ORID 與 AI 協作：</span>
                  <p className="text-slate-600 leading-relaxed">
                    健教等非專長課堂揚棄唸課本，運用 ORID 四層提問帶動思辨；運用素-04 生成式 AI 工具生成班級正面對話腳本。
                  </p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <span className="font-bold text-rose-900 block">3. 打開教室安心求援：</span>
                  <p className="text-slate-600 leading-relaxed">
                    主動與陪伴教師建立每週對話習慣，入班觀課視為專業交流而非考核，營造彼此支持的溫暖安全網。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Yearly Gantt / Milestones */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-teal-600" />
              115學年度 全年推進里程碑與檢核甘特表
            </h3>
            <p className="text-xs text-slate-500">
              研擬前需求探勘 ➔ 開學前共備 ➔ 全年動態檢核 ➔ 期末永續收敘
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-teal-700 bg-teal-100 px-1.5 py-0.2 rounded inline-block mb-1.5">
              8月 ｜ 需求探勘與備戰
            </span>
            <div className="font-bold text-slate-900 mb-1">處長推動小組首會</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• 專-01-2 代理共備工作坊</li>
              <li>• 專-05 健教背包研習</li>
              <li>• 菜單制申請與交通費核定</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.2 rounded inline-block mb-1.5">
              9-11月 ｜ 雙軌啟動入校
            </span>
            <div className="font-bold text-slate-900 mb-1">常態共備與陪伴</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• 專-01-1 每週一對一共備</li>
              <li>• 輔-03 第一輪分級入校</li>
              <li>• 協-02 雙語平台開通使用</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded inline-block mb-1.5">
              12-2月 ｜ 期中檢核對話
            </span>
            <div className="font-bold text-slate-900 mb-1">KIDMAP 迷思深耕</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• 診-02 認知圖譜轉化工作坊</li>
              <li>• 異-02 跨校共學成果交流</li>
              <li>• 陪伴教師督導支持反思</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.2 rounded inline-block mb-1.5">
              3-5月 ｜ 衝刺與微件徵集
            </span>
            <div className="font-bold text-slate-900 mb-1">AI 共學最後一哩路</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• 異-01 數學AI教室複查</li>
              <li>• 全縣迷思教學改善徵件</li>
              <li>• 第三級重點校密集二度入校</li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded inline-block mb-1.5">
              6-7月 ｜ 收敘評估永續
            </span>
            <div className="font-bold text-slate-900 mb-1">成果淬鍊與知識庫</div>
            <ul className="text-slate-600 space-y-1 text-[11px]">
              <li>• 會考待加強數據總驗收</li>
              <li>• 代理教師留任率統計</li>
              <li>• 縣級微件題庫正式發布</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Collapsible Formal Report Preview */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div
          onClick={() => setReportPreviewOpen(!reportPreviewOpen)}
          className="p-4 bg-slate-900 text-white flex items-center justify-between cursor-pointer"
        >
          <div className="flex items-center space-x-2">
            <FileText className="w-4 h-4 text-teal-400" />
            <span className="font-bold text-sm">
              完整公文級深度分析與改善建議報告書（即時預覽）
            </span>
          </div>
          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <span>{reportPreviewOpen ? '收合報告' : '展開完整報告'}</span>
            {reportPreviewOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </div>
        </div>

        {reportPreviewOpen && (
          <div className="p-6 text-xs text-slate-800 bg-slate-50/50 space-y-4 max-h-[500px] overflow-y-auto font-sans leading-relaxed border-t border-slate-200">
            <div className="prose prose-xs max-w-none">
              <pre className="font-sans whitespace-pre-wrap text-slate-700 bg-white p-4 rounded-xl border border-slate-200">
                {fullReportMarkdown}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
