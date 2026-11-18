import React, { useState, useMemo } from 'react';
import {
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  PencilLine,
  Info,
  MessageCircleHeart,
  Shirt,
  Glasses,
  Headphones,
  Flower2,
  Briefcase,
  Ban,
  Shuffle,
} from 'lucide-react';
import {
  EmoticonFormState,
  EmoticonOutfitId,
  EmoticonPropId,
  EMOTICON_OPTIONS,
  EMOTICON_OUTFIT_OPTIONS,
  EMOTICON_PROP_OPTIONS,
  EMOTICON_BACKGROUND_OPTIONS,
  REQUIRED_EMOTICON_COUNT,
  createInitialPhrasesMap,
  pickRandomPropSlots,
} from '../data/emoticonData';
import { generateEmoticonPrompt } from '../utils/emoticonPromptGenerator';

interface EmoticonTabProps {
  state: EmoticonFormState;
  onChange: React.Dispatch<React.SetStateAction<EmoticonFormState>>;
  onReset: () => void;
}

const SLOT_LABELS = ['왼쪽 위', '오른쪽 위', '왼쪽 아래', '오른쪽 아래'];

function renderOutfitIcon(outfitId: EmoticonOutfitId) {
  switch (outfitId) {
    case '기존 옷 그대로':
      return <Sparkles className="w-7 h-7 text-teal-600" />;
    case '교복':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none" aria-hidden="true">
          <path
            d="M8 10L14 6H22L28 10L31 16L26 18V30H10V18L5 16L8 10Z"
            fill="#E0F2FE"
            stroke="#0284C7"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M14 6L18 14L22 6"
            fill="#FFFFFF"
            stroke="#0284C7"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M18 14V24" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
    case '운동복':
      return <Shirt className="w-7 h-7 text-sky-600" />;
    case '한복':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none" aria-hidden="true">
          <path
            d="M9 10L15 7H21L27 10L30 16L25 18V29H11V18L6 16L9 10Z"
            fill="#FCE7F3"
            stroke="#DB2777"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M14 7L19 14L22 7"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M19 14L23 22M19 14L17 24"
            stroke="#DB2777"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      );
    case '잠옷':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none" aria-hidden="true">
          <path
            d="M23 7C18.5 7.5 15 11.4 15 16C15 21 19 25 24 25C25.9 25 27.6 24.4 29 23.4C27.2 27.3 23.2 30 18.6 30C12.2 30 7 24.8 7 18.4C7 12.6 11.2 7.8 16.8 7C18.9 6.7 21 6.7 23 7Z"
            fill="#FEF3C7"
            stroke="#D97706"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="25" cy="12" r="2" fill="#F59E0B" />
        </svg>
      );
    case '직접 입력':
      return <PencilLine className="w-7 h-7 text-teal-600" />;
  }
}

function renderPropIcon(propId: EmoticonPropId) {
  switch (propId) {
    case '소품 없음':
      return <Ban className="w-7 h-7 text-slate-500" />;
    case '모자':
      return (
        <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none" aria-hidden="true">
          <path
            d="M8 21C8 14.5 12.5 10 18 10C23.5 10 28 14.5 28 21H8Z"
            fill="#CCFBF1"
            stroke="#0D9488"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M5 21H32C32 23.5 29.5 25 26 25H10C7 25 5 23.5 5 21Z"
            fill="#99F6E4"
            stroke="#0D9488"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <circle cx="18" cy="8.5" r="2" fill="#0D9488" />
        </svg>
      );
    case '안경':
      return <Glasses className="w-7 h-7 text-sky-600" />;
    case '헤드폰':
      return <Headphones className="w-7 h-7 text-indigo-600" />;
    case '꽃':
      return <Flower2 className="w-7 h-7 text-pink-500" />;
    case '가방':
      return <Briefcase className="w-7 h-7 text-amber-600" />;
    case '직접 입력':
      return <PencilLine className="w-7 h-7 text-teal-600" />;
  }
}

