/* =====================================================================
   SITE CONTENT — 한국어
   ---------------------------------------------------------------------
   Korean text laid over js/content.js when the visitor picks 한국어.
   Only text lives here; paths, links, years and layout come from
   content.js.

   How it lines up
   - Same structure as content.js. Lists line up by position: the 2nd
     item here translates the 2nd item there.
   - Leave a value out (or write null) to keep the English text — e.g.
     paper and patent titles stay in their official English form.
   - When you add an item to content.js, add its Korean here at the same
     position (or it simply shows in English).
   ===================================================================== */

window.SITE_KO = {
  profile: {
    name: "현수진",
    title: "연구 인턴",
    affiliation: "KAIST IBD Lab",
    background: "유포니움 전공",
    school: "한국예술종합학교",
    fields: "음악기술 · HCI · UX · AI",
    tagline: "음악 × 기술 × 인간 경험",
  },

  nav: [
    { label: "소개" },
    { label: "연구" },
    { label: "논문" },
    { label: "특허" },
    { label: "아카이브" },
    { label: "이력" },
  ],

  hero: {
    imageAlt: "현수진",
    statement: "연주에서 연구로",
    trajectory: ["음악 연주", "음악과 기술", "HCI / UX", "AI / 데이터", "인간 중심 연구"],
  },

  about: {
    lead: "연주자로서의 경험은 제가 기술, 인터랙션, 인간 경험에 대해 던지는 질문의 출발점입니다.",
    paragraphs: [
      "음악 연주를 전공한 배경을 바탕으로, 기술이 연주자와 관객, 그리고 사용자에게 더 나은 경험을 만들어 줄 수 있는 방법을 탐구하고 있습니다.",
    ],
    interests: [
      "음악기술",
      "HCI",
      "UX",
      "AI와 음악",
      "인간 중심 디자인",
      "라이프로그·웨어러블 데이터",
      "인터랙티브 시스템",
    ],
  },

  research: [
    {
      // MATINE, KAIST
      meta: "이진우 교수 · 진행 중 · 2026",
      projects: [
        {
          title: "호흡과 악기 소리: 센서 기반 연구",
          context: "Yamaha 센서 무상 대여",
          summary:
            "Yamaha에서 무상으로 대여한 센서를 활용해, 연주자의 호흡이 악기 소리에 어떤 영향을 주는지 탐구하는 진행 중인 연구 프로젝트입니다.",
        },
      ],
    },
    {
      // IBD Lab, KAIST
      meta: "이지현 교수 · 진행 중 · 2026",
      projects: [
        {
          title: "생성형 AI 기반 디자인 해석 및 평가",
          summary: "생성형 AI를 활용해 디자인을 해석하고 평가하는 기술을 개발하는 연구입니다.",
          role: ["데이터 수집", "웹 서비스 조사", "데이터 분류", "디자인 평가 기준 연구 지원"],
        },
        {
          title: "스마트 미러 프로젝트",
          summary: "인터랙티브 경험과 인간 중심 기술을 탐구하는 스마트 미러 프로젝트에 참여했습니다.",
        },
      ],
    },
    {
      group: "기타 연구 경험",
      projects: [
        {
          // Paper title stays in English (official title).
          context: "DACON × ETRI 라이프로그 데이터셋 / 논문 경진대회",
          summary:
            "수면 전 라이프로그 특징, 사용자 기준선 기반 Z-score, 과거 수면·설문 이력을 활용한 개인화 스트레스 예측 연구입니다.",
          page: {
            info: [
              { label: "학회", value: "ICTC 2026" },
              { label: "발표 형식", value: "포스터 발표" },
              { label: "저자" }, // names stay as in the paper
              { label: "배경", value: "DACON × ETRI 라이프로그 데이터셋 / 논문 경진대회" },
            ],
            affiliations: ["홍익대학교 전자전기공학", "KAIST 문화기술대학원 IBD Lab"],
            overview: [
              "이 연구는 DACON/ETRI 라이프로그 데이터셋 2024의 스마트폰·웨어러블 데이터로 수면 전 스트레스(Q3)를 예측합니다.",
              "취침 전 30분 동안의 행동·환경 특징에, 각 신호를 그 사람의 평소 기준선과 비교해 읽는 개인화 Z-score 특징과 최근 설문·수면 이력을 결합했습니다.",
              "정규화 로지스틱 회귀 모델을 중첩 시간순 검증과 중첩 사용자 제외(leave-one-user-out) 검증으로 평가했습니다.",
            ],
            materials: [
              { title: "학회 포스터", note: "ICTC 2026 · 포스터 발표" },
              { title: "논문", note: "ICTC 2026 · 논문 전문 (PDF)" },
            ],
          },
          links: [
            { label: "포스터 & 논문" },
            { label: "논문 목록" },
            { label: "논문 보기" },
          ],
        },
      ],
    },
    {
      // ETRI
      meta: "연구 보조원 · 2026년 7월 – 8월",
      projects: [
        {
          title: "멀티모달 인터페이스 평가",
          context: "조건부 자율주행",
          summary: "조건부 자율주행 환경에서 멀티모달 인터페이스의 효과를 평가하는 사용자 실험을 지원했습니다.",
        },
      ],
    },
  ],

  // Paper titles, authors and venues stay in English (official form).
  publications: [
    {
      status: ["수정 후 게재 승인", "SCOPUS"],
      links: [{ label: "논문 보기" }],
    },
    {
      affiliations: ["홍익대학교", "KAIST 문화기술대학원 IBD Lab"],
      status: ["게재 승인 · ICTC 2026", "학회 발표 · 제주"],
      context: "DACON × ETRI 라이프로그 데이터셋 / 논문 경진대회",
      description:
        "수면 전 라이프로그 특징, 사용자 기준선 기반 Z-score, 과거 수면·설문 이력을 활용한 개인화 스트레스 예측 연구입니다.",
      links: [{ label: "논문 보기" }, { label: "포스터 보기" }, { label: "프로젝트 페이지" }],
    },
  ],

  // Patent titles stay in English until the official Korean titles are added.
  patents: [
    { status: "특허 출원", filed: "2026년 3월 10일" },
    { status: "특허 출원", filed: "2026년 3월 10일" },
  ],

  performances: [
    {
      // 2024
      items: [
        { title: "뮤지카 유포늄 튜바 앙상블", venue: "예술의전당" },
        { title: "아르테늄 브라스밴드 with 데이비드 차일즈", venue: "부천아트센터 콘서트홀" },
      ],
    },
    {
      // 2023
      items: [
        { title: "한국예술종합학교 졸업연주회", venue: "한국예술종합학교 이강숙홀" },
        { title: "아르테늄 브라스밴드 with 바스티앙 보메", venue: "건국대학교 새천년관 대공연장" },
        { title: "바스티앙 보메 마스터클래스", venue: "한국예술종합학교" },
      ],
    },
    {
      // 2022
      items: [
        { title: "제주국제관악콩쿠르 참가", venue: "제주" },
        { title: "국립심포니오케스트라 with 알렉산드르 말로페예프", venue: "통영국제음악당" },
        { title: "국립심포니오케스트라", detail: "무소륵스키 〈전람회의 그림〉 유포니움 솔로", venue: "예술의전당 콘서트홀" },
        { title: "서울윈드오케스트라 제110회 정기연주회", detail: "카를로스 펠리세르 교향곡 1번 국내 초연", venue: "롯데콘서트홀" },
        { title: "크누아윈드오케스트라", venue: "한국예술종합학교 이강숙홀" },
        { title: "실내악 연주회", venue: "한국예술종합학교 이강숙홀" },
      ],
    },
    {
      // 2020
      items: [{ title: "Euphonium Project in Korea", venue: "모차르트홀" }],
    },
    {
      // 2019
      items: [
        { title: "진해 군악의장페스티벌", detail: "마칭밴드 공연", venue: "진해" },
        { title: "코랑탱 모르방 마스터클래스", venue: "한국예술종합학교" },
      ],
    },
  ],

  archive: {
    title: "아카이브",
    subtitle: "포스터, 공연, 스튜디오 사진, 그리고 프로젝트.",
    chapters: [
      {
        title: "포스터",
        note: "독주회와 공연 포스터.",
        items: [
          { kind: "앙상블", title: "코리아 로우 브라스 앙상블 제7회 정기연주회", place: "예술의전당 IBK챔버홀" },
          { kind: "브라스밴드", title: "코리아심포닉브라스 「황금의 도시」", place: "경주예술의전당 화랑홀" },
          { kind: "앙상블", title: "코리아 로우 브라스 앙상블 제5회 정기연주회", place: "예술의전당 IBK챔버홀" },
          { kind: "앙상블", title: "뮤지카 유포늄 튜바 앙상블 정기연주회 — Re:TURN", place: "예술의전당 리사이틀홀" },
          { kind: "브라스밴드", title: "아르테늄 브라스밴드 마스터즈 시리즈 with 데이비드 차일즈", place: "부천아트센터 콘서트홀" },
          { kind: "유포니움 독주회", title: "졸업연주회", place: "한국예술종합학교 이강숙홀" },
          { kind: "오케스트라", title: "국립심포니오케스트라 — 전람회의 그림", place: "예술의전당 콘서트홀" },
          { kind: "윈드오케스트라", title: "크누아윈드오케스트라 제39회 정기연주회", place: "한국예술종합학교 이강숙홀" },
          { kind: "앙상블", title: "Euphonium Project in Korea — Ensemble", place: "모차르트홀" },
        ],
      },
      {
        title: "공연",
        note: "무대 위에서 — 공연, 앙상블, 독주회.",
        items: [
          { kind: "앙상블", title: "유포니움 & 튜바 4중주" },
          { kind: "공연" },
          { kind: "졸업연주회", title: "한국예술종합학교 졸업연주회", place: "한국예술종합학교 이강숙홀" },
        ],
      },
      {
        title: "스튜디오",
        note: "정지된 장면 속의 연주자.",
        items: [
          { kind: "스튜디오", title: "유포니움과 함께한 인물 사진" },
          { kind: "스튜디오", title: "필름 인물 사진" },
        ],
      },
      {
        title: "프로젝트",
        note: "협업 및 수업 프로젝트.",
        items: [
          {
            kind: "오디오 이머시브 사운드 작품",
            title: "악몽 (Nightmare)",
            context: "교양 수업 ‘뮤지킹’ 기말 프로젝트 · 6인 팀 공동 기획·제작",
            role: "‘텅 빈 학교에서 꾸는 악몽’이라는 콘셉트를 제안하고, 사운드에 사용된 유포니움 호흡 소리를 녹음했습니다.",
            text: [
              "밤의 텅 빈 학교를 소재로 한 오디오 이머시브 작품입니다.",
              "강의실의 청중은 엎드려 눈을 감은 채 이어폰이나 강의실 스피커로 같은 사운드를 듣습니다. 빗소리, 시계 초침, 바람에 흔들리는 문, 삐걱이는 책상, 라디오 소음이 철현금 선율 위에 겹쳐집니다.",
              "사람으로 가득한 익숙한 강의실을 텅 비고 기묘한 공간으로 느끼게 하여, 각자는 소리 속에 홀로 있지만 그 경험은 강의실 전체가 함께 나누도록 하는 것이 목표였습니다.",
            ],
          },
        ],
      },
    ],
    outro: { text: "연주에서 연구로 — 기록은 계속됩니다.", label: "연구" },
  },

  cv: [
    {
      title: "학력",
      entries: [{ heading: "한국예술종합학교", sub: "유포니움 전공" }],
    },
    {
      title: "연구 경력",
      entries: [
        {
          heading: "연구 프로젝트 참여",
          sub: "KAIST MATINE (이진우 교수)",
          period: "2026 – 현재",
          items: ["Yamaha에서 무상 대여한 센서를 활용해 호흡이 악기 소리에 주는 영향 연구"],
        },
        {
          heading: "연구 인턴",
          sub: "KAIST IBD Lab (이지현 교수)",
          period: "2026 – 현재",
          items: ["생성형 AI 기반 디자인 해석 및 평가", "스마트 미러 프로젝트"],
        },
        {
          heading: "연구 보조원 – 멀티모달 인터페이스 평가",
          sub: "ETRI AI로봇UX연구실",
          period: "2026년 7월 – 8월",
          items: ["조건부 자율주행 환경에서 멀티모달 인터페이스 효과 평가 사용자 실험 지원"],
        },
      ],
    },
    {
      // Paper titles and authors stay in English.
      title: "논문",
      entries: [
        { meta: "Archives of Design Research · 수정 후 게재 승인 · SCOPUS" },
        { meta: "게재 승인 · ICTC 2026 · 학회 발표, 제주" },
      ],
    },
    {
      // Patent titles stay in English.
      title: "특허",
      entries: [
        { sub: "특허 출원 · 출원번호 10-2026-0042437 · 출원일 2026년 3월 10일" },
        { sub: "특허 출원 · 출원번호 10-2026-0042438 · 출원일 2026년 3월 10일" },
      ],
    },
    {
      title: "경력",
      entries: [
        {
          heading: "유포니움 강사",
          sub: "배문고등학교 관악부, 서울",
          period: "2023 – 현재",
          items: ["관악부 학생 단원 대상 월 1회 유포니움 파트 레슨"],
        },
        { heading: "프론트엔드 개발자" },
        { heading: "공연 기획 및 운영" },
      ],
    },
    {
      title: "주요 공연",
      note: { text: "전체 공연 기록은", label: "아카이브", after: "에서 볼 수 있습니다." },
    },
    {
      title: "수상 및 활동",
      groups: [
        {
          label: "수상",
          entries: [
            { heading: "음악교육신문사 콩쿠르 1위" },
            { heading: "한국음악협회 콩쿠르 1위" },
            { heading: "전국 대학 관악 경연 금관 부문 2위" },
          ],
        },
        {
          label: "창업 및 활동",
          entries: [
            { heading: "KAIST 앱 창업 프로그램 6기", sub: "참여", period: "2026 – 현재" },
            { heading: "2026 PIN UP 콘셉트 디자인 어워드", sub: "참가" },
          ],
        },
      ],
    },
    {
      title: "자격 및 교육",
      groups: [
        {
          label: "자격증",
          entries: [
            { heading: "Adobe 공인 전문가 (ACP)" },
            { heading: "GTQ 그래픽기술자격 1급" },
            { heading: "SDI 오픈워터 스쿠버 다이버", period: "2021년 12월 21일" },
          ],
        },
        {
          label: "교육",
          entries: [
            {
              heading: "AI 및 개발 교육",
              items: ["OpenClaw: 에이전틱 AI 시스템 개발", "바이브 코딩 기반 웹 서비스 개발"],
            },
            {
              heading: "파이썬 프로그래밍",
              items: ["Programming Fundamentals with Python A (KAIST)", "파이썬 프로그래밍 기초 (코드잇)"],
            },
          ],
        },
      ],
    },
    {
      title: "기술",
      tags: [
        "연구",
        "HCI / UX",
        "서비스 디자인",
        "인터랙션 디자인",
        "UI/UX 디자인",
        "프론트엔드 개발",
        "웹 개발",
        "AI 도구",
        "음악기술",
        "Python",
        "데이터 수집",
        "Adobe Creative Suite",
      ],
    },
  ],

  ui: {
    researchKicker: "연구",
    researchTitle: "연구 경험",
    researchIntro: "참여한 연구 프로젝트를 진행한 곳별로 정리했습니다.",
    publicationsKicker: "논문",
    publicationsTitle: "논문",
    patentsKicker: "특허",
    patentsTitle: "특허 출원",
    archiveKicker: "아카이브",
    performanceRecord: "공연 경력",
    cvKicker: "이력",
    cvTitle: "이력서",
    downloadCv: "CV 다운로드 (영문 PDF)",
    contact: "연락처",
    researchInterests: "연구 관심 분야",
    myRole: "나의 역할",
    details: "자세히",
    soon: "준비 중",
    soonTitle: "링크가 곧 추가됩니다",
    applicationNo: "출원번호",
    filed: "출원일:",
    openNewTab: "새 탭에서 열기",
    downloadPdf: "PDF 다운로드",
    openPdf: "PDF 열기",
    inPreparation: "준비 중",
    pdfPending: "PDF가 준비되면 여기에 추가됩니다.",
    researchPublication: "연구 성과",
    overview: "개요",
    researchMaterials: "연구 자료",
    backToResearchShort: "← 연구",
    backToResearch: "연구로 돌아가기",
    staffAria: "오선이 점차 음파로 바뀌는 그림",
    shelfAria: "포스터 — 왼쪽·오른쪽 화살표 키로 넘기고 Enter로 크게 봅니다",
    shelfPrev: "이전 포스터",
    shelfNext: "다음 포스터",
    shelfHint: "끌거나 화살표로 넘기기 · 가운데 포스터를 누르면 크게 보기",
    shelfClose: "닫기",
    shelfViewFull: "원본 이미지 보기 ↗",
    shelfPoster: "포스터",
    shelfOf: "/",
    language: "언어",
  },
};
