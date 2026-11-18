export interface EmoticonOption {
  id: string;
  name: string;
  image: string;
  recommendedPhrases: [string, string, string, string];
}

export interface EmoticonPhraseSelection {
  mode: 'preset' | 'custom';
  presetText: string;
  customText: string;
}

export type EmoticonOutfitId =
  | '기존 옷 그대로'
  | '교복'
  | '운동복'
  | '한복'
  | '잠옷'
  | '직접 입력';

export interface EmoticonOutfitOption {
  id: EmoticonOutfitId;
  name: string;
  description: string;
}

export type EmoticonPropId =
  | '소품 없음'
  | '모자'
  | '안경'
  | '헤드폰'
  | '꽃'
  | '가방'
  | '직접 입력';

export interface EmoticonPropOption {
  id: EmoticonPropId;
  name: string;
  description: string;
}

export type EmoticonBackgroundId =
  | '투명 배경'
  | '흰색 배경'
  | '파스텔 배경'
  | '직접 입력';

export interface EmoticonBackgroundOption {
  id: EmoticonBackgroundId;
  name: string;
  description: string;
}

export interface EmoticonFormState {
  selectedEmoticons: string[];
  phrasesByEmotion: Record<string, EmoticonPhraseSelection>;
  outfit: EmoticonOutfitId;
  outfitCustom: string;
  prop: EmoticonPropId;
  propCustom: string;
  propSlots: [number, number];
  background: EmoticonBackgroundId;
  backgroundCustom: string;
}

export const REQUIRED_EMOTICON_COUNT = 4;

export const TWO_SLOT_COMBINATIONS: [number, number][] = [
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [2, 4],
  [3, 4],
];

export function pickRandomPropSlots(
  excludePair?: [number, number] | null
): [number, number] {
  const candidates = excludePair
    ? TWO_SLOT_COMBINATIONS.filter(
        ([a, b]) => !(a === excludePair[0] && b === excludePair[1])
      )
    : TWO_SLOT_COMBINATIONS;
  const randomIndex = Math.floor(Math.random() * candidates.length);
  return candidates[randomIndex] || [1, 3];
}

export const EMOTICON_OPTIONS: EmoticonOption[] = [
  {
    id: '기뻐요',
    name: '기뻐요',
    image: 'images/emoticon_01_happy.png',
    recommendedPhrases: ['야호!', '신난다!', '행복해!', '기분 최고!'],
  },
  {
    id: '사랑해요',
    name: '사랑해요',
    image: 'images/emoticon_02_love.png',
    recommendedPhrases: ['사랑해!', '하트 뿅!', '좋아해!', '많이 사랑해!'],
  },
  {
    id: '슬퍼요',
    name: '슬퍼요',
    image: 'images/emoticon_03_sad.png',
    recommendedPhrases: ['속상해', '슬퍼요', '흑흑', '눈물이 나'],
  },
  {
    id: '화나요',
    name: '화나요',
    image: 'images/emoticon_04_angry.png',
    recommendedPhrases: ['흥!', '화났어!', '너무해!', '삐졌어'],
  },
  {
    id: '좋아요',
    name: '좋아요',
    image: 'images/emoticon_05_like.png',
    recommendedPhrases: ['최고야!', '좋아!', '굿!', '멋져!'],
  },
  {
    id: '고마워요',
    name: '고마워요',
    image: 'images/emoticon_06_thanks.png',
    recommendedPhrases: ['고마워!', '정말 고마워', '감사합니다', '덕분이야!'],
  },
  {
    id: '인사해요',
    name: '인사해요',
    image: 'images/emoticon_07_hello.png',
    recommendedPhrases: ['안녕!', '반가워!', '잘 가!', '또 만나!'],
  },
  {
    id: '축하해요',
    name: '축하해요',
    image: 'images/emoticon_08_congrats.png',
    recommendedPhrases: ['축하해!', '생일 축하해!', '짝짝짝!', '축하합니다!'],
  },
  {
    id: '놀라요',
    name: '놀라요',
    image: 'images/emoticon_09_surprised.png',
    recommendedPhrases: ['우와!', '깜짝이야!', '대박!', '정말?'],
  },
  {
    id: '졸려요',
    name: '졸려요',
    image: 'images/emoticon_10_sleepy.png',
    recommendedPhrases: ['잘 자~', '졸려~', '굿나잇!', '꿈나라로'],
  },
  {
    id: '맛있어요',
    name: '맛있어요',
    image: 'images/emoticon_11_yummy.png',
    recommendedPhrases: ['맛있다!', '냠냠!', '잘 먹겠습니다!', '최고 맛집!'],
  },
  {
    id: '생각해요',
    name: '생각해요',
    image: 'images/emoticon_12_thinking.png',
    recommendedPhrases: ['음...', '글쎄?', '생각 중', '잠깐만'],
  },
  {
    id: '응원해요',
    name: '응원해요',
    image: 'images/emoticon_13_cheer.png',
    recommendedPhrases: ['힘내!', '파이팅!', '할 수 있어!', '응원할게!'],
  },
  {
    id: '부끄러워요',
    name: '부끄러워요',
    image: 'images/emoticon_14_shy.png',
    recommendedPhrases: ['쑥스러워', '헤헤', '부끄러워', '히히'],
  },
  {
    id: '미안해요',
    name: '미안해요',
    image: 'images/emoticon_15_sorry.png',
    recommendedPhrases: ['미안해', '죄송해요', '용서해 줘', '다음엔 조심할게'],
  },
  {
    id: '알겠어요',
    name: '알겠어요',
    image: 'images/emoticon_16_ok.png',
    recommendedPhrases: ['알겠어!', '네!', '확인했어!', '오케이!'],
  },
];

