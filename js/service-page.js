/**

 * Renders per-service detail pages from SERVICE_PAGES (service-pages-data.js).

 */

function renderServicePage(lang) {

  const slug = document.body.dataset.serviceSlug;

  const meta = window.SERVICE_PAGES?.[slug];

  const data = meta?.[lang] || meta?.fr;

  const root = document.getElementById('service-page-root');

  if (!slug || !data || !root) return;



  const t = (key) => (typeof i18n !== 'undefined' && i18n[lang]?.[key]) || '';

  const esc = (s) => String(s)

    .replace(/&/g, '&amp;')

    .replace(/</g, '&lt;')

    .replace(/>/g, '&gt;')

    .replace(/"/g, '&quot;');



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

  const modalitiesHtml = data.modalities.map((m) => `<li>${esc(m)}</li>`).join('');

  const processHtml = data.process.map((step, i) => `

    <div class="service-process-step">

      <span class="service-process-num">${i + 1}</span>

      <p>${esc(step)}</p>

    </div>`).join('');



  const faqHtml = data.faq.map((item, i) => `

    <details class="service-faq-item"${i === 0 ? ' open' : ''}>

      <summary>${esc(item.q)}</summary>

      <p>${esc(item.a)}</p>

    </details>`).join('');



  const delivery = data.delivery || {};

  const showDelivery = delivery.show !== false;

  const deliveryHtml = showDelivery ? `

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

    </div>` : '';



  const backHref = meta.category === 'design' ? '../design.html' : '../index.html#services';

  const backLabel = t(meta.category === 'design' ? 'svcpage.back.design' : 'svcpage.back') || (meta.category === 'design' ? '← Retour au design' : '← Retour aux services');



  const tocItems = [
    { id: 'book-now', label: t('svcpage.nav.book') || 'Book now' },
    { id: 'svc-how', label: t('svcpage.nav.how') || 'How it works' },
    { id: 'svc-payment', label: t('svcpage.nav.payment') || 'Payment' },
    { id: 'svc-faq', label: t('svcpage.nav.faq') || 'FAQ' },
  ];

  const tocHtml = tocItems.map((item) =>

    `<li><a href="#${item.id}" class="service-page-toc__link">${esc(item.label)}</a></li>`

  ).join('');



  const paymentLead = t('svcpage.payment.lead');

  root.innerHTML = `

    <section class="service-page-hero section-sm">

      <div class="container">

        <p class="service-page-back"><a href="${backHref}">${esc(backLabel)}</a></p>

        <header class="service-page-header fade-up">

          <span class="service-page-icon" aria-hidden="true">${meta.icon || '✦'}</span>

          <span class="badge">${esc(data.badge || '')}</span>

          <h1>${esc(pageTitle)}</h1>

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

        <div id="service-booking-mount"></div>

      </div>

    </section>



    <section id="svc-how" class="service-page-block section-sm">

      <div class="container">

        <header class="service-page-block__head">

          <h2 class="service-section-title">${esc(t('svcpage.nav.how') || '')}</h2>

        </header>

        <div class="service-page-panels">

          <div class="service-page-panel">

            <h3 class="service-page-panel__title">${esc(t('svcpage.modalities') || 'Modalités')}</h3>

            <ul class="service-list service-list--readable">${modalitiesHtml}</ul>

          </div>

          <div class="service-page-panel">

            <h3 class="service-page-panel__title">${esc(t('svcpage.process') || 'Processus')}</h3>

            <div class="service-process-steps">${processHtml}</div>

          </div>

        </div>

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

        <header class="service-page-block__head">

          <h2 class="service-section-title">${esc(t('svcpage.payment') || 'Paiement')}</h2>

          ${paymentLead ? `<p class="service-section-lead">${esc(paymentLead)}</p>` : ''}

        </header>

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

        </div>

      </div>

    </section>



    <section id="svc-faq" class="service-page-block service-page-block--alt section-sm">

      <div class="container">

        <header class="service-page-block__head">

          <h2 class="service-section-title">${esc(t('svcpage.faq') || 'FAQ')}</h2>

        </header>

        <div class="service-faq-list">${faqHtml}</div>

      </div>

    </section>



    <section class="section section-sm service-page-cta-band">

      <div class="container service-page-cta-inner">

        ${bookBtn('btn btn-primary btn-lg')}

        <a href="javascript:void(0)" role="button" class="btn btn-outline btn-lg" onclick="openQuoteModal(event)">${esc(t('svcpage.cta.quote') || 'Devis')}</a>

        <a href="javascript:void(0)" role="button" class="btn btn-accent btn-lg" onclick="openPolicy('${policyType}', event, '${policyKey}')">${esc(t('svcpage.cta.policy') || 'Politique')}</a>

      </div>

    </section>`;



  document.title = `LINGUAPHIX | ${pageTitle}`;

  const metaDesc = document.querySelector('meta[name="description"]');

  if (metaDesc) metaDesc.setAttribute('content', data.metaDescription || data.intro);



  if (typeof applyGeoPrices === 'function') applyGeoPrices(lang, typeof i18n !== 'undefined' ? i18n : {});

  if (typeof applySitePhones === 'function') applySitePhones();

  root.querySelectorAll('.fade-up').forEach((el) => {

    if (typeof observer !== 'undefined') observer.observe(el);

  });



  if (typeof renderServiceBooking === 'function') renderServiceBooking(lang);

}


