import React, { useState, useMemo } from 'react';
import {
  SCHOOL_SAMPLES,
  SchoolData,
} from '../data/hualienEducationData';
import {
  Search,
  Filter,
  BarChart2,
  TrendingDown,
  AlertTriangle,
  Award,
  Users,
  Compass,
  ArrowUpDown,
  BookOpen,
  Sparkles,
  ChevronRight,
  School,
  Activity,
  CheckCircle,
} from 'lucide-react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
  ReferenceLine,
} from 'recharts';

interface SchoolPerformanceMatrixProps {
  onSelectSchoolForAi?: (school: SchoolData) => void;
}

export const SchoolPerformanceMatrix: React.FC<SchoolPerformanceMatrixProps> = ({
  onSelectSchoolForAi,
}) => {
  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('全部');
  const [selectedType, setSelectedType] = useState<string>('全部');
  const [selectedScale, setSelectedScale] = useState<string>('全部');
  const [selectedTier, setSelectedTier] = useState<string>('全部');
  const [selectedMenu, setSelectedMenu] = useState<string>('全部');
  const [viewMode, setViewMode] = useState<'scatter' | 'bars' | 'table'>('scatter');
  const [activeScatterSubject, setActiveScatterSubject] = useState<'english' | 'math'>('english');
  const [selectedSchool, setSelectedSchool] = useState<SchoolData | null>(null);

  // Sorting
  const [sortBy, setSortBy] = useState<keyof SchoolData>('englishNeedsImprovementRatio');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filtered Schools
  const filteredSchools = useMemo(() => {
    return SCHOOL_SAMPLES.filter((school) => {
      const matchSearch =
        school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        school.district.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRegion = selectedRegion === '全部' || school.region === selectedRegion;
      const matchType = selectedType === '全部' || school.type === selectedType;
      const matchScale = selectedScale === '全部' || school.scaleCategory === selectedScale;
      const matchTier =
        selectedTier === '全部' || school.counsellingTier.includes(selectedTier);
      const matchMenu =
        selectedMenu === '全部' || school.collaborationMenu.includes(selectedMenu);

      return matchSearch && matchRegion && matchType && matchScale && matchTier && matchMenu;
    }).sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'desc' ? bVal - aVal : aVal - bVal;
      }
      return 0;
    });
  }, [searchQuery, selectedRegion, selectedType, selectedScale, selectedTier, selectedMenu, sortBy, sortOrder]);

  // Aggregate Metrics for Current Filter
  const stats = useMemo(() => {
    if (filteredSchools.length === 0) {
      return {
        avgEngC: 0,
        avgMathC: 0,
        avgSubRatio: 0,
        avgNonSpec: 0,
        tier3Count: 0,
        smallSchoolCount: 0,
      };
    }
    const count = filteredSchools.length;
    const avgEngC =
      filteredSchools.reduce((acc, s) => acc + s.englishNeedsImprovementRatio, 0) / count;
    const avgMathC =
      filteredSchools.reduce((acc, s) => acc + s.mathNeedsImprovementRatio, 0) / count;
    const avgSubRatio =
      filteredSchools.reduce((acc, s) => acc + s.substituteTeacherRatio, 0) / count;
    const avgNonSpec =
      filteredSchools.reduce((acc, s) => acc + s.nonSpecialistRatio, 0) / count;
    const tier3Count = filteredSchools.filter((s) => s.counsellingTier.includes('第三級')).length;
    const smallSchoolCount = filteredSchools.filter((s) => s.scaleCategory === '<100人').length;

    return {
      avgEngC: Math.round(avgEngC * 10) / 10,
      avgMathC: Math.round(avgMathC * 10) / 10,
      avgSubRatio: Math.round(avgSubRatio * 10) / 10,
      avgNonSpec: Math.round(avgNonSpec * 10) / 10,
      tier3Count,
      smallSchoolCount,
    };
  }, [filteredSchools]);

  // Scatter Chart Data
  const scatterData = useMemo(() => {
    return filteredSchools.map((s) => ({
      x: s.substituteTeacherRatio,
      y:
        activeScatterSubject === 'english'
          ? s.englishNeedsImprovementRatio
          : s.mathNeedsImprovementRatio,
      z: s.studentCount,
      name: s.name,
      district: s.district,
      region: s.region,
      scale: s.scaleCategory,
      tier: s.counsellingTier,
      school: s,
    }));
  }, [filteredSchools, activeScatterSubject]);

  // Regional Comparison Bar Data
  const regionBarData = useMemo(() => {
    const regions = ['北區', '中區', '南區'];
    return regions.map((reg) => {
      const regSchools = SCHOOL_SAMPLES.filter((s) => s.region === reg);
      const c = regSchools.length || 1;
      return {
        region: reg,
        英語待加強: Math.round((regSchools.reduce((a, s) => a + s.englishNeedsImprovementRatio, 0) / c) * 10) / 10,
        數學待加強: Math.round((regSchools.reduce((a, s) => a + s.mathNeedsImprovementRatio, 0) / c) * 10) / 10,
        代理教師率: Math.round((regSchools.reduce((a, s) => a + s.substituteTeacherRatio, 0) / c) * 10) / 10,
        非專長配課率: Math.round((regSchools.reduce((a, s) => a + s.nonSpecialistRatio, 0) / c) * 10) / 10,
      };
    });
  }, []);

  const handleSort = (field: keyof SchoolData) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Section: Overview & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-teal-600"></span>
              校際成果深度分析與弱點交叉診斷
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              交叉比對代理教師比率、英數待加強比率、非專長配課及輔導分級，定位高風險校際熱區
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg text-xs self-start lg:self-auto">
            <button
              onClick={() => setViewMode('scatter')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'scatter'
                  ? 'bg-white text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              四象限散佈圖
            </button>
            <button
              onClick={() => setViewMode('bars')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'bars'
                  ? 'bg-white text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              分區長條對比
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white text-teal-800 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              學校大數據清單 ({filteredSchools.length})
            </button>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 text-xs">
          {/* Search */}
          <div className="relative col-span-2 sm:col-span-1">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="搜尋校名或鄉鎮..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-teal-500 text-xs"
            />
          </div>

          {/* Region */}
          <div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-teal-500 text-xs"
            >
              <option value="全部">全部分區 (北中南)</option>
              <option value="北區">北區 (花蓮/吉安/新城/秀林)</option>
              <option value="中區">中區 (壽豐/鳳林/光復/萬榮/豐濱)</option>
              <option value="南區">南區 (玉里/瑞穗/富里/卓溪)</option>
            </select>
          </div>

          {/* School Scale */}
          <div>
            <select
              value={selectedScale}
              onChange={(e) => setSelectedScale(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-teal-500 text-xs"
            >
              <option value="全部">全部規模 (全校人數)</option>
              <option value="<100人">&lt; 100人 (微型小校)</option>
              <option value="100-300人">100-300人 (中型學校)</option>
              <option value=">300人">&gt; 300人 (大型城區)</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-teal-500 text-xs"
            >
              <option value="全部">全部學制 (國中/國小)</option>
              <option value="國中">國民中學</option>
              <option value="國小">國民小學</option>
            </select>
          </div>

          {/* Tier */}
          <div>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-teal-500 text-xs"
            >
              <option value="全部">全部輔導分級</option>
              <option value="第一級">第一級 (自主深化)</option>
              <option value="第二級">第二級 (焦點輔導)</option>
              <option value="第三級">第三級 (密集支持)</option>
            </select>
          </div>

          {/* Menu */}
          <div>
            <select
              value={selectedMenu}
              onChange={(e) => setSelectedMenu(e.target.value)}
              className="w-full px-2.5 py-2 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 focus:outline-teal-500 text-xs"
            >
              <option value="全部">全部菜單模式</option>
              <option value="A餐">A餐 (小校共力圈)</option>
              <option value="B餐">B餐 (跨校合班)</option>
              <option value="C餐">C餐 (混齡教學)</option>
              <option value="校本獨立">校本獨立深化</option>
            </select>
          </div>
        </div>

        {/* Filter Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 mt-4 pt-4 border-t border-slate-100 text-center">
          <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
            <span className="text-[10px] text-slate-500 block">篩選學校數</span>
            <span className="text-sm font-bold text-slate-800">{filteredSchools.length} 所</span>
          </div>
          <div className="bg-rose-50 p-2 rounded-lg border border-rose-100">
            <span className="text-[10px] text-rose-600 block">平均英語待加強 C</span>
            <span className="text-sm font-bold text-rose-700">{stats.avgEngC}%</span>
          </div>
          <div className="bg-rose-50 p-2 rounded-lg border border-rose-100">
            <span className="text-[10px] text-rose-600 block">平均數學待加強 C</span>
            <span className="text-sm font-bold text-rose-700">{stats.avgMathC}%</span>
          </div>
          <div className="bg-indigo-50 p-2 rounded-lg border border-indigo-100">
            <span className="text-[10px] text-indigo-600 block">平均代理教師比率</span>
            <span className="text-sm font-bold text-indigo-800">{stats.avgSubRatio}%</span>
          </div>
          <div className="bg-amber-50 p-2 rounded-lg border border-amber-100">
            <span className="text-[10px] text-amber-700 block">非專長配課比率</span>
            <span className="text-sm font-bold text-amber-800">{stats.avgNonSpec}%</span>
          </div>
          <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
            <span className="text-[10px] text-emerald-700 block">第三級密集輔導校</span>
            <span className="text-sm font-bold text-emerald-800">{stats.tier3Count} 所</span>
          </div>
        </div>
      </div>

      {/* View Mode 1: Scatter Chart (Four Quadrants) */}
      {viewMode === 'scatter' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-teal-600" />
                代理教師比率 vs. 學力待加強比率（四象限關聯散佈分析）
              </h3>
              <p className="text-xs text-slate-500">
                圓點大小代表學生人數，點擊任何圓點可展開該校深度體質診斷卡
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-600">檢視學科：</span>
              <div className="flex bg-slate-100 p-0.5 rounded-lg text-xs">
                <button
                  onClick={() => setActiveScatterSubject('english')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    activeScatterSubject === 'english'
                      ? 'bg-teal-600 text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  英語科 (全縣待加強 46.15%)
                </button>
                <button
                  onClick={() => setActiveScatterSubject('math')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                    activeScatterSubject === 'math'
                      ? 'bg-teal-600 text-white font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  數學科 (全縣待加強 39.40%)
                </button>
              </div>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="代理教師比率"
                  unit="%"
                  domain={[0, 45]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  label={{
                    value: '代理代課教師比率 (%) ➔ 高流動率風險',
                    position: 'insideBottom',
                    offset: -10,
                    fontSize: 11,
                    fill: '#475569',
                  }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name={activeScatterSubject === 'english' ? '英語待加強' : '數學待加強'}
                  unit="%"
                  domain={[15, 65]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  label={{
                    value: `${activeScatterSubject === 'english' ? '英語' : '數學'}待加強 C 比率 (%) ➔ 學力待扶助`,
                    angle: -90,
                    position: 'insideLeft',
                    fontSize: 11,
                    fill: '#475569',
                  }}
                />
                <ZAxis type="number" dataKey="z" range={[80, 500]} name="學生人數" />
                <Tooltip
                  cursor={{ strokeDasharray: '3 3' }}
                  content={({ payload }) => {
                    if (!payload || !payload[0]) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs space-y-1 border border-slate-700">
                        <div className="font-bold text-teal-300 text-sm">{data.name}</div>
                        <div className="text-slate-400">
                          {data.region} ｜ {data.district} ｜ {data.scale}
                        </div>
                        <div className="pt-1 border-t border-slate-800 space-y-0.5">
                          <div>
                            代理教師比率：<strong className="text-amber-400">{data.x}%</strong>
                          </div>
                          <div>
                            {activeScatterSubject === 'english' ? '英語' : '數學'}待加強：
                            <strong className="text-rose-400">{data.y}%</strong>
                          </div>
                          <div>
                            學生人數：<strong>{data.z} 人</strong>
                          </div>
                          <div className="text-teal-400 font-semibold">{data.tier}</div>
                        </div>
                        <div className="text-[10px] text-slate-400 pt-1">
                          點擊以開啟完整深度體質診斷
                        </div>
                      </div>
                    );
                  }}
                />
                {/* Benchmark Lines: County Baseline */}
                <ReferenceLine
                  x={23}
                  stroke="#f59e0b"
                  strokeDasharray="4 4"
                  label={{ value: '全縣代理均值 23%', fill: '#b45309', fontSize: 10, position: 'top' }}
                />
                <ReferenceLine
                  y={activeScatterSubject === 'english' ? 46.15 : 39.4}
                  stroke="#ef4444"
                  strokeDasharray="4 4"
                  label={{
                    value: `全縣會考均值 ${activeScatterSubject === 'english' ? '46.15%' : '39.40%'}`,
                    fill: '#b91c1c',
                    fontSize: 10,
                    position: 'right',
                  }}
                />
                <Scatter
                  data={scatterData}
                  fill="#0d9488"
                  onClick={(node: any) => setSelectedSchool(node.school)}
                  className="cursor-pointer"
                >
                  {scatterData.map((entry, index) => {
                    // Color based on tier
                    let color = '#0d9488';
                    if (entry.tier.includes('第三級')) color = '#e11d48';
                    else if (entry.tier.includes('第二級')) color = '#f59e0b';
                    return <Cell key={`cell-${index}`} fill={color} fillOpacity={0.8} />;
                  })}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </div>

          {/* 4 Quadrants Legend Card */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
            <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
              <span className="font-bold text-rose-800 block">右上象限：高代理 × 高待加強</span>
              <p className="text-[11px] text-rose-700 mt-0.5">
                雙重弱勢重災校（多為中南區與原鄉微型校），亟需「專-01-1 雙軌長期陪伴」與「輔-03 密集入校諮詢」。
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
              <span className="font-bold text-amber-800 block">左上象限：低代理 × 高待加強</span>
              <p className="text-[11px] text-amber-700 mt-0.5">
                師資相對穩定但教學迷思沉積，需強化「診-02 KIDMAP 認知圖譜」與「異-01 AI 共學教室」打破教學盲點。
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-bold text-emerald-800 block">左下象限：低代理 × 低待加強</span>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                城區基石學校（花蓮市/吉安大校），宜擔任「跨校共力圈」帶頭旗艦角色，釋放資源協同周邊小校。
              </p>
            </div>
            <div className="p-2.5 rounded-lg bg-teal-50 border border-teal-200">
              <span className="font-bold text-teal-800 block">右下象限：高代理 × 逆勢突破</span>
              <p className="text-[11px] text-teal-700 mt-0.5">
                代理比率高但學力表現優異之亮點學校，其「開學前教案微整形」與「在地社群共備」經驗值得全縣推廣！
              </p>
            </div>
          </div>
        </div>
      )}

      {/* View Mode 2: Regional Comparison Bars */}
      {viewMode === 'bars' && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-indigo-600" />
                北區、中區、南區 關鍵教育指標結構對比
              </h3>
              <p className="text-xs text-slate-500">
                南北相距 137.5 公里之資源梯級分布：南區與中區在代理比率與學力待加強比率顯著高於北區城區
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionBarData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="region" tick={{ fontSize: 12, fill: '#334155' }} />
                <YAxis unit="%" tick={{ fontSize: 11, fill: '#64748b' }} domain={[0, 60]} />
                <Tooltip
                  formatter={(value: any) => [`${value}%`]}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="英語待加強" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                <Bar dataKey="數學待加強" fill="#fb923c" radius={[4, 4, 0, 0]} />
                <Bar dataKey="代理教師率" fill="#6366f1" radius={[4, 4, 0, 0]} />
                <Bar dataKey="非專長配課率" fill="#0d9488" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl mt-4 border border-slate-100 text-xs text-slate-700">
            <strong>督學深度洞察：</strong>
            南區平均代理教師比率達 28.9%、非專長配課達 31.5%，英數待加強比率均突破 48%。這證實了 115 精進計畫將
            <strong>「專-01 代理代課陪伴」</strong>與<strong>「異-02 小校教育生態圈」</strong>列為重中之重，正是因應花蓮中南區在地結構的精準打擊。
          </div>
        </div>
      )}

      {/* View Mode 3: Interactive Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <School className="w-4 h-4 text-teal-600" />
            校際成果與體質數據表 ({filteredSchools.length} 所學校)
          </h3>
          <span className="text-xs text-slate-500">點擊校名查看專屬處方籤</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-3">校名 / 鄉鎮</th>
                <th className="py-3 px-2">分區 / 偏遠度</th>
                <th
                  className="py-3 px-2 cursor-pointer hover:text-slate-900"
                  onClick={() => handleSort('studentCount')}
                >
                  <div className="flex items-center space-x-1">
                    <span>學生數</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-2 cursor-pointer hover:text-slate-900"
                  onClick={() => handleSort('substituteTeacherRatio')}
                >
                  <div className="flex items-center space-x-1">
                    <span>代理率</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  className="py-3 px-2 cursor-pointer hover:text-slate-900"
                  onClick={() => handleSort('englishNeedsImprovementRatio')}
                >
                  <div className="flex items-center space-x-1">
                    <span>英語待加強 (C)</span>
                    <ArrowUpDown className="w-3 h-3 text-rose-600" />
                  </div>
                </th>
                <th
                  className="py-3 px-2 cursor-pointer hover:text-slate-900"
                  onClick={() => handleSort('mathNeedsImprovementRatio')}
                >
                  <div className="flex items-center space-x-1">
                    <span>數學待加強 (C)</span>
                    <ArrowUpDown className="w-3 h-3 text-amber-600" />
                  </div>
                </th>
                <th
                  className="py-3 px-2 cursor-pointer hover:text-slate-900"
                  onClick={() => handleSort('nonSpecialistRatio')}
                >
                  <div className="flex items-center space-x-1">
                    <span>非專長比</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="py-3 px-2">輔導分級</th>
                <th className="py-3 px-2">菜單模式</th>
                <th className="py-3 px-3 text-right">行動處方</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSchools.map((school) => {
                const isHighRisk =
                  school.englishNeedsImprovementRatio > 46.15 &&
                  school.substituteTeacherRatio > 23;
                return (
                  <tr
                    key={school.id}
                    className={`hover:bg-teal-50/50 transition-colors cursor-pointer ${
                      selectedSchool?.id === school.id ? 'bg-teal-50 font-medium' : ''
                    }`}
                    onClick={() => setSelectedSchool(school)}
                  >
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 flex items-center gap-1.5">
                        {school.name}
                        {isHighRisk && (
                          <span
                            className="w-2 h-2 rounded-full bg-rose-500 shrink-0"
                            title="高代理高待加強焦點學校"
                          ></span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {school.district} ｜ {school.type}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-slate-700 font-medium">{school.region}</span>
                      <span className="text-[10px] text-slate-400 block">{school.remoteness}</span>
                    </td>
                    <td className="py-3 px-2 font-mono">
                      {school.studentCount} 人
                      <span className="text-[10px] text-slate-400 block">
                        師 {school.teacherCount}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`font-semibold ${
                          school.substituteTeacherRatio > 25
                            ? 'text-rose-600'
                            : 'text-slate-700'
                        }`}
                      >
                        {school.substituteTeacherRatio}%
                      </span>
                    </td>
                    <td className="py-3 px-2 font-semibold">
                      <span
                        className={
                          school.englishNeedsImprovementRatio > 46.15
                            ? 'text-rose-600 font-bold'
                            : 'text-slate-700'
                        }
                      >
                        {school.englishNeedsImprovementRatio}%
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        A精熟: {school.englishProficiencyRatio}%
                      </span>
                    </td>
                    <td className="py-3 px-2 font-semibold">
                      <span
                        className={
                          school.mathNeedsImprovementRatio > 39.4
                            ? 'text-amber-600 font-bold'
                            : 'text-slate-700'
                        }
                      >
                        {school.mathNeedsImprovementRatio}%
                      </span>
                      <span className="text-[10px] text-slate-400 block">
                        A精熟: {school.mathProficiencyRatio}%
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={
                          school.nonSpecialistRatio > 25
                            ? 'text-amber-700 font-semibold'
                            : 'text-slate-600'
                        }
                      >
                        {school.nonSpecialistRatio}%
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`text-[10px] font-semibold px-2 py-0.5 rounded-full whitespace-nowrap ${
                          school.counsellingTier.includes('第三級')
                            ? 'bg-rose-100 text-rose-800 border border-rose-200'
                            : school.counsellingTier.includes('第二級')
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        }`}
                      >
                        {school.counsellingTier}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <span className="text-[11px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100 whitespace-nowrap font-medium">
                        {school.collaborationMenu.split('(')[0]}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSchool(school);
                        }}
                        className="text-[11px] font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded transition-colors inline-flex items-center space-x-1 cursor-pointer"
                      >
                        <span>診斷卡</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Individual School Comprehensive Diagnostic Card (Drawer / Modal) */}
      {selectedSchool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs px-2 py-0.5 rounded bg-teal-100 text-teal-800 font-bold">
                    {selectedSchool.region} ｜ {selectedSchool.district}
                  </span>
                  <span className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                    {selectedSchool.scaleCategory} ({selectedSchool.studentCount}人)
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-bold ${
                      selectedSchool.counsellingTier.includes('第三級')
                        ? 'bg-rose-100 text-rose-800'
                        : selectedSchool.counsellingTier.includes('第二級')
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {selectedSchool.counsellingTier}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {selectedSchool.name} 專屬體質診斷卡
                </h3>
              </div>
              <button
                onClick={() => setSelectedSchool(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* School Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">代理教師比率</span>
                <span
                  className={`text-base font-bold ${
                    selectedSchool.substituteTeacherRatio > 23 ? 'text-rose-600' : 'text-slate-800'
                  }`}
                >
                  {selectedSchool.substituteTeacherRatio}%
                </span>
                <span className="text-[10px] text-slate-400 block">
                  全縣均值 23.0%
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">英語待加強 (C)</span>
                <span
                  className={`text-base font-bold ${
                    selectedSchool.englishNeedsImprovementRatio > 46.15
                      ? 'text-rose-600'
                      : 'text-slate-800'
                  }`}
                >
                  {selectedSchool.englishNeedsImprovementRatio}%
                </span>
                <span className="text-[10px] text-slate-400 block">
                  全縣均值 46.15%
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">數學待加強 (C)</span>
                <span
                  className={`text-base font-bold ${
                    selectedSchool.mathNeedsImprovementRatio > 39.4
                      ? 'text-amber-600'
                      : 'text-slate-800'
                  }`}
                >
                  {selectedSchool.mathNeedsImprovementRatio}%
                </span>
                <span className="text-[10px] text-slate-400 block">
                  全縣均值 39.40%
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-500 block">健體/藝能非專長比</span>
                <span
                  className={`text-base font-bold ${
                    selectedSchool.nonSpecialistRatio > 25 ? 'text-amber-600' : 'text-slate-800'
                  }`}
                >
                  {selectedSchool.nonSpecialistRatio}%
                </span>
                <span className="text-[10px] text-slate-400 block">
                  配課教師賦能迫切
                </span>
              </div>
            </div>

            {/* Strengths & Challenges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xs">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1.5">
                  <Award className="w-3.5 h-3.5 text-emerald-600" />
                  <span>學校現存優勢與特色：</span>
                </div>
                <ul className="space-y-1 text-emerald-800">
                  {selectedSchool.keyStrengths.map((str, i) => (
                    <li key={i} className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-100">
                <div className="font-bold text-rose-900 flex items-center gap-1.5 mb-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>核心待突破挑戰：</span>
                </div>
                <ul className="space-y-1 text-rose-800">
                  {selectedSchool.keyChallenges.map((chal, i) => (
                    <li key={i} className="flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                      <span>{chal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Prescription Box */}
            <div className="bg-slate-900 text-white p-4 rounded-xl text-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-300 flex items-center gap-1.5 text-sm">
                  <Compass className="w-4 h-4 text-teal-400" />
                  115精進計畫・專屬客製化處方籤
                </span>
                <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[11px] font-semibold border border-indigo-500/30">
                  菜單適配：{selectedSchool.collaborationMenu}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block mb-1">精準對接之子計畫清單：</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSchool.recommendedPlans.map((plan, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 rounded bg-teal-900/60 text-teal-200 border border-teal-700/60 font-semibold"
                    >
                      {plan}
                    </span>
                  ))}
                </div>
              </div>

              <div className="text-slate-300 leading-relaxed text-[11px] pt-2 border-t border-slate-800">
                <strong>督學策略指引：</strong>
                {selectedSchool.scaleCategory === '<100人'
                  ? '本校為典型偏鄉微型學校，建議立即申請「異-02 小校教育生態圈」之菜單模式，享受公文免紙本之行政減量，並為配課教師申請「專-05 健教背包滿載」雲端模組。'
                  : '本校規模健全，建議強化「診-02 KIDMAP」題型迷思概念解析，並引進「異-01 數學 AI 共學教室」，將 C 級學生轉化為 B 級穩定生源。'}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-5 flex items-center justify-between">
              <button
                onClick={() => {
                  onSelectSchoolForAi?.(selectedSchool);
                  setSelectedSchool(null);
                }}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 text-white text-xs font-semibold flex items-center space-x-1.5 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>以 AI 深入診斷本校策略</span>
              </button>

              <button
                onClick={() => setSelectedSchool(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
              >
                關閉卡片
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
