import React, { useState } from 'react';
import { Header, TabKey } from './components/Header';
import { CountyOverview } from './components/CountyOverview';
import { SchoolPerformanceMatrix } from './components/SchoolPerformanceMatrix';
import { PriorityInitiativesView } from './components/PriorityInitiativesView';
import { PolicySimulator } from './components/PolicySimulator';
import { ActionRecommendations } from './components/ActionRecommendations';
import { SlideGallery } from './components/SlideGallery';
import { AIAssistantModal } from './components/AIAssistantModal';
import { SchoolData } from './data/hualienEducationData';
import {
  Compass,
  Sparkles,
  MapPin,
  ExternalLink,
  HeartHandshake,
  Layers,
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabKey>('overview');
  const [isAiModalOpen, setIsAiModalOpen] = useState<boolean>(false);
  const [selectedSchoolForAi, setSelectedSchoolForAi] = useState<SchoolData | null>(null);

  const handleOpenAiModal = (school?: SchoolData | null) => {
    setSelectedSchoolForAi(school || null);
    setIsAiModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col font-sans antialiased selection:bg-teal-500 selection:text-white">
      {/* Global Navigation Header */}
      <Header
        currentTab={currentTab}
        onTabChange={(tab) => setCurrentTab(tab)}
        onOpenAiModal={() => handleOpenAiModal(null)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 pt-6">
        {currentTab === 'overview' && (
          <CountyOverview
            onNavigateToTab={(tab) => setCurrentTab(tab as TabKey)}
          />
        )}

        {currentTab === 'schools' && (
          <SchoolPerformanceMatrix
            onSelectSchoolForAi={(school) => handleOpenAiModal(school)}
          />
        )}

        {currentTab === 'priorities' && <PriorityInitiativesView />}

        {currentTab === 'simulator' && <PolicySimulator />}

        {currentTab === 'recommendations' && <ActionRecommendations />}

        {currentTab === 'slides' && <SlideGallery />}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-white mt-12 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-3 text-center md:text-left">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold border border-teal-500/30">
              <Compass className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">
                花蓮縣115學年度精進教學與校際成果深度分析儀表板
              </div>
              <div className="text-slate-400 text-[11px]">
                花蓮縣政府教育處 課程教學科 暨 課程發展中心 研發建置
              </div>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1 text-[11px]">
            <p className="text-teal-300 font-semibold">
              「每一次的增能，都是為了成就更好的課堂。」
            </p>
            <p className="text-slate-500">
              從深化到永續，點亮每一座教育微光 ｜ 南北 137.5 公里陪伴同行
            </p>
          </div>
        </div>
      </footer>

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        selectedSchool={selectedSchoolForAi}
      />
    </div>
  );
}
