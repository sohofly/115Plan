import React, { useState } from 'react';
import { SchoolData } from '../data/hualienEducationData';
import {
  Sparkles,
  Send,
  Loader2,
  Copy,
  Check,
  Bot,
  User,
  AlertCircle,
  HelpCircle,
  School,
  X,
} from 'lucide-react';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSchool?: SchoolData | null;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({
  isOpen,
  onClose,
  selectedSchool,
}) => {
  const [prompt, setPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; text: string; isFallback?: boolean }[]
  >([
    {
      role: 'assistant',
      text: selectedSchool
        ? `您好！我是花蓮縣115精進計畫專屬的「督學智慧智囊」。已鎖定您選擇的學校「${selectedSchool.name}」（${selectedSchool.district}，學生${selectedSchool.studentCount}人，代理率${selectedSchool.substituteTeacherRatio}%，英語C級${selectedSchool.englishNeedsImprovementRatio}%）。請問您想深入諮詢本校的哪一項精進策略？`
        : `您好！我是花蓮縣115學年度精進計畫「督學智慧智囊」。我深入掌握花蓮南北137.5公里、小校2/3、代理師資23%及會考英數迷思等在地脈絡。您可以針對「三項必辦重點」、「小校菜單制（A/B/C餐）」、「KIDMAP認知圖譜」或「行政減量作為」向我提問！`,
    },
  ]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const quickPrompts = selectedSchool
    ? [
        `請針對「${selectedSchool.name}」的英數待加強比率，提出 KIDMAP 迷思概念突破路徑`,
        `如何為「${selectedSchool.name}」的新任代理教師落實專-01-1陪伴社群與微整形教案？`,
        `評估「${selectedSchool.name}」參與小校生態圈哪一類餐別（A餐/B餐/C餐）最有效益？`,
        `針對「${selectedSchool.name}」非專長授課比率，如何配發健教背包滿載資源？`,
      ]
    : [
        '如何針對會考英語待加強 46.15% 的偏鄉小校實施四步迷思拆解？',
        '請說明「A餐小校跨校共力圈」如何解決 30 分鐘車程內教師專業孤立？',
        '面對代理教師高達 23% 的現況，「雙軌支持系統」如何避免研習碎片化？',
        '教育處如何落實「行政減量換取教學創新」以省下 40% 行政時間？',
      ];

  const handleSend = async (userPromptText?: string) => {
    const textToSend = userPromptText || prompt;
    if (!textToSend.trim() || loading) return;

    const newMessages = [...messages, { role: 'user' as const, text: textToSend }];
    setMessages(newMessages);
    setPrompt('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-advisory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          schoolName: selectedSchool ? selectedSchool.name : '花蓮縣公立國中小學',
          district: selectedSchool ? selectedSchool.district : '花蓮縣',
          prompt: textToSend,
          context: selectedSchool
            ? {
                scale: selectedSchool.scaleCategory,
                subRatio: selectedSchool.substituteTeacherRatio,
                engC: selectedSchool.englishNeedsImprovementRatio,
                mathC: selectedSchool.mathNeedsImprovementRatio,
                nonSpec: selectedSchool.nonSpecialistRatio,
                tier: selectedSchool.counsellingTier,
                menu: selectedSchool.collaborationMenu,
              }
            : undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setMessages([
          ...newMessages,
          { role: 'assistant', text: data.text, isFallback: data.isFallback },
        ]);
      } else {
        setMessages([
          ...newMessages,
          {
            role: 'assistant',
            text: `抱歉，系統處理時發生異常：${data.error || '無法取得回應'}。建議您參考「精準改善行動手冊」中的對策清單。`,
          },
        ]);
      }
    } catch (err: any) {
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          text: `網路連線異常，已切換至離線智能智庫：
針對花蓮縣115精進計畫，建議：
1. 緊扣「三項必辦重點」：專-01代理代課雙軌陪伴、專-05健教背包滿載、診-02 KIDMAP會考迷思四步轉化。
2. 小校優先評估異-02菜單制（A餐30分共力圈、B餐合班、C餐混齡），享受公文免紙本之行政減量！`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const copyText = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full flex flex-col h-[85vh] max-h-[750px] shadow-2xl border border-slate-200 overflow-hidden">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 text-slate-950 flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-sm sm:text-base">
                  花蓮縣115精進計畫・AI 督學智慧智囊
                </h3>
                {selectedSchool && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    已鎖定：{selectedSchool.name}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400">
                立足在地土壤挑戰 ｜ 專案對接與處方擬定
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-slate-50/60">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-2.5 ${
                msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-teal-600 text-white shadow-xs'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed relative group ${
                  msg.role === 'user'
                    ? 'bg-indigo-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 shadow-2xs rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {msg.role === 'assistant' && (
                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                    <span>
                      {msg.isFallback
                        ? '花蓮在地預載智庫建議'
                        : 'Gemini 3.8 Flash 智慧生成'}
                    </span>
                    <button
                      onClick={() => copyText(msg.text, idx)}
                      className="hover:text-slate-700 flex items-center space-x-1 cursor-pointer"
                    >
                      {copiedIndex === idx ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedIndex === idx ? '已複製' : '複製'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-2 text-slate-500 text-xs pl-9">
              <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
              <span>督學智囊正在結合 115 計畫子方案進行深度分析與處方產出...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="p-2.5 bg-white border-t border-slate-200 text-xs">
          <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-teal-600" />
            <span>精選推薦諮詢情境：</span>
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {quickPrompts.map((qp, i) => (
              <button
                key={i}
                onClick={() => handleSend(qp)}
                disabled={loading}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-teal-50 hover:text-teal-800 text-slate-600 border border-slate-200 text-[11px] whitespace-nowrap transition-colors cursor-pointer shrink-0 disabled:opacity-50"
              >
                {qp}
              </button>
            ))}
          </div>
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-slate-900 border-t border-slate-800 flex items-center space-x-2"
        >
          <input
            type="text"
            placeholder={
              selectedSchool
                ? `針對 ${selectedSchool.name} 詢問改善方案或子計畫對接...`
                : '請輸入您想諮詢的精進計畫議題或學校情境...'
            }
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            className="flex-1 bg-slate-800 border border-slate-700 text-white rounded-xl px-3.5 py-2 text-xs placeholder-slate-400 focus:outline-teal-500 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!prompt.trim() || loading}
            className="px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center space-x-1.5 shadow-md shadow-teal-700/20 disabled:opacity-50 transition-colors cursor-pointer"
          >
            {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>送出</span>
          </button>
        </form>
      </div>
    </div>
  );
};
