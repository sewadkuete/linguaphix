/**
 * Renders per-service detail pages from SERVICE_PAGES (service-pages-data.js).
 */

const SERVICE_PAGE_NAV = [
  { slug: 'tcf' },
  { slug: 'ielts' },
  { slug: 'toeic' },
  { slug: 'cours' },
  { slug: 'interview' },
  { slug: 'soutien' },
  { slug: 'traduction', audience: 'particuliers' },
  { slug: 'formation' },
  { slug: 'traduction', audience: 'entreprises' },
  { slug: 'logo' },
  { slug: 'montage' },
  { slug: 'graphic' },
  { slug: 'livestream' },
  { slug: 'materiel' },
];

function getCurrentServiceNavIndex() {
  const slug = document.body.dataset.serviceSlug;
  if (!slug) return -1;
  const audience =
    slug === 'traduction' && typeof getTraductionAudienceOrDefault === 'function'
      ? getTraductionAudienceOrDefault()
      : null;
  return SERVICE_PAGE_NAV.findIndex((entry) => {
    if (entry.slug !== slug) return false;
    if (slug === 'traduction') return entry.audience === audience;
    return !entry.audience;
  });
}

function buildServiceNavUrl(entry, lang) {
  let href = `${entry.slug}.html`;
  if (entry.slug === 'traduction' && entry.audience) {
    href += `?audience=${encodeURIComponent(entry.audience)}`;
  }
  if (typeof withLangInHref === 'function') {
    href = withLangInHref(href, lang);
  }
  return href;
}

function expandServicePageSection(sectionId) {
  const section = document.getElementById(sectionId);
  const details = section?.querySelector('details.service-page-collapse');
  if (details) details.open = true;
}

