import React from 'react';
import { Sparkles, ArrowDown } from 'lucide-react';
import { PRESET_CHARACTERS, CharacterFormState } from '../data/characterData';

interface HeaderProps {
  onApplyPreset: (state: CharacterFormState) => void;
  onScrollToResult: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onApplyPreset, onScrollToResult }) => {
  return (
    <>
      {/* Top Bar Contract (3 zones) */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 md:gap-8">
          {/* Zone 1: Brand title wordmark */}
          <a
            href="#"
            className="flex items-center gap-2 text-base sm:text-lg font-black tracking-tight text-slate-900 whitespace-nowrap shrink-0 hover:text-teal-600 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <span>나만의 AI 캐릭터 만들기</span>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href="#section-gender" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">
              기본정보
            </a>
            <a href="#section-bodyType" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">
              체형/헤어
            </a>
            <a href="#section-expression" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">
              표정
            </a>
            <a href="#section-artStyle" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">
              그림스타일
            </a>
            <a href="#section-background" className="hover:text-teal-600 transition-colors whitespace-nowrap shrink-0">
              배경/용도
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onScrollToResult}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-teal-500 hover:bg-teal-600 active:scale-95 transition-all shadow-sm shadow-teal-500/20 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>프롬프트 보기</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-8 pb-6 px-4 sm:px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          <span>초등학생부터 성인까지 누구나 1분 완성!</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          나를 쏙 닮은 <span className="text-teal-600">AI 캐릭터 프롬프트</span> 생성기
        </h1>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          11가지 질문에 가볍게 답해보세요. 미드저니, DALL-E, 챗GPT 등 이미지 생성 AI에
          바로 넣을 수 있는 고품질 프롬프트를 자동으로 만들어 드려요!
        </p>

        {/* Quick Presets Bar */}
        <div className="mt-6 pt-5 border-t border-slate-200/60">
          <p className="text-xs font-bold text-slate-400 mb-2.5">
            ⚡ 한 번에 채우는 추천 프리셋:
          </p>
          <div className="flex items-center justify-center flex-wrap gap-2">
            {PRESET_CHARACTERS.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onApplyPreset(preset.state)}
                className="group flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white border border-slate-200/90 text-xs sm:text-sm font-bold text-slate-700 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50/50 shadow-xs hover:shadow-sm transition-all cursor-pointer active:scale-98"
              >
                <span>{preset.icon}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
