import { BirthdayCardFormState } from '../data/birthdayCardData';

export interface BirthdayPromptResult {
  prompt: string;
  resolvedRecipient: string;
  resolvedMessage: string;
  resolvedDecorations: string[];
  resolvedMood: string;
  resolvedColor: string;
  warnings: string[];
}

export function generateBirthdayCardPrompt(
  state: BirthdayCardFormState
): BirthdayPromptResult {
  const warnings: string[] = [];

  // 1. Resolve recipient
  const isCustomRecipient = state.recipient === '직접 입력';
  const customRecipientTrimmed = state.recipientCustom.trim();
  const resolvedRecipient = isCustomRecipient
    ? customRecipientTrimmed || '소중한 사람'
    : state.recipient;

  if (isCustomRecipient && !customRecipientTrimmed) {
    warnings.push('Q1에서 "직접 입력"을 골랐어요. 누구의 생일인지 이름을 입력해 주세요.');
  }

  // 2. Resolve greeting message (only use the final text in the editable input)
  const messageTrimmed = state.greetingMessage.trim();
  const resolvedMessage = messageTrimmed || '생일 축하해!';

  if (!messageTrimmed) {
    warnings.push('카드에 들어갈 축하 문구가 비어 있어요. 원하는 축하 문구를 입력해 주세요.');
  }

  // 3. Resolve decorations (up to 3 total)
  const resolvedDecorations: string[] = [...state.decorations];
  const customDecorationTrimmed = state.decorationCustomText.trim();

  if (state.decorationCustomSelected) {
    if (customDecorationTrimmed) {
      resolvedDecorations.push(customDecorationTrimmed);
    } else {
      warnings.push('Q2에서 "직접 입력"을 골랐어요. 넣고 싶은 장식을 입력해 주세요.');
    }
  }

  if (resolvedDecorations.length === 0) {
    warnings.push('Q2에서 카드를 꾸밀 그림을 1개 이상 고르면 더 예쁜 카드가 완성돼요.');
  }

  const decorationPhrase =
    resolvedDecorations.length > 0
      ? `${resolvedDecorations.join(', ')} 장식`
      : '생일 파티에 어울리는 아기자기한 장식';

  // 4. Resolve mood
  const isCustomMood = state.mood === '직접 입력';
  const customMoodTrimmed = state.moodCustom.trim();
  const resolvedMood = isCustomMood
    ? customMoodTrimmed || '따뜻하고 기분 좋은'
    : state.mood;

  if (isCustomMood && !customMoodTrimmed) {
    warnings.push('Q3에서 "직접 입력"을 골랐어요. 원하는 카드 분위기를 입력해 주세요.');
  }

  let moodForPrompt = resolvedMood;
  if (!isCustomMood) {
    switch (state.mood) {
      case '귀엽고 사랑스럽게':
        moodForPrompt = '귀엽고 사랑스러운';
        break;
      case '밝고 신나게':
        moodForPrompt = '밝고 신나는';
        break;
      case '따뜻하고 다정하게':
        moodForPrompt = '따뜻하고 다정한';
        break;
      case '반짝이고 화려하게':
        moodForPrompt = '반짝이고 화려한';
        break;
    }
  }

  // 5. Resolve color
  const isCustomColor = state.cardColor === '직접 입력';
  const customColorTrimmed = state.cardColorCustom.trim();
  const resolvedColor = isCustomColor
    ? customColorTrimmed || '화사한 파스텔 색상'
    : state.cardColor;

  if (isCustomColor && !customColorTrimmed) {
    warnings.push('Q4에서 "직접 입력"을 골랐어요. 원하는 카드 색상을 입력해 주세요.');
  }

  // 6. Build natural, non-repetitive Korean image generation prompt meeting all 10 requirements
  const prompt = [
    `함께 첨부한 기존 캐릭터 이미지를 주인공으로 사용해서, ${resolvedRecipient}에게 선물할 세로형 4:5 비율의 생일 축하 카드를 만들어 주세요.`,
    `원본 캐릭터의 얼굴, 머리 모양, 머리 색깔, 안경, 의상, 색상 등 고유한 특징은 바꾸지 말고 그대로 유지해 주세요.`,
    `카드의 주인공은 첨부한 캐릭터이며, ${resolvedRecipient}의 모습이나 다른 인물을 임의로 추가하지 마세요.`,
    `카드의 주요 색상은 ${resolvedColor} 중심으로 맞추고, ${moodForPrompt} 분위기가 느껴지게 디자인하며, 주변에는 ${decorationPhrase}을 예쁘게 배치해 주세요.`,
    `카드에 들어갈 축하 문구는 "${resolvedMessage}"만 사용하고, 크고 읽기 쉬운 한국어 글씨로 정확히 한 번만 넣어 주세요.`,
    `그 외에 다른 축하 문구나 불필요한 글자는 추가하지 마세요.`,
  ].join('\n');

  return {
    prompt,
    resolvedRecipient,
    resolvedMessage,
    resolvedDecorations,
    resolvedMood,
    resolvedColor,
    warnings,
  };
}
