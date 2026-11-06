# From Performance to Research

Music × Technology × Human Experience — 개인 연구 포트폴리오 (GitHub Pages).

빌드 과정이 없는 정적 사이트입니다. `index.html`을 브라우저로 열면 바로 보이고, `main` 브랜치에 push하면 GitHub Pages에 그대로 배포됩니다.

## 내용 수정 — `js/content.js`만 고치면 됩니다

| 수정할 것 | 위치 |
|---|---|
| 이름, 사진, 이메일, Instagram | `profile` |
| CV PDF 다운로드 | `profile.cvFile` → 예: `"assets/cv/cv.pdf"` |
| 논문·포스터 PDF (Research·Publications·상세 페이지 공통) | 파일 상단 `PAPER_STRESS_PREDICTION`, `POSTER_STRESS_PREDICTION` |
| 스트레스 예측 상세 페이지 (`stress-prediction.html`) 정보·개요·자료 카드 | `research` → `stress-prediction` 프로젝트의 `page` |
| 첫 화면 사진·문구 | `hero` |
| 첫 화면 About 문장(리드·본문), 연구 관심 태그 | `about` |
| 연구 프로젝트 (배열 순서 = 타임라인 순서) | `research` |
| 논문 목록 | `publications` |
| 특허 출원 목록 | `patents` |
| Archive (사진 기록) | `archive` |
| 공연 경력 (Archive·CV 공통) | `performances` |
| CV 항목 | `cv` |

규칙
- URL이 `null`이면 버튼이 비활성화된 **soon** 상태로 표시됩니다.
- `"[EMAIL]"`처럼 대괄호로 쓴 값은 placeholder로 인식되어 흐리게 표시되고 링크가 걸리지 않습니다.
- 프로젝트에 `role`이 없으면 "My Role" 줄이 표시되지 않습니다. `context`는 제목 아래 한 줄 설명이며, 그룹 헤더와 겹치면 생략하세요. `details`가 있으면 펼침형 상세 영역이 생깁니다.
- 상세 페이지 자료 카드의 `file`이 `null`이면 링크 없이 "in preparation"으로 표시됩니다. `preview: true`면 PDF 뷰어가 페이지 안에 표시되고, 휴대폰·태블릿에서는 `image`(포스터 이미지)가 대신 보입니다.
- CV 항목에 `placeholder: true`를 주면 "추후 입력" 스타일로 표시됩니다. 실제 내용을 넣은 뒤 지우세요.

이미지 — 파일만 해당 경로에 넣으면 바로 표시됩니다 (없으면 깔끔한 placeholder)
- `assets/images/portrait-main.jpg` — 프로필 사진 (사이드바 `profile.photo`, 첫 화면 `hero.image`)
- Research 카드는 이미지 없이 텍스트로만 표시됩니다.
- Archive (`assets/images/archive/`) — 세 묶음
  - I. Posters: `poster-*.jpg` 9장, 최신순 (포스터는 `layout: "poster"`, 한 줄에 3장, 원본 비율 그대로 표시)
    - 챕터에 `view: "shelf"`가 있으면 곡선 포스터 선반으로 표시 (드래그·화살표·연도 눈금자, 가운데 포스터 클릭 시 크게 보기). 이 줄을 지우면 3장씩 격자로 돌아감
    - `spine`: 선반에서 보이는 포스터 옆면 색 (예: `"#201e20"`)
  - II. Performance: `ensemble-01.jpg`, `performance-01.jpg` (Concert), `performance-02.jpg` (Graduation Recital)
  - III. Studio: `studio-01.jpg`, `studio-02.jpg`
  - 제목·연도·장소(hover에 표시)와 이미지 크기(`layout`)는 `js/content.js`의 `archive`에서 수정. 사진 추가는 항목을 복사해 추가하면 됩니다. `position`으로 잘리는 위치를 정할 수 있습니다 (예: `"50% 100%"` = 아래쪽 유지).
- 경로를 바꾸려면 `js/content.js`의 `image` / `photo` 값을 수정
- 사이드바 사진의 얼굴 위치 조정: `css/style.css`의 `.avatar img` (`scale`, `transform-origin`)

기타 파일
- 논문 PDF → `assets/papers/`
- CV PDF → `assets/cv/`

## 구조

```
index.html          레이아웃 뼈대
css/style.css       디자인 (색상·폰트 변수는 파일 상단 :root)
js/content.js       ★ 모든 텍스트/데이터
js/components.js    재사용 컴포넌트: Sidebar, Navigation, KeywordTag,
                    ResearchCard, PublicationItem, PatentItem,
                    CVSection, LinkButton
js/staff.js         첫 화면의 오선 → 음파 애니메이션
js/main.js          페이지 조립, 스크롤 하이라이트, 모바일 메뉴
js/project.js       프로젝트 상세 페이지 조립 (stress-prediction.html)
js/shelf.js         Archive 포스터 곡선 선반 + 크게 보기 화면
```
