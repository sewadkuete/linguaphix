/** Per-service images: set en when you add assets/catalogue/<service>/01-en.png */
const CATALOGUE_IMAGE_PATHS = {
  tcf: {
    fr: 'assets/catalogue/tcf/01.png',
    en: 'assets/catalogue/tcf/01.png',
  },
  ielts: {
    fr: 'assets/catalogue/ielts/01.png',
    en: 'assets/catalogue/ielts/01.png',
  },
  toeic: {
    fr: 'assets/catalogue/toeic/01.png',
    en: 'assets/catalogue/toeic/01.png',
  },
  livestream: {
    fr: 'assets/catalogue/livestream/01.png',
    en: 'assets/catalogue/livestream/01.png',
  },
  cours: {
    fr: 'assets/catalogue/cours/01.png',
    en: 'assets/catalogue/cours/01.png',
  },
  interview: {
    fr: 'assets/catalogue/interview/01.png',
    en: 'assets/catalogue/interview/01.png',
  },
  soutien: {
    fr: 'assets/catalogue/soutien/01.png',
    en: 'assets/catalogue/soutien/01.png',
  },
  traduction: {
    fr: 'assets/catalogue/traduction/01.png',
    en: 'assets/catalogue/traduction/01.png',
  },
  logo: {
    fr: 'assets/catalogue/logo/01.png',
    en: 'assets/catalogue/logo/01.png',
  },
  montage: {
    fr: 'assets/catalogue/montage/01.png',
    en: 'assets/catalogue/montage/01.png',
  },
  graphic: {
    fr: 'assets/catalogue/graphic/01.png',
    en: 'assets/catalogue/graphic/01.png',
  },
  formation: {
    fr: 'assets/catalogue/formation/01.png',
    en: 'assets/catalogue/formation/01.png',
  },
  materiel: {
    fr: 'assets/catalogue/materiel/01.png',
    en: 'assets/catalogue/materiel/01.png',
  },
};

function catalogueImageSrc(paths, lang) {
  if (!paths) return null;
  return paths[lang] || paths.fr || paths.en || null;
}

function applyCatalogueImages(lang) {
  if (!document.body.classList.contains('page-catalogue')) return;

  Object.entries(CATALOGUE_IMAGE_PATHS).forEach(([key, paths]) => {
    const src = catalogueImageSrc(paths, lang);
    if (!src) return;

    const altKey = `catalogue.alt.${key}`;
    const altText = typeof i18n !== 'undefined' && i18n[lang]?.[altKey] ? i18n[lang][altKey] : null;

    document
      .querySelectorAll(`#catalogue-${key}, [data-catalogue-service="${key}"]`)
      .forEach((article) => {
        const link = article.querySelector('a.catalogue-photo');
        const img = link?.querySelector('img');
        if (!link || !img) return;
        img.src = src;
        link.href = src;
        if (altText) img.alt = altText;
      });
  });

  document.querySelectorAll('.catalogue-photo img[data-catalogue-base]').forEach((img) => {
    const key = img.closest('[id^="catalogue-"]')?.id?.replace('catalogue-', '');
    if (key && CATALOGUE_IMAGE_PATHS[key]) return;

    const base = img.getAttribute('data-catalogue-base');
    if (!base) return;
    const ext = img.getAttribute('data-catalogue-ext') || 'png';
    const fallback = `${base}.${ext}`;
    const localized = lang === 'en' ? `${base}-en.${ext}` : `${base}-fr.${ext}`;
    const link = img.closest('a.catalogue-photo');

    const apply = (src) => {
      img.src = src;
      if (link) link.href = src;
    };

    if (localized === fallback) {
      apply(fallback);
      return;
    }

    img.onerror = () => {
      img.onerror = null;
      apply(fallback);
    };
    apply(localized);
  });

  document.querySelectorAll('.catalogue-photo img[data-i18n-alt]').forEach((img) => {
    const key = img.getAttribute('data-i18n-alt');
    if (typeof i18n !== 'undefined' && i18n[lang]?.[key]) img.alt = i18n[lang][key];
  });

  document.querySelectorAll('.catalogue-gallery').forEach((gallery) => {
    const img = gallery.querySelector('img[data-i18n-alt]');
    if (!img) return;
    const key = img.getAttribute('data-i18n-alt');
    if (typeof i18n !== 'undefined' && i18n[lang]?.[key]) {
      gallery.setAttribute('aria-label', i18n[lang][key]);
    }
  });
}

function switchCatalogueAudience(type, btn) {
  document.querySelectorAll('.catalogue-filter-bar .stab').forEach((t) => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const root = document.getElementById('catalogueSections');
  if (root) {
    root.classList.toggle('catalogue-filter-all', type === 'all');
    root.classList.toggle('catalogue-filter-particuliers', type === 'particuliers');
    root.classList.toggle('catalogue-filter-entreprises', type === 'entreprises');
  }

  document.querySelectorAll('.catalogue-audience[data-audience]').forEach((block) => {
    const audiences = block.dataset.audience.trim().split(/\s+/);
    block.hidden = type !== 'all' && !audiences.includes(type);
  });

  document.querySelectorAll('.catalogue-lang-matrix [data-audience]').forEach((el) => {
    const audiences = el.dataset.audience.trim().split(/\s+/);
    const show = type === 'all' || audiences.includes(type);
    el.hidden = !show;
  });
}

function initCataloguePage() {
  const activeTab = document.querySelector('.catalogue-filter-bar .stab.active');
  switchCatalogueAudience('all', activeTab);
  if (typeof currentLang !== 'undefined') applyCatalogueImages(currentLang);
  if (typeof scrollToHashTarget === 'function') scrollToHashTarget();
}
