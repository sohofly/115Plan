import React, { useState } from 'react';
import {
  KIDMAP_CONCEPTS,
  COLLABORATION_MENUS,
  KidmapConcept,
} from '../data/hualienEducationData';
import {
  Award,
  Users,
  Backpack,
  Search,
  Network,
  CheckCircle,
  HelpCircle,
  Clock,
  Sparkles,
  Zap,
  TrendingDown,
  ChevronRight,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Heart,
  FileCheck,
} from 'lucide-react';

export const PriorityInitiativesView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'substitute' | 'nonSpecialist' | 'kidmap' | 'smallSchool'>(
    'substitute'
  );
  const [selectedKidmap, setSelectedKidmap] = useState<KidmapConcept>(KIDMAP_CONCEPTS[0]);
  const [selectedMenuTab, setSelectedMenuTab] = useState<'A餐' | 'B餐' | 'C餐'>('A餐');

  // Interactive substitute teacher support simulator
  const [mentorHours, setMentorHours] = useState<number>(4);
  const [workshopDone, setWorkshopDone] = useState<boolean>(true);
  const [aiClassroomUsed, setAiClassroomUsed] = useState<boolean>(true);

  // Computed Confidence Index for Substitute Teacher
  const teacherRetentionIndex = Math.min(
    95,
    Math.round(40 + mentorHours * 6 + (workshopDone ? 18 : 0) + (aiClassroomUsed ? 12 : 0))
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 border border-slate-800 rounded-2xl p-6 text-white shadow-xl">
        <div className="max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>教育部精進計畫核心要求 ｜ 花蓮縣深度實踐方案</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight mb-2">
            三項必辦重點 × 一項自選亮點 深度專案解碼
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            直擊花蓮「師資流動、專業孤島、學力迷思、微型小校」四大歷史痛點，透過雙軌全年陪伴、滿載背包賦能、KIDMAP四步轉化與菜單制小校生態圈，實現深耕永續。
          </p>
        </div>

        {/* 4 Feature Selector Nav */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6">
          <button
            onClick={() => setActiveTab('substitute')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'substitute'
                ? 'bg-rose-500/20 border-rose-500 text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">必辦重點 (一)</div>
            <div className="font-bold text-xs sm:text-sm mt-0.5 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-rose-400 shrink-0" />
              <span>代理代課雙軌支持</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('nonSpecialist')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'nonSpecialist'
                ? 'bg-amber-500/20 border-amber-500 text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">必辦重點 (二)</div>
            <div className="font-bold text-xs sm:text-sm mt-0.5 flex items-center gap-1.5">
              <Backpack className="w-4 h-4 text-amber-400 shrink-0" />
              <span>非專長背包滿載</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('kidmap')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'kidmap'
                ? 'bg-sky-500/20 border-sky-500 text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="text-[10px] font-bold text-sky-400 uppercase tracking-wider">必辦重點 (三)</div>
            <div className="font-bold text-xs sm:text-sm mt-0.5 flex items-center gap-1.5">
              <Search className="w-4 h-4 text-sky-400 shrink-0" />
              <span>會考迷思KIDMAP</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('smallSchool')}
            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
              activeTab === 'smallSchool'
                ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-md'
                : 'bg-slate-800/60 border-slate-700/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
          >
            <div className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">一項自選亮點</div>
            <div className="font-bold text-xs sm:text-sm mt-0.5 flex items-center gap-1.5">
              <Network className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>小校生態圈菜單制</span>
            </div>
          </button>
        </div>
      </div>

      {/* Tab 1: 代理代課雙軌支持系統 */}
      {activeTab === 'substitute' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  焦點一：代理代課教師，我們如何接住你？
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  從「單次研習」走向「全年陪伴」：雙軌支持系統
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  全縣約每 4~5 位教師就有 1 位是代理教師（國中 271 人、國小 470 人，合計 741 人）。解決聘期不穩、倉促上陣與班級經營危機！
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center space-x-3 bg-rose-50/70 p-3 rounded-xl border border-rose-100 self-start">
                <Heart className="w-8 h-8 text-rose-500" />
                <div>
                  <div className="text-[10px] text-rose-600 font-semibold">支持總規模</div>
                  <div className="text-lg font-black text-rose-900">741 位教師</div>
                  <div className="text-[10px] text-rose-700">占全縣總師資 23.0%</div>
                </div>
              </div>
            </div>

            {/* Dual Track Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Track 1: 專-01-1 陪伴教師社群 */}
              <div className="rounded-xl border border-rose-200 bg-gradient-to-br from-rose-50/40 to-white p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-rose-600 text-white">
                      專-01-1
                    </span>
                    <span className="text-xs font-semibold text-rose-700">長期陪伴軌道</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    陪伴教師社群（情緒關懷 × 實務共備）
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span><strong>一對一每週固定共備：</strong>資深良師陪伴備課，及時排解現場迷惘。</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span><strong>每月入班觀課與回饋：</strong>非評價性觀課，聚焦教學微技巧與師生互動亮點。</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span><strong>「陪伴者也被陪伴」：</strong>每月舉辦陪伴教師督導工作坊，避免資深教師過載耗竭。</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <span><strong>彈性徵稿激勵機制：</strong>將優良陪伴教案納入徵件獎勵，轉化為全縣微件題庫。</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-rose-100 text-[11px] text-rose-800 font-medium">
                  目標：讓初任代理教師在偏鄉課堂第一天起「不再感到孤立無援」。
                </div>
              </div>

              {/* Track 2: 專-01-2 教學共備工作坊 */}
              <div className="rounded-xl border border-teal-200 bg-gradient-to-br from-teal-50/40 to-white p-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-0.5 rounded bg-teal-600 text-white">
                      專-01-2
                    </span>
                    <span className="text-xs font-semibold text-teal-700">實務共備軌道</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mb-2">
                    代理代課教師教學共備工作坊（教案微整形）
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-700">
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>開學前黃金關鍵期舉辦：</strong>在開學前一週集中增能，拒絕單向講課。</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>輔導團手把手三步法：</strong>「教案設計 ➔ 實體試教演練 ➔ 專家微整形修課」。</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>當學期返校即用：</strong>當日產出完整的 4~8 週教案與客製化學習單。</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span><strong>延伸基石（素-04）：</strong>正向教室 × AI 協作，生成親師溝通與衝突情境模擬劇本。</span>
                    </li>
                  </ul>
                </div>

                <div className="mt-4 pt-3 border-t border-teal-100 text-[11px] text-teal-800 font-medium">
                  目標：確保每一位代理教師返校進班時「手中有武器、心中有底氣」。
                </div>
              </div>
            </div>

            {/* Interactive Simulator Card */}
            <div className="mt-6 bg-slate-900 text-white p-5 rounded-xl border border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-2 text-teal-300">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    代理教師心理安全感與隔年留任信心試算
                  </h4>
                  <p className="text-xs text-slate-400">
                    動態調整支持參數，評估對代理教師教學效能與留任意願之影響
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400">推估留任與教學信心指數</span>
                  <div className="text-2xl font-black text-teal-400 font-mono">
                    {teacherRetentionIndex} <span className="text-xs text-slate-400">/ 100</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    每月專屬陪伴共備時數: <strong className="text-teal-300">{mentorHours} 小時</strong>
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="8"
                    value={mentorHours}
                    onChange={(e) => setMentorHours(Number(e.target.value))}
                    className="w-full accent-teal-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="workshopCheck"
                    checked={workshopDone}
                    onChange={(e) => setWorkshopDone(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 accent-teal-500 cursor-pointer"
                  />
                  <label htmlFor="workshopCheck" className="text-slate-300 cursor-pointer">
                    已完成「開學前教案微整形工作坊」(+18分)
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="aiCheck"
                    checked={aiClassroomUsed}
                    onChange={(e) => setAiClassroomUsed(e.target.checked)}
                    className="w-4 h-4 rounded text-teal-600 accent-teal-500 cursor-pointer"
                  />
                  <label htmlFor="aiCheck" className="text-slate-300 cursor-pointer">
                    導入「素-04 正向教室×AI班級經營情境」(+12分)
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 非專長授課「背包滿載」增能模式 */}
      {activeTab === 'nonSpecialist' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  焦點二：賦能非專長授課教師（以國中健教為例）
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  「背包滿載」增能模式：帶得走的實戰三大裝備
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  偏鄉小校健體常僅 1 人，常由兼課配課教師擔任，無共備夥伴、缺乏多元教材，課堂易流於照本宣科念課本。
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 text-amber-900 text-xs font-semibold self-start">
                <Backpack className="w-4 h-4 text-amber-600" />
                <span>專-05 健教增能 ＋ 協-02 雙語平台</span>
              </div>
            </div>

            {/* 3 Backpack Gears Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Gear 1 */}
              <div className="p-5 rounded-xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-sm mb-3">
                    裝備 1
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    雲端教材包
                  </h4>
                  <span className="text-[11px] text-amber-800 font-semibold block mb-2">
                    線上 5 分鐘重點大補帖
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    整合健康教育十大主題（生長發育、性教育、心理健康、物質濫用、急救安全等）微單元影音、動畫與互動PPT，配課教師課前 5 分鐘即可快速掌握核心概念與常見提問。
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-amber-200/80 text-[11px] text-amber-900 font-medium">
                  特點：隨掃即看、行動載具即時備課
                </div>
              </div>

              {/* Gear 2 */}
              <div className="p-5 rounded-xl border border-sky-200 bg-sky-50/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                    裝備 2
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    桌遊與提問策略
                  </h4>
                  <span className="text-[11px] text-sky-800 font-semibold block mb-2">
                    結合 ORID 焦點討論法 擺脫純講述
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    提供情境卡牌桌遊（如人際界線互動卡、健康飲食選擇棋盤），引導教師運用 ORID（Objective 客觀事實 ➔ Reflective 感受 ➔ Interpretive 詮釋 ➔ Decisional 行動）四層次提問引發課堂深度思辨。
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-sky-200/80 text-[11px] text-sky-900 font-medium">
                  特點：活化課堂、讓學生主動開口參與
                </div>
              </div>

              {/* Gear 3 */}
              <div className="p-5 rounded-xl border border-teal-200 bg-teal-50/30 flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-teal-600 text-white flex items-center justify-center font-bold text-sm mb-3">
                    裝備 3
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 mb-1">
                    當日產出實戰教案
                  </h4>
                  <span className="text-[11px] text-teal-800 font-semibold block mb-2">
                    AI 協作分組共備 即學即用
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    在研習現場不只是聽演講！非專長教師按分區組成共備小組，結合生成式 AI 工具輸入教學目標，即刻生成分組討論單、情境題與評量尺規，當天帶著「現成教案」滿載而歸。
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-teal-200/80 text-[11px] text-teal-900 font-medium">
                  特點：共學、共備、共精進
                </div>
              </div>
            </div>

            {/* Cross-domain companion: 協-02 Bilingual Health Platform */}
            <div className="mt-6 bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-700">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">
                    跨域配套：協-02 國中英語融入健康教育課程線上教學平台
                  </div>
                  <div className="text-slate-500 text-[11px]">
                    透過生活化情境英語句型與短影音，擴充健教非專長教師教學武器庫，落實真實情境雙語！
                  </div>
                </div>
              </div>
              <span className="text-indigo-700 font-semibold bg-indigo-100 px-3 py-1 rounded-md self-start sm:self-auto">
                已介接縣級教學資源庫
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 會考迷思分析運用 (KIDMAP 四步解鎖) */}
      {activeTab === 'kidmap' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200">
                  焦點三：看見分數背後的迷思（核心學力精進）
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  從「補救分數」轉向「破解迷思」：四步拆解工作流
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  115年花蓮會考英語待加強比例 46.15%、數學 39.40%。過去學校往往停留在「看分數做題海」，未找出評量與課堂間的根本斷層。
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-800 text-xs font-semibold self-start">
                <TrendingDown className="w-4 h-4 text-rose-600" />
                <span>目標：C級待加強下降 5~8%</span>
              </div>
            </div>

            {/* 4-Step Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              <div className="p-4 rounded-xl bg-slate-900 text-white relative">
                <span className="text-[10px] text-teal-400 font-bold block mb-1">第一步 ｜ 數據診斷</span>
                <div className="font-bold text-sm mb-1">診-01 / 診-02 KIDMAP</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  運用 KIDMAP 認知圖譜，將全縣施測數據轉化為學生試題思維盲點圖，引導學校不再只看及格率。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800 text-white relative">
                <span className="text-[10px] text-indigo-400 font-bold block mb-1">第二步 ｜ 輔導團轉化</span>
                <div className="font-bold text-sm mb-1">命題解析與 AI 增能</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  國教地方輔導團深入會考命題趨勢，將歷年高答錯率題型轉換為課堂「反思探究教學教案」。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800 text-white relative">
                <span className="text-[10px] text-amber-400 font-bold block mb-1">第三步 ｜ 課堂實踐與徵件</span>
                <div className="font-bold text-sm mb-1">異-01 數學 AI 共學</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  導入 AI 優質化共學教室進行適性練習，辦理全縣迷思概念教學改善策略徵件，累積在地知識庫。
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-800 text-white relative">
                <span className="text-[10px] text-rose-400 font-bold block mb-1">第四步 ｜ 入校陪伴</span>
                <div className="font-bold text-sm mb-1">輔-03 分級入校諮詢</div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  督學與輔導團依據數據分級入校，檢視學校教學計畫是否切中弱點，進行常態化課堂追蹤。
                </p>
              </div>
            </div>

            {/* Interactive KIDMAP Simulator */}
            <div className="border border-sky-200 rounded-xl overflow-hidden bg-sky-50/20">
              <div className="bg-sky-900 text-white p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-sky-400" />
                  <span className="font-bold text-sm">
                    互動式 KIDMAP 會考高頻迷思試題剖析器
                  </span>
                </div>
                <span className="text-xs text-sky-300">
                  點選下方典型迷思題型，查看課堂翻轉策略
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
                {/* Left: Concept List */}
                <div className="lg:col-span-4 p-3 space-y-2 bg-white">
                  {KIDMAP_CONCEPTS.map((item) => {
                    const isSelected = selectedKidmap.id === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setSelectedKidmap(item)}
                        className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-sky-50 border-sky-400 text-slate-900 shadow-2xs font-semibold'
                            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span
                            className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                              item.subject === '英語'
                                ? 'bg-indigo-100 text-indigo-700'
                                : 'bg-teal-100 text-teal-700'
                            }`}
                          >
                            {item.subject} ｜ {item.questionCode}
                          </span>
                          <span className="text-[10px] text-rose-600 font-bold">
                            花蓮答錯率 {item.studentErrorPercentage}%
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-800 mt-1 line-clamp-1">
                          {item.conceptTitle}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Right: Detailed Deep Dive */}
                <div className="lg:col-span-8 p-5 bg-white text-xs space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-bold text-sky-700">
                        {selectedKidmap.subject}領域 ｜ {selectedKidmap.domain}
                      </span>
                      <h4 className="text-base font-bold text-slate-900 mt-0.5">
                        {selectedKidmap.conceptTitle}
                      </h4>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400">學生常見思維陷阱比率</span>
                      <div className="text-lg font-black text-rose-600 font-mono">
                        {selectedKidmap.studentErrorPercentage}%
                      </div>
                    </div>
                  </div>

                  {/* Sample Question & Trap */}
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="font-bold text-slate-800 block mb-1">
                      典型檢測題型示例：
                    </span>
                    <p className="font-mono text-slate-700 bg-white p-2 rounded border border-slate-200">
                      {selectedKidmap.sampleQuestion}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-200">
                      <div className="text-rose-700 bg-rose-50 p-2 rounded">
                        <span className="font-bold block">❌ 學生典型迷思陷阱：</span>
                        <span>{selectedKidmap.trapOption}</span>
                      </div>
                      <div className="text-emerald-700 bg-emerald-50 p-2 rounded">
                        <span className="font-bold block">✔ 正確解題認知路徑：</span>
                        <span>{selectedKidmap.correctOption}</span>
                      </div>
                    </div>
                  </div>

                  {/* Analysis Breakdown */}
                  <div className="space-y-2">
                    <div>
                      <span className="font-bold text-slate-800">
                        ⚠ 傳統講述教學為何難以奏效？
                      </span>
                      <p className="text-slate-600 mt-0.5 leading-relaxed">
                        {selectedKidmap.traditionalTeachingFailureReason}
                      </p>
                    </div>

                    <div className="bg-teal-50/70 p-3 rounded-xl border border-teal-200 text-teal-900">
                      <span className="font-bold flex items-center gap-1.5 text-teal-800">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        115 精進解方：課堂翻轉策略與 AI 共學介入
                      </span>
                      <p className="mt-1 leading-relaxed text-slate-700">
                        <strong>教學策略：</strong> {selectedKidmap.remedialStrategy}
                      </p>
                      <p className="mt-1 leading-relaxed text-slate-700">
                        <strong>AI 教室工具支援：</strong> {selectedKidmap.aiClassroomIntervention}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: 自選亮點・小校跨校共好菜單制 (異-02) */}
      {activeTab === 'smallSchool' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  一項自選亮點：異-02 跨校共好創新轉型
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  打破圍牆的「三共」：共備、共授、共省（菜單制協作體系）
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  突破地理與編制限制，建立「小校教育生態圈」。以行政減量（極簡申請、免紙本備查）換取教師現場教學創新！
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 text-emerald-900 text-xs font-semibold self-start">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>行政減量 40% ｜ 伴行者思維</span>
              </div>
            </div>

            {/* Menu A/B/C Selector Tabs */}
            <div className="flex space-x-2 border-b border-slate-200 pb-2 mb-4">
              {(['A餐', 'B餐', 'C餐'] as const).map((mCode) => (
                <button
                  key={mCode}
                  onClick={() => setSelectedMenuTab(mCode)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedMenuTab === mCode
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {mCode}：{COLLABORATION_MENUS.find((m) => m.code === mCode)?.name}
                </button>
              ))}
            </div>

            {/* Active Menu Detail */}
            {(() => {
              const menu = COLLABORATION_MENUS.find((m) => m.code === selectedMenuTab)!;
              return (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                  {/* Practical Mechanism */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="font-bold text-slate-900 text-sm flex items-center justify-between">
                      <span>實務協作機制</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                        {menu.scope}
                      </span>
                    </div>
                    <ul className="space-y-2 text-slate-600">
                      {menu.practicalMechanism.map((mech, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{mech}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                      <strong>適合校型：</strong> {menu.suitableSchoolType}
                    </div>
                  </div>

                  {/* Administrative Support */}
                  <div className="p-4 rounded-xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                    <div className="font-bold text-indigo-950 text-sm flex items-center justify-between">
                      <span>雙軌底盤：法規與經費</span>
                      <span className="text-[10px] text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded">
                        行政減量配套
                      </span>
                    </div>
                    <ul className="space-y-2 text-slate-700">
                      {menu.administrativeSupport.map((sup, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                          <span>{sup}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-indigo-200 text-[11px] text-indigo-900">
                      <strong>核心承諾：</strong> 經費實報實銷、統一公文審核免退件
                    </div>
                  </div>

                  {/* Pedagogical Innovation & Pilots */}
                  <div className="p-4 rounded-xl bg-teal-50/50 border border-teal-200 space-y-3">
                    <div className="font-bold text-teal-950 text-sm flex items-center justify-between">
                      <span>教學創新成效</span>
                      <span className="text-[10px] text-teal-700 bg-teal-100 px-2 py-0.5 rounded">
                        生態共好
                      </span>
                    </div>
                    <ul className="space-y-2 text-slate-700">
                      {menu.pedagogicalInnovation.map((inno, i) => (
                        <li key={i} className="flex items-start space-x-2">
                          <Sparkles className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{inno}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-teal-200 text-[11px] text-teal-900">
                      <strong>先行試辦示範點：</strong>
                      <div className="font-medium text-slate-800 mt-0.5">{menu.pilotSchools}</div>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Admin Reduction vs Pedagogical Innovation Banner */}
            <div className="mt-6 bg-slate-900 text-white p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div>
                <span className="text-teal-400 font-bold block">
                  教育處從「管理者」轉為「伴行者」之具體行動：
                </span>
                <p className="text-slate-300 mt-1">
                  1. 極簡申請（1頁表單線上申請） ｜ 2. 公文減量（全縣統籌一案核准） ｜ 3. 雲端成果免紙本 ｜ 4. 交通與鐘點法規鬆綁
                </p>
              </div>
              <span className="px-3 py-1.5 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 font-bold whitespace-nowrap self-start sm:self-auto">
                省下逾 40% 行政時間
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
