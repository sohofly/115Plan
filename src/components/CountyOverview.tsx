import React, { useState } from 'react';
import {
  MACRO_METRICS,
  SUB_PLANS,
  SubPlan,
} from '../data/hualienEducationData';
import {
  MapPin,
  Building2,
  Users,
  AlertTriangle,
  GraduationCap,
  Layers,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Cpu,
  HeartHandshake,
  CheckCircle2,
  Calendar,
  Network,
  HelpCircle,
  FileBadge,
} from 'lucide-react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';

interface CountyOverviewProps {
  onSelectPlan?: (planCode: string) => void;
  onNavigateToTab?: (tab: string) => void;
}

export const CountyOverview: React.FC<CountyOverviewProps> = ({
  onSelectPlan,
  onNavigateToTab,
}) => {
  const [selectedDimension, setSelectedDimension] = useState<
    '全部' | '課程發展' | '專業成長' | '學習成效'
  >('全部');
  const [activePlanModal, setActivePlanModal] = useState<SubPlan | null>(null);

  // Radar Data: Hualien Current vs 115 Target vs National Baseline
  const radarData = [
    {
      subject: '中階課程領導力',
      花蓮現況: 58,
      目標值115: 88,
      全國平均: 75,
      fullMark: 100,
    },
    {
      subject: '代理師資留任陪伴',
      花蓮現況: 45,
      目標值115: 85,
      全國平均: 70,
      fullMark: 100,
    },
    {
      subject: '健體非專長賦能',
      花蓮現況: 42,
      目標值115: 82,
      全國平均: 68,
      fullMark: 100,
    },
    {
      subject: '會考英數迷思突破',
      花蓮現況: 52,
      目標值115: 80,
      全國平均: 74,
      fullMark: 100,
    },
    {
      subject: '小校跨校共學深度',
      花蓮現況: 48,
      目標值115: 90,
      全國平均: 60,
      fullMark: 100,
    },
    {
      subject: '行政減量課堂專注',
      花蓮現況: 50,
      目標值115: 86,
      全國平均: 65,
      fullMark: 100,
    },
  ];

  const getMetricIcon = (iconName: string) => {
    switch (iconName) {
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-amber-500" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-sky-500" />;
      case 'Users':
        return <Users className="w-5 h-5 text-indigo-500" />;
      case 'AlertTriangle':
        return <AlertTriangle className="w-5 h-5 text-rose-500" />;
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-emerald-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-teal-500" />;
    }
  };

  const filteredPlans =
    selectedDimension === '全部'
      ? SUB_PLANS
      : SUB_PLANS.filter((p) => p.dimension === selectedDimension);

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 border border-teal-800/40 p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>113-115學年度中長程藍圖 ｜ 115「深化與永續」收敘之年</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3">
            教學精進，協力同行 —— 點亮每一座教育微光
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            花蓮縣幅員狹長達 137.5 公里，小型學校占超過 2/3、代理教師比例達 23.0%、新任主任占 1/5，且國中會考英數兩科待加強比率偏高。
            115學年度精進計畫不盲目追求新增，而是秉持<strong>「需求盤點 × 在地脈絡 = 具體策略」</strong>，透過三層推動組織與三軌支持鏈，打造師生共好的永續教育生態圈。
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => onNavigateToTab?.('schools')}
              className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs sm:text-sm flex items-center space-x-1.5 shadow-md shadow-teal-700/20 transition-all cursor-pointer"
            >
              <span>查看校際成果與弱點矩陣</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab?.('priorities')}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-xs sm:text-sm flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>聚焦三項必辦與自選亮點</span>
            </button>
            <button
              onClick={() => onNavigateToTab?.('slides')}
              className="px-4 py-2 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-teal-300 border border-teal-500/30 font-medium text-xs sm:text-sm flex items-center space-x-1.5 transition-all cursor-pointer"
            >
              <span>檢視原案 25 頁簡報</span>
            </button>
          </div>
        </div>

        {/* Decorative Watermark */}
        <div className="absolute right-4 -bottom-10 opacity-5 pointer-events-none select-none text-9xl font-black text-white">
          115
        </div>
      </div>

      {/* 5 Macro Challenges Indicators Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-teal-600"></span>
              花蓮真實教育土壤：五大關鍵在地挑戰
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              直面地理孤立、微型學校、師資流動與學力瓶頸之痛點數據
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {MACRO_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="p-2 rounded-lg bg-slate-100">
                    {getMetricIcon(metric.icon)}
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      metric.status === 'critical'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {metric.benchmark}
                  </span>
                </div>

                <div className="mt-2">
                  <div className="text-2xl font-black text-slate-900">
                    {metric.value}
                  </div>
                  <div className="text-xs font-semibold text-slate-600">
                    {metric.subValue}
                  </div>
                  <div className="text-xs font-bold text-teal-700 mt-1">
                    {metric.title}
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {metric.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">
                  115精進解方：
                </span>
                <div className="space-y-1">
                  {metric.interventions.slice(0, 2).map((item, i) => (
                    <div
                      key={i}
                      className="text-[11px] text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded flex items-center space-x-1 truncate font-medium"
                    >
                      <CheckCircle2 className="w-3 h-3 text-teal-600 shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Two Column Section: Radar Chart & 113-115 RoadMap */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Radar Analysis */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-4 h-4 text-teal-600" />
                花蓮縣教育生態多面向成熟度雷達
              </h3>
              <p className="text-xs text-slate-500">
                對比花蓮現況、115學年度預期指標與全國基準
              </p>
            </div>
            <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">
              六大發展維度
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData} outerRadius="75%">
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                <Tooltip
                  formatter={(val: any) => [`${val} 分`, '指數']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Radar
                  name="花蓮現況指標"
                  dataKey="花蓮現況"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.25}
                />
                <Radar
                  name="115學年度目標"
                  dataKey="目標值115"
                  stroke="#0d9488"
                  fill="#0d9488"
                  fillOpacity={0.35}
                />
                <Radar
                  name="全國平均水準"
                  dataKey="全國平均"
                  stroke="#94a3b8"
                  fill="#94a3b8"
                  fillOpacity={0.15}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-100 text-center text-xs">
            <div className="bg-rose-50 p-2 rounded-lg">
              <span className="text-slate-500 text-[10px] block">現況最迫切缺口</span>
              <span className="font-bold text-rose-700">健教非專長 (42分)</span>
            </div>
            <div className="bg-teal-50 p-2 rounded-lg">
              <span className="text-slate-500 text-[10px] block">115 目標躍升最大</span>
              <span className="font-bold text-teal-800">小校跨校共力 (+42)</span>
            </div>
            <div className="bg-slate-50 p-2 rounded-lg">
              <span className="text-slate-500 text-[10px] block">核心推動力</span>
              <span className="font-bold text-slate-800">雙軌長期陪伴</span>
            </div>
          </div>
        </div>

        {/* 113-115 Evolution Roadmap */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  113～115學年度 中長程藍圖演進
                </h3>
                <p className="text-xs text-slate-500">
                  不盲目追求新增，將經驗淬鍊為可永續發展之教育生態
                </p>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-700 font-semibold px-2 py-0.5 rounded-full border border-indigo-200">
                永續收敘
              </span>
            </div>

            <div className="space-y-4 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {/* 113 */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                </div>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">113學年度：奠定基石・痛點盤點</span>
                    <span className="text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded">起步期</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    全面盤點南北長距離、偏鄉小校比率與代理師資結構性困境，建立國教輔導團基本到校視導模式。
                  </p>
                </div>
              </div>

              {/* 114 */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-indigo-400 border-2 border-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-700"></span>
                </div>
                <div className="bg-indigo-50/50 rounded-xl p-3 border border-indigo-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-indigo-900">114學年度：跨校嘗試・模型試行</span>
                    <span className="text-[10px] bg-indigo-100 text-indigo-700 px-1.5 py-0.5 rounded font-medium">深化期</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    啟動小校試辦跨校合班與共力圈，引進 KIDMAP 試題認知圖譜診斷與因材網/AI共學示範教室。
                  </p>
                </div>
              </div>

              {/* 115 */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-white"></span>
                </div>
                <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-xl p-3.5 border border-teal-200 shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                      115學年度：深化與永續的收敘之年（現階段）
                    </span>
                    <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded">
                      收敘核心
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-700 mt-1.5 leading-relaxed">
                    三項必辦重點系統化落地（代理雙軌陪伴、非專長背包滿載、會考迷思四步轉化）+ 自選亮點（小校生態圈菜單制與行政減量）。教育處轉為伴行者！
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>中長程核心心法：</span>
            <span className="text-teal-700 font-semibold">
              「每一次的增能，都是為了成就更好的課堂」
            </span>
          </div>
        </div>
      </section>

      {/* 3 Dimensions × 11 Strategies × Sub-Plans Interactive Matrix */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-indigo-600"></span>
              115學年度核心執行架構：3大層面 × 11項策略 × 子計畫對照
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              點擊任一子計畫標籤，即時檢視該方案之目標對象、執行作為與預期成果
            </p>
          </div>

          {/* Dimension Selector */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs">
            {(['全部', '課程發展', '專業成長', '學習成效'] as const).map((dim) => (
              <button
                key={dim}
                onClick={() => setSelectedDimension(dim)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                  selectedDimension === dim
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {dim}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Dimension Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dimension 1: 課程發展 */}
          {(selectedDimension === '全部' || selectedDimension === '課程發展') && (
            <div className="rounded-xl border border-amber-200/80 bg-amber-50/20 p-4">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-amber-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <h4 className="font-bold text-sm text-amber-950">課程發展 面向</h4>
                </div>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  3大策略
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-amber-900 mb-1.5 flex items-center justify-between">
                    <span>1. 課程領導</span>
                    <span className="text-[10px] text-amber-700 bg-amber-100/80 px-1.5 rounded">中階領導培力</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter((p) => p.strategy === '課程領導').map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className="text-xs px-2.5 py-1 rounded bg-white hover:bg-amber-100 text-slate-800 border border-amber-200 transition-colors shadow-2xs font-medium cursor-pointer"
                      >
                        <span className="font-bold text-amber-800 mr-1">{plan.code}</span>
                        {plan.name.slice(0, 8)}...
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-amber-900 mb-1.5 flex items-center justify-between">
                    <span>2. 跨校協作</span>
                    <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 rounded font-bold">自選亮點</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter((p) => p.strategy === '跨校協作').map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className={`text-xs px-2.5 py-1 rounded border transition-colors shadow-2xs font-medium cursor-pointer ${
                          plan.focusTag === '自選亮點'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100'
                            : 'bg-white border-amber-200 text-slate-800 hover:bg-amber-100'
                        }`}
                      >
                        <span className="font-bold mr-1">{plan.code}</span>
                        {plan.name.slice(0, 10)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-amber-900 mb-1.5 flex items-center justify-between">
                    <span>3. 社群深化</span>
                    <span className="text-[10px] text-rose-700 bg-rose-100 px-1.5 rounded font-bold">必辦(一)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter((p) => p.strategy === '社群深化').map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className={`text-xs px-2.5 py-1 rounded border transition-colors shadow-2xs font-medium cursor-pointer ${
                          plan.focusTag === '必辦(一)'
                            ? 'bg-rose-50 border-rose-300 text-rose-900 hover:bg-rose-100 font-bold'
                            : 'bg-white border-amber-200 text-slate-800 hover:bg-amber-100'
                        }`}
                      >
                        <span className="mr-1">{plan.code}</span>
                        {plan.name.slice(0, 10)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dimension 2: 專業成長 */}
          {(selectedDimension === '全部' || selectedDimension === '專業成長') && (
            <div className="rounded-xl border border-teal-200/80 bg-teal-50/20 p-4">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-teal-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                  <h4 className="font-bold text-sm text-teal-950">專業成長 面向</h4>
                </div>
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  5大策略
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-teal-900 mb-1.5 flex items-center justify-between">
                    <span>4. 落實素養教學</span>
                    <span className="text-[10px] text-teal-700 bg-teal-100 px-1.5 rounded">議題融入</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter((p) => p.strategy === '落實素養教學').map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className="text-xs px-2.5 py-1 rounded bg-white hover:bg-teal-100 text-slate-800 border border-teal-200 transition-colors shadow-2xs font-medium cursor-pointer"
                      >
                        <span className="font-bold text-teal-800 mr-1">{plan.code}</span>
                        {plan.name.slice(0, 8)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-teal-900 mb-1.5 flex items-center justify-between">
                    <span>5. 精準教師專業</span>
                    <div className="flex gap-1">
                      <span className="text-[10px] text-rose-700 bg-rose-100 px-1.5 rounded font-bold">必辦(一)</span>
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 rounded font-bold">必辦(二)</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter((p) => p.strategy === '精進教師專業').map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className={`text-xs px-2.5 py-1 rounded border transition-colors shadow-2xs font-medium cursor-pointer ${
                          plan.focusTag === '必辦(二)'
                            ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100 font-bold'
                            : plan.focusTag === '必辦(一)'
                            ? 'bg-rose-50 border-rose-300 text-rose-900 hover:bg-rose-100 font-bold'
                            : 'bg-white border-teal-200 text-slate-800 hover:bg-teal-100'
                        }`}
                      >
                        <span className="mr-1">{plan.code}</span>
                        {plan.name.slice(0, 10)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-teal-900 mb-1.5 flex items-center justify-between">
                    <span>6-8. 觀議課 / 探究SEL / 差異化</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-100 px-1.5 rounded font-bold">AI協作/SEL</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter(
                      (p) =>
                        p.strategy === '探究+PBL(SEL)' ||
                        (p.strategy === '差異化教學' && p.dimension === '專業成長')
                    ).map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className="text-xs px-2.5 py-1 rounded bg-white hover:bg-indigo-50 text-indigo-950 border border-indigo-200 transition-colors shadow-2xs font-medium cursor-pointer"
                      >
                        <span className="font-bold text-indigo-700 mr-1">{plan.code}</span>
                        {plan.name.slice(0, 10)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dimension 3: 學習成效 */}
          {(selectedDimension === '全部' || selectedDimension === '學習成效') && (
            <div className="rounded-xl border border-sky-200/80 bg-sky-50/20 p-4">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-sky-200">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                  <h4 className="font-bold text-sm text-sky-950">學習成效 面向</h4>
                </div>
                <span className="text-[11px] font-semibold text-sky-800 bg-sky-100 px-2 py-0.5 rounded">
                  3大策略
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-bold text-sky-900 mb-1.5 flex items-center justify-between">
                    <span>9. 診斷評量</span>
                    <span className="text-[10px] text-rose-700 bg-rose-100 px-1.5 rounded font-bold">必辦(三)</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter((p) => p.strategy === '診斷評量').map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className="text-xs px-2.5 py-1 rounded bg-white hover:bg-rose-50 text-rose-950 border border-rose-200 transition-colors shadow-2xs font-medium cursor-pointer"
                      >
                        <span className="font-bold text-rose-700 mr-1">{plan.code}</span>
                        {plan.name.slice(0, 10)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-sky-900 mb-1.5 flex items-center justify-between">
                    <span>10. 追蹤輔導</span>
                    <span className="text-[10px] text-sky-700 bg-sky-100 px-1.5 rounded">分級入校</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter((p) => p.strategy === '追蹤輔導').map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className="text-xs px-2.5 py-1 rounded bg-white hover:bg-sky-100 text-slate-800 border border-sky-200 transition-colors shadow-2xs font-medium cursor-pointer"
                      >
                        <span className="font-bold text-sky-800 mr-1">{plan.code}</span>
                        {plan.name.slice(0, 10)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-bold text-sky-900 mb-1.5 flex items-center justify-between">
                    <span>11. 差異化與資料庫</span>
                    <span className="text-[10px] text-indigo-700 bg-indigo-100 px-1.5 rounded font-bold">AI共學教室</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {SUB_PLANS.filter(
                      (p) =>
                        p.code === '異-01' || p.strategy === '教育研究資料庫'
                    ).map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setActivePlanModal(plan)}
                        className="text-xs px-2.5 py-1 rounded bg-indigo-50 hover:bg-indigo-100 text-indigo-900 border border-indigo-200 transition-colors shadow-2xs font-medium cursor-pointer"
                      >
                        <span className="font-bold text-indigo-700 mr-1">{plan.code}</span>
                        {plan.name.slice(0, 10)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Governance & Support System (Slides 8, 10, 11) */}
      <section className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800">
        <div className="max-w-4xl mb-6">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-2">
            <Network className="w-3.5 h-3.5" />
            <span>三層級推動組織 × 三軌專業支持鏈</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight">
            帶動改變的生態齒輪：打破孤島，課發中心為樞紐
          </h3>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            教育處從過去由上而下的「管理者」，翻轉為伴行現場的「支持者」，建構政策、專業與執行緊密扣合的支持體系。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-bold mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>最高決策層 ｜ 推動小組</span>
            </div>
            <div className="text-sm font-semibold text-white mb-1">
              處長領軍・跨科室資源整合
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              整合學管科、特幼科、設施科等資源，定期召開。排除現場行政阻力，拍板跨校交通費與節數法規配套。
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold mb-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>管控追蹤層 ｜ 執行小組</span>
            </div>
            <div className="text-sm font-semibold text-white mb-1">
              每月定期・課程督學對話
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              科長召集，課程督學與各子計畫承辦學校直接對話，動態檢核進度，第一時間排除推動卡點。
            </p>
          </div>

          <div className="bg-slate-800/80 rounded-xl p-4 border border-slate-700/80">
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold mb-2">
              <Cpu className="w-4 h-4" />
              <span>策略核心層 ｜ 核心小組</span>
            </div>
            <div className="text-sm font-semibold text-white mb-1">
              課發中心研析・滾動修正
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              每月至少 1 次，針對會考數據、KIDMAP 迷思回饋進行深層研析，捨棄一次性審查，建立雙向反覆對話迴路。
            </p>
          </div>
        </div>

        {/* 3 Rails Visualization */}
        <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800 text-xs">
          <span className="text-[11px] font-bold text-slate-400 block mb-2 uppercase tracking-wider">
            三軌支持鏈入校運作機制：
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-emerald-400 block">軌道一（政策）：</span>
              <span className="text-slate-300">督學分區入校與資源整合，協助行政減量與跨校課表協調。</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-cyan-400 block">軌道二（專業）：</span>
              <span className="text-slate-300">國教地方輔導團到校諮詢，入班觀議課，拆解命題迷思。</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
              <span className="font-bold text-amber-400 block">軌道三（執行）：</span>
              <span className="text-slate-300">各子計畫承辦學校辦理實務共備工作坊，提供帶得走的即用教案。</span>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Details Modal */}
      {activePlanModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded bg-teal-100 text-teal-800 font-bold text-xs">
                  {activePlanModal.code}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {activePlanModal.dimension} ｜ {activePlanModal.strategy}
                </span>
              </div>
              <button
                onClick={() => setActivePlanModal(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-bold text-slate-900 mb-2">
                {activePlanModal.name}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {activePlanModal.description}
              </p>

              <div className="mt-4 space-y-2 text-xs">
                <div>
                  <span className="font-bold text-slate-700">對象對象：</span>
                  <span className="text-slate-600 ml-1">{activePlanModal.targetAudience}</span>
                </div>
                <div>
                  <span className="font-bold text-slate-700">核心具體做法：</span>
                  <span className="text-slate-600 ml-1">{activePlanModal.keyAction}</span>
                </div>
                <div>
                  <span className="font-bold text-teal-700">預期成效指標：</span>
                  <span className="text-teal-900 font-medium ml-1">{activePlanModal.expectedOutcome}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActivePlanModal(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 cursor-pointer"
              >
                關閉視窗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
