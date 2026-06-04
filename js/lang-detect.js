/**
 * Site language: URL (?lang=), saved choice (localStorage), else browser.
 * Supported: fr, en — invalid codes fall back without breaking the page.
 */
(function ensureGitHubPagesBase() {
  if (document.querySelector('base[data-lx-pages-base]')) return;
  if (!/\/linguaphix(\/|$)/.test(location.pathname || '')) return;
  const base = document.createElement('base');
  base.href = '/linguaphix/';
  base.setAttribute('data-lx-pages-base', '1');
  document.head.prepend(base);
})();

(function () {
  const LANG_STORAGE_KEY = 'linguaphix-lang';
  const LANG_PARAM = 'lang';
  const SUPPORTED = new Set(['fr', 'en']);
  const DEFAULT_LANG = 'fr';

  function normalizeLang(input) {
    if (input == null || input === '') return null;
    const base = String(input).trim().toLowerCase().split('-')[0];
    if (base === 'fr' || base === 'en') return base;
    return null;
  }

  function detectBrowserLang() {
    const candidates = [
      ...(navigator.languages || []),
      navigator.language,
      navigator.userLanguage,
    ].filter(Boolean);

    for (const tag of candidates) {
      const norm = normalizeLang(tag);
      if (norm) return norm;
    }
    return DEFAULT_LANG;
  }

  function getStoredLang() {
    try {
      const stored = localStorage.getItem(LANG_STORAGE_KEY);
      return normalizeLang(stored);
    } catch (_) {
      return null;
    }
  }

  function getLangFromUrl() {
    try {
      const params = new URLSearchParams(window.location.search);
      return normalizeLang(params.get(LANG_PARAM));
    } catch (_) {
      return null;
    }
  }

  function sanitizeUrlLangParam() {
    try {
      const params = new URLSearchParams(window.location.search);
      const raw = params.get(LANG_PARAM);
      if (!raw) return;

      const norm = normalizeLang(raw);
      if (!norm) {
        params.delete(LANG_PARAM);
      } else if (raw !== norm) {
        params.set(LANG_PARAM, norm);
      } else {
        return;
      }

      const qs = params.toString();
      const next = `${window.location.pathname}${qs ? `?${qs}` : ''}${window.location.hash}`;
      window.history.replaceState({ linguaphixLang: norm || undefined }, '', next);
    } catch (_) {
      /* ignore */
    }
  }

  function getPreferredLang() {
    return getLangFromUrl() || getStoredLang() || detectBrowserLang();
  }

  function setStoredLang(lang) {
    const norm = normalizeLang(lang);
    if (!norm) return;
    try {
      localStorage.setItem(LANG_STORAGE_KEY, norm);
    } catch (_) {
      /* ignore */
    }
  }

  function isLocalizableHref(href) {
    if (!href) return false;
    const h = href.trim();
    if (
      !h ||
      h.startsWith('#') ||
      h.startsWith('javascript:') ||
      h.startsWith('mailto:') ||
      h.startsWith('tel:') ||
      h.startsWith('data:')
    ) {
      return false;
    }
    if (/^https?:\/\//i.test(h)) {
      try {
        const u = new URL(h);
        return u.origin === window.location.origin;
      } catch (_) {
        return false;
      }
    }
    return true;
  }

  function withLangInHref(href, lang) {
    const norm = normalizeLang(lang);
    if (!isLocalizableHref(href) || !norm) return href;

    const hashIdx = href.indexOf('#');
    const hash = hashIdx >= 0 ? href.slice(hashIdx) : '';
    const beforeHash = hashIdx >= 0 ? href.slice(0, hashIdx) : href;

    let url;
    try {
      url = new URL(beforeHash || '.', window.location.href);
    } catch (_) {
      return href;
    }

    if (url.origin !== window.location.origin) return href;

    url.searchParams.set(LANG_PARAM, norm);
    const qs = url.search;

    if (/^https?:\/\//i.test(href)) {
      return `${url.origin}${url.pathname}${qs}${url.hash || hash}`;
    }

    const pathOnly = (beforeHash || '').split('?')[0];
    return `${pathOnly}${qs}${hash}`;
  }

  function syncBrowserUrlLang(lang, options) {
    const norm = normalizeLang(lang);
    if (!norm) return;
    const replace = options?.replace !== false;
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.get(LANG_PARAM) === norm) return;
      url.searchParams.set(LANG_PARAM, norm);
      const next = `${url.pathname}${url.search}${url.hash}`;
      if (replace) {
        window.history.replaceState({ linguaphixLang: norm }, '', next);
      } else {
        window.history.pushState({ linguaphixLang: norm }, '', next);
      }
    } catch (_) {
      /* ignore */
    }
  }

  function applyLocalizedLinks(lang) {
    const norm = normalizeLang(lang);
    if (!norm) return;
    document.querySelectorAll('a[href]').forEach((anchor) => {
      const raw = anchor.getAttribute('href');
      if (!raw) return;
      const localized = withLangInHref(raw, norm);
      if (localized !== raw) anchor.setAttribute('href', localized);
    });
    document.querySelectorAll('form[action]').forEach((form) => {
      const raw = form.getAttribute('action');
      if (!raw) return;
      const localized = withLangInHref(raw, norm);
      if (localized !== raw) form.setAttribute('action', localized);
    });
  }

  sanitizeUrlLangParam();

  window.LINGUAPHIX_LANG_PARAM = LANG_PARAM;
  window.LINGUAPHIX_SUPPORTED_LANGS = ['fr', 'en'];
  window.normalizeLang = normalizeLang;
  window.getLangFromUrl = getLangFromUrl;
  window.getBrowserLang = detectBrowserLang;
  window.getPreferredLang = getPreferredLang;
  window.setStoredLang = setStoredLang;
  window.withLangInHref = withLangInHref;
  window.syncBrowserUrlLang = syncBrowserUrlLang;
  window.applyLocalizedLinks = applyLocalizedLinks;
  document.documentElement.lang = getPreferredLang();
})();
