/* =====================================================================
   SITE CONTENT
   ---------------------------------------------------------------------
   All text and image paths on the website live in this file. Edit the
   values below; you never need to touch the components to update content.

   Images
   - Put files in assets/images/ (see the paths below). If a file is
     missing, a clean placeholder is shown instead — nothing breaks.

   Conventions
   - A value of `null` for a URL renders a disabled "coming soon" button.
   - Text written like "[YEAR]" is a placeholder and shows muted.
   ===================================================================== */

// Paper / poster files — set once, used by Research, Publications and the
// project page. null = shown as "in preparation" (no link is made).
const PAPER_STRESS_PREDICTION = "assets/papers/ictc2026-stress-prediction-paper.pdf";
const POSTER_STRESS_PREDICTION = "assets/papers/ictc2026-stress-prediction-poster.pdf";

window.SITE = {
  /* ------------------------------------------------------------------ */
  /* PROFILE                                                             */
  /* ------------------------------------------------------------------ */
  profile: {
    name: "Sujin Hyun",
    initials: "SH", // shown only if the photo file is missing
    photo: "assets/images/portrait-main.jpg",
    title: "Research Intern",
    affiliation: "IBD Lab, KAIST",
    background: "Euphonium Performance",
    school: "Korea National University of Arts",
    fields: "Music Technology · HCI · UX · AI",
    tagline: "Music × Technology × Human Experience",

    // Sidebar + contact block. Add more entries the same way
    // (supported icons: email, instagram, github, linkedin).
    contact: [
      { type: "email", label: "gustnwls23@gmail.com", url: "mailto:gustnwls23@gmail.com" },
      { type: "instagram", label: "@hyunsujin__", url: "https://www.instagram.com/hyunsujin__/" },
    ],

    // Your CV PDF, e.g. "assets/cv/cv.pdf". null = disabled button.
    cvFile: "assets/cv/cv.pdf",
  },

  /* ------------------------------------------------------------------ */
  /* NAVIGATION                                                          */
  /* ------------------------------------------------------------------ */
  nav: [
    { id: "top", label: "About" }, // the intro screen doubles as About
    { id: "research", label: "Research" },
    { id: "publications", label: "Publications" },
    { id: "patents", label: "Patents" },
    { id: "archive", label: "Archive" },
    { id: "cv", label: "CV" },
  ],

  /* ------------------------------------------------------------------ */
  /* HERO — one large image, a few lines of text                         */
  /* ------------------------------------------------------------------ */
  hero: {
    // The one photo on the intro screen. Swap for a stage / instrument image if you like.
    image: "assets/images/portrait-main.jpg",
    imageAlt: "Sujin Hyun",
    statement: "From Performance to Research",
    // The five lines of the waveform strip under the hero, top to bottom.
    trajectory: [
      "Music Performance",
      "Music & Technology",
      "HCI / UX",
      "AI / Data",
      "Human-Centered Research",
    ],
  },

  /* ------------------------------------------------------------------ */
  /* ABOUT — shown on the intro screen, next to the name                 */
  /* (school / position come from `profile`, so they aren't repeated here) */
  /* ------------------------------------------------------------------ */
  about: {
    lead: "My background as a performer shapes the questions I ask about technology, interaction, and human experience.",
    paragraphs: [
      "With a background in music performance, I am interested in exploring how technology can create better experiences for performers, audiences, and users.",
    ],
    interests: [
      "Music Technology",
      "HCI",
      "UX",
      "AI & Music",
      "Human-Centered Design",
      "Lifelog & Wearable Data",
      "Interactive Systems",
    ],
  },

  /* ------------------------------------------------------------------ */
  /* RESEARCH                                                            */
  /* Projects are grouped. Timeline order = array order; numbering runs   */
  /* continuously across groups. `context` is a short line under the     */
  /* title — leave it out when the group header already says it.         */
  /* ------------------------------------------------------------------ */
  research: [
    {
      group: "MATINE, KAIST",
      meta: "Prof. Jinwoo Lee · Ongoing · 2026",
      projects: [
        {
          id: "breath-sound",
          // Working title — replace with the project's official title.
          title: "Breathing and Instrument Sound: A Sensor-Based Study",
          context: "Sensors loaned by Yamaha",
          summary:
            "An ongoing research project investigating how a performer's breathing affects the sound of the instrument, using sensors loaned free of charge by Yamaha.",
          links: [],
        },
      ],
    },
    {
      group: "IBD Lab, KAIST",
      meta: "Prof. Jihyun Lee · Ongoing · 2026",
      projects: [
        {
          id: "genai-design-evaluation",
          title: "Generative AI-Based Design Interpretation & Evaluation",
          summary:
            "Research on developing technologies for interpreting and evaluating design using Generative AI.",
          role: [
            "Data Collection",
            "Web Service Investigation",
            "Data Categorization",
            "Research Support for Design Evaluation Criteria",
          ],
          links: [],
        },
        {
          id: "smart-mirror",
          title: "Smart Mirror Project",
          summary:
            "Participated in a Smart Mirror project exploring interactive experiences and human-centered technology.",
          links: [],
        },
      ],
    },
    {
      group: "Other Research Experience",
      meta: "2026",
      projects: [
        {
          id: "stress-prediction",
          title: "Stress Prediction Using Personalized Pre-Sleep Lifelog Features",
          context: "DACON × ETRI Lifelog Dataset / Paper Competition",
          summary:
            "Research on personalized stress prediction using pre-sleep lifelog features, user baseline-based Z-scores, and past sleep/survey history.",
          // Detail page (stress-prediction.html) — publication materials only.
          page: {
            href: "stress-prediction.html",
            info: [
              { label: "Conference", value: "ICTC 2026" },
              { label: "Format", value: "Poster Presentation" },
              { label: "Authors", value: "Kyeongran Moon · Sujin Hyun" },
              { label: "Context", value: "DACON × ETRI Lifelog Dataset / Paper Competition" },
            ],
            affiliations: [
              "Hongik University — Electronics and Electrical Engineering",
              "KAIST — Culture Technology, IBD Lab",
            ],
            overview: [
              "This study predicts pre-sleep stress (Q3) from smartphone and wearable lifelog data in the DACON/ETRI Lifelog Dataset 2024.",
              "It combines raw behavioral and environmental features from the 30 minutes before bedtime with personalized Z-score features, which read each signal relative to a person's own baseline, and recent questionnaire and sleep history.",
              "Regularized logistic regression was evaluated with nested chronological and nested leave-one-user-out validation.",
            ],
            materials: [
              {
                title: "Conference Poster",
                note: "ICTC 2026 · Poster Presentation",
                file: POSTER_STRESS_PREDICTION,
                // Shown where the browser cannot display a PDF inline (most phones).
                image: "assets/images/research/ictc2026-stress-prediction-poster.jpg",
                preview: true,
              },
              {
                title: "Research Paper",
                note: "ICTC 2026 · Full paper (PDF)",
                file: PAPER_STRESS_PREDICTION,
              },
            ],
          },
          links: [
            { label: "Poster & Paper", url: "stress-prediction.html" },
            { label: "Publication", url: "#publications" },
            { label: "View Paper", url: PAPER_STRESS_PREDICTION },
          ],
        },
      ],
    },
    {
      group: "ETRI",
      meta: "Research Assistant · July – August 2026",
      projects: [
        {
          id: "autonomous-driving",
          title: "Multimodal Interface Evaluation",
          context: "Conditional autonomous driving",
          summary:
            "Supported user experiments on multimodal interface effectiveness in conditional autonomous driving environments.",
          links: [],
        },
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  /* PUBLICATIONS (newest first; add more objects to the array)          */
  /* ------------------------------------------------------------------ */
  publications: [
    {
      year: "2026",
      title: "An Integrated Framework for Multidimensional Evaluation of Service Design",
      // Author list exactly as cited.
      authorLine: "Min, S., Kim, G., Hong, Y., Youn, Y., Yum, J., Jang, E., Hyun, S., & Lee, J.",
      venue: "Archives of Design Research",
      status: ["Accepted with Revision", "SCOPUS"],
      links: [{ label: "View Paper", url: null }],
    },
    {
      year: "2026",
      title: "Stress Prediction Using Personalized Pre-Sleep Lifelog Features",
      // Co-authors, in paper order. All names are shown with equal weight.
      authors: [
        { name: "Kyeongran Moon", aff: 1 },
        { name: "Sujin Hyun", aff: 2 },
      ],
      affiliations: ["Hongik University", "KAIST, Culture Technology, IBD Lab"],
      status: ["Accepted · ICTC 2026", "Conference Presentation · Jeju, Korea"],
      context: "DACON × ETRI Lifelog Dataset / Paper Competition",
      description:
        "Research on personalized stress prediction using pre-sleep lifelog features, user baseline-based Z-scores, and past sleep/survey history.",
      links: [
        { label: "View Paper", url: PAPER_STRESS_PREDICTION },
        { label: "View Poster", url: POSTER_STRESS_PREDICTION },
        { label: "Project Page", url: "stress-prediction.html" },
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  /* PATENTS (newest first). These are filed applications, not granted   */
  /* patents — keep `status` as "Patent Application" until registration. */
  /* ------------------------------------------------------------------ */
  patents: [
    {
      year: "2026",
      title:
        "AI-based Integrated Monitoring Method and Device for Companion Animals Using Stress Analysis and Event Records",
      status: "Patent Application",
      number: "10-2026-0042437",
      filed: "March 10, 2026",
    },
    {
      year: "2026",
      title: "Risk Assessment Method and Device for AI-Based Companion Animal Care Services",
      status: "Patent Application",
      number: "10-2026-0042438",
      filed: "March 10, 2026",
    },
  ],

  /* ------------------------------------------------------------------ */
  /* PERFORMANCE EXPERIENCE                                              */
  /* One list, shown in two places: the Archive (full record) and the CV. */
  /* Newest year first. `detail` is an optional second line.             */
  /* `selected: true` → also listed under "Selected Performances" in CV.  */
  /* ------------------------------------------------------------------ */
  performances: [
    {
      year: "2024",
      items: [
        { selected: true, title: "Musica Euphonium Tuba Ensemble", venue: "Seoul Arts Center" },
        { selected: true, title: "Artenium Brass Band with David Childs", venue: "Bucheon Arts Center Concert Hall" },
      ],
    },
    {
      year: "2023",
      items: [
        { selected: true, title: "K-ARTS Graduation Recital", venue: "Lee Kang Sook Hall, Korea National University of Arts" },
        { selected: true, title: "Artenium Brass Band with Bastien Baumet", venue: "Konkuk University Saecheonnyeon Hall Concert Hall" },
        { title: "Masterclass with Bastien Baumet", venue: "Korea National University of Arts" },
      ],
    },
    {
      year: "2022",
      items: [
        { title: "Participant, Jeju International Brass & Percussion Competition", venue: "Jeju" },
        { title: "National Symphony Orchestra of Korea with Alexandre Malofeev", venue: "Tongyeong Concert Hall" },
        { selected: true, title: "National Symphony Orchestra of Korea", detail: "Solo Euphonium Part in Pictures at an Exhibition", venue: "Seoul Arts Center Concert Hall" },
        { selected: true, title: "Seoul Wind Orchestra, 110th Regular Concert", detail: "Korean Premiere of Symphony No.1 by Carlos Pellicer", venue: "Lotte Concert Hall" },
        { selected: true, title: "Kuna Wind Orchestra", venue: "Lee Kang Sook Hall" },
        { title: "Chamber Ensemble Recital", venue: "Lee Kang Sook Hall" },
      ],
    },
    {
      year: "2020",
      items: [{ title: "Euphonium Project in Korea", venue: "Mozart Hall" }],
    },
    {
      year: "2019",
      items: [
        { title: "Jinhae Military Band & Honor Guard Festival", detail: "Marching Band Performance", venue: "Jinhae" },
        { title: "Masterclass with Corentin Morvan", venue: "Korea National University of Arts" },
      ],
    },
  ],

  /* ------------------------------------------------------------------ */
  /* ARCHIVE — a personal record of performance, process, and moments    */
  /* ------------------------------------------------------------------ */
  // Each image:
  //   src     file path (missing file → quiet placeholder)
  //   kind    what it is — shown as the small caption under the image
  //   title / year / place  shown on hover; leave null until you know them
  //   layout  "poster"                                              (posters)
  //           "feature" | "tall" | "wide" | "small" | "center" | "center-m" | "small-r"  (performance)
  //           "portrait-l" | "portrait-r" | "portrait-m" | "portrait-s" | "strip"  (studio)
  //   position  optional CSS object-position, e.g. "50% 100%" keeps the bottom in the crop
  // Mixing layouts is what makes the grid editorial — keep them varied.
  archive: {
    title: "Archive",
    subtitle: "Posters, performances, and studio portraits.",
    chapters: [
      {
        id: "posters",
        numeral: "I",
        title: "Posters",
        note: "Recital and concert posters.",
        // view: "shelf" = the curved poster shelf (drag / arrows / timeline; click the front poster to open it).
        // Remove the `view` line to go back to the plain grid ("poster" layout, three per row).
        // spine = colour of the poster's edge on the shelf (any CSS colour). Newest first.
        view: "shelf",
        items: [
          { src: "assets/images/archive/poster-korea-low-brass-ensemble-2026.jpg", kind: "Ensemble", title: "Korea Low Brass Ensemble, 7th Regular Concert", year: "2026", place: "Seoul Arts Center IBK Chamber Hall", layout: "poster", spine: "#201e20" },
          { src: "assets/images/archive/poster-korea-symphonic-brass-2024.jpg", kind: "Brass Band", title: "Korea Symphonic Brass — City of Gold", year: "2024", place: "Gyeongju Arts Center Hwarang Hall", layout: "poster", spine: "#6a5952" },
          { src: "assets/images/archive/poster-korea-low-brass-ensemble-2024.jpg", kind: "Ensemble", title: "Korea Low Brass Ensemble, 5th Regular Concert", year: "2024", place: "Seoul Arts Center IBK Chamber Hall", layout: "poster", spine: "#90b9b9" },
          { src: "assets/images/archive/poster-musica-euphonium-tuba-ensemble-2024.jpg", kind: "Ensemble", title: "Musica Euphonium Tuba Ensemble — Re:TURN", year: "2024", place: "Seoul Arts Center Recital Hall", layout: "poster", spine: "#b1b8bf" },
          { src: "assets/images/archive/poster-arteum-brass-band-2024.jpg", kind: "Brass Band", title: "Artenium Brass Band Masters Series with David Childs", year: "2024", place: "Bucheon Arts Center Concert Hall", layout: "poster", spine: "#3b342e" },
          { src: "assets/images/archive/poster-graduation-recital-2023.jpg", kind: "Euphonium Recital", title: "Graduation Recital", year: "2023", place: "Lee Kang Sook Hall", layout: "poster", spine: "#6f676a" },
          { src: "assets/images/archive/poster-korean-national-symphony-2022.jpg", kind: "Orchestra", title: "National Symphony Orchestra of Korea — Pictures at an Exhibition", year: "2022", place: "Seoul Arts Center Concert Hall", layout: "poster", spine: "#485a59" },
          { src: "assets/images/archive/poster-knua-wind-orchestra-2022.jpg", kind: "Wind Orchestra", title: "KNUA Wind Orchestra, 39th Regular Concert", year: "2022", place: "Lee Kang Sook Hall", layout: "poster", spine: "#cccad5" },
          { src: "assets/images/archive/poster-euphonium-project-korea-2020.jpg", kind: "Ensemble", title: "Euphonium Project in Korea — Ensemble", year: "2020", place: "Mozart Hall", layout: "poster", spine: "#bebebd" },
        ],
      },
      {
        id: "performance",
        numeral: "II",
        title: "Performance",
        note: "On stage — concerts, ensembles, recitals, and masterclasses.",
        items: [
          { src: "assets/images/archive/ensemble-01.jpg", kind: "Ensemble", title: "Euphonium & Tuba Quartet", year: null, place: null, layout: "feature" },
          { src: "assets/images/archive/performance-01.jpg", kind: "Concert / Performance", title: null, year: null, place: null, layout: "tall" },
          { src: "assets/images/archive/performance-02.jpg", kind: "Graduation Recital", title: "K-ARTS Graduation Recital", year: "2023", place: "Lee Kang Sook Hall", layout: "center-m", position: "50% 100%" },
          { src: "assets/images/archive/masterclass-01.jpg", kind: "Masterclass", title: null, year: null, place: null, layout: "small-r" },
        ],
      },
      {
        id: "studio",
        numeral: "III",
        title: "Studio",
        note: "The performer, in still frames.",
        items: [
          { src: "assets/images/archive/studio-01.jpg", kind: "Studio", title: "Portrait with Euphonium", year: null, place: null, layout: "portrait-l" },
          { src: "assets/images/archive/studio-02.jpg", kind: "Studio", title: "Film Portrait", year: null, place: null, layout: "portrait-r" },
        ],
      },
    ],
    // Closing line that hands the archive over to the Research section.
    outro: { text: "From performance to research — the record continues.", label: "Research", href: "#research" },
  },

  /* ------------------------------------------------------------------ */
  /* CV                                                                  */
  /* `placeholder: true` renders an entry in a muted "to be added" style. */
  /* ------------------------------------------------------------------ */
  cv: [
    {
      id: "education",
      title: "Education",
      entries: [
        {
          heading: "Korea National University of Arts",
          sub: "Euphonium Performance",
          period: "2020 – 2024",
        },
      ],
    },
    {
      id: "research-experience",
      title: "Research Experience",
      entries: [
        {
          // Project participant — not an intern position.
          heading: "Research Project Participant",
          sub: "MATINE, KAIST (Prof. Jinwoo Lee)",
          period: "2026 – Present",
          items: [
            "Investigating how breathing affects instrument sound, using sensors loaned free of charge by Yamaha",
          ],
        },
        {
          heading: "Research Intern",
          sub: "IBD Lab, KAIST (Prof. Jihyun Lee)",
          period: "2026 – Present",
          items: [
            "Generative AI-Based Design Interpretation & Evaluation",
            "Smart Mirror Project",
          ],
        },
        {
          heading: "Research Assistant – Multimodal Interface Evaluation",
          sub: "ETRI, AI Robot UX Research Lab",
          period: "July – August 2026",
          items: [
            "Supported user experiments on multimodal interface effectiveness in conditional autonomous driving environments",
          ],
        },
      ],
    },
    {
      id: "cv-publications",
      title: "Publications",
      entries: [
        {
          heading: "An Integrated Framework for Multidimensional Evaluation of Service Design",
          sub: "Min, S., Kim, G., Hong, Y., Youn, Y., Yum, J., Jang, E., Hyun, S., & Lee, J.",
          period: "2026",
          meta: "Archives of Design Research · Accepted with Revision · SCOPUS",
        },
        {
          heading: "Stress Prediction Using Personalized Pre-Sleep Lifelog Features",
          sub: "Kyeongran Moon, Sujin Hyun",
          period: "2026",
          meta: "Accepted · ICTC 2026 · Conference Presentation, Jeju, Korea",
        },
      ],
    },
    {
      id: "cv-patents",
      title: "Patents",
      entries: [
        {
          heading: "AI-based Integrated Monitoring Method and Device for Companion Animals Using Stress Analysis and Event Records",
          sub: "Patent Application · Application No. 10-2026-0042437 · Filed: March 10, 2026",
          period: "2026",
        },
        {
          heading: "Risk Assessment Method and Device for AI-Based Companion Animal Care Services",
          sub: "Patent Application · Application No. 10-2026-0042438 · Filed: March 10, 2026",
          period: "2026",
        },
      ],
    },
    {
      id: "professional-experience",
      title: "Professional Experience",
      entries: [
        { heading: "Frontend Developer", sub: "Gonggan Insoft", period: "2026" },
        { heading: "Performance Planning & Operations", sub: "Teamplay Arts Planning", period: "2024 – 2025" },
      ],
    },
    {
      // Filled from `performances` items marked `selected: true`.
      // The full record (incl. masterclasses) stays in the Archive.
      id: "selected-performances",
      title: "Selected Performances",
      source: "performances",
      note: { text: "Full performance record in the", label: "Archive", href: "#archive" },
    },
    {
      id: "awards",
      title: "Awards & Activities",
      groups: [
        {
          label: "Awards & Honors",
          entries: [
            { heading: "1st Prize, Music Education Newspaper Competition", period: "2019" },
            { heading: "1st Prize, Korean Music Association Competition", period: "2019" },
            { heading: "2nd Prize, National University Wind Orchestra Brass Competition", period: "2019" },
          ],
        },
        {
          // Participation only — never phrase these as awards.
          label: "Entrepreneurship & Activities",
          entries: [
            { heading: "KAIST App Startup Program, 6th Cohort", sub: "Participant", period: "2026 – Present" },
            { heading: "2026 PIN UP Concept Design Awards", sub: "Participant", period: "2026" },
          ],
        },
      ],
    },
    {
      id: "certifications",
      title: "Certifications & Training",
      // `pdfOnly: true` entries are kept here for the full (PDF) CV but not shown on the site.
      groups: [
        {
          label: "Certifications",
          entries: [
            {
              // Photoshop: January 10, 2026 · Illustrator, Visual Design: February 21, 2026
              heading: "Adobe Certified Professional (ACP)",
              sub: "Photoshop · Illustrator · Visual Design",
              period: "2026",
            },
            // February 20, 2026
            { heading: "GTQ Graphic Technology Qualification Level 1", period: "2026" },
            { heading: "SDI Open Water Scuba Diver", period: "December 21, 2021", pdfOnly: true },
          ],
        },
        {
          label: "Training",
          entries: [
            {
              // OpenClaw: May 9, 2026 · Vibe Coding: April 27, 2026
              heading: "AI & Development Training",
              sub: "KAIST",
              period: "2026",
              items: ["OpenClaw: Agentic AI System Development", "Vibe Coding-Based Web Service Development"],
            },
            {
              // KAIST: July 6–10, 2026 · Codeit: March 10, 2026
              heading: "Python Programming",
              period: "2026",
              items: ["Programming Fundamentals with Python A (KAIST)", "Python Programming Fundamentals (Codeit)"],
            },
          ],
        },
      ],
    },
    {
      id: "skills",
      title: "Skills",
      tags: [
        "Research",
        "HCI / UX",
        "Service Design",
        "Interaction Design",
        "UI/UX Design",
        "Frontend Development",
        "Web Development",
        "AI Tools",
        "Music Technology",
        "Python",
        "Data Collection",
        "Adobe Creative Suite",
      ],
    },
  ],
};
