# CLAUDE.md

Donghyeon Kim의 개인 포트폴리오 / 기술 블로그 사이트. **Astro + React (R3F) + Tailwind v4** 기반으로 GitHub Pages에 배포한다.

> **2026 리디자인 진행 중**. 기존 Jekyll + just-the-docs 스택은 [`claude/sleepy-franklin-53c439`](.) 브랜치에서 완전히 대체됨. master 합치기 전까지 기존 사이트(Jekyll)는 그대로 운영.

## Stack

- **Astro** `^5.1` — 정적 사이트, MDX 콘텐츠 콜렉션
- **React 18** + **@react-three/fiber** + **@react-three/drei** + **three.js** — Hero/Playground의 WebGL island
- **Tailwind CSS v4** (`@tailwindcss/vite`) — `@theme {}` 토큰 기반
- **TypeScript strict**
- **Node 20+** (CI는 Node 20, 로컬은 24)
- **Deploy**: GitHub Actions → GitHub Pages, `master` 푸시 시 자동 ([.github/workflows/deploy.yml](.github/workflows/deploy.yml))

## 디자인 토큰

전부 [`src/styles/tokens.css`](src/styles/tokens.css)의 Tailwind v4 `@theme {}` 블록에 정의. 직접 색상 hex/rem 값 박지 말 것.

- **Surface**: `--color-bg-0/1/2`, `--color-border`, `--color-text-0/1/2`
- **Brand (signature orange)**: `--color-brand-100/300/500/600` — `#FF6B35`이 메인
- **Font**: `--font-sans` (Geist), `--font-mono` (Geist Mono)
- **Motion**: `--ease-out-expo`, `--dur-sm/md/lg`

본문 타입스케일은 `.t-display / .t-h1 / .t-h2 / .t-meta` 유틸 (`global.css`).

## 디렉토리 구조

```
src/
  components/         Astro/React 컴포넌트 (Nav.astro, Footer.astro, Hero/*)
  content/            Astro Content Collections (projects, log)
  layouts/            Base.astro
  pages/              파일 기반 라우팅
    index.astro       /
    projects/         /projects, /projects/[slug]
    experience.astro  /experience
    skills.astro      /skills
    awards.astro      /awards
    patents.astro     /patents
    press.astro       /press
    playground.astro  /playground (셰이더 데모)
    log/              /log, /log/[slug]
  styles/
    tokens.css        디자인 토큰 (@theme)
    global.css        Tailwind import + 유틸
public/               정적 에셋 (favicon 등). 빌드 시 그대로 복사.
assets/images/        ★ 기존 Jekyll 시절 이미지. Phase 5에서 public/images/로 이전 예정.
docs/                 ★ 기존 Jekyll Dev-Log 마크다운. Phase 7에서 MDX로 마이그레이션 후 제거.
redesign/             리디자인 작업용 plan/TODO 문서. 작업 종료 시 정리.
```

`★` 표시는 마이그레이션 완료 후 삭제할 임시 자산.

## 경로 alias

- `~/*` → `src/*` ([tsconfig.json](tsconfig.json))

## 로컬 실행

```bash
npm install
npm run dev          # http://localhost:4321
npm run build        # dist/ 출력
npm run preview      # 빌드 결과 미리보기
npm run check        # astro check (TS/Astro 타입 검증)
```

## 콘텐츠 / 작업 컨벤션

- **본문 언어**: 영어. Hero/About 일부는 한/영 토글 검토 중.
- **이미지**: `public/images/<slug>/...` 경로로 통일 예정. 마크다운 본문에선 절대 경로(`/images/...`)로 참조.
- **셰이더**: GLSL은 `*.frag` / `*.vert` / `*.glsl` 파일로 분리하고 vite raw import (`?raw`) 또는 `assetsInclude` 통해 문자열로 로드.
- **R3F 사용**: hero/playground처럼 인터랙션이 필요한 곳만 React island로 격리 (`client:load` / `client:visible`). 나머지는 정적 Astro.

## 작업 시 주의

- **`master` 브랜치에 머지하면 즉시 배포** — 리디자인이 완전히 끝나기 전까진 PR 또는 별도 브랜치에서만 작업.
- **`prefers-reduced-motion`** 시 셰이더는 정지 프레임으로 fallback. `<768px`는 정적 PNG로.
- **Tailwind v4는 `tailwind.config.js`가 없음** — 모든 토큰 커스텀은 `tokens.css`의 `@theme {}` 안에서.
- 콘텐츠 갭(에셋 누락 등)은 [redesign/content-todo.md](redesign/content-todo.md)에 트래킹.

## 리디자인 진행 상황

- ✅ Phase 0 — 콘텐츠 매핑 (이력서 → 사이트 섹션)
- ✅ Phase 1 — 디자인 토큰
- ✅ Phase 2 — Hero 셰이더 컨셉 (Lightfield Caustics)
- ✅ Phase 3 — Astro 스캐폴드 + 빌드 검증
- ⬜ Phase 4 — Hero 셰이더 + home content
- ⬜ Phase 5 — Projects bento grid
- ⬜ Phase 6 — Experience / Skills / Awards / Patents / Press
- ⬜ Phase 7 — Dev-Log 마이그레이션
