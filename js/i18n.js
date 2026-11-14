/* =====================================================================
   LANGUAGE (EN / 한국어)
   Picks the language, then lays the Korean text (js/content.ko.js) over
   the English content before anything is drawn.

   Order of preference: ?lang=ko / ?lang=en in the link → the visitor's
   last choice (remembered in this browser) → English.
   A link with ?lang=ko always opens in Korean, so it can be shared.
   ===================================================================== */

(function () {
  const LANGS = ["en", "ko"];
  const KEY = "site-lang";

  const fromUrl = new URLSearchParams(location.search).get("lang");
  let saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) { /* storage blocked */ }
  const current = LANGS.includes(fromUrl) ? fromUrl : LANGS.includes(saved) ? saved : "en";

  // Korean values replace English ones key by key. Arrays line up by
  // position; `null` (or a missing item) keeps the English value.
  function overlay(base, extra) {
    if (extra === null || extra === undefined) return base;
    if (Array.isArray(base) && Array.isArray(extra))
      return base.map((item, i) => overlay(item, extra[i]));
    if (base && typeof base === "object" && !Array.isArray(base) && typeof extra === "object" && !Array.isArray(extra)) {
      const out = { ...base };
      for (const k of Object.keys(extra)) out[k] = overlay(base[k], extra[k]);
      return out;
    }
    return extra;
  }

  if (current === "ko" && window.SITE_KO) window.SITE = overlay(window.SITE, window.SITE_KO);
  document.documentElement.lang = current;
  window.SITE_LANG = { current };

  // EN / 한국어 buttons (rendered by Components.LangSwitch)
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (!btn || btn.dataset.lang === current) return;
    const lang = btn.dataset.lang;
    try { localStorage.setItem(KEY, lang); } catch (err) { /* storage blocked */ }
    const url = new URL(location.href);
    if (lang === "en") url.searchParams.delete("lang");
    else url.searchParams.set("lang", lang);
    // come back to the section that was on screen
    const active = document.querySelector("[data-nav].is-active");
    if (active && document.getElementById(active.dataset.nav)) url.hash = active.dataset.nav;
    location.replace(url.toString());
  });

  // the page is drawn by script, so jump to the #section once it exists
  addEventListener("load", () => {
    const target = location.hash && document.getElementById(location.hash.slice(1));
    if (target) target.scrollIntoView();
  });
})();
