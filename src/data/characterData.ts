export interface OptionItem {
  id: string;
  name: string;
  description?: string;
  image?: string; // relative to public/ or assets
  color?: string; // for color preview
  iconName?: string;
}

export interface QuestionData {
  id: string;
  qNumber: number;
  title: string;
  subtitle: string;
  type: 'text' | 'image' | 'color' | 'icon';
  options: OptionItem[];
  allowCustom?: boolean;
}

export interface CharacterFormState {
  gender: string;
  age: string;
  bodyType: string;
  hairLength: string;
  hairStyle: string;
  hairStyleCustom?: string;
  hairColor: string;
  glasses: string;
  artStyle: string;
  background: string;
  backgroundColorCustom?: string;
  purpose: string;
  purposeCustom?: string;
}

export const initialFormState: CharacterFormState = {
  gender: '여성',
  age: '청소년',
  bodyType: '보통 체형',
  hairLength: '단발머리',
  hairStyle: '생머리',
  hairStyleCustom: '',
  hairColor: '초코 브라운',
  glasses: '미착용',
  artStyle: '치비',
  background: '단색',
  backgroundColorCustom: '#A7F3D0', // soft pastel mint
  purpose: '프로필',
  purposeCustom: '',
};

export const QUESTIONS_DATA: QuestionData[] = [
  {
    id: 'gender',
    qNumber: 1,
    title: '캐릭터의 성별은 무엇인가요?',
    subtitle: '표현하고 싶은 캐릭터의 성별을 선택해 주세요.',
    type: 'text',
    options: [
      { id: '남성', name: '남성' },
      { id: '여성', name: '여성' },
    ],
  },
  {
    id: 'age',
    qNumber: 2,
    title: '캐릭터의 연령대는 어떻게 되나요?',
    subtitle: '원하는 나이대를 선택하면 얼굴 비율과 분위기가 알맞게 맞춰져요.',
    type: 'text',
    options: [
      { id: '어린이', name: '어린이', description: '7~12세 귀여운 매력' },
      { id: '청소년', name: '청소년', description: '10대 청량한 분위기' },
      { id: '20대', name: '20대', description: '트렌디하고 생기발랄' },
      { id: '30대', name: '30대', description: '성숙하고 세련된 매력' },
      { id: '40대', name: '40대', description: '단정하고 신뢰감 있는' },
      { id: '50대', name: '50대', description: '따뜻하고 여유로운' },
      { id: '60대 이상', name: '60대 이상', description: '포근하고 온화한 인상' },
    ],
  },
  {
    id: 'bodyType',
    qNumber: 3,
    title: '체형은 어떤가요?',
    subtitle: '캐릭터의 전체적인 실루엣과 바디라인을 정해 보세요.',
    type: 'image',
    options: [
      { id: '마른 체형', name: '마른 체형', image: 'images/body_slim.svg', description: '슬림하고 여리여리한 선' },
      { id: '보통 체형', name: '보통 체형', image: 'images/body_average.svg', description: '자연스럽고 균형잡힌 체형' },
      { id: '통통한 체형', name: '통통한 체형', image: 'images/body_chubby.svg', description: '둥글둥글하고 귀여운 인상' },
      { id: '근육형', name: '근육형', image: 'images/body_muscular.svg', description: '탄탄하고 건강미 넘치는 체형' },
    ],
  },
  {
    id: 'hairLength',
    qNumber: 4,
    title: '머리 길이는 어떤가요?',
    subtitle: '머리카락의 전체 길이를 선택해 주세요.',
    type: 'image',
    options: [
      { id: '스포츠형 짧은 머리', name: '스포츠형 짧은 머리', image: 'images/hair_buzz.svg', description: '시원하고 깔끔한 크롭 컷' },
      { id: '짧은 머리', name: '짧은 머리', image: 'images/hair_short.svg', description: '단정하고 세련된 숏컷' },
      { id: '단발머리', name: '단발머리', image: 'images/hair_bob.svg', description: '귀엽고 단정한 보브 단발' },
      { id: '중간 길이', name: '중간 길이', image: 'images/hair_medium.svg', description: '어깨에 닿는 자연스러운 길이' },
      { id: '긴 머리', name: '긴 머리', image: 'images/hair_long.svg', description: '가슴 아래로 흐르는 롱 헤어' },
    ],
  },
  {
    id: 'hairStyle',
    qNumber: 5,
    title: '머리 모양은 어떤가요?',
    subtitle: '머리카락의 결이나 묶음 스타일을 선택해 보세요.',
    type: 'image',
    allowCustom: true,
    options: [
      { id: '생머리', name: '생머리', image: 'images/style_straight.svg', description: '찰랑이는 직모 스타일' },
      { id: '웨이브', name: '웨이브', image: 'images/style_wavy.svg', description: '부드러운 S컬 웨이브' },
      { id: '곱슬머리', name: '곱슬머리', image: 'images/style_curly.svg', description: '볼륨감 넘치는 뽀글머리' },
      { id: '묶은 머리', name: '묶은 머리', image: 'images/style_tied.svg', description: '포니테일 또는 똥머리' },
      { id: '기타', name: '기타 (직접 입력)', image: 'images/style_other.svg', description: '투블럭, 땋은 머리 등' },
    ],
  },
  {
    id: 'hairColor',
    qNumber: 6,
    title: '머리 색깔은 무엇인가요?',
    subtitle: '캐릭터의 인상을 결정하는 헤어 컬러를 골라주세요.',
    type: 'color',
    options: [
      { id: '검정', name: '검정', color: '#18181B', description: '시크하고 단정한 블랙' },
      { id: '다크 브라운', name: '다크 브라운', color: '#3E2723', description: '깊이감 있는 어두운 갈색' },
      { id: '초코 브라운', name: '초코 브라운', color: '#5D4037', description: '부드럽고 달콤한 초콜릿 갈색' },
      { id: '애쉬 브라운', name: '애쉬 브라운', color: '#8D7B68', description: '차분하고 세련된 회갈색' },
      { id: '밀크 브라운', name: '밀크 브라운', color: '#BCAAA4', description: '밝고 화사한 라떼빛 갈색' },
      { id: '회색', name: '회색', color: '#94A3B8', description: '개성 넘치는 실버 그레이' },
    ],
  },
  {
    id: 'glasses',
    qNumber: 7,
    title: '안경을 쓰고 있나요?',
    subtitle: '안경 착용 여부를 선택해 주세요.',
    type: 'text',
    options: [
      { id: '착용', name: '착용', description: '지적이고 트렌디한 안경' },
      { id: '미착용', name: '미착용', description: '맨 얼굴' },
    ],
  },
  {
    id: 'artStyle',
    qNumber: 8,
    title: '어떤 그림 스타일로 만들까요?',
    subtitle: '가장 마음에 드는 아트를 골라보세요. 분위기가 확 달라져요!',
    type: 'image',
    options: [
      { id: '치비', name: '치비 (SD)', image: 'images/art_chibi.svg', description: '2등신 큰 머리 깜찍한 SD 캐릭터' },
      { id: '라인아트', name: '라인아트', image: 'images/art_lineart.svg', description: '간결하고 깔끔한 감성 드로잉' },
      { id: '3D 클레이', name: '3D 클레이', image: 'images/art_clay.svg', description: '말랑말랑 귀여운 점토 인형 느낌' },
      { id: '애니메이션', name: '애니메이션', image: 'images/art_anime.svg', description: '생동감 넘치는 만화 애니메이션 화풍' },
      { id: '픽셀아트', name: '픽셀아트', image: 'images/art_pixel.svg', description: '레트로 감성의 8비트 도트 캐릭터' },
      { id: '플랫 벡터', name: '플랫 벡터', image: 'images/art_flat_vector.svg', description: '선명한 색감의 모던 그래픽 일러스트' },
      { id: '수채화', name: '수채화', image: 'images/art_watercolor.svg', description: '은은하고 맑은 물감 번짐 감성' },
      { id: '봉제인형', name: '봉제인형', image: 'images/art_plush.svg', description: '폭신폭신한 펠트 자수 인형' },
    ],
  },
  {
    id: 'background',
    qNumber: 9,
    title: '배경은 어떻게 할까요?',
    subtitle: '단색을 선택하시면 원하는 파스텔 배경색을 직접 고를 수 있어요.',
    type: 'text',
    options: [
      { id: '흰색', name: '흰색', description: '군더더기 없는 순백색' },
      { id: '단색', name: '단색 (컬러 선택)', description: '감성 파스텔 톤 단색' },
      { id: '투명', name: '투명', description: '스티커 및 합성용 투명 배경' },
      { id: '자연 풍경', name: '자연 풍경', description: '푸른 잔디밭과 햇살' },
      { id: '도시 배경', name: '도시 배경', description: '트렌디한 거리 또는 카페' },
      { id: '실내 배경', name: '실내 배경', description: '아늑하고 따뜻한 방' },
    ],
  },
  {
    id: 'purpose',
    qNumber: 10,
    title: '캐릭터를 어디에 사용할 건가요?',
    subtitle: '사용 목적에 맞춰 프롬프트의 구도와 비율이 자동으로 최적화됩니다.',
    type: 'icon',
    allowCustom: true,
    options: [
      { id: '프로필', name: '프로필', iconName: 'User', description: 'SNS 및 메신저 대표 프사 (바스트샷)' },
      { id: '스티커', name: '스티커', iconName: 'Smile', description: '다이어리용 흰색 테두리 스티커' },
      { id: '이모티콘', name: '이모티콘', iconName: 'Sparkles', description: '감정이 잘 드러나는 캐릭터' },
      { id: '키링', name: '키링', iconName: 'Key', description: '아크릴 참 형태의 귀여운 컷아웃' },
      { id: '굿즈', name: '굿즈', iconName: 'ShoppingBag', description: '머그컵, 티셔츠, 엽서 인쇄용 고해상도' },
      { id: '기타', name: '기타 (직접 입력)', iconName: 'Edit3', description: '원하는 사용 목적 직접 작성' },
    ],
  },
];