export const EMOTICON_OUTFIT_OPTIONS: EmoticonOutfitOption[] = [
  {
    id: '기존 옷 그대로',
    name: '기존 옷 그대로',
    description: '내 캐릭터 그림의 원래 옷을 유지해요',
  },
  {
    id: '교복',
    name: '교복',
    description: '단정하고 멋진 학교 교복을 입혀요',
  },
  {
    id: '운동복',
    name: '운동복',
    description: '편하고 활동적인 체육복·트레이닝복이에요',
  },
  {
    id: '한복',
    name: '한복',
    description: '곱고 예쁜 우리나라 전통 한복이에요',
  },
  {
    id: '잠옷',
    name: '잠옷',
    description: '포근하고 귀여운 파자마 잠옷이에요',
  },
  {
    id: '직접 입력',
    name: '직접 입력',
    description: '원하는 옷을 직접 써요',
  },
];

export const EMOTICON_PROP_OPTIONS: EmoticonPropOption[] = [
  {
    id: '소품 없음',
    name: '소품 없음',
    description: '추가 소품 없이 깔끔하게 만들어요',
  },
  {
    id: '모자',
    name: '모자',
    description: '귀여운 모자를 2명에게만 씌워요',
  },
  {
    id: '안경',
    name: '안경',
    description: '멋진 안경을 2명에게만 씌워요',
  },
  {
    id: '헤드폰',
    name: '헤드폰',
    description: '헤드폰을 2명에게만 착용시켜요',
  },
  {
    id: '꽃',
    name: '꽃',
    description: '예쁜 꽃을 2명에게만 넣어 줘요',
  },
  {
    id: '가방',
    name: '가방',
    description: '귀여운 가방을 2명에게만 메어 줘요',
  },
  {
    id: '직접 입력',
    name: '직접 입력',
    description: '원하는 소품을 직접 써요',
  },
];

export const EMOTICON_BACKGROUND_OPTIONS: EmoticonBackgroundOption[] = [
  {
    id: '투명 배경',
    name: '투명 배경',
    description: '배경 없이 깔끔하게 쓸 수 있어요',
  },
  {
    id: '흰색 배경',
    name: '흰색 배경',
    description: '가장 깔끔하고 보기 좋은 흰색이에요',
  },
  {
    id: '파스텔 배경',
    name: '파스텔 배경',
    description: '은은하고 따뜻한 파스텔 색감이에요',
  },
  {
    id: '직접 입력',
    name: '직접 입력',
    description: '원하는 배경을 직접 써요',
  },
];

export function createInitialPhrasesMap(): Record<string, EmoticonPhraseSelection> {
  const map: Record<string, EmoticonPhraseSelection> = {};
  for (const item of EMOTICON_OPTIONS) {
    map[item.id] = {
      mode: 'preset',
      presetText: item.recommendedPhrases[0],
      customText: '',
    };
  }
  return map;
}

export const initialEmoticonState: EmoticonFormState = {
  selectedEmoticons: ['기뻐요', '고마워요', '인사해요', '응원해요'],
  phrasesByEmotion: createInitialPhrasesMap(),
  outfit: '기존 옷 그대로',
  outfitCustom: '',
  prop: '소품 없음',
  propCustom: '',
  propSlots: [1, 3],
  background: '흰색 배경',
  backgroundCustom: '',
};
