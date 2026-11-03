import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Download,
  AlertTriangle,
  Languages,
  CheckCircle2,
} from 'lucide-react';
import { PromptResult } from '../utils/promptGenerator';
import { CharacterFormState } from '../data/characterData';

interface PromptResultSectionProps {
  promptResult: PromptResult;
  formState: CharacterFormState;
  onReset: () => void;
}

export const PromptResultSection: React.FC<PromptResultSectionProps> = ({
  promptResult,
  formState,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState<'korean' | 'english' | 'negative'>('korean');
  const [copied, setCopied] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const currentText =
    activeTab === 'korean'
      ? promptResult.koreanPrompt
      : activeTab === 'english'
      ? promptResult.englishPrompt
      : promptResult.negativePrompt;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is constrained
      const textArea = document.createElement('textarea');
      textArea.value = currentText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const content = `[나만의 AI 캐릭터 프롬프트]\n\n` +
      `■ 한국어 프롬프트:\n${promptResult.koreanPrompt}\n\n` +
      `■ 영문 프롬프트 (Midjourney / DALL-E / SD / Gemini):\n${promptResult.englishPrompt}\n\n` +
      `■ 제외할 부정 프롬프트 (Negative Prompt):\n${promptResult.negativePrompt}\n\n` +
      `■ 선택 요약:\n` +
      `- 성별: ${formState.gender} / 연령대: ${formState.age} / 체형: ${formState.bodyType}\n` +
      `- 헤어: ${formState.hairLength} ${formState.hairStyle} (${formState.hairColor})\n` +
      `- 안경: ${formState.glasses} / 그림 스타일: ${formState.artStyle}\n` +
      `- 배경: ${formState.background} / 사용 목적: ${formState.purpose}\n\n` +
      `생성일자: ${new Date().toLocaleDateString('ko-KR')}`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `내_AI캐릭터_프롬프트_${formState.artStyle}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section
      id="result-section"
      className="mt-10 sm:mt-12 rounded-3xl bg-gradient-to-b from-white to-teal-50/40 border-2 border-teal-300 shadow-xl shadow-teal-500/5 p-6 sm:p-8 relative overflow-hidden"
    >
      {/* Top Banner & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-500 text-white shadow-md shadow-teal-500/30">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              완성된 캐릭터 프롬프트
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              10가지 선택 항목이 반영되어 실시간으로 자동 작성되었습니다.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {showResetConfirm ? (
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-rose-50 border border-rose-200 animate-in fade-in-50 duration-150">
              <span className="text-xs font-bold text-rose-700 px-2">다시 할까요?</span>
              <button
                type="button"
                onClick={() => {
                  onReset();
                  setShowResetConfirm(false);
                }}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
              >
                초기화
              </button>
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
              >
                취소
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-600 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50/50 transition-colors cursor-pointer"
              title="처음부터 다시 선택하기"
            >
              <RotateCcw className="w-4 h-4" />
              <span>처음부터 다시 선택</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-white border border-slate-200 text-xs sm:text-sm font-bold text-slate-700 hover:text-teal-700 hover:border-teal-300 hover:bg-teal-50/50 transition-colors cursor-pointer shadow-sm"
            title="텍스트 파일로 저장"
          >
            <Download className="w-4 h-4" />
            <span>파일 저장 (.txt)</span>
          </button>
        </div>
      </div>

      {/* Warnings & Suggestions if conflicts detected */}
      {promptResult.warnings.length > 0 && (
        <div className="mt-5 space-y-2">
          {promptResult.warnings.map((warn, index) => (
            <div
              key={index}
              className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm font-medium leading-relaxed"
            >
              <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
              <span>{warn}</span>
            </div>
          ))}
        </div>
      )}

      {/* Character Summary Pills */}
      <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-slate-400">선택 요약:</span>
        <span className="px-2.5 py-1 rounded-lg bg-teal-100/70 text-teal-800 font-bold">
          {formState.artStyle}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
          {formState.gender} · {formState.age}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
          {formState.bodyType}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
          {formState.hairLength} {formState.hairStyle} ({formState.hairColor})
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
          안경 {formState.glasses}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium">
          {formState.background}
        </span>
        <span className="px-2.5 py-1 rounded-lg bg-sky-100 text-sky-800 font-bold">
          용도: {formState.purpose}
        </span>
      </div>

      {/* Language / Format Switcher Tabs */}
      <div className="mt-6 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center p-1 rounded-2xl bg-slate-100/90 border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('korean')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'korean'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🇰🇷 한국어 프롬프트 (기본)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('english')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'english'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🇺🇸 영문 프롬프트 (미드저니/DALL-E)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('negative')}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'negative'
                ? 'bg-white text-teal-800 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🚫 제외 키워드
          </button>
        </div>

        {/* Big Copy Button */}
        <button
          type="button"
          onClick={handleCopy}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm sm:text-base transition-all duration-200 cursor-pointer shadow-md ${
            copied
              ? 'bg-emerald-600 text-white shadow-emerald-600/30 scale-[1.02]'
              : 'bg-teal-500 hover:bg-teal-600 text-white shadow-teal-500/25 active:scale-[0.98]'
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
              <span>프롬프트 복사</span>
            </>
          )}
        </button>
      </div>

      {/* Prompt Box */}
      <div className="mt-4 relative group">
        <div className="w-full min-h-[140px] p-5 sm:p-6 rounded-2xl bg-white border border-teal-200/80 shadow-inner font-sans text-sm sm:text-base text-slate-800 leading-relaxed break-keep select-text">
          {currentText}
        </div>

        {copied && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-teal-700 animate-in fade-in-50 duration-150">
            <CheckCircle2 className="w-10 h-10 mb-1 text-teal-500 stroke-[2.5]" />
            <p className="text-base font-extrabold text-slate-900">클립보드에 복사되었습니다!</p>
            <p className="text-xs text-slate-500 mt-0.5">이미지 생성 AI (미드저니, DALL-E, 챗GPT 등)에 붙여넣어 보세요.</p>
          </div>
        )}
      </div>

      {/* Guide Note for Users & Kids */}
      <div className="mt-5 p-4 rounded-2xl bg-sky-50/70 border border-sky-100 flex items-start gap-3 text-xs sm:text-sm text-sky-900">
        <Languages className="w-4 h-4 text-sky-600 flex-shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>💡 AI 이미지 생성 팁:</strong> 챗GPT(DALL-E), 캔바, 뤼튼 등 한국어를 지원하는 AI에는 <strong>한국어 프롬프트</strong>를, 미드저니(Midjourney)나 스테이블 디퓨전에는 <strong>영문 프롬프트</strong>를 사용하면 최고의 결과를 얻을 수 있습니다.
        </div>
      </div>
    </section>
  );
};
