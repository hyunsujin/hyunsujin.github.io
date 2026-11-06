/* =====================================================================
   REUSABLE COMPONENTS
   Each component is a small function: data in → HTML string out.
   Content lives in js/content.js — edit there, not here.
   ===================================================================== */

(function () {
  /* ---------- helpers ---------- */

  const esc = (value) =>
    String(value ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  // "[YEAR]" style values are placeholders.
  const isPlaceholder = (value) => typeof value === "string" && /\[[^\]]+\]/.test(value);

  const isUsableUrl = (url) => !!url && !isPlaceholder(url);

  // Wraps placeholder text so it renders in a muted, dashed style.
  const text = (value) =>
    isPlaceholder(value) ? `<span class="ph">${esc(value)}</span>` : esc(value);

  const ICONS = {
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/></svg>',
    instagram:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5v.01"/></svg>',
    github:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7"/></svg>',
    arrow:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    download:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 19h14"/></svg>',
  };

  // External links and PDFs open in a new tab.
  const linkAttrs = (url) =>
    /^https?:|\.pdf$/i.test(url) ? ' target="_blank" rel="noopener"' : "";

  /* ---------- Media (image slot with placeholder) ---------- */
  // The placeholder sits underneath; the image covers it once loaded and
  // removes itself if the file is missing — so swapping in a photo later
  // is just a matter of dropping the file at `src`.
  function Media(src, alt, opts = {}) {
    const cls = `media ${opts.className || ""}`.trim();
    const label = opts.label ? `<span class="media__label">${esc(opts.label)}</span>` : "";
    // `position` = CSS object-position, to choose which part of the image stays in the crop.
    const pos = opts.position ? ` style="object-position: ${esc(opts.position)}"` : "";
    const img = src
      ? `<img src="${esc(src)}" alt="${esc(alt || "")}"${pos} loading="${opts.eager ? "eager" : "lazy"}" onerror="this.remove()">`
      : "";
    return `<div class="${cls}">
      <div class="media__ph" aria-hidden="true">
        <svg viewBox="0 0 400 400" preserveAspectRatio="xMaxYMax slice">
          <circle cx="400" cy="400" r="70"/><circle cx="400" cy="400" r="130"/>
          <circle cx="400" cy="400" r="190"/><circle cx="400" cy="400" r="250"/>
          <circle cx="400" cy="400" r="310"/>
        </svg>
        ${label}
      </div>
      ${img}
    </div>`;
  }

  /* ---------- Link button ---------- */
  // { label, url } — url null/placeholder → disabled "soon" state.
  function LinkButton(link, opts = {}) {
    const icon = opts.icon || "arrow";
    const cls = `btn ${opts.variant ? "btn--" + opts.variant : ""}`.trim();
    if (!isUsableUrl(link.url)) {
      return `<span class="${cls} is-pending" aria-disabled="true" title="Link will be added soon">
        ${esc(link.label)}<span class="btn__soon">soon</span></span>`;
    }
    return `<a class="${cls}" href="${esc(link.url)}"${linkAttrs(link.url)}${
      opts.download ? " download" : ""
    }>${esc(link.label)}${ICONS[icon]}</a>`;
  }

  /* ---------- Keyword Tag ---------- */
  // variant: "default" | "quiet" | "outline"
  function KeywordTag(label, variant = "default") {
    return `<li class="tag tag--${variant}">${esc(label)}</li>`;
  }

  function TagList(labels, variant, extraClass = "") {
    if (!labels || !labels.length) return "";
    return `<ul class="tags ${extraClass}">${labels.map((l) => KeywordTag(l, variant)).join("")}</ul>`;
  }

  /* ---------- Navigation ---------- */
  // variant "compact" is the mobile top bar.
  // `base` prefixes the anchors on pages other than the home page ("index.html").
  function Navigation(items, variant = "", base = "") {
    return `<nav class="nav ${variant ? "nav--" + variant : ""}" aria-label="Main">
      <ol class="nav__list">
        ${items
          .map(
            (item, i) => `<li><a class="nav__link" href="${esc(base)}#${esc(item.id)}" data-nav="${esc(item.id)}">
              <span class="nav__num">${String(i + 1).padStart(2, "0")}</span>
              <span class="nav__label">${esc(item.label)}</span>
            </a></li>`
          )
          .join("")}
      </ol>
    </nav>`;
  }

  /* ---------- Profile photo ---------- */
  function ProfilePhoto(profile) {
    return `<div class="avatar">
      <span class="avatar__initials" aria-hidden="true">${esc(profile.initials || "")}</span>
      ${profile.photo ? `<img src="${esc(profile.photo)}" alt="${esc(profile.name)}" onerror="this.remove()">` : ""}
    </div>`;
  }

  /* ---------- Contact list ---------- */
  function ContactList(contacts, variant = "") {
    return `<ul class="contact ${variant ? "contact--" + variant : ""}">
      ${contacts
        .map((c) => {
          const inner = `${ICONS[c.type] || ""}<span>${text(c.label)}</span>`;
          if (!isUsableUrl(c.url)) {
            return `<li><span class="contact__item is-pending">${inner}</span></li>`;
          }
          return `<li><a class="contact__item" href="${esc(c.url)}"${linkAttrs(c.url)}>${inner}</a></li>`;
        })
        .join("")}
    </ul>`;
  }

  /* ---------- Sidebar ---------- */
  function Sidebar(profile, nav, base = "") {
    return `
      <div class="sidebar__inner">
        <a class="sidebar__identity" href="${esc(base)}#top">
          ${ProfilePhoto(profile)}
          <span class="sidebar__name">${text(profile.name)}</span>
        </a>
        <div class="sidebar__role">
          <p class="sidebar__title">${esc(profile.title)}</p>
          <p class="sidebar__aff">${esc(profile.affiliation)}</p>
          <p class="sidebar__background">${esc(profile.background)}</p>
        </div>
        ${Navigation(nav, "", base)}
        ${ContactList(profile.contact)}
      </div>`;
  }

  /* ---------- Section header ---------- */
  function SectionHead(num, kicker, title, intro) {
    return `<header class="section-head">
      <p class="kicker"><span class="kicker__num">${esc(num)}</span>${esc(kicker)}</p>
      <h2 class="section-title">${esc(title)}</h2>
      ${intro ? `<p class="section-intro">${esc(intro)}</p>` : ""}
    </header>`;
  }

  /* ---------- Research Card (timeline item) ---------- */
  // `lab`: shared lab label when the card belongs to a lab group.
  // The group header already names the lab, so the card only carries its number.
  function ResearchCard(project, index) {
    const num = String(index + 1).padStart(2, "0");

    const role = project.role
      ? `<p class="rcard__role"><span class="rcard__label">My Role</span>${project.role.map(esc).join(" · ")}</p>`
      : "";

    const details = project.details
      ? `<details class="rcard__details">
          <summary><span>${esc(project.details.label || "Details")}</span></summary>
          <div class="rcard__details-body">
            ${(project.details.paragraphs || []).map((p) => `<p>${esc(p)}</p>`).join("")}
            ${
              project.details.facts
                ? `<dl class="facts">${project.details.facts
                    .map(
                      (f) => `<div><dt>${esc(f.label)}</dt><dd>${esc(f.value)}${
                        f.note ? `<small>${esc(f.note)}</small>` : ""
                      }</dd></div>`
                    )
                    .join("")}</dl>`
                : ""
            }
          </div>
        </details>`
      : "";

    const links = project.links && project.links.length
      ? `<div class="rcard__links">${project.links.map((l) => LinkButton(l)).join("")}</div>`
      : "";

    return `<li class="timeline__item" id="project-${esc(project.id)}">
      <div class="timeline__node" aria-hidden="true"><span></span></div>
      <article class="rcard">
        <div class="rcard__body">
          <header class="rcard__head">
            <p class="rcard__eyebrow"><span class="rcard__index">${num}</span></p>
            <h3 class="rcard__title">${esc(project.title)}</h3>
            ${project.context ? `<p class="rcard__context">${esc(project.context)}</p>` : ""}
          </header>
          <p class="rcard__summary">${esc(project.summary)}</p>
          ${role}
          ${details}
          ${links}
        </div>
      </article>
    </li>`;
  }

  /* ---------- Research Group ---------- */
  // A labelled run of timeline items, e.g. one lab's projects.
  function ResearchGroup(group, startIndex) {
    return `<li class="timeline__group">
      <div class="timeline__group-node" aria-hidden="true"></div>
      <div class="timeline__group-head">
        <h3 class="timeline__group-title">${esc(group.group)}</h3>
        ${group.meta ? `<p class="timeline__group-meta">${esc(group.meta)}</p>` : ""}
      </div>
    </li>
    ${group.projects.map((p, i) => ResearchCard(p, startIndex + i)).join("")}`;
  }

  /* ---------- Publication Item ---------- */
  // Co-authors are listed in paper order with equal weight.
  function PublicationItem(pub) {
    // `authorLine` prints a citation-style author list verbatim.
    const authors = pub.authorLine
      ? esc(pub.authorLine)
      : (pub.authors || [])
          .map((a) => (a.aff ? `${esc(a.name)}<sup>${esc(a.aff)}</sup>` : esc(a.name)))
          .join(", ");
    const affs = (pub.affiliations || [])
      .map((aff, i) => `<span><sup>${i + 1}</sup>${esc(aff)}</span>`)
      .join("");
    const status = [].concat(pub.status || []);

    return `<article class="pub">
      <div class="pub__year">${esc(pub.year)}</div>
      <div class="pub__body">
        <h3 class="pub__title">${esc(pub.title)}</h3>
        <p class="pub__authors">${authors}</p>
        ${affs ? `<p class="pub__affs">${affs}</p>` : ""}
        ${pub.venue ? `<p class="pub__venue">${esc(pub.venue)}</p>` : ""}
        ${status.length ? `<ul class="pub__status">${status.map((s) => `<li>${esc(s)}</li>`).join("")}</ul>` : ""}
        ${pub.description ? `<p class="pub__desc">${esc(pub.description)}</p>` : ""}
        ${pub.context ? `<p class="pub__context">${esc(pub.context)}</p>` : ""}
        ${
          pub.links && pub.links.length
            ? `<div class="pub__links">${pub.links.map((l) => LinkButton(l)).join("")}</div>`
            : ""
        }
      </div>
    </article>`;
  }

  /* ---------- Patent Item (shares the publication layout) ---------- */
  function PatentItem(pat) {
    return `<article class="pub pub--patent">
      <div class="pub__year">${esc(pat.year)}</div>
      <div class="pub__body">
        ${pat.status ? `<p class="pub__badge">${esc(pat.status)}</p>` : ""}
        <h3 class="pub__title">${esc(pat.title)}</h3>
        <ul class="pub__status">
          ${pat.number ? `<li>Application No. ${esc(pat.number)}</li>` : ""}
          ${pat.filed ? `<li>Filed: ${esc(pat.filed)}</li>` : ""}
        </ul>
      </div>
    </article>`;
  }

  /* ---------- Archive ---------- */
  // One image in the editorial grid. Hover / focus reveals title, year, place.
  function ArchiveItem(item, index) {
    const title = item.title || item.kind;
    const meta = [item.year, item.place].filter(Boolean).join(" · ");
    return `<figure class="archive__item archive__item--${esc(item.layout || "small")}" tabindex="0">
      <div class="archive__frame">
        ${Media(item.src, title, { className: "archive__media", position: item.position })}
        <div class="archive__hover" aria-hidden="true">
          <span class="archive__hover-title">${esc(title)}</span>
          ${meta ? `<span class="archive__hover-meta">${esc(meta)}</span>` : ""}
        </div>
      </div>
      <figcaption class="archive__caption">
        <span class="archive__num">${String(index + 1).padStart(2, "0")}</span>
        <span class="archive__kind">${esc(item.kind)}</span>
        <span class="visually-hidden">${esc([title, meta].filter(Boolean).join(", "))}</span>
      </figcaption>
    </figure>`;
  }

  // A chapter of the archive: numeral, title, a one-line note, then the grid.
  function ArchiveChapter(chapter) {
    return `<section class="archive__chapter" id="archive-${esc(chapter.id)}">
      <header class="archive__chapter-head">
        <span class="archive__numeral">${esc(chapter.numeral)}</span>
        <h3 class="archive__chapter-title">${esc(chapter.title)}</h3>
        ${chapter.note ? `<p class="archive__note">${esc(chapter.note)}</p>` : ""}
      </header>
      ${
        chapter.view === "shelf"
          ? `<div class="shelf" data-shelf="${esc(chapter.id)}"></div>`
          : `<div class="archive__grid">${chapter.items.map(ArchiveItem).join("")}</div>`
      }
    </section>`;
  }

  /* ---------- Performance Record ---------- */
  // Year-by-year list of performances, set like a concert programme.
  function PerformanceRecord(years, heading) {
    return `<section class="record" id="archive-record">
      <header class="archive__chapter-head">
        <span class="archive__numeral">—</span>
        <h3 class="archive__chapter-title">${esc(heading)}</h3>
      </header>
      <ol class="record__years">
        ${years
          .map(
            (y) => `<li class="record__year">
              <h4 class="record__year-label">${esc(y.year)}</h4>
              <ul class="record__items">
                ${y.items
                  .map(
                    (it) => `<li class="record__item">
                      <p class="record__title">${esc(it.title)}</p>
                      ${it.detail ? `<p class="record__detail">${esc(it.detail)}</p>` : ""}
                      ${it.venue ? `<p class="record__venue">${esc(it.venue)}</p>` : ""}
                    </li>`
                  )
                  .join("")}
              </ul>
            </li>`
          )
          .join("")}
      </ol>
    </section>`;
  }

  /* ---------- CV Section ---------- */
  function CVEntry(entry) {
    return `<li class="cv-entry${entry.placeholder ? " is-placeholder" : ""}">
      <div class="cv-entry__period">${text(entry.period || "")}</div>
      <div class="cv-entry__body">
        <h4 class="cv-entry__heading">${text(entry.heading)}</h4>
        ${entry.sub ? `<p class="cv-entry__sub">${text(entry.sub)}</p>` : ""}
        ${entry.meta ? `<p class="cv-entry__meta">${text(entry.meta)}</p>` : ""}
        ${entry.listLabel ? `<p class="cv-entry__list-label">${esc(entry.listLabel)}</p>` : ""}
        ${
          entry.items
            ? `<ul class="cv-entry__items">${entry.items.map((it) => `<li>${text(it)}</li>`).join("")}</ul>`
            : ""
        }
      </div>
    </li>`;
  }

  // `pdfOnly` entries are kept in the data for the full PDF CV but not shown here.
  function CVEntries(entries) {
    return `<ol class="cv-entries">${entries.filter((e) => !e.pdfOnly).map(CVEntry).join("")}</ol>`;
  }

  // A section holds `tags`, flat `entries`, or labelled `groups` of entries.
  function CVSection(section) {
    const body = section.tags
      ? TagList(section.tags, "outline", "cv-tags")
      : section.groups
      ? section.groups
          .map(
            (g) => `<div class="cv-group">
              <p class="cv-group__label">${esc(g.label)}</p>
              ${CVEntries(g.entries)}
            </div>`
          )
          .join("")
      : CVEntries(section.entries);
    const note = section.note
      ? `<p class="cv-section__note">${esc(section.note.text)}
          <a href="${esc(section.note.href)}">${esc(section.note.label)}</a>.</p>`
      : "";
    return `<section class="cv-section" id="cv-${esc(section.id)}">
      <h3 class="cv-section__title">${esc(section.title)}</h3>
      <div class="cv-section__body">${body}${note}</div>
    </section>`;
  }

  /* ---------- Project page: research material card ---------- */
  // { title, note, file, image?, preview? } — file null → "in preparation",
  // no link is made. `preview` embeds the PDF; `image` is the fallback shown
  // where the browser cannot display PDFs inline (most phones).
  function MaterialCard(m) {
    const ready = isUsableUrl(m.file);
    const actions = ready
      ? `<a class="btn" href="${esc(m.file)}" target="_blank" rel="noopener">Open in new tab${ICONS.arrow}</a>
         <a class="btn" href="${esc(m.file)}" download>Download PDF${ICONS.download}</a>`
      : `<span class="btn is-pending" aria-disabled="true">PDF<span class="btn__soon">in preparation</span></span>`;

    // Poster image linking to the PDF: the <object> fallback, and the
    // preview on small screens where inline PDF viewers are unreliable.
    const fallback = m.image
      ? `<a class="material__fallback" href="${esc(m.file)}" target="_blank" rel="noopener">
          <img src="${esc(m.image)}" alt="${esc(m.title)}" loading="lazy">
        </a>`
      : `<a class="btn" href="${esc(m.file)}" target="_blank" rel="noopener">Open PDF${ICONS.arrow}</a>`;

    const viewer =
      ready && m.preview
        ? `<div class="material__viewer">
            <object class="material__pdf" data="${esc(m.file)}#navpanes=0&view=FitH" type="application/pdf"
                    aria-label="${esc(m.title)} (PDF)">${fallback}</object>
            <div class="material__mobile">${fallback}</div>
          </div>`
        : "";

    return `<article class="material${ready ? "" : " is-pending"}">
      <header class="material__head">
        <div>
          <p class="material__type">PDF</p>
          <h3 class="material__title">${esc(m.title)}</h3>
          ${m.note ? `<p class="material__note">${esc(m.note)}</p>` : ""}
        </div>
        <div class="material__actions">${actions}</div>
      </header>
      ${ready ? "" : `<p class="material__pending">The PDF will be added here once it is available.</p>`}
      ${viewer}
    </article>`;
  }

  window.Components = {
    esc,
    text,
    isUsableUrl,
    Media,
    LinkButton,
    KeywordTag,
    TagList,
    Navigation,
    ProfilePhoto,
    ContactList,
    Sidebar,
    SectionHead,
    ResearchCard,
    ResearchGroup,
    PublicationItem,
    PatentItem,
    ArchiveItem,
    ArchiveChapter,
    PerformanceRecord,
    CVSection,
    MaterialCard,
    ICONS,
  };
})();