export const EmoticonTab: React.FC<EmoticonTabProps> = ({
  state,
  onChange,
  onReset,
}) => {
  const [maxWarning, setMaxWarning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const promptResult = useMemo(() => generateEmoticonPrompt(state), [state]);

  const handleToggleEmoticon = (emotionId: string) => {
    const isSelected = state.selectedEmoticons.includes(emotionId);

    if (isSelected) {
      setMaxWarning(false);
      onChange((prev) => ({
        ...prev,
        selectedEmoticons: prev.selectedEmoticons.filter((id) => id !== emotionId),
      }));
      return;
    }

    if (state.selectedEmoticons.length >= REQUIRED_EMOTICON_COUNT) {
      setMaxWarning(true);
      return;
    }

    setMaxWarning(false);
    onChange((prev) => {
      const existingPhrase = prev.phrasesByEmotion[emotionId];
      const option = EMOTICON_OPTIONS.find((item) => item.id === emotionId);
      const nextPhrase = existingPhrase || {
        mode: 'preset' as const,
        presetText: option?.recommendedPhrases[0] || emotionId,
        customText: '',
      };

      return {
        ...prev,
        selectedEmoticons: [...prev.selectedEmoticons, emotionId],
        phrasesByEmotion: {
          ...prev.phrasesByEmotion,
          [emotionId]: nextPhrase,
        },
      };
    });
  };

  const handleSelectPresetPhrase = (emotionId: string, phrase: string) => {
    onChange((prev) => {
      const current = prev.phrasesByEmotion[emotionId] || createInitialPhrasesMap()[emotionId];
      return {
        ...prev,
        phrasesByEmotion: {
          ...prev.phrasesByEmotion,
          [emotionId]: {
            ...current,
            mode: 'preset',
            presetText: phrase,
          },
        },
      };
    });
  };

  const handleSelectCustomPhraseMode = (emotionId: string) => {
    onChange((prev) => {
      const current = prev.phrasesByEmotion[emotionId] || createInitialPhrasesMap()[emotionId];
      return {
        ...prev,
        phrasesByEmotion: {
          ...prev.phrasesByEmotion,
          [emotionId]: {
            ...current,
            mode: 'custom',
          },
        },
      };
    });
  };

  const handleCustomPhraseInput = (emotionId: string, value: string) => {
    onChange((prev) => {
      const current = prev.phrasesByEmotion[emotionId] || createInitialPhrasesMap()[emotionId];
      return {
        ...prev,
        phrasesByEmotion: {
          ...prev.phrasesByEmotion,
          [emotionId]: {
            ...current,
            mode: 'custom',
            customText: value,
          },
        },
      };
    });
  };

  const handleSelectOutfit = (outfitId: EmoticonOutfitId) => {
    onChange((prev) => ({
      ...prev,
      outfit: outfitId,
    }));
  };

  const handleSelectProp = (propId: EmoticonPropId) => {
    onChange((prev) => {
      if (propId === '소품 없음') {
        return {
          ...prev,
          prop: '소품 없음',
        };
      }

      // Only roll a new random 2-slot placement when switching to a different prop option
      const nextSlots =
        prev.prop !== propId ? pickRandomPropSlots() : prev.propSlots;

      return {
        ...prev,
        prop: propId,
        propSlots: nextSlots,
      };
    });
  };

  const handleReshufflePropSlots = () => {
    onChange((prev) => ({
      ...prev,
      propSlots: pickRandomPropSlots(prev.propSlots),
    }));
  };

  const handleCopyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(promptResult.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = promptResult.prompt;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleResetClick = () => {
    setMaxWarning(false);
    onReset();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 2500);
  };

  // Display label for the currently selected prop in the Q4 preview
  const previewPropLabel =
    state.prop === '직접 입력'
      ? state.propCustom.trim() || '직접 입력 소품'
      : state.prop;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Friendly Guide Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex items-start sm:items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
          <Info className="w-5 h-5" />
        </div>
        <div className="text-xs sm:text-sm text-sky-950 leading-relaxed">
          <p className="font-extrabold">이모티콘 4종 세트 만드는 방법</p>
          <p className="text-sky-800">
            ① 감정·행동 4개 고르기 → ② 말 고르기 → ③ 옷 고르기 → ④ 소품 고르기 → ⑤ 배경 고르기 → 프롬프트를 복사해서{' '}
            <strong>내 캐릭터 그림과 함께</strong> ChatGPT나 Gemini에 올려 주세요!
          </p>
        </div>
      </div>

      {/* Q1. 어떤 이모티콘을 만들까요? */}
      <section
        id="section-emoticon-emotions"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-teal-100/80 text-teal-800 font-extrabold text-base shadow-xs">
              Q1
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                어떤 이모티콘을 만들까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                16가지 감정과 행동 중 원하는 4개를 골라 주세요. 고른 순서대로 1번~4번이 됩니다.
              </p>
            </div>
          </div>

          <span
            className={`self-start px-3.5 py-1.5 rounded-xl border text-xs sm:text-sm font-extrabold whitespace-nowrap shrink-0 tabular-nums ${
              state.selectedEmoticons.length === REQUIRED_EMOTICON_COUNT
                ? 'bg-teal-50 border-teal-300 text-teal-800'
                : 'bg-amber-50 border-amber-300 text-amber-900'
            }`}
          >
            {state.selectedEmoticons.length}/{REQUIRED_EMOTICON_COUNT}개 선택
          </span>
        </div>

        {/* Max 4 selection warning */}
        {maxWarning && (
          <div
            role="alert"
            className="mb-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center gap-3 text-amber-950 text-sm font-bold"
          >
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              이모티콘은 딱 4개까지만 고를 수 있어요! 다른 것을 고르려면 먼저 선택한 카드 하나를 다시 눌러 꺼 주세요.
            </span>
          </div>
        )}

        {/* 16 Emoticon Cards Grid (Mobile 2 cols, Desktop 4 cols) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {EMOTICON_OPTIONS.map((option) => {
            const selectedIndex = state.selectedEmoticons.indexOf(option.id);
            const isSelected = selectedIndex !== -1;
            const imgSrc = `${basePath}/${option.image.replace(/^\//, '')}`;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleToggleEmoticon(option.id)}
                className={`group relative flex flex-col items-center justify-between p-3 sm:p-4 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 ${
                  isSelected
                    ? 'bg-teal-50/85 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
                    : 'bg-white border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 shadow-xs'
                }`}
                aria-pressed={isSelected}
              >
                {/* Top Card Header Row */}
                <div className="w-full flex items-center justify-between mb-2 min-h-[26px]">
                  {isSelected ? (
                    <span className="px-2.5 py-0.5 rounded-lg bg-teal-500 text-white text-xs font-black shadow-xs">
                      {selectedIndex + 1}번
                    </span>
                  ) : (
                    <span className="text-xs font-medium text-slate-400">선택</span>
                  )}

                  <span
                    className={`flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-colors ${
                      isSelected
                        ? 'bg-teal-500 border-teal-500 text-white shadow-xs'
                        : 'bg-white border-slate-300 text-transparent'
                    }`}
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                {/* Clean 1:1 Image Container */}
                <div className="w-full aspect-square rounded-xl overflow-hidden bg-white border border-slate-100 mb-3 flex items-center justify-center">
                  <img
                    src={imgSrc}
                    alt={option.name}
                    className="w-full h-full object-contain pointer-events-none select-none"
                    loading="lazy"
                  />
                </div>

                {/* Emotion Name */}
                <span
                  className={`text-base sm:text-lg font-extrabold tracking-tight text-center ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Q2. 이모티콘에 어떤 말을 넣을까요? */}
      <section
        id="section-emoticon-phrases"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-sky-100 text-sky-800 font-extrabold text-base shadow-xs">
              Q2
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                이모티콘에 어떤 말을 넣을까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Q1에서 고른 이모티콘마다 어울리는 말을 하나씩 골라 보세요. 직접 쓸 수도 있어요.
              </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-extrabold whitespace-nowrap shrink-0">
            이모티콘마다 1개 선택
          </span>
        </div>

        {state.selectedEmoticons.length < REQUIRED_EMOTICON_COUNT && (
          <div className="mb-5 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-bold flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              Q1에서 아직 {state.selectedEmoticons.length}개만 선택했어요. {REQUIRED_EMOTICON_COUNT - state.selectedEmoticons.length}개를 더 고르면 4개 모두 여기에 나타나요!
            </span>
          </div>
        )}

        {state.selectedEmoticons.length === 0 ? (
          <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center text-slate-500 font-semibold text-sm sm:text-base">
            위 Q1에서 만들고 싶은 이모티콘 4개를 먼저 골라 주세요!
          </div>
        ) : (
          <div className="space-y-4">
            {state.selectedEmoticons.map((emotionId, idx) => {
              const option = EMOTICON_OPTIONS.find((item) => item.id === emotionId);
              if (!option) return null;

              const phraseSelection = state.phrasesByEmotion[emotionId] || {
                mode: 'preset' as const,
                presetText: option.recommendedPhrases[0],
                customText: '',
              };
              const isCustomMode = phraseSelection.mode === 'custom';
              const imgSrc = `${basePath}/${option.image.replace(/^\//, '')}`;

              return (
                <div
                  key={emotionId}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/90"
                >
                  <div className="flex items-center gap-3.5 mb-3.5">
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-white border border-slate-200 shrink-0">
                      <img
                        src={imgSrc}
                        alt={option.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-teal-500 text-white text-xs font-black">
                          {idx + 1}번
                        </span>
                        <span className="text-xs font-bold text-slate-500">
                          ({SLOT_LABELS[idx] || `${idx + 1}번 칸`})
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-slate-900 mt-1">
                        {option.name}
                      </h3>
                    </div>
                  </div>

                  {/* 4 Recommended Phrases + 직접 입력 */}
                  <div className="flex flex-wrap gap-2.5">
                    {option.recommendedPhrases.map((phrase) => {
                      const isPhraseSelected =
                        !isCustomMode && phraseSelection.presetText === phrase;
                      return (
                        <button
                          key={phrase}
                          type="button"
                          onClick={() => handleSelectPresetPhrase(emotionId, phrase)}
                          className={`flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[46px] ${
                            isPhraseSelected
                              ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                              : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-teal-300 hover:text-slate-900'
                          }`}
                          aria-pressed={isPhraseSelected}
                        >
                          <MessageCircleHeart className="w-4 h-4 shrink-0 opacity-85" />
                          <span>{phrase}</span>
                          {isPhraseSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => handleSelectCustomPhraseMode(emotionId)}
                      className={`flex items-center gap-2 px-4 py-2.5 sm:py-3 rounded-xl text-sm sm:text-base font-bold transition-all cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[46px] ${
                        isCustomMode
                          ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20'
                          : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-teal-300 hover:text-slate-900'
                      }`}
                      aria-pressed={isCustomMode}
                    >
                      <PencilLine className="w-4 h-4 shrink-0" />
                      <span>직접 입력</span>
                      {isCustomMode && <Check className="w-4 h-4 stroke-[3]" />}
                    </button>
                  </div>

                  {/* Independent Custom Phrase Input */}
                  {isCustomMode && (
                    <div className="mt-3 p-3.5 sm:p-4 rounded-xl bg-teal-50/70 border border-teal-200">
                      <label
                        htmlFor={`emoticon-custom-${emotionId}`}
                        className="block text-xs sm:text-sm font-bold text-teal-900 mb-1.5"
                      >
                        {idx + 1}번 이모티콘({option.name})에 넣을 말을 입력해 주세요:
                      </label>
                      <input
                        id={`emoticon-custom-${emotionId}`}
                        type="text"
                        value={phraseSelection.customText}
                        onChange={(e) => handleCustomPhraseInput(emotionId, e.target.value)}
                        placeholder={`예: ${option.recommendedPhrases[0]}`}
                        className="w-full px-4 py-2.5 rounded-xl border-2 border-teal-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base font-bold"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Q3. 캐릭터에게 어떤 옷을 입힐까요? */}
      <section
        id="section-emoticon-outfit"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-teal-100/80 text-teal-800 font-extrabold text-base shadow-xs">
              Q3
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                캐릭터에게 어떤 옷을 입힐까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                고른 옷이 4개 이모티콘에 똑같이 적용돼요. 얼굴과 머리 모양, 그림 스타일은 그대로 유지됩니다.
              </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold whitespace-nowrap shrink-0">
            하나만 골라요 (단일 선택)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {EMOTICON_OUTFIT_OPTIONS.map((option) => {
            const isSelected = state.outfit === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectOutfit(option.id)}
                className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[136px] ${
                  isSelected
                    ? 'bg-teal-50/85 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
                    : 'bg-white border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 shadow-xs'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white shadow-sm ring-2 ring-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border ${
                    isSelected
                      ? 'bg-white border-teal-200 shadow-xs'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  {renderOutfitIcon(option.id)}
                </div>

                <span
                  className={`text-base sm:text-lg font-extrabold text-center ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
                <span className="mt-1 text-xs sm:text-sm text-slate-500 text-center leading-snug">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>

        {state.outfit === '직접 입력' && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200">
            <label
              htmlFor="emoticon-outfit-custom"
              className="block text-sm font-extrabold text-teal-900 mb-2"
            >
              입히고 싶은 옷을 직접 입력해 주세요:
            </label>
            <input
              id="emoticon-outfit-custom"
              type="text"
              value={state.outfitCustom}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  outfitCustom: e.target.value,
                }))
              }
              placeholder="예: 우주복, 축구 유니폼, 겨울 코트"
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base font-bold"
            />
          </div>
        )}
      </section>

      {/* Q4. 어떤 소품을 추가할까요? */}
      <section
        id="section-emoticon-prop"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-sky-100 text-sky-800 font-extrabold text-base shadow-xs">
              Q4
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                어떤 소품을 추가할까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                소품을 고르면 4개 캐릭터 중 무작위 2개에게만 적용되고, 나머지 2개에는 들어가지 않아요.
              </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-extrabold whitespace-nowrap shrink-0">
            하나만 골라요 (단일 선택)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {EMOTICON_PROP_OPTIONS.map((option) => {
            const isSelected = state.prop === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectProp(option.id)}
                className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[132px] ${
                  isSelected
                    ? 'bg-teal-50/85 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
                    : 'bg-white border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 shadow-xs'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white shadow-sm ring-2 ring-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}

                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-3 border ${
                    isSelected
                      ? 'bg-white border-teal-200 shadow-xs'
                      : 'bg-slate-50 border-slate-200/80'
                  }`}
                >
                  {renderPropIcon(option.id)}
                </div>

                <span
                  className={`text-base sm:text-lg font-extrabold text-center ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
                <span className="mt-1 text-xs sm:text-sm text-slate-500 text-center leading-snug">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>

        {state.prop === '직접 입력' && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200">
            <label
              htmlFor="emoticon-prop-custom"
              className="block text-sm font-extrabold text-teal-900 mb-2"
            >
              추가하고 싶은 소품을 직접 입력해 주세요:
            </label>
            <input
              id="emoticon-prop-custom"
              type="text"
              value={state.propCustom}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  propCustom: e.target.value,
                }))
              }
              placeholder="예: 인형, 우산, 풍선"
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base font-bold"
            />
          </div>
        )}

        {/* 2x2 Prop Placement Preview + Reshuffle Button (hidden when 소품 없음) */}
        {state.prop !== '소품 없음' && (
          <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-sky-50/60 border border-sky-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  소품이 들어가는 위치 미리보기
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  4개 중 2개 칸에만{' '}
                  <strong className="text-teal-700">{previewPropLabel}</strong>
                  {' '}소품이 들어가요. 위치를 바꾸고 싶으면 다시 섞어 보세요!
                </p>
              </div>

              <button
                type="button"
                onClick={handleReshufflePropSlots}
                className="self-start sm:self-auto flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border-2 border-teal-500 text-teal-700 hover:bg-teal-500 hover:text-white font-extrabold text-sm transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[44px] shadow-xs"
              >
                <Shuffle className="w-4 h-4 shrink-0" />
                <span>소품 배치 다시 섞기</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
              {[1, 2, 3, 4].map((slotNumber) => {
                const isPropApplied = state.propSlots.includes(slotNumber);
                const emotionId = state.selectedEmoticons[slotNumber - 1];
                return (
                  <div
                    key={slotNumber}
                    className={`p-3 sm:p-4 rounded-xl border-2 flex items-center justify-between gap-2 transition-colors ${
                      isPropApplied
                        ? 'bg-teal-50 border-teal-500 text-teal-950'
                        : 'bg-white border-slate-200 text-slate-500'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`px-2 py-0.5 rounded-lg text-xs font-black shrink-0 ${
                          isPropApplied
                            ? 'bg-teal-500 text-white'
                            : 'bg-slate-200 text-slate-600'
                        }`}
                      >
                        {slotNumber}번
                      </span>
                      <span className="text-xs sm:text-sm font-bold truncate">
                        {emotionId || SLOT_LABELS[slotNumber - 1]}
                      </span>
                    </div>

                    {isPropApplied ? (
                      <span className="flex items-center gap-1 text-xs sm:text-sm font-extrabold text-teal-700 shrink-0">
                        <Check className="w-4 h-4 stroke-[3] shrink-0" />
                        <span>{previewPropLabel} 있음</span>
                      </span>
                    ) : (
                      <span className="text-xs sm:text-sm font-bold text-slate-400 shrink-0">
                        없음
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Q5. 이모티콘 배경은 어떻게 할까요? */}
      <section
        id="section-emoticon-bg"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-teal-100/80 text-teal-800 font-extrabold text-base shadow-xs">
              Q5
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                이모티콘 배경은 어떻게 할까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                고른 배경이 4개 이모티콘에 똑같이 적용됩니다. 원하는 배경을 직접 적을 수도 있어요.
              </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold whitespace-nowrap shrink-0">
            하나만 골라요 (단일 선택)
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {EMOTICON_BACKGROUND_OPTIONS.map((option) => {
            const isSelected = state.background === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  onChange((prev) => ({ ...prev, background: option.id }))
                }
                className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 ${
                  isSelected
                    ? 'bg-teal-50/85 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
                    : 'bg-white border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 shadow-xs'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute top-3 right-3 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white shadow-sm ring-2 ring-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}

                {/* Visual Background Swatch */}
                <div className="mb-3">
                  {option.id === '투명 배경' && (
                    <div
                      className="w-16 h-16 rounded-2xl border-2 border-slate-200 shadow-inner"
                      style={{
                        backgroundImage:
                          'linear-gradient(45deg, #e2e8f0 25%, transparent 25%), linear-gradient(-45deg, #e2e8f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e2e8f0 75%), linear-gradient(-45deg, transparent 75%, #e2e8f0 75%)',
                        backgroundSize: '16px 16px',
                        backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                        backgroundColor: '#ffffff',
                      }}
                    />
                  )}
                  {option.id === '흰색 배경' && (
                    <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-200 shadow-inner" />
                  )}
                  {option.id === '파스텔 배경' && (
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-100 via-sky-100 to-pink-100 border-2 border-slate-200 shadow-inner" />
                  )}
                  {option.id === '직접 입력' && (
                    <div className="w-16 h-16 rounded-2xl bg-sky-50 border-2 border-sky-200 flex items-center justify-center shadow-inner">
                      <PencilLine className="w-7 h-7 text-teal-600" />
                    </div>
                  )}
                </div>

                <span
                  className={`text-base sm:text-lg font-extrabold text-center ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
                <span className="mt-1 text-xs sm:text-sm text-slate-500 text-center leading-snug">
                  {option.description}
                </span>
              </button>
            );
          })}
        </div>

        {state.background === '직접 입력' && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-teal-50/70 border border-teal-200">
            <label
              htmlFor="emoticon-bg-custom"
              className="block text-sm font-extrabold text-teal-900 mb-2"
            >
              원하는 배경을 직접 입력해 주세요:
            </label>
            <input
              id="emoticon-bg-custom"
              type="text"
              value={state.backgroundCustom}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  backgroundCustom: e.target.value,
                }))
              }
              placeholder="예: 학교 교실, 바닷가, 우주"
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base font-bold"
            />
          </div>
        )}
      </section>

      {/* Result & Copy Section */}
      <section
        id="emoticon-result-section"
        className="scroll-mt-24 mt-10 rounded-3xl bg-gradient-to-b from-white to-teal-50/40 border-2 border-teal-300 shadow-xl shadow-teal-500/5 p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500 text-white shadow-md shadow-teal-500/25 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                나의 이모티콘 프롬프트
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                선택한 4개 이모티콘과 문구, 옷, 소품, 배경이 모두 반영되었습니다.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleResetClick}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-sm sm:text-base font-bold text-slate-700 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>선택 초기화</span>
            </button>

            <button
              type="button"
              onClick={handleCopyPrompt}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl font-black text-sm sm:text-base transition-all duration-150 cursor-pointer shadow-md whitespace-nowrap ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/25'
                  : 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/25 active:scale-95'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 stroke-[3]" />
                  <span>복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>프롬프트 복사하기</span>
                </>
              )}
            </button>
          </div>
        </div>

        {resetNotice && (
          <div className="mt-4 p-3.5 rounded-2xl bg-sky-50 border border-sky-300 text-sky-900 text-sm font-bold flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-sky-600 shrink-0" />
            <span>이모티콘 만들기 선택이 기본 추천 조합으로 초기화되었어요!</span>
          </div>
        )}

        {/* Warnings */}
        {promptResult.warnings.length > 0 && (
          <div className="mt-4 space-y-2">
            {promptResult.warnings.map((warning, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-semibold"
              >
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>{warning}</span>
              </div>
            ))}
          </div>
        )}

        {/* 2x2 Layout Preview Summary */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-3 text-xs sm:text-sm">
            <span className="font-extrabold text-slate-700">2×2 이모티콘 배치 미리보기</span>
            <div className="flex items-center flex-wrap gap-x-3 gap-y-1 text-slate-600 font-bold">
              <span>옷: <strong className="text-teal-800">{promptResult.resolvedOutfit}</strong></span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>
                소품:{' '}
                <strong className="text-teal-800">
                  {promptResult.resolvedProp && promptResult.appliedSlots
                    ? `${promptResult.resolvedProp} (${promptResult.appliedSlots[0]}번, ${promptResult.appliedSlots[1]}번)`
                    : '없음'}
                </strong>
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>배경: <strong className="text-teal-800">{promptResult.resolvedBackground}</strong></span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[0, 1, 2, 3].map((slotIdx) => {
              const item = promptResult.items[slotIdx];
              return (
                <div
                  key={slotIdx}
                  className="p-3 rounded-xl bg-white border border-slate-200/90 flex items-center justify-between gap-2 text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="px-2 py-0.5 rounded-md bg-teal-500 text-white font-black text-xs shrink-0">
                      {slotIdx + 1}번
                    </span>
                    <span className="text-slate-500 font-semibold shrink-0">
                      ({SLOT_LABELS[slotIdx]})
                    </span>
                    <span className="font-extrabold text-slate-900 truncate">
                      {item ? item.emotionName : '미선택'}
                    </span>
                    {item?.hasProp && promptResult.resolvedProp && (
                      <span className="text-xs font-bold text-sky-700 shrink-0">
                        · {promptResult.resolvedProp}
                      </span>
                    )}
                  </div>
                  <span className="font-extrabold text-teal-700 shrink-0">
                    {item ? `"${item.phrase}"` : '—'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Generated Prompt Textarea/Box */}
        <div className="mt-5 relative">
          <div className="w-full min-h-[180px] p-5 sm:p-6 rounded-2xl bg-white border-2 border-teal-200 shadow-inner text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line select-text">
            {promptResult.prompt}
          </div>

          {copied && (
            <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-teal-700 z-10">
              <CheckCircle2 className="w-10 h-10 mb-1.5 text-teal-500 stroke-[2.5]" />
              <p className="text-base sm:text-lg font-extrabold text-slate-900">
                이모티콘 프롬프트가 복사되었어요!
              </p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 text-center px-4">
                프롬프트를 복사한 뒤 ChatGPT 또는 Gemini에 내가 만든 캐릭터 이미지를 첨부하고 붙여 넣어 보세요!
              </p>
            </div>
          )}
        </div>

        {/* Usage Instructions */}
        <div className="mt-5 p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 text-xs sm:text-sm text-sky-950 space-y-1.5 leading-relaxed">
          <p className="font-bold">
            프롬프트를 복사한 뒤 ChatGPT 또는 Gemini에 내가 만든 캐릭터 이미지를 첨부하고 붙여 넣어 보세요!
          </p>
          <p className="text-sky-800">
            💡 팁: 4개가 완성된 뒤 마음에 드는 하나만 크게 받고 싶다면{' '}
            <strong>&ldquo;1번 이모티콘만 따로 만들어줘.&rdquo;</strong>라고 이어서 말하면 됩니다.
          </p>
        </div>

        {/* Mobile Full-Width Copy Button */}
        <button
          type="button"
          onClick={handleCopyPrompt}
          className="mt-4 sm:hidden w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white font-black text-base shadow-md cursor-pointer"
        >
          <Copy className="w-5 h-5" />
          <span>{copied ? '복사 완료!' : '프롬프트 복사하기'}</span>
        </button>
      </section>
    </div>
  );
};
