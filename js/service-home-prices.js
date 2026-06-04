/**
 * Syncs parent service card prices (index, design) from SERVICE_PAGES.
 * Uses the featured package on each detail page, or meta.homeCard when set.
 */
(function () {
  function getHomePriceSpec(slug, lang, audience) {
    const meta = window.SERVICE_PAGES?.[slug];
    if (!meta) return null;

    if (meta.homeCard) {
      return { ...meta.homeCard };
    }

    const data = meta[lang] || meta.fr;
    const audienceArg = audience || null;
    let packages = data?.packages;
    if (slug === 'traduction' && audienceArg === 'entreprises' && data?.businessPackages?.length) {
      packages = data.businessPackages;
    }
    if (!packages?.length) return { quote: true };

    const featured = packages.find((p) => p.featured);
    const withPagePrice = packages.find((p) => p.priceXof > 0 && !p.quote);
    const pkg = featured || withPagePrice || packages[0];

    if (!pkg) return { quote: true };
    if (pkg.quote && !(pkg.priceXof > 0)) return { quote: true };
    if (pkg.priceXof > 0) {
      return {
        priceXof: pkg.priceXof,
        unit: pkg.unit || undefined,
        quote: false
      };
    }
    if (pkg.priceFromXof != null && pkg.priceToXof != null && pkg.unit === 'word') {
      return {
        priceFromXof: pkg.priceFromXof,
        priceToXof: pkg.priceToXof,
        unit: 'word',
        quote: false
      };
    }

    return { quote: true };
  }

  function applyHomeServicePrices(lang) {
    if (!window.SERVICE_PAGES) return;

    document.querySelectorAll('[data-service-price]').forEach((el) => {
      const slug = el.getAttribute('data-service-price');
      const audience = el.getAttribute('data-service-audience') || null;
      const spec = getHomePriceSpec(slug, lang, audience);
      if (!spec) return;

      el.removeAttribute('data-xof');
      el.removeAttribute('data-unit');
      el.removeAttribute('data-quote');
      el.removeAttribute('data-xof-from');
      el.removeAttribute('data-xof-to');

      if (spec.quote) {
        el.setAttribute('data-quote', '1');
      } else if (spec.priceFromXof != null && spec.priceToXof != null) {
        el.setAttribute('data-xof-from', String(spec.priceFromXof));
        el.setAttribute('data-xof-to', String(spec.priceToXof));
        if (spec.unit) el.setAttribute('data-unit', spec.unit);
      } else {
        el.setAttribute('data-xof', String(spec.priceXof));
        if (spec.unit) el.setAttribute('data-unit', spec.unit);
      }
    });
  }

  window.getServiceHomePriceSpec = getHomePriceSpec;
  window.applyHomeServicePrices = applyHomeServicePrices;
})();
