import React from 'react';
import { Sparkles, ArrowDown, UserRound, Cake, SmilePlus } from 'lucide-react';
import { PRESET_CHARACTERS, CharacterFormState } from '../data/characterData';

export type MainTabId = 'character' | 'birthday' | 'emoticon';

interface HeaderProps {
  activeTab: MainTabId;
  onChangeTab: (tab: MainTabId) => void;
  onApplyPreset: (state: CharacterFormState) => void;
  onScrollToResult: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onChangeTab,
  onApplyPreset,
  onScrollToResult,
}) => {
  const subNavLinkClass =
    'inline-flex items-center px-3 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-teal-700 hover:bg-white border border-transparent hover:border-teal-200 transition-colors whitespace-nowrap shrink-0 min-h-[40px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400';

  return (
    <>
      {/* 1. 사이트 제목 및 소개 문구 */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between gap-4">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group flex items-center gap-3 min-w-0"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-500 text-white flex items-center justify-center shadow-sm shrink-0">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-xl font-black tracking-tight text-slate-900 group-hover:text-teal-600 transition-colors truncate">
                나의 AI 캐릭터 스튜디오
              </div>
              <p className="text-xs sm:text-sm font-medium text-slate-500 truncate">
                나만의 캐릭터로 다양한 작품을 만들어요!
              </p>
            </div>
          </a>
        </div>
      </header>

      {/* 2. 3개의 큰 탭 메뉴 (세부 질문 메뉴 위쪽 배치) */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <div
            role="tablist"
            aria-label="기능 선택 탭"
            className="grid grid-cols-1 md:grid-cols-3 gap-2.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200/80"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'character'}
              onClick={() => onChangeTab('character')}
              className={`flex items-center justify-center gap-2 px-3.5 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-extrabold transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[48px] ${
                activeTab === 'character'
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white/75 text-slate-700 hover:bg-white hover:text-teal-700'
              }`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-black shrink-0 ${
                  activeTab === 'character'
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                1
              </span>
              <UserRound className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="truncate">나를 닮은 캐릭터 만들기</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'birthday'}
              onClick={() => onChangeTab('birthday')}
              className={`flex items-center justify-center gap-2 px-3.5 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-extrabold transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[48px] ${
                activeTab === 'birthday'
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white/75 text-slate-700 hover:bg-white hover:text-teal-700'
              }`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-black shrink-0 ${
                  activeTab === 'birthday'
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                2
              </span>
              <Cake className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="truncate">나의 캐릭터로 생일 카드 만들기</span>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'emoticon'}
              onClick={() => onChangeTab('emoticon')}
              className={`flex items-center justify-center gap-2 px-3.5 py-3 sm:py-3.5 rounded-xl text-sm sm:text-base font-extrabold transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[48px] ${
                activeTab === 'emoticon'
                  ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                  : 'bg-white/75 text-slate-700 hover:bg-white hover:text-teal-700'
              }`}
            >
              <span
                className={`flex items-center justify-center w-6 h-6 rounded-full text-xs font-black shrink-0 ${
                  activeTab === 'emoticon'
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                3
              </span>
              <SmilePlus className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
              <span className="truncate">나의 캐릭터로 이모티콘 만들기</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. 현재 선택한 탭의 세부 질문 메뉴 + 프롬프트 보기 버튼 */}
      <div className="bg-slate-50/90 border-b border-slate-200/80 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-4">
          <nav
            aria-label="세부 질문 바로가기"
            className="flex flex-wrap items-center gap-1 sm:gap-1.5"
          >
            {activeTab === 'character' && (
              <>
                <a href="#section-gender" className={subNavLinkClass}>
                  기본정보
                </a>
                <a href="#section-bodyType" className={subNavLinkClass}>
                  체형/헤어
                </a>
                <a href="#section-expression" className={subNavLinkClass}>
                  표정
                </a>
                <a href="#section-artStyle" className={subNavLinkClass}>
                  그림스타일
                </a>
                <a href="#section-background" className={subNavLinkClass}>
                  배경/용도
                </a>
              </>
            )}
            {activeTab === 'birthday' && (
              <>
                <a href="#section-recipient" className={subNavLinkClass}>
                  축하 대상
                </a>
                <a href="#section-decorations" className={subNavLinkClass}>
                  카드 꾸미기
                </a>
                <a href="#section-mood" className={subNavLinkClass}>
                  분위기
                </a>
                <a href="#section-cardColor" className={subNavLinkClass}>
                  카드 색상
                </a>
              </>
            )}
            {activeTab === 'emoticon' && (
              <>
                <a href="#section-emoticon-emotions" className={subNavLinkClass}>
                  감정·행동
                </a>
                <a href="#section-emoticon-phrases" className={subNavLinkClass}>
                  말 넣기
                </a>
                <a href="#section-emoticon-outfit" className={subNavLinkClass}>
                  옷 입히기
                </a>
                <a href="#section-emoticon-prop" className={subNavLinkClass}>
                  소품 추가
                </a>
                <a href="#section-emoticon-bg" className={subNavLinkClass}>
                  배경
                </a>
              </>
            )}
          </nav>

          <button
            type="button"
            onClick={onScrollToResult}
            className="self-end sm:self-auto flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold text-white bg-teal-500 hover:bg-teal-600 active:scale-95 transition-all shadow-sm shadow-teal-500/20 whitespace-nowrap shrink-0 cursor-pointer min-h-[40px]"
          >
            <span>프롬프트 보기</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      {activeTab === 'character' && (
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
      )}

      {activeTab === 'birthday' && (
        <section className="pt-8 pb-6 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-bold mb-4">
            <Cake className="w-3.5 h-3.5 text-sky-500" />
            <span>내 캐릭터 그림으로 세상에 하나뿐인 축하 카드 만들기</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            나의 캐릭터로 <span className="text-teal-600">생일 카드 만들기</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            내가 만든 캐릭터로 특별한 생일 축하 카드를 만들어 봐요!
          </p>
        </section>
      )}

      {activeTab === 'emoticon' && (
        <section className="pt-8 pb-6 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200/80 text-teal-800 text-xs font-bold mb-4">
            <SmilePlus className="w-3.5 h-3.5 text-teal-500" />
            <span>내 캐릭터로 4가지 귀여운 이모티콘 만들기</span>
          </div>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            나의 캐릭터로 <span className="text-teal-600">이모티콘 만들기</span>
          </h1>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            내가 만든 캐릭터의 모습을 그대로 유지하면서, 4가지 감정과 말풍선이 담긴 이모티콘 세트를 만들어 봐요!
          </p>
        </section>
      )}
    </>
  );
};
