/* =====================================================================
   PROJECT PAGE
   Renders one research project's `page` block from js/content.js —
   title, publication info, a short overview and the research materials.
   The project is chosen by <body data-project="…"> (the project's `id`).
   ===================================================================== */

(function () {
  const S = window.SITE;
  const C = window.Components;
  const { esc, text } = C;
  const $ = (sel) => document.querySelector(sel);
  const p = S.profile;
  const HOME = "index.html";

  const id = document.body.dataset.project;
  const project = S.research.flatMap((g) => g.projects).find((pr) => pr.id === id);
  if (!project || !project.page) return;
  const page = project.page;

  /* ---------- Sidebar (desktop) + top navigation (mobile) ---------- */
  // Both point back into the home page; "Research" stays highlighted.
  $("#sidebar").innerHTML = C.Sidebar(p, S.nav, HOME);
  $("#topbar").innerHTML = `
    <a class="topbar__name" href="${HOME}#top">${text(p.name)}</a>
    ${C.Navigation(S.nav, "compact", HOME)}`;
  document
    .querySelectorAll('[data-nav="research"]')
    .forEach((l) => l.classList.add("is-active"));

  /* ---------- Title, info, overview, materials ---------- */
  $("#project").innerHTML = `
    <header class="project__head">
      <a class="project__back" href="${HOME}#project-${esc(project.id)}">← Research</a>
      <p class="kicker">Research Publication</p>
      <h1 class="project__title">${esc(project.title)}</h1>
      <dl class="project__info">
        ${page.info
          .map((f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}</dd></div>`)
          .join("")}
      </dl>
      ${
        page.affiliations
          ? `<p class="project__affs">${page.affiliations.map((a) => `<span>${esc(a)}</span>`).join("")}</p>`
          : ""
      }
    </header>

    <section class="project__overview">
      <h2 class="subhead">Overview</h2>
      <p>${page.overview.map(esc).join(" ")}</p>
    </section>

    <section class="project__materials">
      <h2 class="subhead">Research Materials</h2>
      <div class="materials">${page.materials.map(C.MaterialCard).join("")}</div>
    </section>`;

  /* ---------- Footer ---------- */
  $("#footer").innerHTML = `
    <div class="footer__base">
      <p>© ${new Date().getFullYear()} ${esc(p.name)}</p>
      <a class="footer__tag" href="${HOME}#research">Back to Research</a>
    </div>`;
})();
