<div align="center">

# 🌵 fredly.dev

**기술과 커뮤니케이션의 힘으로 세상을 바꾸는 개발자의 기술 블로그**

[![Deploy Status](https://api.netlify.com/api/v1/badges/720440e3-bd73-49f8-8625-145e62975597/deploy-status)](https://app.netlify.com/sites/fredly-dev/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/version-1.0.1-brightgreen.svg)](https://github.com/suites/fredly-dev)
[![Made with Astro](https://img.shields.io/badge/Made%20with-Astro-ff5d01.svg)](https://astro.build)

[🌐 Live Demo](https://fredly.dev) • [📝 Blog Posts](https://fredly.dev) • [👤 About](https://fredly.dev/about)

</div>

---

## 🛠️ Tech Stack

<div align="center">

![Astro](https://img.shields.io/badge/Astro-ff5d01?style=for-the-badge&logo=astro&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-1B1F24?style=for-the-badge&logo=mdx&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

</div>

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- pnpm (권장) 또는 npm

### Installation

```bash
# Repository 클론
git clone https://github.com/suites/fredly-dev.git
cd fredly-dev

# 의존성 설치
pnpm install

# 개발 서버 시작
pnpm dev
```

### Available Scripts

```bash
pnpm dev       # 개발 서버 실행 (http://localhost:4321)
pnpm build     # 프로덕션 빌드
pnpm preview   # 빌드 미리보기
pnpm lint      # 코드 린팅
pnpm format    # 코드 포맷팅
```

## 📁 Project Structure

```
src/
├── components/          # 재사용 가능한 Astro 컴포넌트
│   ├── Bio.astro       # 작성자 프로필
│   ├── CategoryMenu.astro # 카테고리 네비게이션
│   ├── Header.astro    # 헤더 컴포넌트
│   └── PostCard.astro  # 포스트 카드
├── content/
│   └── blog/           # MDX 블로그 포스트
│       ├── web/        # 웹 개발 관련
│       ├── algorithm/  # 알고리즘 관련
│       └── ...         # 기타 카테고리
├── layouts/            # 레이아웃 컴포넌트
│   ├── Layout.astro    # 기본 레이아웃
│   └── BlogPost.astro  # 블로그 포스트 레이아웃
├── pages/              # 라우팅 페이지
│   ├── index.astro     # 홈페이지
│   ├── category/       # 카테고리 페이지
│   └── [...slug].astro # 동적 블로그 포스트
├── styles/             # 전역 스타일
└── utils/              # 유틸리티 함수
```

## 📝 Content Management

### 새 포스트 작성

```bash
# 카테고리 폴더에 새 MDX 파일 생성
src/content/blog/{category}/{post-slug}/index.mdx
```

### 포스트 프론트매터 예시

```yaml
---
title: "포스트 제목"
description: "포스트 설명"
date: 2024-01-01
category: "web"
emoji: "🚀"
tags: ["javascript", "react", "web"]
---

# 포스트 내용을 여기에 작성하세요!
```

## 🎨 Customization

### 카테고리 추가

`src/consts.ts`에서 새로운 카테고리를 추가할 수 있습니다:

```typescript
export const CATEGORIES: readonly Category[] = [
  {
    name: '새 카테고리',
    slug: 'new-category',
    color: '#ff6b6b',
    icon: '🎯',
    link: '/category/new-category',
  },
  // ... 기존 카테고리들
];
```

### 스타일 수정

- 전역 스타일: `src/styles/global.css`
- 컴포넌트별 스타일: 각 `.astro` 파일 내 `<style>` 태그

## 🚀 Deployment

이 프로젝트는 Netlify에 배포되어 있습니다. 새로운 커밋이 main 브랜치에 푸시되면 자동으로 배포됩니다.

### Manual Deployment

```bash
# 빌드
pnpm build

# dist 폴더를 호스팅 서비스에 업로드
```

## 🤝 Contributing

1. 이 저장소를 Fork 하세요
2. 새로운 기능 브랜치를 만드세요 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋하세요 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시하세요 (`git push origin feature/amazing-feature`)
5. Pull Request를 열어주세요

## 📄 License

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 👨‍💻 Author

**yoon.homme**
- Website: [fredly.dev](https://fredly.dev)
- GitHub: [@suites](https://github.com/suites)
- LinkedIn: [fredyoons](https://www.linkedin.com/in/fredyoons)
- Email: woosiks.io@gmail.com

---

<div align="center">

**⭐ 이 프로젝트가 도움이 되었다면 스타를 눌러주세요!**

Made with ❤️ by [yoon.homme](https://github.com/suites)

</div>