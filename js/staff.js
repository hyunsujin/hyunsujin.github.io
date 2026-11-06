/* =====================================================================
   HERO STAFF
   Five straight staff lines (the score) that gradually resolve into
   slow-moving waveforms (the signal) — "from performance to research".
   Very low amplitude, ~30fps, paused off-screen and for reduced motion.
   ===================================================================== */

(function () {
  const NS = "http://www.w3.org/2000/svg";

  function init(svg, labels) {
    if (!svg) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const LINES = 5;
    let W = 0, H = 0, gap = 0, top = 0, lineEnd = 0, showLabels = true;
    let paths = [], texts = [], barline;
    let pointerX = null, resonance = 0;

    function build() {
      svg.innerHTML = "";
      const r = svg.getBoundingClientRect();
      W = Math.max(280, r.width);
      H = r.height || 150;
      gap = Math.min(24, (H - 30) / (LINES - 1));
      top = (H - gap * (LINES - 1)) / 2;
      showLabels = W > 560;
      lineEnd = showLabels ? W - 220 : W;
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      barline = document.createElementNS(NS, "line");
      barline.setAttribute("class", "staff__bar");
      barline.setAttribute("x1", 0.5);
      barline.setAttribute("x2", 0.5);
      barline.setAttribute("y1", top);
      barline.setAttribute("y2", top + gap * (LINES - 1));
      svg.appendChild(barline);

      paths = [];
      texts = [];
      for (let i = 0; i < LINES; i++) {
        const p = document.createElementNS(NS, "path");
        p.setAttribute("class", `staff__line staff__line--${i}`);
        svg.appendChild(p);
        paths.push(p);

        if (showLabels && labels[i]) {
          const t = document.createElementNS(NS, "text");
          t.setAttribute("class", "staff__label");
          t.setAttribute("x", lineEnd + 18);
          t.setAttribute("y", top + i * gap + 4);
          const num = document.createElementNS(NS, "tspan");
          num.setAttribute("class", "staff__num");
          num.textContent = String(i + 1).padStart(2, "0") + "  ";
          t.append(num, labels[i]);
          svg.appendChild(t);
          texts.push(t);
        }
      }
      draw(performance.now());
    }

    // Envelope: flat (score) on the left, rising into sound on the right.
    const smooth = (a, b, x) => {
      const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };

    function draw(now) {
      const t = now / 1000;
      const step = 4;
      const amp = gap * 0.42;
      resonance += ((pointerX !== null ? 1 : 0) - resonance) * 0.04;

      for (let i = 0; i < LINES; i++) {
        const y0 = top + i * gap;
        const k = 0.018 + i * 0.0035;
        const speed = 0.35 + i * 0.07;
        const phase = i * 1.3;
        let d = `M0 ${y0.toFixed(2)}`;
        for (let x = step; x <= lineEnd; x += step) {
          const env = smooth(lineEnd * 0.22, lineEnd * 0.92, x);
          // gentle local swell around the pointer — sympathetic resonance
          let swell = 0;
          if (pointerX !== null) {
            const dx = (x - pointerX) / 90;
            swell = resonance * 0.6 * Math.exp(-dx * dx);
          }
          const a = amp * (env + swell);
          const y =
            y0 +
            a * Math.sin(x * k - t * speed + phase) * (0.75 + 0.25 * Math.sin(x * 0.004 + t * 0.2 + i));
          d += `L${x} ${y.toFixed(2)}`;
        }
        paths[i].setAttribute("d", d);
      }
    }

    let raf = null, visible = true, last = 0;
    function loop(now) {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps is plenty for slow motion
      last = now;
      draw(now);
    }
    const start = () => { if (!raf && !reduced && visible) raf = requestAnimationFrame(loop); };
    const stop = () => { if (raf) cancelAnimationFrame(raf); raf = null; };

    build();

    if (!reduced) {
      svg.addEventListener("pointermove", (e) => {
        const r = svg.getBoundingClientRect();
        pointerX = ((e.clientX - r.left) / r.width) * W;
      });
      svg.addEventListener("pointerleave", () => (pointerX = null));

      new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        visible ? start() : stop();
      }).observe(svg);
      document.addEventListener("visibilitychange", () => (document.hidden ? stop() : start()));
      start();
    }

    let rt;
    window.addEventListener("resize", () => {
      clearTimeout(rt);
      rt = setTimeout(build, 150);
    });
  }

  window.Staff = { init };
})();
