import React, { useState } from 'react';
import { SLIDES_METADATA, SlideItem } from '../data/slidesMetadata';
import {
  Presentation,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  CheckCircle,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

export const SlideGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSlide, setActiveSlide] = useState<SlideItem | null>(null);

  const categories = [
    '全部',
    '願景藍圖',
    '在地挑戰',
    '推動架構',
    '必辦一(代理)',
    '必辦二(非專長)',
    '必辦三(會考迷思)',
    '自選亮點(跨校)',
    '組織體系',
  ];

  const filteredSlides = SLIDES_METADATA.filter((slide) => {
    const matchCategory =
      selectedCategory === '全部' || slide.category === selectedCategory;
    const matchSearch =
      slide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slide.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slide.page.toString() === searchQuery.trim();
    return matchCategory && matchSearch;
  });

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeSlide) return;
    const currentIndex = SLIDES_METADATA.findIndex((s) => s.page === activeSlide.page);
    if (currentIndex > 0) {
      setActiveSlide(SLIDES_METADATA[currentIndex - 1]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeSlide) return;
    const currentIndex = SLIDES_METADATA.findIndex((s) => s.page === activeSlide.page);
    if (currentIndex < SLIDES_METADATA.length - 1) {
      setActiveSlide(SLIDES_METADATA[currentIndex + 1]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header & Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-6 rounded-full bg-teal-600"></span>
              花蓮縣115學年度精進計畫 完整 25 頁簡報畫廊
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              由原報告 PDF 轉譯為高解析度視圖，涵蓋架構矩陣、三項必辦焦點、小校菜單制與組織支持鏈
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <a
              href="/assets/aistudio/____115__.pdf_7e4de513.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>開啟原始 PDF</span>
            </a>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5 text-xs w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-teal-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="搜尋頁數或關鍵字 (如: 代理, 迷思, A餐)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-800 text-xs focus:outline-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Slide Thumbnails Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredSlides.map((slide) => (
          <div
            key={slide.page}
            onClick={() => setActiveSlide(slide)}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Thumbnail Image Container */}
              <div className="relative aspect-video bg-slate-100 overflow-hidden border-b border-slate-100">
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-slate-900/80 text-white text-[10px] font-mono font-bold backdrop-blur-xs">
                  P.{slide.page}
                </div>
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-teal-600/90 text-white text-[10px] font-semibold backdrop-blur-xs">
                  {slide.category}
                </div>
                <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 rounded-full bg-white/90 text-slate-900 shadow-lg">
                    <Maximize2 className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Title & Summary */}
              <div className="p-3.5">
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 line-clamp-1 group-hover:text-teal-700 transition-colors">
                  {slide.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {slide.summary}
                </p>
              </div>
            </div>

            <div className="px-3.5 pb-3 pt-1 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
              <span className="truncate">對接子計畫：{slide.relatedPlans.join(', ')}</span>
              <span className="text-teal-600 font-semibold group-hover:translate-x-0.5 transition-transform">
                點擊檢視 ➔
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {activeSlide && (
        <div
          onClick={() => setActiveSlide(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="px-2 py-0.5 rounded bg-teal-500 text-slate-950 font-mono font-bold text-xs">
                  第 {activeSlide.page} / 25 頁
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                  {activeSlide.category}
                </span>
                <h3 className="font-bold text-sm sm:text-base text-white truncate max-w-md">
                  {activeSlide.title}
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handlePrev}
                  disabled={activeSlide.page === 1}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  title="上一頁"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={activeSlide.page === 25}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white transition-colors cursor-pointer"
                  title="下一頁"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveSlide(null)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-900 text-white transition-colors ml-2 cursor-pointer font-bold"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Content: Image & Bullet Points */}
            <div className="overflow-y-auto p-4 sm:p-6 space-y-4">
              {/* Image Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-900">
                <img
                  src={activeSlide.image}
                  alt={activeSlide.title}
                  className="w-full h-auto max-h-[55vh] object-contain mx-auto"
                />
              </div>

              {/* Slide Breakdown */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    本頁核心重點與實施意涵解讀：
                  </span>
                  <span className="text-[11px] text-teal-800 font-semibold bg-teal-100 px-2 py-0.5 rounded">
                    子計畫：{activeSlide.relatedPlans.join(', ')}
                  </span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeSlide.summary}
                </p>

                <div className="pt-2 border-t border-slate-200">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                    {activeSlide.bulletPoints.map((pt, i) => (
                      <li key={i} className="flex items-start space-x-1.5">
                        <CheckCircle className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
