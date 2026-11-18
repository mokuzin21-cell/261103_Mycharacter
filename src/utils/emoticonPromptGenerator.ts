import {
  EmoticonFormState,
  EMOTICON_OPTIONS,
  REQUIRED_EMOTICON_COUNT,
} from '../data/emoticonData';

export interface EmoticonPromptItem {
  slotNumber: number;
  positionLabel: string;
  emotionName: string;
  phrase: string;
  hasProp: boolean;
}

export interface EmoticonPromptResult {
  prompt: string;
  items: EmoticonPromptItem[];
  resolvedOutfit: string;
  resolvedProp: string | null;
  resolvedBackground: string;
  appliedSlots: [number, number] | null;
  excludedSlots: [number, number] | null;
  isComplete: boolean;
  warnings: string[];
}

const SLOT_POSITIONS = ['왼쪽 위', '오른쪽 위', '왼쪽 아래', '오른쪽 아래'];

const EMOTION_ACTION_MAP: Record<string, string> = {
  기뻐요: '환하게 기뻐하며',
  사랑해요: '사랑스러운 눈빛으로 손하트를 만들며',
  슬퍼요: '눈물을 글썽이며 속상해하며',
  화나요: '볼을 부풀리고 화난 표정을 지으며',
  좋아요: '엄지를 치켜세우고 활짝 웃으며',
  고마워요: '두 손을 모으고 감사하는 표정으로',
  인사해요: '손을 흔들며',
  축하해요: '두 팔을 벌려 신나게 축하하며',
  놀라요: '눈을 동그랗게 뜨고 깜짝 놀라며',
  졸려요: '졸린 눈으로 하품하며',
  맛있어요: '행복한 표정으로 맛있게 먹으며',
  생각해요: '턱에 손을 대고 골똘히 생각하며',
  응원해요: '주먹을 쥐고 응원하며',
  부끄러워요: '양 볼이 발그레해져서 수줍게 웃으며',
  미안해요: '미안한 표정으로 고개를 살짝 숙이며',
  알겠어요: '오케이 손동작을 하며 고개를 끄덕이며',
};

// Korean object particle helper (을/를)
function withEulReul(word: string): string {
  const trimmed = word.trim();
  if (!trimmed) return word;
  const lastChar = trimmed.charCodeAt(trimmed.length - 1);
  if (lastChar >= 0xac00 && lastChar <= 0xd7a3) {
    const jong = (lastChar - 0xac00) % 28;
    return `${trimmed}${jong === 0 ? '를' : '을'}`;
  }
  return `${trimmed}를`;
}

function getPropActionPhrases(propName: string): {
  applyVerb: string;
  excludeVerb: string;
} {
  const obj = withEulReul(propName);
  switch (propName) {
    case '모자':
    case '안경':
      return {
        applyVerb: `${obj} 씌워 주세요`,
        excludeVerb: `${obj} 씌우지 마세요`,
      };
    case '헤드폰':
      return {
        applyVerb: `${obj} 착용하게 해 주세요`,
        excludeVerb: `${obj} 착용시키지 마세요`,
      };
    case '가방':
      return {
        applyVerb: `${obj} 메게 해 주세요`,
        excludeVerb: `${obj} 추가하지 마세요`,
      };
    default:
      return {
        applyVerb: `${obj} 함께 넣어 주세요`,
        excludeVerb: `${obj} 넣지 마세요`,
      };
  }
}

