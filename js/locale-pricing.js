/* Geo currency + bilingual selects — used with i18n in app.js */

(function () {

  const XOF_PER = { XOF: 1, EUR: 655.957, USD: 615, GBP: 775, CAD: 450 };



  const COUNTRY_CURRENCY = {

    TG: 'XOF', BJ: 'XOF', SN: 'XOF', CI: 'XOF', BF: 'XOF', ML: 'XOF', NE: 'XOF', GW: 'XOF',

    FR: 'EUR', DE: 'EUR', ES: 'EUR', IT: 'EUR', BE: 'EUR', NL: 'EUR', PT: 'EUR', LU: 'EUR',

    US: 'USD', GB: 'GBP', UK: 'GBP', CA: 'CAD', AU: 'USD', NG: 'USD', GH: 'USD', ZA: 'USD',

    CM: 'XOF', GA: 'XOF', CG: 'XOF', CD: 'USD', MA: 'EUR', TN: 'EUR', DZ: 'EUR',

    CH: 'EUR', AT: 'EUR', IE: 'EUR', PL: 'EUR'

  };



  const TZ_CURRENCY = [

    [/Africa\/(Lome|Abidjan|Lagos|Accra|Bamako|Dakar|Ouagadougou|Niamey|Cotonou|Porto-Novo|Kinshasa|Libreville|Douala)/i, 'XOF'],

    [/Europe\//i, 'EUR'],

    [/America\/(Toronto|Vancouver|Winnipeg|Edmonton|Halifax)/i, 'CAD'],

    [/America\//i, 'USD'],

    [/^(GB|Europe\/London)/i, 'GBP']

  ];



  let detectedCurrency = 'XOF';



  const unitKeys = {

    session: 'price.unit.session',

    hour: 'price.unit.hour',

    page: 'price.unit.page',

    visual: 'price.unit.visual',

    month: 'price.unit.month',

    pack: 'price.unit.pack',

    word: 'price.unit.word',

    project: 'price.unit.project',

    day: 'price.unit.day',

    assistance: 'price.unit.assistance'

  };



  function detectCurrencyFromBrowser() {

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';

    for (const [re, cur] of TZ_CURRENCY) {

      if (re.test(tz)) return cur;

    }

    const region = (navigator.language || 'fr-FR').split('-')[1]?.toUpperCase();

    if (region && COUNTRY_CURRENCY[region]) return COUNTRY_CURRENCY[region];

    return 'XOF';

  }



  async function detectCurrency() {

    try {

      const ctrl = new AbortController();

      const t = setTimeout(() => ctrl.abort(), 3500);

      const res = await fetch('https://ipapi.co/json/', { signal: ctrl.signal });

      clearTimeout(t);

      if (res.ok) {

        const data = await res.json();

        const code = data.country_code && COUNTRY_CURRENCY[data.country_code];

        if (code) {

          detectedCurrency = code;

          return code;

        }

      }

    } catch (_) { /* fallback */ }

    detectedCurrency = detectCurrencyFromBrowser();

    return detectedCurrency;

  }



  function localeFor(currency, lang) {

    const map = {

      XOF: lang === 'fr' ? 'fr-TG' : 'fr-TG',

      EUR: lang === 'fr' ? 'fr-FR' : 'en-GB',

      USD: 'en-US',

      GBP: 'en-GB',

      CAD: 'en-CA'

    };

    return map[currency] || (lang === 'fr' ? 'fr-FR' : 'en-US');

  }



  function formatMoney(xofAmount, currency, lang) {

    const rate = XOF_PER[currency] || XOF_PER.XOF;

    const amount = xofAmount / rate;

    try {

      return new Intl.NumberFormat(localeFor(currency, lang), {

        style: 'currency',

        currency,

        maximumFractionDigits: currency === 'XOF' ? 0 : 0,

        minimumFractionDigits: 0

      }).format(amount);

    } catch (_) {

      return `${Math.round(amount)} ${currency}`;

    }

  }



  /** Small USD equivalent shown beside XOF (e.g. (~$57)). */

  function formatUsdAside(xofAmount, lang) {

    const usd = formatMoney(xofAmount, 'USD', lang);

    return `(~${usd})`;

  }



  function getUnitSuffix(el, lang, i18n) {

    const unitKey = unitKeys[el.getAttribute('data-unit')];

    return unitKey && i18n[lang]?.[unitKey] ? ` / ${i18n[lang][unitKey]}` : '';

  }



  function fillWordRangePriceElement(el, fromXof, toXof, lang, i18n) {
    const fromLabel = i18n[lang]?.['price.from'] || (lang === 'en' ? 'From' : 'À partir de');
    const unitKey = unitKeys.word;
    const unit = unitKey && i18n[lang]?.[unitKey] ? i18n[lang][unitKey] : (lang === 'en' ? 'word' : 'mot');
    const primary = `${fromLabel} ${fromXof}–${toXof} FCFA / ${unit}`;
    el.innerHTML = `<span class="price-range__primary">${primary}</span>`;
  }

  function fillDualPageWordPriceElement(el, lang, i18n) {
    const fromLabel = i18n[lang]?.['price.from'] || (lang === 'en' ? 'From' : 'À partir de');
    const orLabel = i18n[lang]?.['price.or'] || (lang === 'en' ? 'or' : 'ou');
    const pageXof = parseInt(el.getAttribute('data-xof'), 10);
    const fromW = parseInt(el.getAttribute('data-xof-from'), 10);
    const toW = parseInt(el.getAttribute('data-xof-to'), 10);
    if (!Number.isFinite(pageXof) || !Number.isFinite(fromW) || !Number.isFinite(toW)) return;
    const pageUnit = i18n[lang]?.[unitKeys.page] || (lang === 'en' ? 'page' : 'page');
    const wordUnit = i18n[lang]?.[unitKeys.word] || (lang === 'en' ? 'word' : 'mot');
    const pageStr = formatMoney(pageXof, 'XOF', lang);
    const primary = `${fromLabel} ${pageStr} / ${pageUnit} ${orLabel} ${fromLabel} ${fromW}–${toW} FCFA / ${wordUnit}`;
    el.innerHTML = `<span class="price-range__primary">${primary}</span>`;
  }

  function fillPriceElement(el, xof, lang, i18n) {

    const fromLabel = i18n[lang]?.['price.from'] || 'From';

    const unit = getUnitSuffix(el, lang, i18n);

    const xofStr = formatMoney(xof, 'XOF', lang);

    const usdAside = formatUsdAside(xof, lang);

    const compact = el.classList.contains('booking-mode-price__amount') ||
      el.classList.contains('mode-price-tile__amount') ||
      Boolean(el.closest('.booking-mode-price')) ||
      Boolean(el.closest('.mode-price-tile'));



    const primary = compact ? xofStr : `${fromLabel} ${xofStr}${unit}`;

    el.innerHTML =

      `<span class="price-range__primary">${primary}</span>` +

      `<span class="price-range__aside">${usdAside}</span>`;

  }



  window.getDetectedCurrency = () => detectedCurrency;

  window.formatMoney = formatMoney;

  window.formatUsdAside = formatUsdAside;

  window.formatPriceFromXof = (xof, lang) => formatMoney(xof, 'XOF', lang);



  window.applySelectI18n = function applySelectI18n(lang, i18n) {

    document.querySelectorAll('select').forEach(select => {

      const saved = select.value;

      select.querySelectorAll('optgroup[data-i18n-label]').forEach(og => {

        const key = og.getAttribute('data-i18n-label');

        if (i18n[lang][key]) og.label = i18n[lang][key];

      });

      select.querySelectorAll('option[data-i18n]').forEach(opt => {

        const key = opt.getAttribute('data-i18n');

        if (i18n[lang][key]) opt.textContent = i18n[lang][key];

      });

      if (saved && [...select.options].some(o => o.value === saved)) select.value = saved;

    });

  };



  window.getServiceLabel = function getServiceLabel(value, lang, i18n) {

    if (!value) return '';

    const key = `opt.${value}`;

    return (i18n[lang] && i18n[lang][key]) || value;

  };



  window.applyGeoPrices = async function applyGeoPrices(lang, i18n) {

    await detectCurrency();

    const quoteLabel = i18n[lang]['price.quote'] || 'Quote';



    document.querySelectorAll('[data-quote="1"]').forEach(el => {

      if (el.hasAttribute('data-xof')) return;

      const inner = el.querySelector('[data-quote-label]');

      if (inner) inner.textContent = quoteLabel;

      else el.textContent = quoteLabel;

    });



    document.querySelectorAll('.price-range[data-dual-page-word="1"]').forEach(el => {
      fillDualPageWordPriceElement(el, lang, i18n);
    });

    document.querySelectorAll('.price-range[data-xof-from][data-xof-to]').forEach(el => {
      if (el.getAttribute('data-dual-page-word') === '1') return;
      const fromXof = parseInt(el.getAttribute('data-xof-from'), 10);
      const toXof = parseInt(el.getAttribute('data-xof-to'), 10);
      if (!Number.isFinite(fromXof) || !Number.isFinite(toXof)) return;
      fillWordRangePriceElement(el, fromXof, toXof, lang, i18n);
    });

    document.querySelectorAll('.price-range[data-xof]').forEach(el => {
      if (el.getAttribute('data-dual-page-word') === '1' || el.hasAttribute('data-xof-from')) return;
      const xof = parseInt(el.getAttribute('data-xof'), 10);
      if (!Number.isFinite(xof)) return;
      fillPriceElement(el, xof, lang, i18n);
    });

  };

})();


