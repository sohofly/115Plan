import React from 'react';
import {
  Compass,
  BarChart3,
  Award,
  Sliders,
  FileText,
  Presentation,
  Sparkles,
  MapPin,
  Users,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';

export type TabKey =
  | 'overview'
  | 'schools'
  | 'priorities'
  | 'simulator'
  | 'recommendations'
  | 'slides';

interface HeaderProps {
  currentTab: TabKey;
  onTabChange: (tab: TabKey) => void;
  onOpenAiModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenAiModal,
}) => {
  const tabs: { key: TabKey; label: string; icon: React.ReactNode; badge?: string }[] = [
    { key: 'overview', label: '全縣宏觀藍圖', icon: <Compass className="w-4 h-4" /> },
    { key: 'schools', label: '校際成果深度分析', icon: <BarChart3 className="w-4 h-4" />, badge: '20+所' },
    { key: 'priorities', label: '三項必辦與自選亮點', icon: <Award className="w-4 h-4" />, badge: '核心聚焦' },
    { key: 'simulator', label: '政策策略沙盤模擬', icon: <Sliders className="w-4 h-4" /> },
    { key: 'recommendations', label: '精準改善行動手冊', icon: <FileText className="w-4 h-4" /> },
    { key: 'slides', label: '25頁完整簡報畫廊', icon: <Presentation className="w-4 h-4" />, badge: '全套' },
  ];

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 shadow-lg">
      {/* Top Banner with Micro Stats */}
      <div className="bg-gradient-to-r from-teal-900 via-slate-900 to-indigo-950 border-b border-slate-800/80 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              花蓮縣政府教育處 115學年度精進計畫
            </span>
            <span className="text-slate-400 hidden sm:inline">
              從深化到永續，點亮每一座教育微光（2026年8月發布）
            </span>
          </div>

          <div className="flex items-center space-x-3 text-slate-300 text-[11px]">
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3 text-amber-400" />
              <span>南北縱長 <strong>137.5km</strong></span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1">
              <Users className="w-3 h-3 text-cyan-400" />
              <span>小校占 <strong>66.7%</strong> / 代理 <strong>23%</strong> (741人)</span>
            </div>
            <span className="text-slate-600">|</span>
            <div className="flex items-center space-x-1">
              <AlertCircle className="w-3 h-3 text-rose-400" />
              <span>會考待加強：英 <strong>46.15%</strong> / 數 <strong>39.40%</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header Area */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center shadow-md shadow-teal-500/20">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                教學精進，協力同行
                <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  校際成果深度分析與策略儀表板
                </span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400">
                花蓮縣115學年度精進國民中小學教師教學專業與課程品質計畫 數據分析系統
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenAiModal}
            className="flex items-center space-x-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI 督學智囊諮詢</span>
          </button>
          
          <a
            href={import.meta.env.BASE_URL + "assets/aistudio/____115__.pdf_7e4de513.pdf"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="開啟原始簡報 PDF"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>原計畫報告</span>
          </a>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none">
        <nav className="flex space-x-1 py-1 border-t border-slate-800">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`flex items-center space-x-2 px-3.5 py-2.5 rounded-t-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer ${
                  isActive
                    ? 'border-teal-400 text-teal-300 bg-slate-800/80 font-semibold'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive
                        ? 'bg-teal-400/20 text-teal-200 border border-teal-400/40'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