export const PRESET_CHARACTERS = [
  {
    id: 'preset_kid',
    name: '귀여운 초등학생 프로필',
    desc: '치비 스타일 / 초코 브라운 단발머리 / 민트 배경',
    icon: '🎒',
    state: {
      gender: '여성',
      age: '어린이',
      bodyType: '보통 체형',
      hairLength: '단발머리',
      hairStyle: '생머리',
      hairStyleCustom: '',
      hairColor: '초코 브라운',
      glasses: '착용',
      artStyle: '치비',
      background: '단색',
      backgroundColorCustom: '#A7F3D0',
      purpose: '프로필',
      purposeCustom: '',
    },
  },
  {
    id: 'preset_teen',
    name: '발랄한 대학생 스티커',
    desc: '애니메이션 화풍 / 긴 웨이브 밀크브라운 / 투명 배경',
    icon: '🎨',
    state: {
      gender: '여성',
      age: '20대',
      bodyType: '마른 체형',
      hairLength: '긴 머리',
      hairStyle: '웨이브',
      hairStyleCustom: '',
      hairColor: '밀크 브라운',
      glasses: '미착용',
      artStyle: '애니메이션',
      background: '투명',
      backgroundColorCustom: '#BAE6FD',
      purpose: '스티커',
      purposeCustom: '',
    },
  },
  {
    id: 'preset_office',
    name: '따뜻한 직장인 3D 클레이',
    desc: '3D 클레이 / 짧은 머리 숏컷 / 실내 카페 배경',
    icon: '☕',
    state: {
      gender: '남성',
      age: '30대',
      bodyType: '보통 체형',
      hairLength: '짧은 머리',
      hairStyle: '생머리',
      hairStyleCustom: '',
      hairColor: '다크 브라운',
      glasses: '착용',
      artStyle: '3D 클레이',
      background: '실내 배경',
      backgroundColorCustom: '#FED7AA',
      purpose: '프로필',
      purposeCustom: '',
    },
  },
  {
    id: 'preset_plush',
    name: '포근한 봉제인형 키링',
    desc: '봉제인형 / 묶은 머리 / 아크릴 키링 컷아웃',
    icon: '🧸',
    state: {
      gender: '여성',
      age: '청소년',
      bodyType: '통통한 체형',
      hairLength: '중간 길이',
      hairStyle: '묶은 머리',
      hairStyleCustom: '',
      hairColor: '검정',
      glasses: '미착용',
      artStyle: '봉제인형',
      background: '투명',
      backgroundColorCustom: '#DDD6FE',
      purpose: '키링',
      purposeCustom: '',
    },
  },
];

export const PASTEL_BACKGROUND_COLORS = [
  { name: '민트', hex: '#A7F3D0' },
  { name: '스카이블루', hex: '#BAE6FD' },
  { name: '베이비핑크', hex: '#FBCFE8' },
  { name: '라벤더', hex: '#DDD6FE' },
  { name: '크림옐로우', hex: '#FEF08A' },
  { name: '소프트베이지', hex: '#F5EBE0' },
  { name: '화이트그레이', hex: '#E2E8F0' },
  { name: '피치', hex: '#FED7AA' },
];
