/* =====================================================================
   POSTER SHELF
   The Archive's posters stand edge-on along a curved shelf that bends
   away into depth. The poster in the middle turns to face the viewer;
   clicking it opens a full-screen sheet that grows out of the poster.

   Used for any Archive chapter with `view: "shelf"` (see js/content.js).
   Each item: src, title, kind, year, place, and an optional `spine` colour.
   ===================================================================== */

(function () {
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const P = 1400; // must match the CSS perspective on .shelf__scene
  const EASE = "cubic-bezier(.2,.8,.2,1)";
  const smoothstep = (t) => t * t * (3 - 2 * t);
  const approach = (k, dt) => (reduce ? 1 : 1 - Math.exp(-k * dt));
  const pad = (i) => String(i + 1).padStart(2, "0");

  const ARROW_L = `<svg viewBox="0 0 25 12" aria-hidden="true"><path d="M6 1L1 6l5 5M1 6h23"/></svg>`;
  const ARROW_R = `<svg viewBox="0 0 25 12" aria-hidden="true"><path d="M19 1l5 5-5 5M24 6H1"/></svg>`;

  // Dark or light text for a given spine colour (only #rrggbb is measured).
  function inkFor(color) {
    const m = /^#?([0-9a-f]{6})$/i.exec(color || "");
    if (!m) return "#fff";
    const n = parseInt(m[1], 16);
    const lum = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
    return lum > 0.6 ? "#141b26" : "#fff";
  }

  function init(root, items) {
    if (!root || !items || !items.length) return;
    const n = items.length;
    const COPIES = Math.max(3, Math.ceil(30 / n)); // enough tapes to fill both sides of the arc
    const N = n * COPIES;
    const years = items.map((it) => Number(it.year) || 0);
    const y0 = Math.min(...years);
    const y1 = Math.max(...years) === y0 ? y0 + 1 : Math.max(...years);
    const ratio = items.map(() => 1 / 1.414); // width / height; corrected once each image loads

    /* ---------- markup ---------- */
    let tapes = "";
    for (let v = 0; v < N; v++) {
      const i = v % n;
      const it = items[i];
      const bg = it.spine || "var(--navy)";
      tapes += `<div class="tape" data-v="${v}">
        <div class="tape__spine" style="background:${esc(bg)};color:${inkFor(it.spine)}">
          <span class="tape__no">${pad(i)}</span>
          <span class="tape__title">${esc(it.title || it.kind)}</span>
          <span class="tape__year">${esc(it.year || "")}</span>
        </div>
        <div class="tape__cover"><img src="${esc(it.src)}" alt="" draggable="false" ${v < n ? "" : 'loading="lazy"'}></div>
      </div>`;
    }

    let ticks = "";
    for (let y = y0; y <= y1; y++) {
      const at = ((y - y0) / (y1 - y0)) * 100;
      const edge = y === y0 ? " is-first" : y === y1 ? " is-last" : "";
      ticks += `<span class="ruler__tick is-major" style="left:${at}%"></span>
        <span class="ruler__label${edge}" style="left:${at}%">${y}</span>`;
      if (y < y1)
        for (let q = 1; q < 4; q++)
          ticks += `<span class="ruler__tick" style="left:${((y + q / 4 - y0) / (y1 - y0)) * 100}%"></span>`;
    }

    root.innerHTML = `
      <div class="shelf__viewport" tabindex="0" role="group" aria-roledescription="carousel"
           aria-label="Posters — use the left and right arrow keys to browse, Enter to open">
        <div class="shelf__probe" aria-hidden="true"></div>
        <div class="shelf__floor" aria-hidden="true"></div>
        <div class="shelf__scene" aria-hidden="true"><div class="shelf__stage">${tapes}</div></div>
      </div>
      <div class="shelf__caption">
        <button class="shelf__arrow" type="button" data-step="-1" aria-label="Previous poster">${ARROW_L}</button>
        <div class="shelf__lines" aria-hidden="true">
          <div class="shelf__mask shelf__kicker"></div>
          <div class="shelf__mask shelf__title"></div>
          <span class="shelf__rule"></span>
          <div class="shelf__mask shelf__meta"></div>
        </div>
        <button class="shelf__arrow" type="button" data-step="1" aria-label="Next poster">${ARROW_R}</button>
        <p class="visually-hidden" aria-live="polite" data-live></p>
      </div>
      <div class="ruler" aria-hidden="true">
        <span class="ruler__line"></span>${ticks}<span class="ruler__dot"></span>
        <span class="ruler__hit"></span>
      </div>
      <p class="shelf__hint">Drag or use the arrows · click the front poster to open it</p>`;

    const q = (s) => root.querySelector(s);
    const viewport = q(".shelf__viewport");
    const stage = q(".shelf__stage");
    const floor = q(".shelf__floor");
    const dot = q(".ruler__dot");
    const live = q("[data-live]");
    const masks = { kicker: q(".shelf__kicker"), title: q(".shelf__title"), meta: q(".shelf__meta") };
    const els = [...stage.children].map((el) => ({
      el,
      spine: el.firstElementChild,
      cover: el.lastElementChild,
      lift: 0,
      i: Number(el.dataset.v) % n,
      v: Number(el.dataset.v),
    }));

    /* ---------- measurements ---------- */
    let H, W, ws, gap, U, XS;
    const d = (i) => H * ratio[i];
    function measure() {
      H = q(".shelf__probe").offsetHeight || 420; // = CSS --shelf-h
      W = viewport.clientWidth;
      ws = H * 0.085;
      gap = H * 0.03;
      U = Math.min(H * (W < 768 ? 1.05 : 1.3), W * (W < 768 ? 0.5 : 0.45));
      // screen x = ∫ scale du — far spines pack closer together on screen
      XS = [0];
      for (let u = 0, acc = 0; u < U * 3; u += 2) XS.push((acc += 2 / (1 + Math.pow(u / U, 1.6))));
      els.forEach((t) => {
        const di = d(t.i);
        Object.assign(t.spine.style, {
          width: `${ws}px`, height: `${H}px`, left: `${-ws / 2}px`, top: `${-H / 2}px`,
          transform: `translateZ(${di / 2}px)`,
        });
        t.cover.style.cssText = `width:${di}px;height:${H}px;left:${-di / 2}px;top:${-H / 2}px;transform:rotateY(90deg) translateZ(${ws / 2}px)`;
        t.spine.style.fontSize = `${Math.max(8, ws * 0.3)}px`;
      });
      floor.style.cssText = `width:${Math.min(W * 0.96, H * 3.2)}px;height:${H * 0.24}px;top:calc(50% + ${H * 0.44}px)`;
      kick();
    }
    const xsc = (u) => Math.sign(u) * XS[Math.min(XS.length - 1, Math.round(Math.abs(u) / 2))];
    const scl = (u) => 1 / (1 + Math.pow(Math.abs(u) / U, 1.6));
    const B = (r) => (Math.abs(r) >= 1 ? Math.sign(r) * 0.5 : (r + Math.sin(Math.PI * r) / Math.PI) / 2);
    const rel = (v) => {
      let r = (((v - s) % N) + N) % N;
      return r >= N / 2 ? r - N : r;
    };
    const wrap = (x) => ((x % n) + n) % n;

    /* ---------- state ---------- */
    let s = 0, T = 0; // current / target position, in posters
    let dragging = false, hover = -1, pointer = null;
    let tiltX = 0, tiltY = 0, dotYear = years[0];
    let active = -1, raf = 0, last = 0, visible = true, isOpen = false;

    /* ---------- caption (mask slide) ---------- */
    function slide(mask, html, dir) {
      const next = document.createElement("span");
      next.innerHTML = html;
      const old = [...mask.children];
      mask.appendChild(next);
      if (reduce || dir === 0) return old.forEach((o) => o.remove());
      next.animate([{ transform: `translateY(${dir * 105}%)` }, { transform: "none" }], { duration: 650, easing: EASE, fill: "both" });
      old.forEach((o) => {
        const from = getComputedStyle(o).transform;
        o.animate([{ transform: from === "none" ? "none" : from }, { transform: `translateY(${-dir * 105}%)` }], {
          duration: 650, easing: EASE, fill: "both",
        }).onfinish = () => o.remove();
      });
    }
    function setCaption(i, dir) {
      const it = items[i];
      slide(masks.kicker, `${pad(i)} / ${pad(n - 1)} &nbsp;·&nbsp; ${esc(it.kind)}`, dir);
      slide(masks.title, esc(it.title || it.kind), dir);
      slide(masks.meta, esc([it.year, it.place].filter(Boolean).join(" — ")), dir);
      live.textContent = [`Poster ${i + 1} of ${n}`, it.title || it.kind, it.year, it.place].filter(Boolean).join(", ");
    }

    /* ---------- frame ---------- */
    function frame(now) {
      const dt = Math.min(0.05, (now - (last || now)) / 1000);
      last = now;
      raf = 0;

      s += (T - s) * approach(dragging ? 18 : 5.2, dt);
      if (Math.abs(T - s) < 1e-4) s = T;
      if (s > 2 * N || s < -2 * N) { const k = Math.trunc(s / N) * N; s -= k; T -= k; }

      const a = wrap(Math.round(s));
      if (a !== active) {
        setCaption(a, active < 0 ? 0 : Math.sign(T - s) || 1);
        active = a;
      }

      // poster width used for spacing blends between the two nearest posters
      const f = s - Math.floor(s);
      const dEff = d(wrap(Math.floor(s))) * (1 - f) + d(wrap(Math.floor(s) + 1)) * f;

      // pointer tilt (the front poster follows the cursor a little)
      const settled = Math.abs(T - s) < 0.3 && !isOpen;
      let tx = 0, ty = 0, onCover = false;
      if (pointer) {
        const cx = pointer.x - W / 2, cy = pointer.y - viewport.clientHeight / 2;
        onCover = settled && Math.abs(cx) < 0.55 * dEff && Math.abs(cy) < 0.55 * H;
        ty = onCover ? (cx / (0.55 * dEff)) * 8 : (cx / W) * 4;
        tx = onCover ? (-cy / (H / 2)) * 5 : 0;
      }
      tiltY += (ty - tiltY) * approach(7, dt);
      tiltX += (tx - tiltX) * approach(7, dt);
      viewport.classList.toggle("is-over-cover", onCover);

      let busy = s !== T || Math.abs(ty - tiltY) > 0.01 || Math.abs(tx - tiltX) > 0.01;
      for (const t of els) {
        const r = rel(t.v);
        const o = smoothstep(Math.max(0, 1 - Math.abs(r)));
        const u = r * (ws + gap) + (dEff - ws + 1.4 * gap) * B(r);
        if (Math.abs(u) > U * 1.95) {
          if (!t.hidden) { t.el.style.visibility = "hidden"; t.hidden = true; }
          continue;
        }
        if (t.hidden) { t.el.style.visibility = ""; t.hidden = false; }
        const want = t.v === hover && Math.abs(r) > 0.5 ? 1 : 0;
        t.lift += (want - t.lift) * approach(12, dt);
        if (Math.abs(want - t.lift) > 0.001) busy = true;

        const sc = scl(u), k = 1 / sc;
        const z = P * (1 - k) + o * H * 0.1;
        const x = xsc(u) * k;
        const y = (H * 0.5 * (1 - sc) * 0.42 + o * H * 0.012 - t.lift * H * 0.05) * k;
        const ry = -Math.sign(u) * Math.min(1, Math.abs(u) / U) * 26 * (1 - o) - 90 * o + tiltY * o;
        t.el.style.transform = `translate3d(${x}px,${y}px,${z}px) rotateX(${tiltX * o}deg) rotateY(${ry}deg)`;
        t.el.style.zIndex = Math.round(3000 + z);
        t.spine.style.setProperty("--shade", Math.min(0.6, o * 0.55 + (1 - sc) * 0.32));
        t.cover.style.setProperty("--shade", (1 - o) * 0.82);
        t.el.classList.toggle("is-front", Math.abs(r) < 0.5);
        t.cover.style.visibility = Math.abs(r) < 1 ? "" : "hidden"; // only the front poster and its neighbours show a face
      }

      // timeline dot
      const ya = years[wrap(Math.floor(s))], yb = years[wrap(Math.floor(s) + 1)];
      const yWant = Math.abs(yb - ya) > (y1 - y0) / 2 ? (f < 0.5 ? ya : yb) : ya + (yb - ya) * f;
      dotYear = Math.abs(yWant - dotYear) > (y1 - y0) / 2 ? yWant : dotYear + (yWant - dotYear) * approach(14, dt);
      if (Math.abs(yWant - dotYear) > 0.002) busy = true;
      dot.style.left = `${((dotYear - y0) / (y1 - y0)) * 100}%`;

      if ((busy || dragging) && visible) kick();
    }
    function kick() {
      if (!raf) raf = requestAnimationFrame(frame);
    }
    const go = (target) => { T = target; kick(); };
    const step = (dir) => go(Math.round(T) + dir);

    /* ---------- input ---------- */
    root.querySelectorAll("[data-step]").forEach((b) =>
      b.addEventListener("click", () => step(Number(b.dataset.step)))
    );
    viewport.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
      else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
      else if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
    });

    // drag (mouse or finger); vertical swipes still scroll the page
    let down = null, moved = false;
    viewport.addEventListener("pointerdown", (e) => {
      if (e.button !== 0) return;
      down = { x: e.clientX, T0: T, id: e.pointerId };
      moved = false;
    });
    viewport.addEventListener("pointermove", (e) => {
      const rect = viewport.getBoundingClientRect();
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      const tape = e.target.closest(".tape");
      hover = tape ? Number(tape.dataset.v) : -1;
      if (down && e.pointerId === down.id) {
        const dx = e.clientX - down.x;
        if (!moved && Math.abs(dx) > 5) {
          moved = dragging = true;
          viewport.setPointerCapture(e.pointerId);
          viewport.classList.add("is-dragging");
        }
        if (moved) T = down.T0 - dx / (ws + gap);
      }
      kick();
    });
    const release = () => {
      if (dragging) { dragging = false; viewport.classList.remove("is-dragging"); go(Math.round(T)); }
      down = null;
    };
    viewport.addEventListener("pointerup", release);
    viewport.addEventListener("pointercancel", () => { moved = true; release(); });
    viewport.addEventListener("pointerleave", () => { pointer = null; hover = -1; kick(); });
    viewport.addEventListener("click", (e) => {
      if (moved) return; // that was a drag
      const tape = e.target.closest(".tape");
      if (!tape) return;
      const r = rel(Number(tape.dataset.v));
      if (Math.abs(r) < 0.5 && Math.abs(T - s) < 0.3) open();
      else go(Math.round(T + r));
    });

    // sideways trackpad swipes only — normal scrolling keeps scrolling the page
    let wheelTimer = 0;
    viewport.addEventListener(
      "wheel",
      (e) => {
        if (isOpen || Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
        e.preventDefault();
        T += (e.deltaX / (ws + gap)) * 0.5;
        kick();
        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => go(Math.round(T)), 160);
      },
      { passive: false }
    );

    // timeline: jump to the poster nearest that year, the short way round
    q(".ruler__hit").addEventListener("click", (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const year = y0 + ((e.clientX - rect.left) / rect.width) * (y1 - y0);
      const cur = wrap(Math.round(T));
      let best = 0, bestScore = Infinity;
      items.forEach((_, i) => {
        let delta = wrap(i - cur);
        if (delta > n / 2) delta -= n;
        const score = Math.abs(years[i] - year) * 100 + Math.abs(delta);
        if (score < bestScore) { bestScore = score; best = delta; }
      });
      go(Math.round(T) + best);
    });

    /* ---------- detail sheet ---------- */
    const CIRCLES = [[150, 330, 0], [340, 600, 120], [250, 120, 220], [90, 760, 300], [400, 250, 360], [260, 860, 420], [230, 470, 180]];
    const uid = `shelf-${root.dataset.shelf || "x"}`;
    const sheet = document.createElement("div");
    sheet.className = "shelf-detail";
    sheet.hidden = true;
    sheet.setAttribute("role", "dialog");
    sheet.setAttribute("aria-modal", "true");
    sheet.innerHTML = `
      <button class="shelf-detail__close" type="button">Close</button>
      <div class="shelf-detail__text">
        <div class="shelf-detail__line"><p class="shelf-detail__kicker"></p></div>
        <div class="shelf-detail__line"><h3 class="shelf-detail__title"></h3></div>
        <div class="shelf-detail__line"><p class="shelf-detail__meta"></p></div>
        <div class="shelf-detail__line"><p class="shelf-detail__place"></p></div>
        <div class="shelf-detail__line"><a class="shelf-detail__link" target="_blank" rel="noopener">View full image ↗</a></div>
      </div>
      <figure class="shelf-detail__figure">
        <svg class="shelf-detail__poster" preserveAspectRatio="xMidYMid meet" role="img">
          <defs>
            <filter id="${uid}-ink" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency=".011" numOctaves="3" seed="7"/>
              <feDisplacementMap in="SourceGraphic" scale="120" xChannelSelector="R" yChannelSelector="G"/>
            </filter>
            <mask id="${uid}-mask" maskUnits="userSpaceOnUse">
              <g filter="url(#${uid}-ink)">${CIRCLES.map(() => `<circle r="0" fill="#fff"/>`).join("")}</g>
            </mask>
          </defs>
          <image preserveAspectRatio="none" mask="url(#${uid}-mask)"/>
        </svg>
      </figure>`;
    document.body.appendChild(sheet);
    const sq = (s) => sheet.querySelector(s);
    const svg = sq("svg"), img = sq("image"), maskEl = sq("mask");
    const circles = [...sheet.querySelectorAll("circle")];
    const lines = [...sheet.querySelectorAll(".shelf-detail__line > *")];
    let inkRaf = 0, opener = null;

    function coverRect() {
      const front = els.find((t) => Math.abs(rel(t.v)) < 0.5);
      return front ? front.cover.getBoundingClientRect() : viewport.getBoundingClientRect();
    }
    const insetOf = (r) =>
      `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px round 3px)`;

    function open() {
      if (isOpen) return;
      go(Math.round(T));
      s = T;
      frame(performance.now());
      const i = active, it = items[i];
      isOpen = true;
      opener = document.activeElement;

      sq(".shelf-detail__kicker").textContent = `${pad(i)} / ${pad(n - 1)} · ${it.kind || "Poster"}`;
      sq(".shelf-detail__title").textContent = it.title || it.kind;
      sq(".shelf-detail__meta").textContent = it.year || "";
      sq(".shelf-detail__place").textContent = it.place || "";
      sq(".shelf-detail__link").href = it.src;
      sheet.setAttribute("aria-label", it.title || it.kind);
      svg.setAttribute("aria-label", `Poster — ${it.title || it.kind}`);

      // poster in a 474-wide box at its own proportion; ink blots are laid out for 474 × 900
      const vw = 474, vh = 474 / ratio[i];
      svg.setAttribute("viewBox", `0 0 ${vw} ${vh}`);
      svg.style.aspectRatio = `${vw} / ${vh}`;
      for (const [k, v] of Object.entries({ x: 0, y: 0, width: vw, height: vh })) maskEl.setAttribute(k, v);
      img.setAttribute("href", it.src);
      img.setAttribute("width", vw);
      img.setAttribute("height", vh);
      circles.forEach((c, j) => {
        c.setAttribute("cx", CIRCLES[j][0]);
        c.setAttribute("cy", (CIRCLES[j][1] * vh) / 900);
        c.setAttribute("r", 0);
      });

      sheet.hidden = false;
      document.documentElement.classList.add("has-shelf-detail");
      sheet.animate([{ clipPath: insetOf(coverRect()) }, { clipPath: "inset(0 round 0)" }], {
        duration: reduce ? 1 : 1050, easing: "cubic-bezier(.76,0,.18,1)", fill: "both",
      });
      lines.forEach((el, j) =>
        el.animate([{ transform: "translateY(110%)" }, { transform: "none" }], {
          duration: reduce ? 1 : 900, delay: reduce ? 0 : 620 + j * 75, easing: EASE, fill: "both",
        })
      );

      // ink: each blot grows from nothing, after its own delay
      const start = performance.now() + (reduce ? -5000 : 520);
      cancelAnimationFrame(inkRaf);
      const grow = (now) => {
        let done = true;
        circles.forEach((c, j) => {
          const p = Math.min(1, Math.max(0, (now - start - CIRCLES[j][2]) / 1250));
          c.setAttribute("r", 720 * (1 - Math.pow(1 - p, 3)));
          if (p < 1) done = false;
        });
        if (!done) inkRaf = requestAnimationFrame(grow);
      };
      inkRaf = requestAnimationFrame(grow);
      sq(".shelf-detail__close").focus({ preventScroll: true });
    }

    function close() {
      if (!isOpen) return;
      const anim = sheet.animate([{ clipPath: "inset(0 round 0)" }, { clipPath: insetOf(coverRect()) }], {
        duration: reduce ? 1 : 850, easing: "cubic-bezier(.76,0,.18,1)", fill: "both",
      });
      anim.onfinish = () => {
        sheet.hidden = true;
        sheet.getAnimations({ subtree: true }).forEach((a) => a.cancel());
        cancelAnimationFrame(inkRaf);
        document.documentElement.classList.remove("has-shelf-detail");
        isOpen = false;
        (opener || viewport).focus({ preventScroll: true });
        kick();
      };
    }
    sq(".shelf-detail__close").addEventListener("click", close);
    sheet.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab") { // keep focus inside the sheet
        const f = [sq(".shelf-detail__close"), sq(".shelf-detail__link")];
        const at = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(at + (e.shiftKey ? f.length - 1 : 1)) % f.length].focus();
      }
    });

    /* ---------- images: learn each poster's real proportion ---------- */
    els.forEach((t) => {
      const im = t.cover.firstElementChild;
      const learn = () => {
        if (!im.naturalWidth) return;
        const r = im.naturalWidth / im.naturalHeight;
        if (Math.abs(r - ratio[t.i]) > 0.005) { ratio[t.i] = r; measureSoon(); }
      };
      im.complete ? learn() : im.addEventListener("load", learn, { once: true });
    });
    let measureTimer = 0;
    const measureSoon = () => { clearTimeout(measureTimer); measureTimer = setTimeout(measure, 30); };

    /* ---------- lifecycle ---------- */
    addEventListener("resize", measureSoon);
    if ("IntersectionObserver" in window)
      new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }).observe(viewport);
    measure();
  }

  window.Shelf = { init };
})();
