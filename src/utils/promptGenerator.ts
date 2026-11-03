import { CharacterFormState, PASTEL_BACKGROUND_COLORS } from '../data/characterData';

export interface PromptResult {
  koreanPrompt: string;
  englishPrompt: string;
  negativePrompt: string;
  warnings: string[];
}

export function generateCharacterPrompt(state: CharacterFormState): PromptResult {
  const warnings: string[] = [];

  // 1. Conflict Checks
  if (state.hairLength === '스포츠형 짧은 머리' && state.hairStyle === '묶은 머리') {
    warnings.push('💡 스포츠형 짧은 머리는 실제로 묶기 어려울 수 있어요. 귀여운 꽁지머리 포인트로 연출하거나, 머리 길이를 단발 이상으로 변경해 보세요!');
  }

  if ((state.purpose === '스티커' || state.purpose === '키링') &&
      (state.background === '자연 풍경' || state.background === '도시 배경' || state.background === '실내 배경')) {
    warnings.push('💡 스티커나 키링 제작 시에는 배경을 "투명", "단색", 또는 "흰색"으로 선택하시면 외곽선(누끼)을 따기 훨씬 편리해요.');
  }

  if (state.artStyle === '봉제인형' && state.bodyType === '근육형') {
    warnings.push('💡 팁: 봉제인형 스타일과 근육형 체형이 조합되어 듬직하고 사랑스러운 "근육 곰돌이 인형" 느낌으로 연출됩니다.');
  }

  // 2. Art Style Description
  let styleDescKr = '';
  let styleDescEn = '';
  switch (state.artStyle) {
    case '치비':
      styleDescKr = '사랑스럽고 앙증맞은 2등신 치비(SD) 캐릭터 일러스트레이션';
      styleDescEn = 'cute chibi style, 2-head-proportions, adorable SD character illustration';
      break;
    case '라인아트':
      styleDescKr = '세련되고 간결한 감성 미니멀 라인아트(Line Art) 드로잉';
      styleDescEn = 'clean minimalist line art, elegant black line drawing, refined aesthetic';
      break;
    case '3D 클레이':
      styleDescKr = '말랑말랑하고 귀여운 3D 점토(Claymation) 질감의 캐릭터 아트';
      styleDescEn = 'cute 3D claymation style, soft plasticine clay texture, tactile smooth finish, soft depth of field';
      break;
    case '애니메이션':
      styleDescKr = '청량하고 생동감 넘치는 일본 애니메이션 풍의 컬러풀 캐릭터 일러스트레이션';
      styleDescEn = 'vibrant anime aesthetic, high quality animation still, cel-shaded art, expressive';
      break;
    case '픽셀아트':
      styleDescKr = '레트로 감성의 정교한 8비트/16비트 고해상도 픽셀아트(Pixel Art)';
      styleDescEn = 'high quality retro 16-bit pixel art, detailed pixel sprites, crisp pixel borders';
      break;
    case '플랫 벡터':
      styleDescKr = '선명한 색감과 모던한 기하학적 형태의 2D 플랫 벡터(Flat Vector) 일러스트';
      styleDescEn = 'modern flat vector illustration, clean geometric shapes, bold clean vector lines';
      break;
    case '수채화':
      styleDescKr = '맑고 투명한 물감 번짐과 감성적인 붓 터치가 돋보이는 수채화(Watercolor) 아트';
      styleDescEn = 'delicate watercolor painting, soft translucent washes, artistic paper texture, painterly brushstrokes';
      break;
    case '봉제인형':
      styleDescKr = '포근하고 따뜻한 펠트 천과 꼼꼼한 자수 스티치 디테일이 살아있는 봉제인형 캐릭터';
      styleDescEn = 'cozy felt plush toy, embroidered stitching details, cute stuffed animal doll texture, soft felt';
      break;
    default:
      styleDescKr = '매력적인 디지털 캐릭터 일러스트레이션';
      styleDescEn = 'digital character illustration';
  }

  // 3. Subject (Age + Gender)
  let ageGenderKr = '';
  let ageGenderEn = '';
  const isFemale = state.gender === '여성';

  switch (state.age) {
    case '어린이':
      ageGenderKr = isFemale ? '천진난만하고 귀여운 어린이 소녀' : '천진난만하고 귀여운 어린이 소년';
      ageGenderEn = isFemale ? 'cute cheerful young girl (7-10 years old)' : 'cute cheerful young boy (7-10 years old)';
      break;
    case '청소년':
      ageGenderKr = isFemale ? '청량하고 발랄한 10대 청소년 소녀' : '청량하고 발랄한 10대 청소년 소년';
      ageGenderEn = isFemale ? 'charming teenage girl' : 'charming teenage boy';
      break;
    case '20대':
      ageGenderKr = isFemale ? '생기발랄하고 트렌디한 20대 여성' : '생기발랄하고 트렌디한 20대 남성';
      ageGenderEn = isFemale ? 'trendy attractive 20s young woman' : 'trendy handsome 20s young man';
      break;
    case '30대':
      ageGenderKr = isFemale ? '세련되고 성숙한 분위기의 30대 여성' : '단정하고 듬직한 30대 남성';
      ageGenderEn = isFemale ? 'stylish refined 30s woman' : 'sharp dependable 30s man';
      break;
    case '40대':
      ageGenderKr = isFemale ? '단아하고 신뢰감 넘치는 40대 여성' : '신뢰감 있고 온화한 40대 남성';
      ageGenderEn = isFemale ? 'graceful friendly 40s woman' : 'respectable warm 40s man';
      break;
    case '50대':
      ageGenderKr = isFemale ? '따뜻하고 우아한 인상의 50대 여성' : '온화하고 여유로운 인상의 50대 남성';
      ageGenderEn = isFemale ? 'warm elegant 50s woman' : 'distinguished gentle 50s man';
      break;
    case '60대 이상':
      ageGenderKr = isFemale ? '포근하고 온화한 미소를 지닌 할머니' : '포근하고 지혜로운 인상의 할아버지';
      ageGenderEn = isFemale ? 'kind-hearted gentle grandmother' : 'kind-hearted wise grandfather';
      break;
    default:
      ageGenderKr = `${state.age} ${state.gender}`;
      ageGenderEn = `${state.gender === '여성' ? 'female' : 'male'} character`;
  }

  // 4. Body Type
  let bodyKr = '';
  let bodyEn = '';
  switch (state.bodyType) {
    case '마른 체형':
      bodyKr = '슬림하고 여리여리한 체형';
      bodyEn = 'slender slim build';
      break;
    case '보통 체형':
      bodyKr = '자연스럽고 균형 잡힌 보통 체형';
      bodyEn = 'natural balanced average build';
      break;
    case '통통한 체형':
      bodyKr = '둥글둥글하고 볼살이 매력적인 귀여운 체형';
      bodyEn = 'soft cute chubby build with round cheeks';
      break;
    case '근육형':
      bodyKr = '어깨가 넓고 탄탄한 건강미 넘치는 근육형 체형';
      bodyEn = 'athletic toned muscular build with broad shoulders';
      break;
  }

  // 5. Hair (Length + Style + Color)
  let hairStyleName = state.hairStyle;
  let hairStyleEn = 'straight';
  if (state.hairStyle === '기타' && state.hairStyleCustom) {
    hairStyleName = state.hairStyleCustom;
    hairStyleEn = state.hairStyleCustom;
  } else if (state.hairStyle === '웨이브') {
    hairStyleEn = 'soft wavy';
  } else if (state.hairStyle === '곱슬머리') {
    hairStyleEn = 'curly';
  } else if (state.hairStyle === '묶은 머리') {
    hairStyleEn = 'tied ponytail/bun';
  }

  let hairLengthEn = 'medium length';
  if (state.hairLength === '스포츠형 짧은 머리') hairLengthEn = 'very short cropped buzz cut';
  else if (state.hairLength === '짧은 머리') hairLengthEn = 'short stylish hair';
  else if (state.hairLength === '단발머리') hairLengthEn = 'neat bob-cut hair';
  else if (state.hairLength === '중간 길이') hairLengthEn = 'shoulder-length medium hair';
  else if (state.hairLength === '긴 머리') hairLengthEn = 'long flowing hair';

  let hairColorEn = 'brown';
  if (state.hairColor === '검정') hairColorEn = 'pitch black';
  else if (state.hairColor === '다크 브라운') hairColorEn = 'deep dark brown';
  else if (state.hairColor === '초코 브라운') hairColorEn = 'rich chocolate brown';
  else if (state.hairColor === '애쉬 브라운') hairColorEn = 'ash brown';
  else if (state.hairColor === '밀크 브라운') hairColorEn = 'light milk tea brown';
  else if (state.hairColor === '회색') hairColorEn = 'silver gray';

  const hairKr = `${state.hairColor} 색상의 ${state.hairLength} ${hairStyleName}`;
  const hairEn = `${hairLengthEn}, ${hairStyleEn}, ${hairColorEn} hair`;

  // 6. Glasses
  const hasGlasses = state.glasses === '착용';
  const glassesKr = hasGlasses ? '트렌디한 둥근 안경을 착용하여 지적이면서도 다정한 느낌' : '안경을 쓰지 않은 또렷하고 맑은 눈망울';
  const glassesEn = hasGlasses ? 'wearing stylish rounded glasses' : 'no glasses, bright clear eyes';

  // 7. Background
  let bgKr = '';
  let bgEn = '';
  if (state.background === '흰색') {
    bgKr = '군더더기 없이 깔끔한 순백색 배경';
    bgEn = 'clean pure white solid background';
  } else if (state.background === '단색') {
    const matched = PASTEL_BACKGROUND_COLORS.find(c => c.hex.toLowerCase() === (state.backgroundColorCustom || '').toLowerCase());
    const colorLabel = matched ? matched.name : state.backgroundColorCustom;
    bgKr = `은은하고 부드러운 ${colorLabel} 컬러의 단색 배경`;
    bgEn = `minimalist solid pastel background (${state.backgroundColorCustom || '#A7F3D0'})`;
  } else if (state.background === '투명') {
    bgKr = '다양한 곳에 손쉽게 합성할 수 있는 투명 배경(Transparent Background)';
    bgEn = 'isolated on transparent background, PNG cutout look';
  } else if (state.background === '자연 풍경') {
    bgKr = '부드러운 햇살과 푸른 나무 잔디가 어우러진 평화로운 자연 야외 풍경 배경';
    bgEn = 'peaceful natural outdoor background with green grass and warm sunlight, soft bokeh';
  } else if (state.background === '도시 배경') {
    bgKr = '트렌디한 카페 거리와 모던한 건축물이 감성적으로 아웃포커싱된 도시 배경';
    bgEn = 'atmospheric city street background with modern cafe ambiance, soft blurred depth';
  } else if (state.background === '실내 배경') {
    bgKr = '따뜻하고 아늑한 조명이 감도는 포근한 실내 방 배경';
    bgEn = 'cozy warm indoor room background with soft ambient lighting';
  }

  // 8. Purpose & Framing
  let purposeKr = '';
  let purposeEn = '';
  const customPurpose = state.purpose === '기타' ? (state.purposeCustom || '캐릭터') : state.purpose;

  switch (state.purpose) {
    case '프로필':
      purposeKr = 'SNS 및 메신저 프로필 사진(Avatar)에 최적화된 상반신 중심 바스트 샷 구도로, 카메라를 향해 다정하게 아이컨택하며 미소 짓는 매력적인 인물 포즈';
      purposeEn = 'centered bust shot framing for profile avatar, head and shoulders, looking at viewer with warm smile, front lighting';
      break;
    case '스티커':
      purposeKr = '다이어리와 메신저 스티커 제작에 적합하도록 테두리가 깔끔한 하얀색 외곽선(White Sticker Die-Cut Contour) 처리가 되어 있으며, 동작과 감정이 풍부한 포즈';
      purposeEn = 'sticker design with thick clean white die-cut outline border, expressive pose, sticker sheet art, cute sticker aesthetic';
      break;
    case '이모티콘':
      purposeKr = '모바일 채팅 이모티콘에 최적화되어 감정 표현이 뚜렷하고, 손동작과 사랑스러운 표정이 시선을 사로잡는 구도';
      purposeEn = 'emoticon style, highly expressive emotional facial expression, communicative cute hand gesture, clear readable silhouette';
      break;
    case '키링':
      purposeKr = '아크릴 참(Keyring) 굿즈 형태의 매끄러운 컷아웃 실루엣, 상단에 작은 원형 키링 연결부 디테일과 반짝이는 아크릴 하이라이트가 가미된 형태';
      purposeEn = 'acrylic keychain charm mockup style, clear gloss acrylic edge highlight, top keychain hole ring detail, clean cutout charm design';
      break;
    case '굿즈':
      purposeKr = '머그컵, 엽서, 티셔츠 등 다양한 굿즈 프린팅에 적합하도록 정교한 그래픽 텍스처와 완성도 높은 색채 마감이 적용된 마스터피스 아트워크';
      purposeEn = 'high quality commercial merchandise artwork, suitable for print on t-shirt, mug and art print, rich vibrant colors';
      break;
    case '기타':
    default:
      purposeKr = `${customPurpose} 용도로 활용하기 좋도록 균형 잡힌 구도와 선명한 고해상도 그래픽`;
      purposeEn = `customized for ${customPurpose}, centered balanced composition, high aesthetic appeal`;
      break;
  }

  // Korean Combined Natural Prompt
  const koreanPrompt = [
    `${styleDescKr}입니다.`,
    `주인공은 ${ageGenderKr}이며, ${bodyKr}을 지니고 있습니다.`,
    `헤어스타일은 ${hairKr}을 하고 있으며, ${glassesKr}.`,
    `배경은 ${bgKr}으로 구성되어 캐릭터의 개성이 한눈에 돋보입니다.`,
    `${purposeKr}.`,
    `전체적으로 선명한 디테일과 따뜻하고 친근한 색채감이 돋보이는 최고 품질의 일러스트 작품입니다.`,
  ].join(' ');

  // English Combined Prompt (Optimized for Midjourney / DALL-E / Gemini)
  const englishPrompt = [
    `Masterpiece character illustration`,
    styleDescEn,
    ageGenderEn,
    bodyEn,
    hairEn,
    glassesEn,
    bgEn,
    purposeEn,
    `award winning quality, vibrant colors, clean sharp focus, beautifully detailed, 8k resolution`,
  ].join(', ');

  // Negative Prompt (Crucial for clean results in modern generators)
  const negativePrompt = 'ugly, deformed, bad anatomy, poorly drawn hands, poorly drawn face, extra limbs, blurry, pixelated artifacts, distorted eyes, text, watermark, signature, grain, low quality';

  return {
    koreanPrompt,
    englishPrompt,
    negativePrompt,
    warnings,
  };
}
