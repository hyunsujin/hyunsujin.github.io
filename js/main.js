/* =====================================================================
   PAGE ASSEMBLY + INTERACTIONS
   Renders js/content.js through js/components.js into index.html.
   ===================================================================== */

(function () {
  const S = window.SITE;
  const C = window.Components;
  const { esc, text } = C;
  const $ = (sel, root = document) => root.querySelector(sel);
  const p = S.profile;

  document.title = `${p.name} — ${p.tagline}`;

  // Section numbers follow the navigation order.
  const num = (id) => String(S.nav.findIndex((item) => item.id === id) + 1).padStart(2, "0");

  /* ---------- Sidebar (desktop) + top navigation (mobile) ---------- */
  $("#sidebar").innerHTML = C.Sidebar(p, S.nav);
  $("#topbar").innerHTML = `
    <a class="topbar__name" href="#top">${text(p.name)}</a>
    ${C.Navigation(S.nav, "compact")}`;

  /* ---------- Intro (hero + About): photo right, name and short bio left ---------- */
  const h = S.hero;
  const a = S.about;
  $("#top").innerHTML = `
    <div class="hero__grid">
      <figure class="hero__figure">
        ${C.Media(h.image, h.imageAlt, { className: "hero__media", eager: true })}
        <figcaption class="hero__statement">${esc(h.statement)}</figcaption>
      </figure>
      <div class="hero__text">
        <h1 class="hero__name">${esc(p.name)}</h1>
        <p class="hero__lead">${esc(a.lead)}</p>
        <div class="hero__facts">
          <div class="hero__block">
            <p class="hero__strong">${esc(p.background)}</p>
            <p class="hero__soft">${esc(p.school)}</p>
          </div>
          <div class="hero__block">
            <p class="hero__strong">${esc(p.title)}</p>
            <p class="hero__soft">${esc(p.affiliation)}</p>
          </div>
        </div>
        ${a.paragraphs.map((t) => `<p class="hero__bio">${esc(t)}</p>`).join("")}
        <div class="interests">
          <h2 class="subhead">Research Interests</h2>
          ${C.TagList(a.interests, "default", "interests__tags")}
        </div>
        <p class="hero__tagline">${esc(p.tagline).replace(/×/g, '<span class="x">×</span>')}</p>
      </div>
    </div>
    <div class="hero__wave" aria-label="A musical staff whose lines gradually become sound waves: ${esc(
      h.trajectory.join(", ")
    )}">
      <svg class="staff" id="staff" role="presentation"></svg>
    </div>`;

  /* ---------- Research ---------- */
  let n = 0;
  const groups = S.research
    .map((g) => {
      const html = C.ResearchGroup(g, n);
      n += g.projects.length;
      return html;
    })
    .join("");
  $("#research").innerHTML = `
    ${C.SectionHead(
      num("research"),
      "Research",
      "Research Experience",
      "Research projects I have taken part in, grouped by where they took place."
    )}
    <ol class="timeline">${groups}</ol>`;

  /* ---------- Publications ---------- */
  $("#publications").innerHTML = `
    ${C.SectionHead(num("publications"), "Publications", "Publications")}
    <div class="pubs">${S.publications.map(C.PublicationItem).join("")}</div>`;

  /* ---------- Patents ---------- */
  $("#patents").innerHTML = `
    ${C.SectionHead(num("patents"), "Patents", "Patent Applications")}
    <div class="pubs">${S.patents.map(C.PatentItem).join("")}</div>`;

  /* ---------- Archive ---------- */
  const ar = S.archive;
  $("#archive").innerHTML = `
    ${C.SectionHead(num("archive"), "Archive", ar.title, ar.subtitle)}
    ${ar.chapters.map(C.ArchiveChapter).join("")}
    ${S.performances ? C.PerformanceRecord(S.performances, "Performance Experience") : ""}
    ${
      ar.outro
        ? `<p class="archive__outro"><span>${esc(ar.outro.text)}</span>
            <a class="archive__outro-link" href="${esc(ar.outro.href)}">${esc(ar.outro.label)}${C.ICONS.arrow}</a></p>`
        : ""
    }`;

  /* ---------- CV ---------- */
  // Sections with `source: "performances"` list only the `selected` items;
  // the full record lives in the Archive.
  const cvSections = S.cv.map((section) =>
    section.source === "performances"
      ? {
          ...section,
          entries: S.performances.flatMap((y) =>
            y.items
              .filter((it) => it.selected)
              .map((it) => ({ period: y.year, heading: it.title, sub: it.venue, meta: it.detail }))
          ),
        }
      : section
  );
  $("#cv").innerHTML = `
    <div class="cv-head">
      ${C.SectionHead(num("cv"), "Curriculum Vitae", "CV")}
      ${C.LinkButton({ label: "Download CV (PDF)", url: p.cvFile }, { icon: "download", download: true })}
    </div>
    <div class="cv">${cvSections.map(C.CVSection).join("")}</div>`;

  /* ---------- Contact + footer ---------- */
  $("#footer").innerHTML = `
    <div class="contact-block" id="contact">
      <p class="kicker">Contact</p>
      <p class="contact-block__title">${esc(p.name)}</p>
      ${C.ContactList(p.contact, "large")}
    </div>
    <div class="footer__base">
      <p>© ${new Date().getFullYear()} ${esc(p.name)}</p>
      <p class="footer__tag">${esc(p.tagline)}</p>
    </div>`;

  /* ---------- Scroll spy (sidebar + top bar) ---------- */
  const links = [...document.querySelectorAll("[data-nav]")];
  const sections = S.nav.map((item) => document.getElementById(item.id)).filter(Boolean);
  const setActive = (id) =>
    links.forEach((l) => l.classList.toggle("is-active", l.dataset.nav === id));

  const spy = () => {
    const line = window.innerHeight * 0.35;
    let current = null;
    for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s.id;
    setActive(current);
  };
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        spy();
        ticking = false;
      });
    },
    { passive: true }
  );
  spy();

  /* ---------- Reveal on scroll ---------- */
  const reveal = document.querySelectorAll(
    ".timeline__item, .timeline__group, .pub, .cv-section, .archive__item, .record__year"
  );
  if ("IntersectionObserver" in window && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px" }
    );
    reveal.forEach((el) => {
      el.classList.add("reveal");
      io.observe(el);
    });
  }

  /* ---------- Hero staff → waveform ---------- */
  window.Staff && window.Staff.init(document.getElementById("staff"), S.hero.trajectory);
})();
