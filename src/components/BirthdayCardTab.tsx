import React, { useState, useMemo } from 'react';
import {
  Check,
  Copy,
  RotateCcw,
  Sparkles,
  MessageSquareHeart,
  AlertCircle,
  CheckCircle2,
  Wand2,
  Info,
} from 'lucide-react';
import {
  BirthdayCardFormState,
  RECIPIENT_OPTIONS,
  DECORATION_OPTIONS,
  MOOD_OPTIONS,
  CARD_COLOR_OPTIONS,
  MAX_DECORATIONS,
  getDefaultMessageForRecipient,
} from '../data/birthdayCardData';
import { generateBirthdayCardPrompt } from '../utils/birthdayPromptGenerator';
import { BirthdayCardArtwork } from './BirthdayCardArtwork';

interface BirthdayCardTabProps {
  state: BirthdayCardFormState;
  onChange: React.Dispatch<React.SetStateAction<BirthdayCardFormState>>;
  onReset: () => void;
}

export const BirthdayCardTab: React.FC<BirthdayCardTabProps> = ({
  state,
  onChange,
  onReset,
}) => {
  const [maxDecoWarning, setMaxDecoWarning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedNotice, setGeneratedNotice] = useState(false);
  const [resetNotice, setResetNotice] = useState(false);

  const promptResult = useMemo(() => generateBirthdayCardPrompt(state), [state]);

  const currentDecoCount =
    state.decorations.length + (state.decorationCustomSelected ? 1 : 0);

  // Q1: Recipient Selection with smart message handling
  const handleSelectRecipient = (recipientId: string) => {
    const newDefault = getDefaultMessageForRecipient(recipientId);
    const prevDefault = getDefaultMessageForRecipient(state.recipient);

    onChange((prev) => {
      const currentMsgTrimmed = prev.greetingMessage.trim();
      const shouldAutoReplace =
        !prev.isGreetingEdited ||
        currentMsgTrimmed === '' ||
        currentMsgTrimmed === prevDefault;

      if (shouldAutoReplace) {
        return {
          ...prev,
          recipient: recipientId,
          greetingMessage: newDefault,
          isGreetingEdited: false,
          pendingDefaultMessage: null,
        };
      }

      // User manually customized message: preserve user's text and offer 1-click update
      return {
        ...prev,
        recipient: recipientId,
        pendingDefaultMessage:
          currentMsgTrimmed !== newDefault ? newDefault : null,
      };
    });
  };

  const handleGreetingChange = (value: string) => {
    const selectedDefault = getDefaultMessageForRecipient(state.recipient);
    onChange((prev) => ({
      ...prev,
      greetingMessage: value,
      isGreetingEdited: value.trim() !== '' && value !== selectedDefault,
      pendingDefaultMessage: null,
    }));
  };

  const handleApplyPendingDefault = () => {
    const targetDefault =
      state.pendingDefaultMessage || getDefaultMessageForRecipient(state.recipient);
    onChange((prev) => ({
      ...prev,
      greetingMessage: targetDefault,
      isGreetingEdited: false,
      pendingDefaultMessage: null,
    }));
  };

  const handleKeepCustomGreeting = () => {
    onChange((prev) => ({
      ...prev,
      pendingDefaultMessage: null,
    }));
  };

  // Q2: Multi-select Decorations (max 3 including custom input)
  const handleToggleDecoration = (decoId: string) => {
    if (decoId === '직접 입력') {
      if (state.decorationCustomSelected) {
        setMaxDecoWarning(false);
        onChange((prev) => ({
          ...prev,
          decorationCustomSelected: false,
        }));
      } else {
        if (currentDecoCount >= MAX_DECORATIONS) {
          setMaxDecoWarning(true);
          return;
        }
        setMaxDecoWarning(false);
        onChange((prev) => ({
          ...prev,
          decorationCustomSelected: true,
        }));
      }
      return;
    }

    const isAlreadySelected = state.decorations.includes(decoId);
    if (isAlreadySelected) {
      setMaxDecoWarning(false);
      onChange((prev) => ({
        ...prev,
        decorations: prev.decorations.filter((item) => item !== decoId),
      }));
    } else {
      if (currentDecoCount >= MAX_DECORATIONS) {
        setMaxDecoWarning(true);
        return;
      }
      setMaxDecoWarning(false);
      onChange((prev) => ({
        ...prev,
        decorations: [...prev.decorations, decoId],
      }));
    }
  };

  const handleGeneratePromptClick = () => {
    setGeneratedNotice(true);
    setTimeout(() => setGeneratedNotice(false), 2500);
    const el = document.getElementById('birthday-prompt-output');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
    setMaxDecoWarning(false);
    setGeneratedNotice(false);
    onReset();
    setResetNotice(true);
    setTimeout(() => setResetNotice(false), 2500);
  };

  const currentRecipientDefault = getDefaultMessageForRecipient(state.recipient);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Friendly Step Guide Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-xs sm:text-sm text-sky-950 leading-relaxed">
            <p className="font-extrabold">생일 카드 만드는 방법</p>
            <p className="text-sky-800">
              4가지 질문에 답한 뒤 프롬프트를 복사해서, <strong>내 캐릭터 그림과 함께</strong> 챗GPT나 제미나이에 올려 주세요!
            </p>
          </div>
        </div>
      </div>

      {/* Q1. 누구의 생일을 축하할까요? (단일 선택) */}
      <section
        id="section-recipient"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-teal-100/80 text-teal-800 font-extrabold text-base shadow-xs">
              Q1
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                누구의 생일을 축하할까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                생일 카드를 선물하고 싶은 사람을 골라 주세요.
              </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold whitespace-nowrap shrink-0">
            하나만 골라요 (단일 선택)
          </span>
        </div>

        {/* Recipient Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {RECIPIENT_OPTIONS.map((option) => {
            const isSelected = state.recipient === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectRecipient(option.id)}
                className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[140px] ${
                  isSelected
                    ? 'bg-teal-50/80 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
                    : 'bg-white border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 shadow-xs'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white shadow-sm ring-2 ring-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
                <div className="w-full mb-3 transition-transform group-hover:scale-[1.02]">
                  <BirthdayCardArtwork
                    artKey={option.artKey}
                    image={option.image}
                    alt={option.name}
                    isSelected={isSelected}
                  />
                </div>
                <span
                  className={`text-base sm:text-lg font-extrabold tracking-tight ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
                {option.description && (
                  <span className="mt-1 text-xs text-slate-500 text-center">
                    {option.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Recipient Input (only when 직접 입력 is selected) */}
        {state.recipient === '직접 입력' && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200">
            <label
              htmlFor="birthday-recipient-custom"
              className="block text-sm font-bold text-teal-900 mb-2"
            >
              축하할 사람을 직접 입력해 주세요:
            </label>
            <input
              id="birthday-recipient-custom"
              type="text"
              value={state.recipientCustom}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, recipientCustom: e.target.value }))
              }
              placeholder="예: 동생, 언니, 오빠, 이모, 같은 반 친구 민수"
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base font-bold"
            />
          </div>
        )}

        {/* Editable Greeting Message Box */}
        <div className="mt-6 p-5 rounded-2xl bg-sky-50/60 border-2 border-sky-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2.5">
            <label
              htmlFor="birthday-greeting-message"
              className="flex items-center gap-2 text-sm sm:text-base font-extrabold text-slate-900"
            >
              <MessageSquareHeart className="w-5 h-5 text-teal-600 shrink-0" />
              <span>카드에 들어갈 축하 문구 (직접 고칠 수 있어요)</span>
            </label>

            {state.greetingMessage !== currentRecipientDefault && (
              <button
                type="button"
                onClick={() =>
                  onChange((prev) => ({
                    ...prev,
                    greetingMessage: currentRecipientDefault,
                    isGreetingEdited: false,
                    pendingDefaultMessage: null,
                  }))
                }
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl bg-white border border-sky-300 text-xs font-bold text-sky-800 hover:bg-sky-100 transition-colors cursor-pointer"
              >
                기본 문구로 되돌리기
              </button>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 mb-3">
            여기 적힌 문구만 카드에 들어가요. 이름을 넣고 싶으면 직접 고쳐 보세요! (예: 민정아, 생일 축하해!)
          </p>

          <input
            id="birthday-greeting-message"
            type="text"
            value={state.greetingMessage}
            onChange={(e) => handleGreetingChange(e.target.value)}
            placeholder="카드에 쓸 축하 문구를 입력해 주세요"
            className="w-full px-4 py-3.5 rounded-xl border-2 border-sky-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base sm:text-lg font-extrabold shadow-xs"
          />

          {/* Smart Confirmation Banner when recipient changed after user edited message */}
          {state.pendingDefaultMessage && (
            <div className="mt-3 p-4 rounded-xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="text-xs sm:text-sm text-amber-950 font-semibold leading-relaxed">
                직접 고친 문구가 있어요. 새로 고른 대상의 기본 문구{' '}
                <strong className="text-amber-900 underline decoration-amber-400">
                  &ldquo;{state.pendingDefaultMessage}&rdquo;
                </strong>
                로 바꿀까요?
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleApplyPendingDefault}
                  className="px-3.5 py-2 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-xs sm:text-sm font-extrabold transition-colors cursor-pointer"
                >
                  기본 문구로 바꾸기
                </button>
                <button
                  type="button"
                  onClick={handleKeepCustomGreeting}
                  className="px-3.5 py-2 rounded-xl bg-white border border-amber-300 text-amber-900 hover:bg-amber-100 text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                >
                  내 문구 그대로 두기
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Q2. 생일 카드를 무엇으로 꾸밀까요? (복수 선택, 최대 3개) */}
      <section
        id="section-decorations"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-sky-100 text-sky-800 font-extrabold text-base shadow-xs">
              Q2
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                생일 카드를 무엇으로 꾸밀까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                카드에 넣고 싶은 그림을 최대 3개까지 골라 보세요.
              </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-800 text-xs font-extrabold whitespace-nowrap shrink-0 tabular-nums">
            여러 개 골라요 (최대 3개 · {currentDecoCount}/3개 선택)
          </span>
        </div>

        {/* Max 3 selection warning message */}
        {maxDecoWarning && (
          <div
            role="alert"
            className="mb-4 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 flex items-center gap-3 text-amber-950 text-sm font-bold"
          >
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <span>
              꾸미기는 최대 3개까지만 고를 수 있어요! 다른 것을 고르려면 먼저 선택한 것 중 하나를 다시 눌러 꺼 주세요.
            </span>
          </div>
        )}

        {/* Decoration Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
          {DECORATION_OPTIONS.map((option) => {
            const isSelected =
              option.id === '직접 입력'
                ? state.decorationCustomSelected
                : state.decorations.includes(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleToggleDecoration(option.id)}
                className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[136px] ${
                  isSelected
                    ? 'bg-teal-50/80 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
                    : 'bg-white border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 shadow-xs'
                }`}
                aria-pressed={isSelected}
              >
                <span
                  className={`absolute top-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-lg border-2 transition-colors ${
                    isSelected
                      ? 'bg-teal-500 border-teal-500 text-white shadow-sm'
                      : 'bg-white border-slate-300 text-transparent'
                  }`}
                >
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </span>

                <div className="w-full mb-3 transition-transform group-hover:scale-[1.02]">
                  <BirthdayCardArtwork
                    artKey={option.artKey}
                    image={option.image}
                    alt={option.name}
                    isSelected={isSelected}
                  />
                </div>
                <span
                  className={`text-base sm:text-lg font-extrabold tracking-tight ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
                {option.description && (
                  <span className="mt-1 text-xs text-slate-500 text-center">
                    {option.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Decoration Input (only when 직접 입력 is selected) */}
        {state.decorationCustomSelected && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200">
            <label
              htmlFor="birthday-decoration-custom"
              className="block text-sm font-bold text-teal-900 mb-2"
            >
              카드에 넣고 싶은 장식을 직접 입력해 주세요:
            </label>
            <input
              id="birthday-decoration-custom"
              type="text"
              value={state.decorationCustomText}
              onChange={(e) =>
                onChange((prev) => ({
                  ...prev,
                  decorationCustomText: e.target.value,
                }))
              }
              placeholder="예: 폭죽, 고깔모자, 귀여운 강아지, 음표"
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base font-bold"
            />
          </div>
        )}
      </section>

      {/* Q3. 어떤 분위기의 카드가 좋을까요? (단일 선택) */}
      <section
        id="section-mood"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-teal-100/80 text-teal-800 font-extrabold text-base shadow-xs">
              Q3
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                어떤 분위기의 카드가 좋을까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                생일 카드에서 느껴졌으면 하는 기분을 골라 주세요.
              </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold whitespace-nowrap shrink-0">
            하나만 골라요 (단일 선택)
          </span>
        </div>

        {/* Mood Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {MOOD_OPTIONS.map((option) => {
            const isSelected = state.mood === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  onChange((prev) => ({ ...prev, mood: option.id }))
                }
                className={`group relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[140px] ${
                  isSelected
                    ? 'bg-teal-50/80 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.01]'
                    : 'bg-white border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-50/70 shadow-xs'
                }`}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className="absolute top-2.5 right-2.5 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white shadow-sm ring-2 ring-white">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                )}
                <div className="w-full mb-3 transition-transform group-hover:scale-[1.02]">
                  <BirthdayCardArtwork
                    artKey={option.artKey}
                    image={option.image}
                    alt={option.name}
                    isSelected={isSelected}
                  />
                </div>
                <span
                  className={`text-sm sm:text-base font-extrabold tracking-tight text-center ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
                {option.description && (
                  <span className="mt-1 text-xs text-slate-500 text-center leading-snug">
                    {option.description}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Custom Mood Input */}
        {state.mood === '직접 입력' && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200">
            <label
              htmlFor="birthday-mood-custom"
              className="block text-sm font-bold text-teal-900 mb-2"
            >
              원하는 카드 분위기를 직접 입력해 주세요:
            </label>
            <input
              id="birthday-mood-custom"
              type="text"
              value={state.moodCustom}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, moodCustom: e.target.value }))
              }
              placeholder="예: 신나고 웃기게, 차분하고 감동적이게, 동화처럼 포근하게"
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base font-bold"
            />
          </div>
        )}
      </section>

      {/* Q4. 카드의 색상은 무엇으로 할까요? (단일 선택) */}
      <section
        id="section-cardColor"
        className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-5 sm:mb-6">
          <div className="flex items-start gap-3.5">
            <span className="flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-2xl bg-sky-100 text-sky-800 font-extrabold text-base shadow-xs">
              Q4
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
                카드의 색상은 무엇으로 할까요?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                카드 전체에 어울리는 대표 색깔을 하나 골라 주세요.
              </p>
            </div>
          </div>
          <span className="self-start px-3 py-1.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-extrabold whitespace-nowrap shrink-0">
            하나만 골라요 (단일 선택)
          </span>
        </div>

        {/* Color Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-3.5">
          {CARD_COLOR_OPTIONS.map((option) => {
            const isSelected = state.cardColor === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  onChange((prev) => ({ ...prev, cardColor: option.id }))
                }
                className={`relative flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[120px] ${
                  isSelected
                    ? 'bg-teal-50/90 border-2 border-teal-500 shadow-md shadow-teal-500/10 scale-[1.02]'
                    : 'bg-slate-50/80 border-2 border-slate-200 hover:border-teal-300 hover:bg-slate-100/70'
                }`}
                aria-pressed={isSelected}
              >
                <div className="relative mb-3">
                  {option.colorHex ? (
                    <span
                      className="block w-12 h-12 rounded-full shadow-inner ring-4 ring-white border border-slate-200/70"
                      style={{ backgroundColor: option.colorHex }}
                    />
                  ) : (
                    <BirthdayCardArtwork artKey={option.artKey} isSelected={isSelected} compact />
                  )}
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 rounded-full bg-teal-500 text-white shadow ring-2 ring-white">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  )}
                </div>
                <span
                  className={`text-sm sm:text-base font-extrabold text-center ${
                    isSelected ? 'text-teal-900' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Custom Color Input */}
        {state.cardColor === '직접 입력' && (
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200">
            <label
              htmlFor="birthday-color-custom"
              className="block text-sm font-bold text-teal-900 mb-2"
            >
              원하는 카드 색상을 직접 입력해 주세요:
            </label>
            <input
              id="birthday-color-custom"
              type="text"
              value={state.cardColorCustom}
              onChange={(e) =>
                onChange((prev) => ({ ...prev, cardColorCustom: e.target.value }))
              }
              placeholder="예: 민트색, 주황색, 금색, 무지개색"
              className="w-full px-4 py-3 rounded-xl border-2 border-teal-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 text-base font-bold"
            />
          </div>
        )}
      </section>

      {/* Bottom Result & Actions Section */}
      <section
        id="birthday-result-section"
        className="scroll-mt-24 mt-10 rounded-3xl bg-gradient-to-b from-white to-sky-50/50 border-2 border-teal-300 shadow-xl shadow-teal-500/5 p-6 sm:p-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500 text-white shadow-md shadow-teal-500/25 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                완성된 생일 카드 프롬프트
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                선택한 내용으로 ChatGPT · Gemini용 생일 카드 프롬프트를 만들었어요.
              </p>
            </div>
          </div>

          {/* Action Buttons: 프롬프트 생성하기, 선택 초기화 */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleGeneratePromptClick}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-500 hover:bg-teal-600 text-white text-sm sm:text-base font-extrabold shadow-md shadow-teal-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
            >
              <Wand2 className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>프롬프트 생성하기</span>
            </button>

            <button
              type="button"
              onClick={handleResetClick}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white border-2 border-slate-200 text-sm sm:text-base font-bold text-slate-700 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50 transition-colors cursor-pointer whitespace-nowrap"
            >
              <RotateCcw className="w-4 h-4" />
              <span>선택 초기화</span>
            </button>
          </div>
        </div>

        {/* Feedback Banners */}
        {generatedNotice && (
          <div className="mt-4 p-3.5 rounded-2xl bg-teal-50 border border-teal-300 text-teal-900 text-sm font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0" />
            <span>방금 선택한 내용으로 생일 카드 프롬프트를 생성했어요! 아래에서 복사해 보세요.</span>
          </div>
        )}

        {resetNotice && (
          <div className="mt-4 p-3.5 rounded-2xl bg-sky-50 border border-sky-300 text-sky-900 text-sm font-bold flex items-center gap-2">
            <RotateCcw className="w-4 h-4 text-sky-600 shrink-0" />
            <span>생일 카드 만들기 선택이 초기화되었어요! (내 캐릭터 만들기 선택은 그대로 유지돼요)</span>
          </div>
        )}

        {/* Warnings if custom field left empty */}
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

        {/* Selection Summary (clean unboxed typographic metadata) */}
        <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 flex flex-wrap items-center gap-x-4 gap-y-2">
          <div>
            <span className="font-bold text-slate-500">축하 대상: </span>
            <span className="font-extrabold text-slate-900">{promptResult.resolvedRecipient}</span>
          </div>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <div>
            <span className="font-bold text-slate-500">축하 문구: </span>
            <span className="font-extrabold text-teal-800">&ldquo;{promptResult.resolvedMessage}&rdquo;</span>
          </div>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <div>
            <span className="font-bold text-slate-500">꾸미기: </span>
            <span className="font-extrabold text-slate-900">
              {promptResult.resolvedDecorations.length > 0
                ? promptResult.resolvedDecorations.join(', ')
                : '기본 생일 장식'}
            </span>
          </div>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <div>
            <span className="font-bold text-slate-500">분위기: </span>
            <span className="font-extrabold text-slate-900">{promptResult.resolvedMood}</span>
          </div>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <div>
            <span className="font-bold text-slate-500">색상: </span>
            <span className="font-extrabold text-slate-900">{promptResult.resolvedColor}</span>
          </div>
          <span className="text-slate-300" aria-hidden="true">·</span>
          <div>
            <span className="font-bold text-slate-500">비율: </span>
            <span className="font-extrabold text-slate-900">세로형 4:5</span>
          </div>
        </div>

        {/* Readable Generated Prompt Box */}
        <div id="birthday-prompt-output" className="mt-5 relative">
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <h3 className="text-sm sm:text-base font-extrabold text-slate-800">
              생성된 프롬프트 확인
            </h3>
            <button
              type="button"
              onClick={handleCopyPrompt}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base transition-all duration-150 cursor-pointer shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white shadow-emerald-600/25'
                  : 'bg-sky-500 hover:bg-sky-600 text-white shadow-sky-500/25 active:scale-95'
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

          <div className="relative">
            <div className="w-full min-h-[160px] p-5 sm:p-6 rounded-2xl bg-white border-2 border-teal-200 shadow-inner text-sm sm:text-base text-slate-800 leading-relaxed whitespace-pre-line select-text">
              {promptResult.prompt}
            </div>

            {copied && (
              <div className="absolute inset-0 bg-white/95 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-teal-700 z-10">
                <CheckCircle2 className="w-10 h-10 mb-1.5 text-teal-500 stroke-[2.5]" />
                <p className="text-base sm:text-lg font-extrabold text-slate-900">
                  생일 카드 프롬프트가 복사되었어요!
                </p>
                <p className="text-xs sm:text-sm text-slate-600 mt-1 text-center px-4">
                  챗GPT나 제미나이에 내 캐릭터 그림을 올리고, 복사한 글자를 붙여넣어 보세요.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Easy Copy Button for Mobile / Accessibility */}
        <div className="mt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-4 rounded-2xl bg-sky-50/80 border border-sky-200/80 text-xs sm:text-sm text-sky-950">
          <div className="leading-relaxed">
            <strong>사용 방법:</strong> ① 내가 만든 캐릭터 이미지를 챗GPT 또는 제미나이에 첨부해요. ② 위에서 복사한 프롬프트를 붙여넣고 전송하면 생일 카드가 완성돼요!
          </div>
          <button
            type="button"
            onClick={handleCopyPrompt}
            className="sm:hidden w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-black text-base shadow-md cursor-pointer"
          >
            <Copy className="w-5 h-5" />
            <span>{copied ? '복사 완료!' : '프롬프트 복사하기'}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
