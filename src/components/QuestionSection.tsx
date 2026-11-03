import React from 'react';
import {
  Check,
  User,
  Smile,
  Sparkles,
  Key,
  ShoppingBag,
  Edit3,
  Palette,
} from 'lucide-react';
import {
  QuestionData,
  CharacterFormState,
  PASTEL_BACKGROUND_COLORS,
} from '../data/characterData';
import { ImageCard } from './ImageCard';

interface QuestionSectionProps {
  question: QuestionData;
  formState: CharacterFormState;
  onUpdate: (field: keyof CharacterFormState, value: string) => void;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  Smile,
  Sparkles,
  Key,
  ShoppingBag,
  Edit3,
};

export const QuestionSection: React.FC<QuestionSectionProps> = ({
  question,
  formState,
  onUpdate,
}) => {
  const currentValue = formState[question.id as keyof CharacterFormState] as string;

  return (
    <section
      id={`section-${question.id}`}
      className="scroll-mt-24 p-5 sm:p-7 rounded-3xl bg-white border border-slate-200/80 shadow-sm transition-shadow hover:shadow-md"
    >
      {/* Question Header */}
      <div className="flex items-start gap-3.5 mb-5 sm:mb-6">
        <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-2xl bg-teal-100/80 text-teal-800 font-extrabold text-base shadow-sm">
          Q{question.qNumber}
        </span>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">
            {question.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {question.subtitle}
          </p>
        </div>
      </div>

      {/* 1. Image Cards (Q3, Q4, Q5, Q8) */}
      {question.type === 'image' && (
        <div>
          {/* Mobile 2 cols, Desktop 4 cols */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {question.options.map((option) => (
              <ImageCard
                key={option.id}
                option={option}
                isSelected={currentValue === option.id}
                onSelect={(id) => onUpdate(question.id as keyof CharacterFormState, id)}
              />
            ))}
          </div>

          {/* Custom Hair Style Input if '기타' is selected */}
          {question.id === 'hairStyle' && currentValue === '기타' && (
            <div className="mt-4 p-4 rounded-2xl bg-teal-50/60 border border-teal-200 animate-in fade-in-50 duration-200">
              <label
                htmlFor="custom-hair-style"
                className="block text-xs sm:text-sm font-bold text-teal-900 mb-2"
              >
                ✏️ 원하는 머리 모양을 직접 입력해 주세요:
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="custom-hair-style"
                  type="text"
                  value={formState.hairStyleCustom || ''}
                  onChange={(e) => onUpdate('hairStyleCustom', e.target.value)}
                  placeholder="예: 땋은 양갈래 머리, 투블럭 댄디컷, 레게머리 등"
                  className="w-full px-4 py-2.5 rounded-xl border border-teal-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Text Buttons (Q1, Q2, Q7, Q9) */}
      {question.type === 'text' && (
        <div>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            {question.options.map((option) => {
              const isSelected = currentValue === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onUpdate(question.id as keyof CharacterFormState, option.id)}
                  className={`group relative flex items-center justify-between gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 min-h-[48px] ${
                    isSelected
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20 scale-[1.02]'
                      : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 hover:text-slate-900 border border-transparent'
                  }`}
                  aria-pressed={isSelected}
                >
                  <span>{option.name}</span>
                  {isSelected && (
                    <Check className="w-4 h-4 stroke-[3] text-white animate-in zoom-in-75 duration-150" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Special palette for Q9 단색 background */}
          {question.id === 'background' && currentValue === '단색' && (
            <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-teal-50/50 border border-teal-200 animate-in fade-in-50 duration-200">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4 text-teal-700" />
                <h4 className="text-xs sm:text-sm font-bold text-teal-900">
                  단색 배경 컬러를 선택해 주세요:
                </h4>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                {PASTEL_BACKGROUND_COLORS.map((color) => {
                  const isColorSelected =
                    (formState.backgroundColorCustom || '').toLowerCase() === color.hex.toLowerCase();
                  return (
                    <button
                      key={color.hex}
                      type="button"
                      onClick={() => onUpdate('backgroundColorCustom', color.hex)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                        isColorSelected
                          ? 'ring-2 ring-teal-600 bg-white shadow-sm'
                          : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span
                        className="w-4 h-4 rounded-full border border-slate-300 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span>{color.name}</span>
                    </button>
                  );
                })}

                {/* Custom Color Picker input */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-600">
                  <span>직접 선택:</span>
                  <input
                    type="color"
                    value={formState.backgroundColorCustom || '#A7F3D0'}
                    onChange={(e) => onUpdate('backgroundColorCustom', e.target.value)}
                    className="w-6 h-6 rounded cursor-pointer border-0 bg-transparent"
                    title="배경색 직접 고르기"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. Color Buttons (Q6 Hair Color) */}
      {question.type === 'color' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
          {question.options.map((option) => {
            const isSelected = currentValue === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => onUpdate(question.id as keyof CharacterFormState, option.id)}
                className={`flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 ${
                  isSelected
                    ? 'bg-teal-50 border-2 border-teal-500 shadow-sm scale-[1.02]'
                    : 'bg-slate-50 border-2 border-slate-200/80 hover:border-slate-300 hover:bg-slate-100/60'
                }`}
                aria-pressed={isSelected}
              >
                <div className="relative mb-2">
                  <span
                    className="block w-9 h-9 rounded-full shadow-inner ring-2 ring-white"
                    style={{ backgroundColor: option.color }}
                  />
                  {isSelected && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 rounded-full bg-teal-500 text-white shadow ring-2 ring-white">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <span
                  className={`text-xs sm:text-sm font-bold text-center ${
                    isSelected ? 'text-teal-900 font-extrabold' : 'text-slate-800'
                  }`}
                >
                  {option.name}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* 4. Icon + Text Buttons (Q10 Purpose) */}
      {question.type === 'icon' && (
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 sm:gap-3">
            {question.options.map((option) => {
              const isSelected = currentValue === option.id;
              const IconComponent = option.iconName ? ICON_MAP[option.iconName] || Smile : Smile;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onUpdate(question.id as keyof CharacterFormState, option.id)}
                  className={`group relative flex flex-col items-center justify-center p-3.5 sm:p-4 rounded-2xl transition-all duration-150 cursor-pointer outline-none focus-visible:ring-4 focus-visible:ring-teal-400 ${
                    isSelected
                      ? 'bg-teal-500 text-white shadow-md shadow-teal-500/20 scale-[1.02]'
                      : 'bg-white border-2 border-slate-200/80 hover:border-teal-300 hover:bg-slate-50 text-slate-800'
                  }`}
                  aria-pressed={isSelected}
                >
                  {isSelected && (
                    <span className="absolute top-2 right-2 flex items-center justify-center w-4 h-4 rounded-full bg-white text-teal-600 shadow-sm">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-teal-700'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-center">
                    {option.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Custom Purpose Input if '기타' is selected */}
          {currentValue === '기타' && (
            <div className="mt-4 p-4 rounded-2xl bg-teal-50/60 border border-teal-200 animate-in fade-in-50 duration-200">
              <label
                htmlFor="custom-purpose"
                className="block text-xs sm:text-sm font-bold text-teal-900 mb-2"
              >
                ✏️ 사용할 곳을 자유롭게 입력해 주세요:
              </label>
              <input
                id="custom-purpose"
                type="text"
                value={formState.purposeCustom || ''}
                onChange={(e) => onUpdate('purposeCustom', e.target.value)}
                placeholder="예: 유튜브 썸네일, 게임 아바타, 책 표지, 동화책 삽화 등"
                className="w-full px-4 py-2.5 rounded-xl border border-teal-300 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm font-medium"
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
};
