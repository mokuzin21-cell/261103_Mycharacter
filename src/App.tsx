import { useState, useMemo } from 'react';
import {
  CharacterFormState,
  initialFormState,
  QUESTIONS_DATA,
} from './data/characterData';
import {
  BirthdayCardFormState,
  initialBirthdayCardState,
} from './data/birthdayCardData';
import {
  EmoticonFormState,
  initialEmoticonState,
} from './data/emoticonData';
import { generateCharacterPrompt } from './utils/promptGenerator';
import { Header, MainTabId } from './components/Header';
import { QuestionSection } from './components/QuestionSection';
import {
  PromptResultSection,
  CustomPromptDraftState,
} from './components/PromptResultSection';
import { BirthdayCardTab } from './components/BirthdayCardTab';
import { EmoticonTab } from './components/EmoticonTab';
import { Sparkles, ArrowDown } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<MainTabId>('character');

  // Tab 1: Character creation state (preserved across tab switches)
  const [formState, setFormState] = useState<CharacterFormState>(initialFormState);
  const [customPromptState, setCustomPromptState] = useState<CustomPromptDraftState>({
    isCustomMode: false,
    customKorean: '',
    customEnglish: '',
    customNegative: '',
    activeLanguageTab: 'korean',
  });

  // Tab 2: Birthday card creation state (preserved across tab switches)
  const [birthdayState, setBirthdayState] =
    useState<BirthdayCardFormState>(initialBirthdayCardState);

  // Tab 3: Emoticon creation state (preserved across tab switches)
  const [emoticonState, setEmoticonState] =
    useState<EmoticonFormState>(initialEmoticonState);

  // Auto-generate prompt whenever formState updates
  const promptResult = useMemo(() => {
    return generateCharacterPrompt(formState);
  }, [formState]);

  const handleUpdate = (field: keyof CharacterFormState, value: string) => {
    setFormState((prev) => {
      if (field === 'artStyle') {
        return {
          ...prev,
          artStyle: value,
          artStyleCustom: '',
        };
      }
      if (field === 'artStyleCustom') {
        return {
          ...prev,
          artStyleCustom: value,
          artStyle: value.trim() !== '' ? '' : prev.artStyle,
        };
      }
      return {
        ...prev,
        [field]: value,
      };
    });
  };

  const handleApplyPreset = (presetState: CharacterFormState) => {
    setFormState(presetState);
  };

  const handleResetCharacter = () => {
    setFormState(initialFormState);
    setCustomPromptState({
      isCustomMode: false,
      customKorean: '',
      customEnglish: '',
      customNegative: '',
      activeLanguageTab: 'korean',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetBirthday = () => {
    setBirthdayState(initialBirthdayCardState);
  };

  const handleResetEmoticon = () => {
    setEmoticonState(initialEmoticonState);
  };

  const scrollToResult = () => {
    const targetId =
      activeTab === 'character'
        ? 'result-section'
        : activeTab === 'birthday'
        ? 'birthday-result-section'
        : 'emoticon-result-section';
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header, 3-Tab Navigation Menu, and Hero */}
      <Header
        activeTab={activeTab}
        onChangeTab={setActiveTab}
        onApplyPreset={handleApplyPreset}
        onScrollToResult={scrollToResult}
      />

      {/* Main Content Area: renders only the selected tab */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 pb-20">
        {activeTab === 'character' && (
          <>
            {/* Progress Bar / Step Indicator */}
            <div className="my-6 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-slate-700">
                  11개 질문을 자유롭게 선택해 보세요
                </span>
              </div>
              <button
                type="button"
                onClick={scrollToResult}
                className="text-xs sm:text-sm font-bold text-teal-600 hover:text-teal-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>실시간 결과 확인</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* 11 Questions Form */}
            <div className="space-y-6 sm:space-y-8">
              {QUESTIONS_DATA.map((question) => (
                <QuestionSection
                  key={question.id}
                  question={question}
                  formState={formState}
                  onUpdate={handleUpdate}
                />
              ))}
            </div>

            {/* Completed Character Prompt Result Section */}
            <PromptResultSection
              promptResult={promptResult}
              formState={formState}
              onReset={handleResetCharacter}
              customState={customPromptState}
              onCustomStateChange={setCustomPromptState}
            />
          </>
        )}

        {activeTab === 'birthday' && (
          <div className="mt-4">
            <BirthdayCardTab
              state={birthdayState}
              onChange={setBirthdayState}
              onReset={handleResetBirthday}
            />
          </div>
        )}

        {activeTab === 'emoticon' && (
          <div className="mt-4">
            <EmoticonTab
              state={emoticonState}
              onChange={setEmoticonState}
              onReset={handleResetEmoticon}
            />
          </div>
        )}
      </main>

      {/* Mobile Sticky Quick-Jump Bar */}
      <div className="md:hidden fixed bottom-4 right-4 z-20">
        <button
          type="button"
          onClick={scrollToResult}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-teal-500 hover:bg-teal-600 text-white font-extrabold text-xs shadow-lg shadow-teal-500/30 active:scale-95 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>프롬프트 복사하기</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Friendly Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto space-y-2">
          <p className="font-semibold text-slate-700">
            나의 AI 캐릭터 스튜디오 — 나만의 캐릭터로 다양한 작품을 만들어요!
          </p>
          <p>
            외부 이미지 API나 복잡한 로그인 없이 브라우저에서 바로 동작합니다.
          </p>
          <p className="text-slate-400">
            이미지 교체 안내: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-600">public/images/</code> 폴더에 동일한 파일명의 이미지를 넣으면 즉시 교체됩니다.
          </p>
        </div>
      </footer>
    </div>
  );
}
