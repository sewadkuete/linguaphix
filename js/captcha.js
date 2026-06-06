/**
 * Cloudflare Turnstile — shared widget loader for all site forms.
 * Site key: LINGUAPHIX_CONFIG.turnstileSiteKey (see docs/TURNSTILE.md).
 */
(function () {
  const SCRIPT_URL = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';
  /** Cloudflare test key — always passes; replace in production via TURNSTILE_SITE_KEY. */
  const TURNSTILE_TEST_SITE_KEY = '1x00000000000000000000AA';

  let scriptPromise = null;
  const widgets = new Map();

  const MSG = {
    fr: {
      required: 'Veuillez compléter la vérification de sécurité.',
      unavailable: 'Vérification de sécurité indisponible. Réessayez ou contactez-nous par WhatsApp.',
    },
    en: {
      required: 'Please complete the security check.',
      unavailable: 'Security check unavailable. Try again or contact us on WhatsApp.',
    },
  };

  function langCode(lang) {
    return lang === 'en' ? 'en' : 'fr';
  }

  function captchaMessage(lang, key) {
    const code = langCode(lang);
    const dict = typeof i18n !== 'undefined' && i18n[code] ? i18n[code] : null;
    if (dict?.[`captcha.${key}`]) return dict[`captcha.${key}`];
    return MSG[code]?.[key] || MSG.fr[key] || '';
  }

  function getSiteKey() {
    const cfg = String(window.LINGUAPHIX_CONFIG?.turnstileSiteKey || '').trim();
    if (cfg && !/YOUR_TURNSTILE/i.test(cfg)) return cfg;
    return TURNSTILE_TEST_SITE_KEY;
  }

  function loadTurnstileScript() {
    if (window.turnstile) return Promise.resolve();
    if (scriptPromise) return scriptPromise;
    scriptPromise = new Promise((resolve, reject) => {
      const existing = document.querySelector('script[data-turnstile-loader]');
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', () => reject(new Error('turnstile script failed')));
        return;
      }
      const script = document.createElement('script');
      script.src = SCRIPT_URL;
      script.async = true;
      script.defer = true;
      script.dataset.turnstileLoader = '1';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('turnstile script failed'));
      document.head.appendChild(script);
    });
    return scriptPromise;
  }

  function mountKey(mountEl) {
    if (!mountEl.id) {
      mountEl.id = `captcha-${Math.random().toString(36).slice(2, 9)}`;
    }
    return mountEl.id;
  }

  function getCaptchaToken(mountEl) {
    if (!mountEl) return '';
    const input = mountEl.querySelector('input[name="cf-turnstile-response"]');
    return input?.value?.trim() || '';
  }

  async function initFormCaptcha(mountEl, opts) {
    if (!mountEl || mountEl.dataset.captchaReady === '1') return true;

    const siteKey = getSiteKey();
    if (!siteKey) {
      mountEl.classList.add('form-captcha--disabled');
      return false;
    }

    const key = mountKey(mountEl);
    mountEl.classList.add('form-captcha', 'form-captcha--loading');
    mountEl.setAttribute('role', 'group');
    mountEl.setAttribute('aria-label', captchaMessage(opts?.lang, 'label') || 'Security check');

    try {
      if (window.LINGUAPHIX_CONFIG_READY_PROMISE) {
        await window.LINGUAPHIX_CONFIG_READY_PROMISE.catch(() => {});
      }
      await loadTurnstileScript();
      if (!window.turnstile) throw new Error('turnstile unavailable');

      if (widgets.has(key)) {
        const rec = widgets.get(key);
        if (rec?.widgetId != null) {
          window.turnstile.remove(rec.widgetId);
        }
        widgets.delete(key);
      }

      mountEl.innerHTML = '';
      const widgetId = window.turnstile.render(mountEl, {
        sitekey: siteKey,
        theme: opts?.theme || 'light',
        language: langCode(opts?.lang),
        callback: () => {
          mountEl.dataset.captchaSolved = '1';
          mountEl.classList.add('form-captcha--ready');
        },
        'expired-callback': () => {
          delete mountEl.dataset.captchaSolved;
          mountEl.classList.remove('form-captcha--ready');
        },
        'error-callback': () => {
          delete mountEl.dataset.captchaSolved;
          mountEl.classList.remove('form-captcha--ready');
        },
      });

      widgets.set(key, { widgetId, mountEl });
      mountEl.dataset.captchaReady = '1';
      mountEl.classList.remove('form-captcha--loading');
      return true;
    } catch (err) {
      console.warn('[LINGUAPHIX] Turnstile init failed:', err);
      mountEl.classList.remove('form-captcha--loading');
      mountEl.classList.add('form-captcha--disabled');
      return false;
    }
  }

  function resetFormCaptcha(mountEl) {
    if (!mountEl) return;
    const key = mountKey(mountEl);
    const rec = widgets.get(key);
    if (rec?.widgetId != null && window.turnstile) {
      window.turnstile.reset(rec.widgetId);
    }
    delete mountEl.dataset.captchaSolved;
    mountEl.classList.remove('form-captcha--ready');
  }

  async function requireFormCaptcha(mountEl, lang) {
    const code = langCode(lang || (typeof currentLang !== 'undefined' ? currentLang : 'fr'));
    if (!mountEl) {
      return { ok: false, message: captchaMessage(code, 'unavailable') };
    }

    const ready = await initFormCaptcha(mountEl, { lang: code });
    if (!ready) {
      return { ok: false, message: captchaMessage(code, 'unavailable') };
    }

    const token = getCaptchaToken(mountEl);
    if (token) {
      return { ok: true, token };
    }

    return { ok: false, message: captchaMessage(code, 'required') };
  }

  function initAllFormCaptchas(lang) {
    const code = langCode(lang || (typeof currentLang !== 'undefined' ? currentLang : 'fr'));
    document.querySelectorAll('[data-captcha]').forEach((el) => {
      if (el.dataset.captchaReady === '1') return;
      initFormCaptcha(el, { lang: code });
    });
  }

  window.initFormCaptcha = initFormCaptcha;
  window.resetFormCaptcha = resetFormCaptcha;
  window.requireFormCaptcha = requireFormCaptcha;
  window.initAllFormCaptchas = initAllFormCaptchas;
})();
