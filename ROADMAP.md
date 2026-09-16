# 🗺️ 백경환의 T4 Tech Blog: 기능 개발 로드맵 & 명세서

> **저장소**: [BKH-sss/notion-blog](https://github.com/BKH-sss/notion-blog)  
> **최종 갱신일**: 2026-09-16  
> **상태**: 진행 중 (Active Development)

본 문서는 `notion-blog`의 단계별 기능 구현 목표와 기술적 명세(Technical Specifications), 마일스톤을 정리한 문서입니다.

---

## 📊 진행 상황 요약 (Progress Overview)

| 마일스톤 | 범주 | 목표 일정 | 진행률 | 상태 |
| :--- | :--- | :--- | :--- | :--- |
| **M1** | 핵심 CMS & 블록 렌더링 고도화 | 2026 Q3 | `30%` | 🟡 진행 중 |
| **M2** | UI/UX & 독서 경험 극대화 | 2026 Q3 | `10%` | 🟡 기획/착수 |
| **M3** | 검색 & 분류 아카이브 시스템 | 2026 Q4 | `0%` | ⚪ 대기 |
| **M4** | 인터랙션 & 커뮤니티 위젯 | 2026 Q4 | `25%` | 🟡 부분 적용 |
| **M5** | SEO & 웹 바이탈 성능 최적화 | 2026 Q4 | `40%` | 🟡 최적화 진행 |
| **M6** | BKH 생태계 (Portal Hub, Skadi) 연계 | 2027 Q1 | `20%` | 🟡 링크 완료 |
| **M7** | CI/CD & DevOps 자동화 | 2027 Q1 | `0%` | ⚪ 대기 |

---

## 🎯 마일스톤별 세부 과제 (Milestones & Tasks)

### 📌 Milestone 1: 핵심 CMS & 블록 렌더링 고도화 (Core Engine)
- [x] **기본 Notion API 연동**: Notion Private Client 기반 데이터베이스 패칭
- [ ] **`/api/revalidate` 온디맨드 ISR 웹훅 활성화**:
  - Notion API 웹훅 또는 Zapier / GitHub Action을 통해 글 수정 시 Vercel 특정 경로 즉시 퍼지
  - 시크릿 토큰(`REVALIDATE_TOKEN`) 기반 보안 인증
- [ ] **코드 블록(Code Block) 고도화**:
  - PrismJS 테마 커스터마이징 (One Dark Pro / Dracula 스타일)
  - 코드 복사 시 클립보드 피드백 애니메이션
  - 언어별 로고 아이콘(TS, JS, Python, Rust, Go, HTML, CSS 등) 헤더 탑재
- [ ] **수식 및 다이어그램 네이티브 지원**:
  - KaTeX 스타일시트 최적화로 번들 사이즈 최소화
  - Mermaid 다이어그램 SSR/CSR 하이드레이션 오류 방지
- [ ] **노션 임시 이미지 만료(403) 방지 프록시**:
  - 노션 S3의 서명된 URL(Signed URL)이 만료되는 이슈를 방지하기 위해 Next.js Image Optimization 캐시 또는 외부 스토리지(S3/Cloudinary) 자동 백업

---

### 📌 Milestone 2: UI/UX & 독서 경험 극대화 (Design System)
- [ ] **상단 독서 진행도 인디케이터 (Reading Progress Bar)**:
  - Framer Motion 또는 순수 CSS 가상 요소로 60fps 부드러운 스크롤 추적
- [ ] **우측 고정 목차 네비게이션 (Sticky Table of Contents)**:
  - 본문의 `H1`, `H2`, `H3` 태그 자동 파싱 및 계층 트리 렌더링
  - 현재 뷰포트 내 헤딩 활성화(Active State) 표시
  - 모바일에서는 플로팅 드롭다운 형태로 접힘 지원
- [ ] **피드 뷰 모드 스위처 (View Mode Switcher)**:
  - 갤러리 카드 뷰 ↔ 미니멀 리스트 뷰 원클릭 토글
  - 사용자의 선택을 `localStorage`에 저장하여 유지
- [ ] **글 예상 독서 시간 계산기 (Reading Time Calculator)**:
  - 글자 수 및 코드 블록 가중치를 고려한 한국어 특화 읽기 시간 알고리즘

---

### 📌 Milestone 3: 검색 & 분류 아카이브 시스템 (Taxonomy & Search)
- [ ] **Command Palette 즉시 검색 모달 (`Cmd/Ctrl + K`)**:
  - `cmdk` 또는 커스텀 모달 기반
  - 퍼지 검색(Fuse.js)을 활용한 오타 허용 및 초고속 인덱싱
- [ ] **다중 태그 교차 필터링**:
  - 여러 태그를 동시에 선택하여 AND/OR 조건으로 포스트 필터링
- [ ] **시리즈(연재물) 묶음 뷰어 (`/series/[slug]`)**:
  - 예: `[Next.js 완전 정복 시리즈 1~5편]`처럼 연관 글을 순서대로 모아보는 전용 레이아웃

---

### 📌 Milestone 4: 인터랙션 & 커뮤니티 위젯 (Interactivity)
- [ ] **Giscus(GitHub Discussions) 댓글 시스템 도입**:
  - GitHub 계정으로 간편 댓글 작성
  - 다크/라이트 테마 자동 동기화 (`giscus-theme`)
  - 토론 및 피드백 문화 활성화
- [ ] **포스트 박수(Clap) / 좋아요 위젯**:
  - Medium 스타일의 연타 가능한 박수 인터랙션
  - 서버리스 KV(Upstash Redis)를 통한 무서버 실시간 집계
- [ ] **방문자 및 누적 조회수 카운터**:
  - 어뷰징 방지를 위한 세션별 1일 1회 조회수 집계

---

### 📌 Milestone 5: SEO, 성능 최적화 & 애널리틱스 (Growth)
- [ ] **`@vercel/og` 기반 다이내믹 소셜 썸네일 생성기**:
  - 글마다 고유한 OG 이미지(제목, 태그, 프로필)를 Edge Function에서 0.1초 만에 렌더링
- [ ] **Google Lighthouse Core Web Vitals 95+ 달성**:
  - LCP(Largest Contentful Paint) < 1.2s
  - CLS(Cumulative Layout Shift) = 0
  - Next/Font를 이용한 폰트 로딩 깜빡임(FOIT) 제거
- [ ] **검색 포털 색인 자동화**:
  - 네이버 서치어드바이저 & 구글 서치콘솔 자동 색인 요청 파이프라인

---

### 📌 Milestone 6: BKH 생태계 연계 (Ecosystem)
- [ ] **Skadi Discord Bot 연동 알림**:
  - 새 포스트가 노션에서 `Public`으로 변경되면 디스코드 알림 채널로 임베드 카드 자동 전송
- [ ] **Portal Hub (`portal-hub`) 상호 연계**:
  - 포털 상단/메뉴에 'T4 기술 블로그' 링크 연결
  - 포털의 최신 IT 뉴스 카테고리와 블로그 연계 배너

---

## 🛠️ 기여 및 작업 방식 (Workflow)

1. 새 기능 개발 시 이슈 또는 위 로드맵 항목을 기반으로 브랜치 생성 (`feat/기능이름`)
2. 기능 구현 후 `yarn lint` 및 빌드 검증 수행
3. PR 생성 또는 `master` 브랜치에 정기 배포
