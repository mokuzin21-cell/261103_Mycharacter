# 나만의 AI 캐릭터 만들기 (AI Character Prompt Generator)

초등학생부터 성인까지 누구나 쉽게 자신을 닮은 AI 캐릭터 이미지 생성용 프롬프트를 자동으로 작성할 수 있는 반응형 웹 애플리케이션입니다.

---

## 🎨 주요 기능

1. **11가지 직관적인 질문**
   - **Q1. 성별:** 남성 / 여성
   - **Q2. 연령대:** 어린이 / 청소년 / 20대 / 30대 / 40대 / 50대 / 60대 이상
   - **Q3. 체형 (이미지 카드):** 마른 체형 / 보통 체형 / 통통한 체형 / 근육형
   - **Q4. 머리 길이 (이미지 카드):** 스포츠형 짧은 머리 / 짧은 머리 / 단발머리 / 중간 길이 / 긴 머리
   - **Q5. 머리 모양 (이미지 카드):** 생머리 / 웨이브 / 곱슬머리 / 묶은 머리 / 기타 (직접 입력 가능)
   - **Q6. 머리 색깔 (색상 버튼):** 검정 / 다크 브라운 / 초코 브라운 / 애쉬 브라운 / 밀크 브라운 / 회색
   - **Q7. 안경:** 착용 / 미착용
   - **Q8. 표정 (이미지 카드):** 밝은 미소 / 신나는 표정 / 차분한 표정 / 자신감 있는 표정 / 생각하는 표정 / 놀란 표정 / 수줍은 표정 / 화난 표정
   - **Q9. 그림 스타일 (이미지 카드):** 치비 / 라인아트 / 3D 클레이 / 애니메이션 / 픽셀아트 / 플랫 벡터 / 수채화 / 봉제인형
   - **Q10. 배경:** 흰색 / 단색 (파스텔 컬러 팔레트 & 커스텀 피커) / 투명 / 자연 풍경 / 도시 배경 / 실내 배경
   - **Q11. 사용 목적:** 프로필 / 스티커 / 이모티콘 / 키링 / 굿즈 / 기타 (직접 입력 가능)

2. **실시간 프롬프트 자동 작성**
   - 선택을 변경할 때마다 자연스러운 한국어 문장과 미드저니/DALL-E 최적화 영문 프롬프트가 즉시 생성됩니다.
   - Q8 표정 선택값에 따라 눈매, 입꼬리, 감정 디테일이 구체적인 묘사로 프롬프트에 직접 반영됩니다.
   - 사용 목적(프로필, 스티커, 키링 등)에 따라 카메라 구도, 조명, 외곽선(다이컷) 등의 키워드가 자동으로 최적화됩니다.
   - 상호 충돌하는 옵션(예: 스포츠형 짧은 머리 + 묶은 머리)에 대한 부드러운 조정 및 안내 팁 제공.

3. **편리한 부가 기능**
   - ⚡ 1클릭 추천 프리셋 (귀여운 초등학생, 발랄한 대학생, 3D 클레이 직장인, 포근한 봉제인형)
   - 📋 원클릭 클립보드 복사
   - ✏️ 프롬프트 직접 편집 및 작성 모드 (텍스트 자유 수정 기능)
   - 💾 프롬프트 텍스트 파일 (.txt) 다운로드
   - 🔄 처음부터 다시 선택하는 초기화 버튼
   - 📱 모바일(2열), PC(4열) 반응형 그리드 및 키보드 접근성 완벽 지원

---

## 🖼️ 이미지 카드 파일 안내

새로 제작된 고해상도 캐릭터 일러스트가 `public/images/` 폴더에 PNG 포맷으로 완벽하게 연동되어 있습니다.

### 이미지 파일 목록

| 구분 | 파일명 | 선택 항목 이름 |
| :--- | :--- | :--- |
| **Q3. 체형** | `body_slim.png` | 마른 체형 |
| | `body_average.png` | 보통 체형 |
| | `body_chubby.png` | 통통한 체형 |
| | `body_muscular.png` | 근육형 |
| **Q4. 머리 길이** | `hair_buzz.png` | 스포츠형 짧은 머리 |
| | `hair_short.png` | 짧은 머리 |
| | `hair_bob.png` | 단발머리 |
| | `hair_medium.png` | 중간 길이 |
| | `hair_long.png` | 긴 머리 |
| **Q5. 머리 모양** | `style_straight.png` | 생머리 |
| | `style_wavy.png` | 웨이브 |
| | `style_curly.png` | 곱슬머리 |
| | `style_tied.png` | 묶은 머리 |
| | `style_other.svg` | 기타 (직접 입력 아이콘) |
| **Q8. 표정** | `expression_smile.png` | 밝은 미소 |
| | `expression_excited.png` | 신나는 표정 |
| | `expression_calm.png` | 차분한 표정 |
| | `expression_confident.png` | 자신감 있는 표정 |
| | `expression_thinking.png` | 생각하는 표정 |
| | `expression_surprised.png` | 놀란 표정 |
| | `expression_shy.png` | 수줍은 표정 |
| | `expression_angry.png` | 화난 표정 |
| **Q9. 그림 스타일** | `art_chibi.png` | 치비 (SD 캐릭터) |
| | `art_lineart.png` | 라인아트 |
| | `art_clay.png` | 3D 클레이 |
| | `art_anime.png` | 애니메이션 |
| | `art_pixel.png` | 픽셀아트 |
| | `art_flat_vector.png` | 플랫 벡터 |
| | `art_watercolor.png` | 수채화 |
| | `art_plush.png` | 봉제인형 |

---

## 🚀 로컬 개발 및 실행

```bash
# 1. 의존성 설치
npm install

# 2. 로컬 개발 서버 실행
npm run dev

# 3. 브라우저에서 http://localhost:3000 접속
```

---

## 🌐 GitHub Pages 배포 방법

본 프로젝트는 `vite.config.ts`에 `base: './'` 상대 경로 설정이 완료되어 있어 GitHub Pages 서브디렉터리 환경에서도 이미지와 에셋이 깨짐 없이 완벽하게 작동합니다.

### 방법 1. GitHub Actions로 자동 배포 (권장)
1. GitHub 저장소의 `Settings` > `Pages`로 이동합니다.
2. `Build and deployment` > `Source`를 **GitHub Actions**로 설정합니다.
3. 저장소 루트에 `.github/workflows/deploy.yml` 파일을 생성하면 `main` 브랜치에 푸시될 때마다 자동으로 빌드 및 배포됩니다:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 방법 2. gh-pages 패키지로 배포
```bash
# gh-pages 패키지 설치
npm install --save-dev gh-pages

# package.json scripts에 추가:
# "deploy": "npm run build && gh-pages -d dist"

# 배포 실행
npm run deploy
```

---

## 📄 기술 스택
- **프레임워크:** React 19, TypeScript
- **빌더:** Vite 6
- **스타일링:** Tailwind CSS v4
- **아이콘:** Lucide React
- **배포 지원:** GitHub Pages, 정적 웹 호스팅 완벽 호환
