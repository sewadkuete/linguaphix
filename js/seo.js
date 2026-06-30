/**
 * Invisible SEO helpers: titles, meta, hreflang, Open Graph, JSON-LD.
 * Does not change visible page content.
 */
(function () {
  const SITE = 'https://www.linguaphix.com';
  const LANG_PARAM = window.LINGUAPHIX_LANG_PARAM || 'lang';
  const BRAND_SUFFIX = 'LINGUAPHIX';

  function localizedPageUrl(lang) {
    try {
      const url = new URL(window.location.href);
      if (lang === 'en') url.searchParams.set(LANG_PARAM, 'en');
      else url.searchParams.delete(LANG_PARAM);
      const qs = url.searchParams.toString();
      return `${url.origin}${url.pathname}${qs ? `?${qs}` : ''}${url.hash}`;
    } catch (_) {
      return window.location.href;
    }
  }

  function setMeta(attr, key, value) {
    if (!value) return;
    let el = document.querySelector(`meta[${attr}="${key}"]`);
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(attr, key);
      document.head.appendChild(el);
    }
    el.setAttribute('content', value);
  }

  function syncHreflang(lang) {
    document.querySelectorAll('link[data-lx-hreflang]').forEach((node) => node.remove());
    const fr = localizedPageUrl('fr');
    const en = localizedPageUrl('en');
    const pairs = [
      ['fr', fr],
      ['en', en],
      ['x-default', fr],
    ];
    pairs.forEach(([hreflang, href]) => {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = hreflang;
      link.href = href;
      link.setAttribute('data-lx-hreflang', '1');
      document.head.appendChild(link);
    });
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = lang === 'en' ? en : fr;
  }

  function syncOpenGraph(title, description, lang) {
    const url = localizedPageUrl(lang);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'fr_FR');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
  }

  function removeJsonLd() {
    document.querySelectorAll('script[data-lx-jsonld]').forEach((node) => node.remove());
  }

  function injectJsonLd(data) {
    removeJsonLd();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-lx-jsonld', '1');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }

  function applySiteSeo(lang) {
    if (document.body.classList.contains('page-service')) return;
    const titleKey = document.body?.dataset?.i18nTitle;
    if (!titleKey) return;
    const title = document.title;
    const descKey = titleKey.replace('page.title.', 'page.desc.');
    const description =
      document.querySelector('meta[name="description"]')?.getAttribute('content') ||
      (typeof i18n !== 'undefined' ? i18n[lang]?.[descKey] || i18n.fr?.[descKey] : '') ||
      '';
    if (!title) return;
    syncHreflang(lang);
    syncOpenGraph(title, description, lang);
  }

  function applyServicePageSeo(lang, slug, data, pageTitle, category) {
    const title = data.seoTitle || `${BRAND_SUFFIX} | ${pageTitle}`;
    const description = data.metaDescription || data.intro || '';
    document.title = title;
    setMeta('name', 'description', description);
    syncHreflang(lang);
    syncOpenGraph(title, description, lang);

    const provider = {
      '@type': 'Organization',
      name: BRAND_SUFFIX,
      url: `${SITE}/`,
      email: 'contact@linguaphix.com',
    };

    const schemaType = category === 'design' || slug === 'traduction' ? 'Service' : 'Course';
    const pageSchema = {
      '@context': 'https://schema.org',
      '@type': schemaType,
      name: pageTitle,
      description,
      url: localizedPageUrl(lang),
      provider,
      areaServed: [{ '@type': 'City', name: 'Lomé' }, { '@type': 'Country', name: 'Togo' }],
    };
    if (schemaType === 'Course') {
      pageSchema.inLanguage = lang === 'en' ? 'en' : 'fr';
      pageSchema.educationalLevel = 'Beginner to Advanced';
      pageSchema.courseMode = ['online', 'onsite'];
      pageSchema.offers = {
        '@type': 'Offer',
        url: `${localizedPageUrl(lang)}#book-now`,
        availability: 'https://schema.org/InStock',
        priceCurrency: 'XOF',
      };
    } else {
      pageSchema.serviceType = pageTitle;
    }

    const graphs = [pageSchema];

    if (Array.isArray(data.faq) && data.faq.length) {
      graphs.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: data.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      });
    }

    injectJsonLd(graphs.length === 1 ? graphs[0] : { '@context': 'https://schema.org', '@graph': graphs });
  }

  function enhanceHomeJsonLd(lang) {
    if (document.body.dataset.i18nTitle !== 'page.title.home') return;
    const isEn = lang === 'en';
    injectJsonLd({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'ProfessionalService',
          name: BRAND_SUFFIX,
          url: `${SITE}/`,
          description: isEn
            ? 'Online French and English courses, TCF, IELTS, TOEFL preparation, and FR-EN translation in Lomé, Togo.'
            : 'Cours de français et d\'anglais en ligne, préparation TCF, IELTS, TOEFL et traduction FR-EN à Lomé, Togo.',
          email: 'contact@linguaphix.com',
          areaServed: [{ '@type': 'City', name: 'Lomé' }, { '@type': 'Country', name: 'Togo' }],
          address: { '@type': 'PostalAddress', addressLocality: 'Lomé', addressCountry: 'TG' },
          founder: { '@type': 'Person', name: 'Akuété SEWA-DOVI' },
          sameAs: ['https://www.linkedin.com/in/akuetesd'],
          knowsAbout: isEn
            ? ['TCF preparation', 'IELTS preparation', 'TOEFL preparation', 'TOEIC preparation', 'English classes', 'French classes', 'English classes in Lomé', 'French classes in Lomé', 'online language courses', 'translation']
            : ['préparation TCF', 'préparation IELTS', 'préparation TOEFL', 'préparation TOEIC', 'cours d\'anglais', 'cours de français', 'cours d\'anglais à Lomé', 'cours de français à Lomé', 'cours en ligne', 'traduction'],
        },
        {
          '@type': 'WebSite',
          name: BRAND_SUFFIX,
          url: `${SITE}/`,
          inLanguage: ['fr', 'en'],
          potentialAction: {
            '@type': 'SearchAction',
            target: `${SITE}/site-index.html?q={search_term_string}`,
            'query-input': 'required name=search_term_string',
          },
        },
      ],
    });
  }

  window.applySiteSeo = applySiteSeo;
  window.applyServicePageSeo = applyServicePageSeo;
  window.enhanceHomeJsonLd = enhanceHomeJsonLd;
})();