function expandServicePageFromHash() {
  const id = (location.hash || '').replace(/^#/, '');
  if (!id) return;
  expandServicePageSection(id);
}

function initServicePageCollapses() {
  expandServicePageFromHash();

  if (document.body.dataset.serviceCollapseBound === '1') return;
  document.body.dataset.serviceCollapseBound = '1';

  window.addEventListener('hashchange', expandServicePageFromHash);

  document.addEventListener('click', (e) => {
    const link = e.target.closest('.service-page-toc__link');
    if (!link) return;
    const id = (link.getAttribute('href') || '').replace(/^#/, '');
    if (id) expandServicePageSection(id);
  });
}

function renderServicePageNav(lang) {
  const t = (key, fr, en) =>
    (typeof i18n !== 'undefined' && i18n[lang]?.[key]) || (lang === 'en' ? en : fr);
  const esc = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const idx = getCurrentServiceNavIndex();
  if (idx < 0) return;

  const prev = idx > 0 ? SERVICE_PAGE_NAV[idx - 1] : null;
  const next = idx < SERVICE_PAGE_NAV.length - 1 ? SERVICE_PAGE_NAV[idx + 1] : null;

  document.querySelector('.service-page-nav-arrows')?.remove();

  const arrowSvg = (dir) =>
    dir === 'prev'
      ? '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>'
      : '<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path fill="currentColor" d="M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/></svg>';

  const nav = document.createElement('nav');
  nav.className = 'service-page-nav-arrows';
  nav.setAttribute('aria-label', t('svcpage.nav.arrows', 'Navigation entre services', 'Service navigation'));

  if (prev) {
    const a = document.createElement('a');
    a.className = 'service-page-nav-arrow service-page-nav-arrow--prev';
    a.href = buildServiceNavUrl(prev, lang);
    a.setAttribute('aria-label', t('svcpage.nav.prev', 'Service précédent', 'Previous service'));
    a.innerHTML = arrowSvg('prev');
    nav.appendChild(a);
  }

  if (next) {
    const a = document.createElement('a');
    a.className = 'service-page-nav-arrow service-page-nav-arrow--next';
    a.href = buildServiceNavUrl(next, lang);
    a.setAttribute('aria-label', t('svcpage.nav.next', 'Service suivant', 'Next service'));
    a.innerHTML = arrowSvg('next');
    nav.appendChild(a);
  }

  if (nav.children.length) document.body.appendChild(nav);
}

// Tailored WhatsApp invite per service (link is appended automatically by the share modal).
const SERVICE_SHARE_WA = {
  tcf: {
    fr: 'Tu prépares le TCF ? LINGUAPHIX propose une préparation avec examinateur certifié (CO, CE, EE, EO). Découvre :',
    en: 'Preparing for the TCF? LINGUAPHIX offers prep with a certified examiner (listening, reading, writing, speaking). Take a look:',
  },
  ielts: {
    fr: 'Objectif IELTS, TOEFL ou Cambridge ? Coaching score cible et simulations chez LINGUAPHIX. Découvre :',
    en: 'Aiming for IELTS, TOEFL or Cambridge? Target-score coaching and mock tests at LINGUAPHIX. Take a look:',
  },
  toeic: {
    fr: 'Besoin d\'un bon score au TOEIC ? Préparation L&R et S&W avec stratégies ciblées chez LINGUAPHIX. Découvre :',
    en: 'Need a strong TOEIC score? L&R and S&W prep with targeted strategies at LINGUAPHIX. Take a look:',
  },
  cours: {
    fr: 'Envie d\'apprendre le français ou l\'anglais ? Cours en ligne ou à Lomé avec LINGUAPHIX. Découvre :',
    en: 'Want to learn French or English? Online or in-person courses in Lomé with LINGUAPHIX. Take a look:',
  },
  interview: {
    fr: 'Un entretien d\'embauche en anglais à préparer ? Coaching d\'interview sur mesure chez LINGUAPHIX. Découvre :',
    en: 'Got an English job interview coming up? Tailored interview coaching at LINGUAPHIX. Take a look:',
  },
  soutien: {
    fr: 'Du soutien scolaire en français ou en anglais ? LINGUAPHIX accompagne les élèves. Découvre :',
    en: 'Looking for French or English school tutoring? LINGUAPHIX supports learners. Take a look:',
  },
  traduction: {
    fr: 'Besoin d\'une traduction professionnelle FR-EN, fiable et certifiée ? LINGUAPHIX s\'en charge. Découvre :',
    en: 'Need reliable, certified FR-EN professional translation? LINGUAPHIX has you covered. Take a look:',
  },
  formation: {
    fr: 'Former vos équipes en langues ? LINGUAPHIX propose des formations linguistiques en entreprise. Découvre :',
    en: 'Training your team in languages? LINGUAPHIX offers corporate language training. Take a look:',
  },
  logo: {
    fr: 'Un logo qui marque les esprits ? Création et animation de logo chez LINGUAPHIX. Découvre :',
    en: 'Want a logo that stands out? Logo design and animation at LINGUAPHIX. Take a look:',
  },
  montage: {
    fr: 'Des vidéos au rendu pro ? Montage vidéo professionnel chez LINGUAPHIX. Découvre :',
    en: 'Want pro-quality videos? Professional video editing at LINGUAPHIX. Take a look:',
  },
  graphic: {
    fr: 'Un visuel qui sort du lot ? Design graphique sur mesure chez LINGUAPHIX. Découvre :',
    en: 'Need standout visuals? Custom graphic design at LINGUAPHIX. Take a look:',
  },
  livestream: {
    fr: 'Un live fluide et professionnel ? Production de diffusion en direct chez LINGUAPHIX. Découvre :',
    en: 'Want a smooth, professional livestream? Live streaming production at LINGUAPHIX. Take a look:',
  },
  materiel: {
    fr: 'Quel matériel choisir ? Conseil et achat d\'équipement avec LINGUAPHIX. Découvre :',
    en: 'Not sure which gear to buy? Equipment consulting and purchase with LINGUAPHIX. Take a look:',
  },
};

function renderServicePage(lang) {
  const slug = document.body.dataset.serviceSlug;
  const meta = window.SERVICE_PAGES?.[slug];
  const data = meta?.[lang] || meta?.fr;
  const root = document.getElementById('service-page-root');
  if (!slug || !data || !root) return;

  const t = (key) => (typeof i18n !== 'undefined' && i18n[lang]?.[key]) || '';
  const esc = (s) =>
    String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const collapseWrap = (title, bodyHtml, open) => `
    <details class="service-page-collapse"${open ? ' open' : ''}>
      <summary class="service-page-collapse__summary">
        <h2 class="service-section-title">${esc(title)}</h2>
        <span class="service-page-collapse__chev" aria-hidden="true"></span>
      </summary>
      <div class="service-page-collapse__body">${bodyHtml}</div>
    </details>`;

  const policyType = meta.category === 'design' ? 'design' : 'langues';
  const policyKey = meta.policyKey || slug;

  const bookBtn = (btnClass, bookingPkgId, pkgName, mode) => {
    let attrs = bookingPkgId
      ? ` data-booking-pkg-id="${esc(bookingPkgId)}" data-booking-pkg-name="${esc(pkgName || '')}"`
      : '';
    if (bookingPkgId && mode) {
      attrs += ` data-booking-mode="${esc(mode)}"`;
    }
    const click = bookingPkgId
      ? 'scrollToServiceBooking(event, this)'
      : 'scrollToServiceBooking(event)';
    return `<a href="#book-now" role="button" class="${btnClass}"${attrs} onclick="${click}">${esc(t('svcpage.cta.book') || 'Réserver')}</a>`;
  };

  const traductionAudience =
    slug === 'traduction' && typeof getTraductionAudienceOrDefault === 'function'
      ? getTraductionAudienceOrDefault()
      : null;

  if (traductionAudience) {
    document.body.dataset.serviceAudience = traductionAudience;
  } else {
    document.body.removeAttribute('data-service-audience');
  }

  const audienceOverride =
    traductionAudience &&
    (meta.audienceOverrides?.[traductionAudience]?.[lang] ||
      meta.audienceOverrides?.[traductionAudience]?.fr);
  const pageTitle = audienceOverride?.title || data.title;
  const pageIntro = audienceOverride?.intro || data.intro;

  const shareUrl = 'https://www.linguaphix.com/services/' + slug + '.html'
    + (slug === 'traduction' && traductionAudience ? '?audience=' + encodeURIComponent(traductionAudience) : '');
  const shareWaMap = SERVICE_SHARE_WA[slug] || {};
  const shareWa = shareWaMap[lang] || shareWaMap.fr || '';
  window.__svcShare = { url: shareUrl, waText: shareWa };

  const modalitiesHtml = data.modalities.map((m) => `<li>${esc(m)}</li>`).join('');
  const processHtml = data.process
    .map(
      (step, i) => `
    <div class="service-process-step">
      <span class="service-process-num">${i + 1}</span>
      <p>${esc(step)}</p>
    </div>`
    )
    .join('');

  const faqHtml = data.faq
    .map(
      (item, i) => `
    <details class="service-faq-item"${i === 0 ? ' open' : ''}>
      <summary>${esc(item.q)}</summary>
      <p>${esc(item.a)}</p>
    </details>`
    )
    .join('');

  const delivery = data.delivery || {};
  const showDelivery = delivery.show !== false;
  const deliveryHtml = showDelivery
    ? `
    <div class="service-delivery-grid">
      <div class="service-delivery-card">
        <span class="service-delivery-label">${esc(t('svcpage.delivery.normal') || 'Standard')}</span>
        <p>${esc(delivery.normal || '')}</p>
      </div>
      ${delivery.express ? `
      <div class="service-delivery-card service-delivery-card--express">
        <span class="service-delivery-label">${esc(t('svcpage.delivery.express') || 'Express')}</span>
        <p>${esc(delivery.express)}</p>
        ${delivery.expressNote ? `<p class="service-delivery-note">${esc(delivery.expressNote)}</p>` : ''}
      </div>` : ''}
    </div>`
    : '';

  const backHref = meta.category === 'design' ? '../design.html' : '../index.html#services';
  const backLabel =
    t(meta.category === 'design' ? 'svcpage.back.design' : 'svcpage.back') ||
    (meta.category === 'design' ? '← Retour au design' : '← Retour aux services');

  const tocItems = [
    { id: 'book-now', label: t('svcpage.nav.book') || 'Book now' },
    { id: 'svc-how', label: t('svcpage.nav.how') || 'How it works' },
    { id: 'svc-payment', label: t('svcpage.nav.payment') || 'Payment' },
  ];
  if (slug === 'cours') {
    tocItems.push({ id: 'svc-faq', label: t('svcpage.nav.faq') || 'FAQ' });
    tocItems.push({
      href: '../exercices/index.html',
      label: t('svcpage.nav.precis') || 'Précis de grammaire gratuits',
    });
  } else {
    tocItems.push({ id: 'svc-faq', label: t('svcpage.nav.faq') || 'FAQ' });
  }

  const tocHtml = tocItems
    .map((item) => {
      if (item.href) {
        return `<li><a href="${esc(item.href)}" class="service-page-toc__link">${esc(item.label)}</a></li>`;
      }
      return `<li><a href="#${item.id}" class="service-page-toc__link">${esc(item.label)}</a></li>`;
    })
    .join('');

  const paymentLead = t('svcpage.payment.lead');
  const bookTitle = t('svcpage.nav.book') || 'Book now';
  const howTitle = t('svcpage.nav.how') || 'How it works';
  const paymentTitle = t('svcpage.payment') || t('svcpage.nav.payment') || 'Payment';
  const faqTitle = t('svcpage.faq') || t('svcpage.nav.faq') || 'FAQ';

  const howBody = `
        <div class="service-page-panels">
          <div class="service-page-panel">
            <h3 class="service-page-panel__title">${esc(t('svcpage.modalities') || 'Modalités')}</h3>
            <ul class="service-list service-list--readable">${modalitiesHtml}</ul>
          </div>
          <div class="service-page-panel">
            <h3 class="service-page-panel__title">${esc(t('svcpage.process') || 'Processus')}</h3>
            <div class="service-process-steps">${processHtml}</div>
          </div>
        </div>`;

  const paymentBody = `
        ${paymentLead ? `<p class="service-section-lead service-page-collapse__lead">${esc(paymentLead)}</p>` : ''}
        <div class="service-page-panel service-page-panel--payment">
          <ul class="payment-methods__list payment-methods__list--inline">
            <li class="payment-method payment-method--mixx">
              <img src="../assets/payments/mixx-by-yas.png" alt="Mixx by Yas" class="payment-method__logo payment-method__logo--mixx" width="200" height="56" decoding="async">
              <div class="payment-method__details">
                <span class="payment-method__label">${esc(t('payment.mixx') || 'Mixx by Yas')}</span>
                <a href="tel:+22892539953" class="payment-method__number" data-site-phone-display>+228 92 53 99 53</a>
              </div>
            </li>
            <li class="payment-method payment-method--orabank">
              <img src="../assets/payments/orabank.png" alt="Orabank" class="payment-method__logo payment-method__logo--orabank" width="160" height="40" decoding="async">
              <p class="payment-method__note">${esc(t('payment.orabank.note') || '')}</p>
            </li>
          </ul>
        </div>`;

  root.innerHTML = `
    <section class="service-page-hero section-sm">
      <div class="container">
        <p class="service-page-back"><a href="${backHref}">${esc(backLabel)}</a></p>
        <header class="service-page-header fade-up">
          <span class="service-page-icon" aria-hidden="true">${meta.icon || '✦'}</span>
          <span class="badge">${esc(data.badge || '')}</span>
          <h1>${esc(pageTitle)}</h1>
          <div class="service-page-share">
            <button type="button" class="btn btn-outline btn-sm service-share-btn" onclick="openShareServiceModal(event)">
              <span class="service-share-btn__icon" aria-hidden="true">↗</span>
              <span>${esc(t('share.service.cta') || (lang === 'en' ? 'Share this service' : 'Partager ce service'))}</span>
            </button>
          </div>
          <p class="service-page-intro">${esc(pageIntro)}</p>
        </header>
        <nav class="service-page-toc fade-up" aria-label="${esc(t('svcpage.nav.label') || 'On this page')}">
          <span class="service-page-toc__label">${esc(t('svcpage.nav.label') || '')}</span>
          <ul class="service-page-toc__list">${tocHtml}</ul>
        </nav>
      </div>
    </section>

    <section id="book-now" class="service-page-block service-page-block--alt section-sm">
      <div class="container">
        ${collapseWrap(bookTitle, '<div id="service-booking-mount"></div>', true)}
      </div>
    </section>

    <section id="svc-how" class="service-page-block section-sm">
      <div class="container">
        ${collapseWrap(howTitle, howBody, false)}
      </div>
    </section>

    ${showDelivery ? `
    <section id="svc-delivery" class="service-page-block service-page-block--alt section-sm">
      <div class="container">
        <header class="service-page-block__head">
          <h2 class="service-section-title">${esc(t('svcpage.delivery') || 'Délais')}</h2>
        </header>
        ${deliveryHtml}
      </div>
    </section>` : ''}

    <section id="svc-payment" class="service-page-block section-sm">
      <div class="container">
        ${collapseWrap(paymentTitle, paymentBody, false)}
      </div>
    </section>

    <section id="svc-faq" class="service-page-block service-page-block--alt section-sm">
      <div class="container">
        ${collapseWrap(faqTitle, `<div class="service-faq-list">${faqHtml}</div>`, false)}
      </div>
    </section>

    <section class="section section-sm service-page-cta-band">
      <div class="container service-page-cta-inner">
        ${bookBtn('btn btn-primary btn-lg')}
        <a href="javascript:void(0)" role="button" class="btn btn-outline btn-lg" onclick="openQuoteModal(event)">${esc(t('svcpage.cta.quote') || 'Devis')}</a>
        <a href="javascript:void(0)" role="button" class="btn btn-accent btn-lg" onclick="openPolicy('${policyType}', event, '${policyKey}')">${esc(t('svcpage.cta.policy') || 'Politique')}</a>
      </div>
    </section>`;

  const seoPayload = {
    ...data,
    seoTitle: audienceOverride?.seoTitle || data.seoTitle,
    metaDescription: audienceOverride?.metaDescription || data.metaDescription,
  };
  if (typeof applyServicePageSeo === 'function') {
    applyServicePageSeo(lang, slug, seoPayload, pageTitle, meta.category);
  } else {
    document.title = seoPayload.seoTitle || `LINGUAPHIX | ${pageTitle}`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', seoPayload.metaDescription || pageIntro);
  }

  if (typeof applyGeoPrices === 'function') applyGeoPrices(lang, typeof i18n !== 'undefined' ? i18n : {});
  if (typeof applySitePhones === 'function') applySitePhones();

  root.querySelectorAll('.fade-up').forEach((el) => {
    if (typeof observer !== 'undefined') observer.observe(el);
  });

  initServicePageCollapses();
  renderServicePageNav(lang);

  if (typeof renderServiceBooking === 'function') renderServiceBooking(lang);
}

window.expandServicePageSection = expandServicePageSection;
