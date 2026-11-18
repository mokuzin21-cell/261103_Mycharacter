export interface BirthdayOptionItem {
  id: string;
  name: string;
  description?: string;
  defaultMessage?: string;
  colorHex?: string;
  image?: string;
  artKey: string;
}

export interface BirthdayCardFormState {
  recipient: string;
  recipientCustom: string;
  greetingMessage: string;
  isGreetingEdited: boolean;
  pendingDefaultMessage: string | null;
  decorations: string[];
  decorationCustomSelected: boolean;
  decorationCustomText: string;
  mood: string;
  moodCustom: string;
  cardColor: string;
  cardColorCustom: string;
}

export const MAX_DECORATIONS = 3;

export const RECIPIENT_OPTIONS: BirthdayOptionItem[] = [
  {
    id: '엄마',
    name: '엄마',
    description: '다정한 우리 엄마',
    defaultMessage: '엄마, 생신 축하드려요!',
    image: 'images/birthday_mom.png',
    artKey: 'mom',
  },
  {
    id: '아빠',
    name: '아빠',
    description: '든든한 우리 아빠',
    defaultMessage: '아빠, 생신 축하드려요!',
    image: 'images/birthday_dad.png',
    artKey: 'dad',
  },
  {
    id: '친구',
    name: '친구',
    description: '소중한 내 친구',
    defaultMessage: '생일 축하해!',
    image: 'images/birthday_friend.png',
    artKey: 'friend',
  },
  {
    id: '선생님',
    name: '선생님',
    description: '고마운 선생님',
    defaultMessage: '선생님, 생신 축하드립니다!',
    image: 'images/birthday_teacher.png',
    artKey: 'teacher',
  },
  {
    id: '할머니',
    name: '할머니',
    description: '따뜻한 할머니',
    defaultMessage: '할머니, 생신 축하드려요!',
    image: 'images/birthday_grandma.png',
    artKey: 'grandma',
  },
  {
    id: '할아버지',
    name: '할아버지',
    description: '인자한 할아버지',
    defaultMessage: '할아버지, 생신 축하드려요!',
    image: 'images/birthday_grandpa.png',
    artKey: 'grandpa',
  },
  {
    id: '직접 입력',
    name: '직접 입력',
    description: '축하할 분을 직접 써요',
    defaultMessage: '생일 축하해!',
    artKey: 'custom',
  },
];

export const DECORATION_OPTIONS: BirthdayOptionItem[] = [
  {
    id: '풍선',
    name: '풍선',
    description: '둥실둥실 알록달록 풍선',
    image: 'images/birthday_balloon.png',
    artKey: 'balloon',
  },
  {
    id: '케이크',
    name: '케이크',
    description: '촛불이 켜진 생일 케이크',
    image: 'images/birthday_cake.png',
    artKey: 'cake',
  },
  {
    id: '선물',
    name: '선물',
    description: '리본이 달린 선물 상자',
    image: 'images/birthday_gift.png',
    artKey: 'gift',
  },
  {
    id: '꽃',
    name: '꽃',
    description: '향기롭고 예쁜 꽃다발',
    image: 'images/birthday_flower.png',
    artKey: 'flower',
  },
  {
    id: '별',
    name: '별',
    description: '반짝반짝 빛나는 별',
    image: 'images/birthday_star.png',
    artKey: 'star',
  },
  {
    id: '하트',
    name: '하트',
    description: '마음을 담은 사랑 하트',
    image: 'images/birthday_heart.png',
    artKey: 'heart',
  },
  {
    id: '직접 입력',
    name: '직접 입력',
    description: '원하는 장식을 직접 써요',
    artKey: 'custom',
  },
];

export const MOOD_OPTIONS: BirthdayOptionItem[] = [
  {
    id: '귀엽고 사랑스럽게',
    name: '귀엽고 사랑스럽게',
    description: '포근하고 아기자기한 느낌',
    image: 'images/birthday_cute.png',
    artKey: 'mood_cute',
  },
  {
    id: '밝고 신나게',
    name: '밝고 신나게',
    description: '기분 좋은 파티 같은 느낌',
    image: 'images/birthday_fun.png',
    artKey: 'mood_bright',
  },
  {
    id: '따뜻하고 다정하게',
    name: '따뜻하고 다정하게',
    description: '마음이 포근해지는 느낌',
    image: 'images/birthday_warm.png',
    artKey: 'mood_warm',
  },
  {
    id: '반짝이고 화려하게',
    name: '반짝이고 화려하게',
    description: '축하 꽃가루가 빛나는 느낌',
    image: 'images/birthday_sparkle.png',
    artKey: 'mood_sparkle',
  },
  {
    id: '직접 입력',
    name: '직접 입력',
    description: '원하는 분위기를 직접 써요',
    artKey: 'custom',
  },
];

export const CARD_COLOR_OPTIONS: BirthdayOptionItem[] = [
  {
    id: '분홍색',
    name: '분홍색',
    colorHex: '#F9A8D4',
    artKey: 'color_pink',
  },
  {
    id: '하늘색',
    name: '하늘색',
    colorHex: '#7DD3FC',
    artKey: 'color_sky',
  },
  {
    id: '노란색',
    name: '노란색',
    colorHex: '#FDE047',
    artKey: 'color_yellow',
  },
  {
    id: '연두색',
    name: '연두색',
    colorHex: '#86EFAC',
    artKey: 'color_lime',
  },
  {
    id: '보라색',
    name: '보라색',
    colorHex: '#C4B5FD',
    artKey: 'color_purple',
  },
  {
    id: '직접 입력',
    name: '직접 입력',
    artKey: 'custom',
  },
];

export const initialBirthdayCardState: BirthdayCardFormState = {
  recipient: '친구',
  recipientCustom: '',
  greetingMessage: '생일 축하해!',
  isGreetingEdited: false,
  pendingDefaultMessage: null,
  decorations: ['풍선', '케이크'],
  decorationCustomSelected: false,
  decorationCustomText: '',
  mood: '밝고 신나게',
  moodCustom: '',
  cardColor: '분홍색',
  cardColorCustom: '',
};

export function getDefaultMessageForRecipient(recipientId: string): string {
  const found = RECIPIENT_OPTIONS.find((item) => item.id === recipientId);
  return found?.defaultMessage || '생일 축하해!';
}