export function generateEmoticonPrompt(
  state: EmoticonFormState
): EmoticonPromptResult {
  const warnings: string[] = [];

  // 1. Emotions (Q1)
  if (state.selectedEmoticons.length < REQUIRED_EMOTICON_COUNT) {
    warnings.push(
      `Q1에서 이모티콘을 ${REQUIRED_EMOTICON_COUNT}개 모두 골라 주세요. (현재 ${state.selectedEmoticons.length}/${REQUIRED_EMOTICON_COUNT}개 선택됨)`
    );
  }

  // 2. Outfit (Q3)
  let resolvedOutfit = state.outfit as string;
  if (state.outfit === '직접 입력') {
    const customOutfitTrimmed = state.outfitCustom.trim();
    if (customOutfitTrimmed) {
      resolvedOutfit = customOutfitTrimmed;
    } else {
      warnings.push('Q3에서 "직접 입력"을 골랐어요. 캐릭터에게 입힐 옷을 입력해 주세요.');
      resolvedOutfit = '기존 옷 그대로';
    }
  }

  // 3. Prop & 2-Slot Placement (Q4)
  const hasPropOption = state.prop !== '소품 없음';
  let resolvedProp: string | null = null;
  let appliedSlots: [number, number] | null = null;
  let excludedSlots: [number, number] | null = null;

  if (hasPropOption) {
    if (state.prop === '직접 입력') {
      const customPropTrimmed = state.propCustom.trim();
      if (customPropTrimmed) {
        resolvedProp = customPropTrimmed;
      } else {
        warnings.push('Q4에서 "직접 입력"을 골랐어요. 추가하고 싶은 소품을 입력해 주세요.');
      }
    } else {
      resolvedProp = state.prop;
    }

    if (resolvedProp) {
      const sortedApplied = [...state.propSlots].sort((a, b) => a - b) as [
        number,
        number
      ];
      const remaining = [1, 2, 3, 4].filter(
        (num) => !sortedApplied.includes(num)
      ) as [number, number];
      appliedSlots = sortedApplied;
      excludedSlots = remaining;
    }
  }

  // 4. Background (Q5)
  let resolvedBackground = state.background as string;
  if (state.background === '직접 입력') {
    const customBgTrimmed = state.backgroundCustom.trim();
    if (customBgTrimmed) {
      resolvedBackground = customBgTrimmed;
    } else {
      warnings.push('Q5에서 "직접 입력"을 골랐어요. 원하는 배경을 입력해 주세요.');
      resolvedBackground = '흰색 배경';
    }
  }

  // 5. Build 4 items (Q1 + Q2)
  const items: EmoticonPromptItem[] = state.selectedEmoticons.map((emotionId, index) => {
    const option = EMOTICON_OPTIONS.find((item) => item.id === emotionId);
    const phraseState = state.phrasesByEmotion[emotionId];
    const fallbackPhrase = option?.recommendedPhrases[0] || emotionId;

    let resolvedPhrase = fallbackPhrase;
    if (phraseState) {
      if (phraseState.mode === 'custom') {
        const customTrimmed = phraseState.customText.trim();
        if (customTrimmed) {
          resolvedPhrase = customTrimmed;
        } else {
          warnings.push(
            `${index + 1}번 이모티콘(${emotionId})에서 "직접 입력"을 골랐어요. 넣고 싶은 말을 입력해 주세요.`
          );
        }
      } else {
        resolvedPhrase = phraseState.presetText || fallbackPhrase;
      }
    }

    const slotNum = index + 1;
    return {
      slotNumber: slotNum,
      positionLabel: SLOT_POSITIONS[index] || `${slotNum}번 칸`,
      emotionName: emotionId,
      phrase: resolvedPhrase,
      hasProp: Boolean(appliedSlots && appliedSlots.includes(slotNum)),
    };
  });

  // 6. Compose Natural Korean Prompt
  const outfitLine =
    resolvedOutfit === '기존 옷 그대로'
      ? `원본 캐릭터의 얼굴, 머리 모양, 색상, 그림 스타일과 기존 의상을 그대로 유지해 주세요.`
      : `원본 캐릭터의 얼굴, 머리 모양, 색상, 그림 스타일은 유지하고, 4개의 캐릭터 모두 같은 ${withEulReul(resolvedOutfit)} 입혀 주세요.`;

  const itemLines =
    items.length > 0
      ? items
          .map((item) => {
            const actionDesc = EMOTION_ACTION_MAP[item.emotionName] || `${item.emotionName} 표정으로`;
            return `${item.slotNumber}번 (${item.positionLabel})은 ${actionDesc} '${item.phrase}'라고 말하는 모습입니다.`;
          })
          .join('\n')
      : `(Q1에서 이모티콘 4개를 선택해 주세요.)`;

  let propLines = '';
  if (resolvedProp && appliedSlots && excludedSlots) {
    const { applyVerb, excludeVerb } = getPropActionPhrases(resolvedProp);
    propLines = [
      `4개의 캐릭터 중 ${appliedSlots[0]}번과 ${appliedSlots[1]}번 캐릭터에게만 ${applyVerb}. (표정, 얼굴, 손동작을 가리지 않게 배치해 주세요.)`,
      `${excludedSlots[0]}번과 ${excludedSlots[1]}번 캐릭터에게는 ${excludeVerb}.`,
    ].join('\n');
  } else {
    propLines = `4개 캐릭터 모두 추가 소품 없이 깔끔하게 그려 주세요.`;
  }

  let backgroundLine = '';
  if (resolvedBackground === '투명 배경') {
    backgroundLine = `4개의 이모티콘은 투명 배경(배경이 비어 있는 투명한 배경)의 정사각형 이미지에 2열 × 2행으로 배치합니다.`;
  } else if (resolvedBackground === '흰색 배경') {
    backgroundLine = `4개의 이모티콘은 흰색 배경의 정사각형 이미지에 2열 × 2행으로 배치합니다.`;
  } else if (resolvedBackground === '파스텔 배경') {
    backgroundLine = `4개의 이모티콘은 은은하고 부드러운 파스텔 배경의 정사각형 이미지에 2열 × 2행으로 배치합니다.`;
  } else {
    backgroundLine = `4개의 이모티콘은 "${resolvedBackground}" 배경의 정사각형 이미지에 2열 × 2행으로 배치하되, 배경이 복잡하더라도 캐릭터와 문구가 선명하고 잘 보이도록 구성해 주세요.`;
  }

  const prompt = [
    `첨부한 원본 캐릭터 이미지를 참고하여 이모티콘 4개를 만들어 주세요.`,
    ``,
    outfitLine,
    ``,
    itemLines,
    ``,
    propLines,
    ``,
    backgroundLine,
    `각 칸의 크기는 동일하게 만들고, 각 칸에는 캐릭터 한 명과 지정된 문구만 정확히 한 번씩 표시해 주세요. (선택하지 않은 문구나 불필요한 글자는 추가하지 마세요.)`,
    `각 칸의 왼쪽 위에 1번부터 4번까지 번호를 작고 선명하게 표시하되 문구와 겹치지 않게 하고, 캐릭터와 문구가 잘리지 않도록 충분한 여백과 칸 사이 구분 공간을 두어 나중에 "1번 이모티콘만 따로 만들어줘."처럼 개별 추출하기 좋게 독립적으로 만들어 주세요.`,
  ].join('\n');

  return {
    prompt,
    items,
    resolvedOutfit,
    resolvedProp,
    resolvedBackground,
    appliedSlots,
    excludedSlots,
    isComplete:
      state.selectedEmoticons.length === REQUIRED_EMOTICON_COUNT &&
      warnings.length === 0,
    warnings,
  };
}
