/**
 * Inline "Book now" section for service pages — policy, form, triple notification.
 */
(function () {
  const CONTACT_EMAIL = 'contact@linguaphix.com';

  function cfg() {
    return window.LINGUAPHIX_CONFIG || {};
  }

  function t(lang, key) {
    return (typeof i18n !== 'undefined' && i18n[lang]?.[key]) || '';
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }


  function getServicePolicyType(slug) {
    const meta = window.SERVICE_PAGES?.[slug];
    return meta?.category === 'design' ? 'design' : 'langues';
  }

  function getBookingPolicyKey(slug, lang) {
    return (
      (typeof getServiceBookingConfig === 'function' &&
        getServiceBookingConfig(slug, lang)?.policyKey) ||
      window.SERVICE_PAGES?.[slug]?.policyKey ||
      slug
    );
  }

  function getBookingPolicyMarkup(lang, slug, packageId, packageName, mode) {
    const policyKey = getBookingPolicyKey(slug, lang);
    const policyType = getServicePolicyType(slug);
    const serviceLabel =
      typeof getPolicyServiceLabel === 'function'
        ? getPolicyServiceLabel(policyKey, lang)
        : null;

    if (!packageId) {
      const title =
        typeof getBookingPolicyTitle === 'function'
          ? getBookingPolicyTitle(policyType, lang, policyKey, serviceLabel)
          : t(lang, 'book.policy.title') || '';
      const listHtml =
        typeof getBookingPolicyPlaceholderHtml === 'function'
          ? getBookingPolicyPlaceholderHtml(lang)
          : '';
      return { title, listHtml, introHtml: '' };
    }

    const title =
      typeof getBookingPolicyTitle === 'function'
        ? getBookingPolicyTitle(policyType, lang, policyKey, serviceLabel, packageName)
        : t(lang, 'book.policy.title') || '';
    const listHtml =
      typeof getBookingPolicyListHtml === 'function'
        ? getBookingPolicyListHtml(policyType, lang, policyKey, packageId, mode)
        : '';
    const introHtml =
      typeof getBookingPolicyPackageIntroHtml === 'function'
        ? getBookingPolicyPackageIntroHtml(lang, packageName)
        : '';
    return { title, listHtml, introHtml };
  }

  function refreshBookingPolicy(lang) {
    const slug = document.body.dataset?.serviceSlug;
    const form = document.getElementById('service-booking-form');
    if (!slug || !form) return;

    const v = readBookingValues();
    const packageName =
      v?.packageName ||
      getPackageNameForId(v?.packageId) ||
      document.querySelector('.booking-package-card.is-selected .booking-package-card__title')
        ?.textContent?.trim() ||
      '';

    const policy = getBookingPolicyMarkup(
      lang,
      slug,
      v?.packageId || '',
      packageName,
      v?.mode || ''
    );

    const heading = document.getElementById('booking-policy-heading');
    const list = document.getElementById('booking-policy-list');
    const intro = document.getElementById('booking-policy-package-intro');
    if (heading) heading.textContent = policy.title;
    if (intro) {
      intro.innerHTML = policy.introHtml || '';
      intro.hidden = !policy.introHtml;
    }
    if (list) list.innerHTML = policy.listHtml;
  }

  function periodHint(lang, period) {
    if (period === 'month') return t(lang, 'book.perMonth') || (lang === 'en' ? 'month' : 'mois');
    if (period === 'hour') return t(lang, 'book.perHour') || (lang === 'en' ? 'hour' : 'heure');
    if (period === 'session') return t(lang, 'book.perSession') || (lang === 'en' ? 'session' : 'séance');
    return '';
  }

  function renderCoursTrackBlock(lang) {
    const groups = getCoursTrackGroups(lang);
    const sections = groups
      .map(
        (group) => `
      <section class="cours-track-group cours-track-group--${esc(group.tier)}" aria-labelledby="cours-track-${esc(group.tier)}">
        <h3 class="cours-track-group__title" id="cours-track-${esc(group.tier)}">${esc(group.title)}</h3>
        <div class="cours-track-group__grid" role="radiogroup" aria-label="${esc(group.title)}">
          ${group.items
            .map(
              (item) => `
          <label class="cours-track-card">
            <input type="radio" name="booking-track" value="${esc(item.id)}" required>
            <span class="cours-track-card__lang cours-track-card__lang--full">${esc(item.language)}</span>
            <span class="cours-track-card__lang cours-track-card__lang--short">${esc(item.languageShort || item.language)}</span>
            <span class="cours-track-card__name cours-track-card__name--full">${esc(item.label)}</span>
            ${item.labelShort ? `<span class="cours-track-card__name cours-track-card__name--short">${esc(item.labelShort)}</span>` : ''}
          </label>`
            )
            .join('')}
        </div>
      </section>`
      )
      .join('');

    return `
      <fieldset class="booking-fieldset booking-fieldset--track">
        <legend>${esc(t(lang, 'book.field.track') || 'Track')}</legend>
        <p class="booking-fieldset__hint">${esc(t(lang, 'book.track.lead') || '')}</p>
        <div class="cours-track-grid">${sections}</div>
      </fieldset>`;
  }

  function renderModePackageCards(packages, lang, slug) {
    const popular = t(lang, 'book.mostPopular') || (lang === 'en' ? 'Most Popular' : 'Le plus populaire');
    const renderPanel =
      typeof renderModePricePanel === 'function' ? renderModePricePanel : null;

    return Object.values(packages)
      .map((pkg) => {
        const schedule = (pkg.schedule || []).map((s) => `<li>${esc(s)}</li>`).join('');
        const modePanel = renderPanel
          ? renderPanel(pkg, lang, {
              interactive: true,
              packageId: pkg.id,
              popularLabel: popular
            })
          : '';
        return `
        <article class="booking-package-card booking-package-card--modes" data-booking-package="${esc(pkg.id)}" data-booking-period="${esc(pkg.period || '')}" tabindex="0" role="button">
          <h3 class="booking-package-card__title">${esc(pkg.name)}</h3>
          <p class="booking-package-card__subtitle">${esc(pkg.subtitle)}</p>
          <ul class="booking-package-card__schedule">${schedule}</ul>
          ${modePanel}
        </article>`;
      })
      .join('');
  }

  function renderStandardPackageCards(packages, lang) {
    const popular = t(lang, 'services.popular') || (lang === 'en' ? 'Popular' : 'Populaire');
    const list = packages || [];
    const isThreeCol = list.length === 3;
    let featuredUsed = false;
    return list
      .map((pkg, displayIndex) => {
        const isFeatured = isThreeCol
          ? displayIndex === list.length - 1 && pkg.featured
          : pkg.featured && !featuredUsed;
        if (isFeatured && !isThreeCol) featuredUsed = true;
        const priceHtml = buildBookingPackagePriceHtml(pkg, lang);
        return `
        <article class="booking-package-card${isFeatured ? ' booking-package-card--featured' : ''}"
          data-booking-package="${esc(pkg.id)}" data-package-name="${esc(pkg.name)}"${bookingPackageCardDataAttrs(pkg)} tabindex="0" role="button">
          ${isFeatured ? `<span class="booking-package-badge">${esc(popular)}</span>` : ''}
          <h3 class="booking-package-card__title">${esc(pkg.name)}</h3>
          ${pkg.desc ? `<p class="booking-package-card__subtitle">${esc(pkg.desc)}</p>` : ''}
          ${priceHtml}
        </article>`;
      })
      .join('');
  }

  function getServiceBookingTitle(slug, lang) {
    const meta = window.SERVICE_PAGES?.[slug];
    if (slug === 'traduction' && meta && typeof getTraductionAudienceOrDefault === 'function') {
      const audience = getTraductionAudienceOrDefault();
      const ov =
        meta.audienceOverrides?.[audience]?.[lang] || meta.audienceOverrides?.[audience]?.fr;
      if (ov?.title) return ov.title;
    }
    if (typeof getPolicyServiceLabel === 'function') {
      const label = getPolicyServiceLabel(slug, lang);
      if (label) return label;
    }
    const data = meta?.[lang] || meta?.fr;
    return data?.title || slug;
  }

  function buildBookingPackagePriceHtml(pkg, lang) {
    if (pkg.quote) {
      return `<span class="booking-package-card__quote">${esc(t(lang, 'book.onQuote') || 'Sur devis')}</span>`;
    }
    if (pkg.dualPageWord && pkg.priceXof) {
      return `<span class="booking-package-card__amount price-range" data-dual-page-word="1" data-xof="${pkg.priceXof}" data-unit="page" data-xof-from="${pkg.priceFromXof}" data-xof-to="${pkg.priceToXof}"></span>`;
    }
    if (pkg.priceFromXof != null && pkg.priceToXof != null && pkg.unit === 'word') {
      return `<span class="booking-package-card__amount price-range" data-xof-from="${pkg.priceFromXof}" data-xof-to="${pkg.priceToXof}" data-unit="word"></span>`;
    }
    if (pkg.priceXof > 0) {
      const unitAttr = pkg.unit ? ` data-unit="${esc(pkg.unit)}"` : '';
      return `<span class="booking-package-card__amount price-range" data-xof="${pkg.priceXof}"${unitAttr}></span>`;
    }
    return `<span class="booking-package-card__quote">${esc(t(lang, 'book.onQuote') || 'Sur devis')}</span>`;
  }

  function bookingPackageCardDataAttrs(pkg) {
    if (pkg.quote) return ' data-booking-quote="1"';
    if (pkg.dualPageWord && pkg.priceXof) {
      return ` data-booking-price-xof="${pkg.priceXof}" data-booking-period="page"`;
    }
    if (pkg.priceFromXof != null && pkg.priceToXof != null && pkg.unit === 'word') {
      return ` data-booking-period="word" data-booking-word-from="${pkg.priceFromXof}" data-booking-word-to="${pkg.priceToXof}"`;
    }
    if (pkg.priceXof > 0) {
      return ` data-booking-price-xof="${pkg.priceXof}"${pkg.unit ? ` data-booking-period="${esc(pkg.unit)}"` : ''}`;
    }
    return ' data-booking-quote="1"';
  }

  function renderBookingSection(lang, slug, embedded) {
    const config = typeof getServiceBookingConfig === 'function'
      ? getServiceBookingConfig(slug, lang)
      : null;
    if (!config) return '';

    const policy = getBookingPolicyMarkup(lang, slug, '', '', '');
    const policyTitle = esc(policy.title);
    const policyList = policy.listHtml;
    const titleKey = slug === 'cours' ? 'book.title' : 'book.title.service';
    const leadKey = slug === 'cours' ? 'book.lead' : 'book.lead.service';
    const serviceTitle = esc(getServiceBookingTitle(slug, lang));
    const pkgPlaceholder = esc(t(lang, 'book.field.package.placeholder') || '');

    const usesModeCards =
      (config.type === 'language-monthly' || config.type === 'language-session-modes') &&
      config.coursPackages;
    const pkgCount = usesModeCards
      ? Object.keys(config.coursPackages).length
      : (config.packages?.length || 0);
    const packagesGridClass = `booking-packages-grid booking-packages-grid--${pkgCount}`;

    const packagesHtml = usesModeCards
      ? renderModePackageCards(config.coursPackages, lang, slug)
      : renderStandardPackageCards(config.packages || [], lang);

    const modeBlock = `
      <fieldset class="booking-fieldset booking-fieldset--mode">
        <legend>${esc(t(lang, 'book.field.mode') || 'Mode')}</legend>
        <div class="booking-radio-row">
          <label class="booking-radio-pill">
            <input type="radio" name="booking-mode" value="online" required>
            <span>${esc(t(lang, 'book.mode.online') || 'Online')}</span>
          </label>
          <label class="booking-radio-pill">
            <input type="radio" name="booking-mode" value="inperson" required>
            <span>${esc(t(lang, 'book.mode.inperson') || 'In person')}</span>
          </label>
        </div>
      </fieldset>`;

    const summaryBlock = `
      <fieldset class="booking-fieldset booking-fieldset--summary">
        <legend>${esc(t(lang, 'book.field.summary') || '')}</legend>
        <div class="booking-summary-grid">
          <label class="booking-field">
            <span>${esc(t(lang, 'book.field.service') || 'Service')}</span>
            <input type="text" id="booking-service-display" name="booking-service-display" readonly value="${serviceTitle}">
          </label>
          <label class="booking-field">
            <span>${esc(t(lang, 'book.field.package') || 'Package')}</span>
            <input type="text" id="booking-package-display" name="booking-package-display" readonly
              placeholder="${pkgPlaceholder}" value="">
          </label>
        </div>
      </fieldset>`;

    const languageBlock = config.showLanguage
      ? `
      <fieldset class="booking-fieldset booking-fieldset--language">
        <legend>${esc(t(lang, 'book.field.language') || 'Language')}</legend>
        <div class="booking-radio-row">
          <label class="booking-radio-pill">
            <input type="radio" name="booking-language" value="english" required>
            <span>${esc(t(lang, 'book.lang.en') || 'English')}</span>
          </label>
          <label class="booking-radio-pill">
            <input type="radio" name="booking-language" value="french" required>
            <span>${esc(t(lang, 'book.lang.fr') || 'French')}</span>
          </label>
          <label class="booking-radio-pill">
            <input type="radio" name="booking-language" value="both" required>
            <span>${esc(t(lang, 'book.lang.both') || 'Both')}</span>
          </label>
        </div>
      </fieldset>`
      : '';

    const trackBlock =
      config.showTrack && typeof getCoursTrackGroups === 'function'
        ? renderCoursTrackBlock(lang)
        : '';

    const bookingInner = `
        <header class="service-booking-header fade-up">
          <span class="badge">${esc(t(lang, 'book.badge') || '')}</span>
          <h2 class="service-section-title" id="service-booking-title">${esc(t(lang, titleKey) || t(lang, 'book.title') || '')}</h2>
          <p class="service-section-lead">${esc(t(lang, leadKey) || t(lang, 'book.lead') || '')}</p>
        </header>

        <form class="service-booking-form" id="service-booking-form" novalidate>
          <div class="form-honeypot" aria-hidden="true">
            <label for="booking-website">Website</label>
            <input type="text" id="booking-website" name="website" tabindex="-1" autocomplete="off">
          </div>
          ${trackBlock}
          <div class="${packagesGridClass}" id="booking-packages-grid">${packagesHtml}</div>
          <input type="hidden" name="booking-package" id="booking-package-hidden" value="">
          ${modeBlock}
          ${summaryBlock}
          ${languageBlock}

          <div class="booking-form-grid">
            <label class="booking-field">
              <span>${esc(t(lang, 'book.field.name') || 'Full name')}</span>
              <input type="text" name="booking-name" id="booking-name" required autocomplete="name">
            </label>
            <label class="booking-field">
              <span>${esc(t(lang, 'book.field.email') || 'Email')}</span>
              <input type="email" name="booking-email" id="booking-email" required autocomplete="email">
            </label>
            <label class="booking-field">
              <span>${esc(t(lang, 'book.field.phone') || 'Phone / WhatsApp')}</span>
              <input type="tel" name="booking-phone" id="booking-phone" required autocomplete="tel">
            </label>
            <label class="booking-field">
              <span>${esc(t(lang, 'book.field.startDate') || 'Preferred start date')}</span>
              <input type="date" name="booking-start" id="booking-start" required>
            </label>
          </div>

          <div class="booking-policy-box" role="region" aria-labelledby="booking-policy-heading">
            <h3 id="booking-policy-heading">${policyTitle}</h3>
            <div id="booking-policy-package-intro" hidden></div>
            <ol class="booking-policy-list" id="booking-policy-list">${policyList}</ol>
          </div>

          <label class="booking-policy-check">
            <input type="checkbox" id="booking-policy-accept" name="booking-policy-accept">
            <span>${esc(t(lang, 'book.policy.accept') || '')}</span>
          </label>

          <p class="booking-actions-hint">${esc(
            t(lang, 'book.actionsHint') ||
              'You can use either button, or both: book a time on Calendly and/or send your request via WhatsApp with the same details.'
          )}</p>
          <div class="form-captcha" id="booking-captcha" data-captcha></div>
          <div class="booking-form-actions">
            <button type="button" class="btn btn-lg booking-whatsapp-btn" id="booking-whatsapp-btn" disabled>
              ${esc(t(lang, 'book.submitWhatsapp') || 'Send via WhatsApp')}
            </button>
            <button type="submit" class="btn btn-primary btn-lg" id="booking-submit-btn" disabled>
              ${esc(t(lang, 'book.submit') || 'Accept & Book')}
            </button>
          </div>
          <p class="booking-success-msg" id="booking-success-msg" hidden role="status"></p>
        </form>`;

    if (embedded) {
      return `<div class="service-booking-embed service-booking-section">${bookingInner}</div>`;
    }

    return `
    <section class="section section-sm service-booking-section" id="book-now" aria-labelledby="service-booking-title">
      <div class="container">${bookingInner}</div>
    </section>`;
  }

  function isBookingHoneypotFilled() {
    return Boolean(document.getElementById('booking-website')?.value?.trim());
  }

  async function guardBookingCaptcha(lang) {
    const mount = document.getElementById('booking-captcha');
    if (typeof requireFormCaptcha !== 'function') return { ok: true };
    return requireFormCaptcha(mount, lang);
  }

  function showBookingCaptchaError(lang, message) {
    const el = document.getElementById('booking-success-msg');
    if (!el) return;
    el.textContent = message;
    el.hidden = false;
    el.classList.add('booking-captcha-error');
  }

  function isValidBookingEmail(email) {
    if (!email || email.length > 254) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function readBookingValues() {
    const form = document.getElementById('service-booking-form');
    if (!form) return null;

    const pkgHidden = document.getElementById('booking-package-hidden');
    const modeRadio = form.querySelector('input[name="booking-mode"]:checked');
    const langInput = form.querySelector('input[name="booking-language"]:checked');
    const trackInput = form.querySelector('input[name="booking-track"]:checked');

    const packageId = pkgHidden?.value?.trim() || '';
    const mode = (modeRadio?.value || '').trim();
    const serviceName = form.querySelector('#booking-service-display')?.value?.trim() || '';
    const language = langInput?.value?.trim() || '';
    const track = trackInput?.value?.trim() || '';
    const name = form.querySelector('#booking-name')?.value?.trim() || '';
    const email = form.querySelector('#booking-email')?.value?.trim() || '';
    const phone = form.querySelector('#booking-phone')?.value?.trim() || '';
    const startDate = form.querySelector('#booking-start')?.value?.trim() || '';
    const policyOk = document.getElementById('booking-policy-accept')?.checked;

    const card = document.querySelector(
      `.booking-package-card.is-selected[data-booking-package="${packageId}"]`
    );
    const packageName =
      card?.querySelector('.booking-package-card__title')?.textContent?.trim() ||
      card?.dataset?.packageName ||
      packageId;

    const packageDisplay = form.querySelector('#booking-package-display')?.value?.trim() || '';

    return {
      packageId,
      packageName: packageDisplay || packageName,
      serviceName,
      mode,
      language,
      track,
      name,
      email,
      phone,
      startDate,
      policyOk
    };
  }

  function isBookingFormComplete(v, config) {
    if (!v) return false;
    if (!v.packageId || !v.name || !v.email || !v.phone || !v.startDate || !v.policyOk) return false;
    if (!v.mode) return false;
    if (config.showLanguage && !v.language) return false;
    if (config.showTrack && !v.track) return false;
    return true;
  }

  function isBookingCaptchaReady() {
    const mount = document.getElementById('booking-captcha');
    if (!mount) return false;
    if (typeof isFormCaptchaSolved === 'function') return isFormCaptchaSolved(mount);
    return mount.dataset.captchaSolved === '1';
  }

  function updateBookingSubmitState() {
    const slug = document.body.dataset.serviceSlug;
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
    syncBookingPackageField(lang);
    const config = typeof getServiceBookingConfig === 'function'
      ? getServiceBookingConfig(slug, lang)
      : null;
    const submitBtn = document.getElementById('booking-submit-btn');
    const waBtn = document.getElementById('booking-whatsapp-btn');
    if (!submitBtn || !config) return;
    const v = readBookingValues();
    const ready = isBookingFormComplete(v, config)
      && isValidBookingEmail(v.email)
      && isBookingCaptchaReady();
    submitBtn.disabled = !ready;
    if (waBtn) waBtn.disabled = !ready;
  }

  function lookupServicePagePackage(packageId, lang) {
    const slug = document.body.dataset.serviceSlug;
    const data = window.SERVICE_PAGES?.[slug]?.[lang] || window.SERVICE_PAGES?.[slug]?.fr;
    if (!data || !packageId) return null;

    const cfg =
      typeof getServiceBookingConfig === 'function' ? getServiceBookingConfig(slug, lang) : null;
    const configPkg = cfg?.coursPackages?.[packageId];
    if (configPkg?.name) return { name: configPkg.name, configPkg };

    if (packageId.startsWith('biz-')) {
      const idx = parseInt(packageId.slice(4), 10);
      return Number.isNaN(idx) ? null : data.businessPackages?.[idx] || null;
    }
    if (packageId.startsWith('pkg-')) {
      const idx = parseInt(packageId.slice(4), 10);
      return Number.isNaN(idx) ? null : data.packages?.[idx] || null;
    }
    return null;
  }

  function getPackageNameForId(packageId) {
    if (!packageId) return '';
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
    const fromData = lookupServicePagePackage(packageId, lang);
    if (fromData?.name) return fromData.name;
    const card = document.querySelector(
      `.booking-package-card[data-booking-package="${packageId}"]`
    );
    const pageCard = document.querySelector(
      `.service-package-card[data-page-booking-package="${packageId}"]`
    );
    return (
      card?.querySelector('.booking-package-card__title')?.textContent?.trim() ||
      pageCard?.querySelector('h3')?.textContent?.trim() ||
      card?.dataset?.packageName ||
      packageId
    );
  }

  function priceInfoFromPagePackage(pkg, mode) {
    if (!pkg) return null;
    if (pkg.configPkg && mode && pkg.configPkg[mode]?.priceXof) {
      return {
        xof: pkg.configPkg[mode].priceXof,
        period: pkg.configPkg.period || 'month',
        quote: false
      };
    }
    if (pkg.quote) return { quote: true };
    if (pkg.dualPageWord && pkg.priceXof) {
      return {
        dualPageWord: true,
        pageXof: pkg.priceXof,
        fromXof: pkg.priceFromXof,
        toXof: pkg.priceToXof,
        quote: false
      };
    }
    if (pkg.priceFromXof != null && pkg.priceToXof != null && pkg.unit === 'word') {
      return {
        wordRange: true,
        fromXof: pkg.priceFromXof,
        toXof: pkg.priceToXof,
        period: 'word',
        quote: false
      };
    }
    if (pkg.priceXof > 0) {
      return { xof: pkg.priceXof, period: pkg.unit || '', quote: false };
    }
    return null;
  }

  function getSelectedPackagePriceInfo(packageId, mode) {
    if (!packageId) return null;
    const slug = document.body.dataset.serviceSlug;
    const trackId = document.querySelector('input[name="booking-track"]:checked')?.value?.trim() || '';
    if (slug === 'cours' && trackId && typeof getCoursTrackPrice === 'function') {
      const xof = getCoursTrackPrice(packageId, trackId, mode);
      if (xof) return { xof, period: 'month', quote: false };
    }
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
    const fromData = priceInfoFromPagePackage(lookupServicePagePackage(packageId, lang), mode);
    if (fromData) return fromData;

    const card = document.querySelector(
      `.booking-package-card[data-booking-package="${packageId}"]`
    );
    if (!card) return null;

    if (card.dataset.bookingQuote === '1') {
      return { quote: true, period: card.dataset.bookingPeriod || '' };
    }

    const modeBtn = mode
      ? card.querySelector(`.mode-price-tile[data-mode="${mode}"]`)
      : card.querySelector('.mode-price-tile.is-selected') ||
        card.querySelector('.mode-price-tile--selectable');
    if (modeBtn?.dataset?.priceXof) {
      const xof = parseInt(modeBtn.dataset.priceXof, 10);
      if (!Number.isNaN(xof)) {
        return { xof, period: card.dataset.bookingPeriod || '', quote: false };
      }
    }

    const cardXof = parseInt(card.dataset.bookingPriceXof, 10);
    if (!Number.isNaN(cardXof) && cardXof > 0) {
      return { xof: cardXof, period: card.dataset.bookingPeriod || '', quote: false };
    }

    const amountEl = card.querySelector('.booking-package-card__amount');
    if (amountEl) {
      if (amountEl.getAttribute('data-dual-page-word') === '1') {
        const pageXof = parseInt(amountEl.getAttribute('data-xof'), 10);
        const fromXof = parseInt(amountEl.getAttribute('data-xof-from'), 10);
        const toXof = parseInt(amountEl.getAttribute('data-xof-to'), 10);
        if (!Number.isNaN(pageXof) && !Number.isNaN(fromXof) && !Number.isNaN(toXof)) {
          return { dualPageWord: true, pageXof, fromXof, toXof, quote: false };
        }
      }
      if (amountEl.hasAttribute('data-xof-from') && amountEl.hasAttribute('data-xof-to')) {
        const fromXof = parseInt(amountEl.getAttribute('data-xof-from'), 10);
        const toXof = parseInt(amountEl.getAttribute('data-xof-to'), 10);
        if (!Number.isNaN(fromXof) && !Number.isNaN(toXof)) {
          return {
            wordRange: true,
            fromXof,
            toXof,
            period: amountEl.getAttribute('data-unit') || 'word',
            quote: false
          };
        }
      }
      const xof = parseInt(amountEl.getAttribute('data-xof'), 10);
      if (!Number.isNaN(xof) && xof > 0) {
        return {
          xof,
          period: amountEl.getAttribute('data-unit') || card.dataset.bookingPeriod || '',
          quote: false
        };
      }
    }

    if (card.dataset.bookingWordFrom && card.dataset.bookingWordTo) {
      return {
        wordRange: true,
        fromXof: parseInt(card.dataset.bookingWordFrom, 10),
        toXof: parseInt(card.dataset.bookingWordTo, 10),
        period: 'word',
        quote: false
      };
    }

    return null;
  }

  function formatBookingPackageDisplayPrice(lang, info, opts) {
    if (!info) return '';
    if (info.quote) {
      return t(lang, 'book.onQuote') || (lang === 'en' ? 'On quote' : 'Sur devis');
    }
    const exact = Boolean(opts?.exact);
    const i18nObj = typeof i18n !== 'undefined' ? i18n : {};
    if (info.dualPageWord) {
      const fromLabel = i18nObj[lang]?.['price.from'] || (lang === 'en' ? 'From' : 'Dès');
      const orLabel = i18nObj[lang]?.['price.or'] || (lang === 'en' ? 'or' : 'ou');
      const pageStr =
        typeof formatPriceFromXof === 'function'
          ? formatPriceFromXof(info.pageXof, lang)
          : `${info.pageXof} FCFA`;
      const pageUnit = i18nObj[lang]?.['price.unit.page'] || 'page';
      const wordUnit = i18nObj[lang]?.['price.unit.word'] || (lang === 'en' ? 'word' : 'mot');
      return `${fromLabel} ${pageStr} / ${pageUnit} ${orLabel} ${fromLabel} ${info.fromXof}–${info.toXof} FCFA / ${wordUnit}`;
    }
    if (info.wordRange) {
      const fromLabel = i18nObj[lang]?.['price.from'] || (lang === 'en' ? 'From' : 'Dès');
      const unit = i18nObj[lang]?.['price.unit.word'] || (lang === 'en' ? 'word' : 'mot');
      return `${fromLabel} ${info.fromXof}–${info.toXof} FCFA / ${unit}`;
    }
    if (!info.xof || info.xof <= 0) return '';

    const fromLabel = exact ? '' : (i18nObj[lang]?.['price.from'] || (lang === 'en' ? 'From' : 'Dès'));
    const xofStr =
      typeof formatPriceFromXof === 'function'
        ? formatPriceFromXof(info.xof, lang)
        : `${info.xof} FCFA`;
    const usd = typeof formatUsdAside === 'function' ? formatUsdAside(info.xof, lang) : '';
    const unitMap = {
      session: 'price.unit.session',
      hour: 'price.unit.hour',
      month: 'price.unit.month',
      page: 'price.unit.page',
      pack: 'price.unit.month',
      visual: 'price.unit.visual',
      visualProject: 'price.unit.visualProject',
      word: 'price.unit.word'
    };
    const unitKey = info.period && unitMap[info.period];
    const unitSuffix =
      unitKey && i18nObj[lang]?.[unitKey] ? ` / ${i18nObj[lang][unitKey]}` : '';
    const priceCore = `${xofStr}${unitSuffix}${usd ? ` ${usd}` : ''}`.trim();
    return exact ? priceCore : `${fromLabel} ${priceCore}`.trim();
  }

  /** Fills “Select a package above” with package, mode, and price for the current selection. */
  function syncBookingPackageField(lang) {
    const pkgHidden = document.getElementById('booking-package-hidden');
    const pkgDisplay = document.getElementById('booking-package-display');
    if (!pkgDisplay) return;

    const packageId = pkgHidden?.value?.trim() || '';
    if (!packageId) {
      pkgDisplay.value = '';
      pkgDisplay.classList.remove('is-filled');
      pkgDisplay.removeAttribute('aria-invalid');
      return;
    }

    const name = getPackageNameForId(packageId);
    const mode =
      document.querySelector('input[name="booking-mode"]:checked')?.value?.trim() || '';
    const slug = document.body.dataset.serviceSlug;
    const trackId = document.querySelector('input[name="booking-track"]:checked')?.value?.trim() || '';
    const modeLabel = mode ? labelForMode(lang, mode) : '';
    const trackLabel = trackId ? labelForTrack(lang, trackId) : '';
    const priceLabel = formatBookingPackageDisplayPrice(
      lang,
      getSelectedPackagePriceInfo(packageId, mode),
      { exact: slug === 'cours' && Boolean(trackId) }
    );

    const parts = [name];
    if (trackLabel) parts.push(trackLabel);
    if (modeLabel) parts.push(modeLabel);
    if (priceLabel) parts.push(priceLabel);
    pkgDisplay.value = parts.join(' — ');
    pkgDisplay.classList.add('is-filled');
    pkgDisplay.removeAttribute('aria-invalid');
  }

  function setSelectedPackage(packageId, mode, packageName) {
    const pkgHidden = document.getElementById('booking-package-hidden');
    if (pkgHidden) pkgHidden.value = packageId || '';

    document.querySelectorAll('.booking-package-card').forEach((card) => {
      const match = card.dataset.bookingPackage === packageId;
      card.classList.toggle('is-selected', match);
      if (match && packageName) card.dataset.packageName = packageName;
    });

    document.querySelectorAll('.mode-price-tile--selectable').forEach((btn) => {
      const match = btn.dataset.package === packageId && btn.dataset.mode === mode;
      btn.classList.toggle('is-selected', match);
    });

    const modeRadios = document.querySelectorAll('input[name="booking-mode"]');
    modeRadios.forEach((r) => {
      if (r.type === 'radio') r.checked = mode ? r.value === mode : r.checked;
    });

    const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
    syncBookingPackageField(lang);

    const policyCheck = document.getElementById('booking-policy-accept');
    if (policyCheck) policyCheck.checked = false;

    refreshBookingPolicy(lang);
    updateBookingSubmitState();
  }

  function syncBookingServiceField(lang, slug) {
    const el = document.getElementById('booking-service-display');
    if (el) el.value = getServiceBookingTitle(slug, lang);
  }

  function bindBookingInteractions() {
    const grid = document.getElementById('booking-packages-grid');
    if (!grid || grid.dataset.bound === '1') return;
    grid.dataset.bound = '1';

    grid.addEventListener('click', (e) => {
      const modeBtn = e.target.closest('.mode-price-tile--selectable');
      if (modeBtn) {
        const card = modeBtn.closest('.booking-package-card');
        const pkgName = card?.querySelector('.booking-package-card__title')?.textContent?.trim();
        setSelectedPackage(modeBtn.dataset.package, modeBtn.dataset.mode, pkgName);
        syncBookingPackageField(typeof currentLang !== 'undefined' ? currentLang : 'fr');
        return;
      }
      const card = e.target.closest('.booking-package-card');
      if (card && !modeBtn) {
        const pkgId = card.dataset.bookingPackage;
        const slug = document.body.dataset.serviceSlug;
        const pkgName = card.querySelector('.booking-package-card__title')?.textContent?.trim() ||
          card.dataset.packageName || '';
        const firstMode = card.querySelector('.mode-price-tile--selectable');
        if (firstMode) {
          setSelectedPackage(pkgId, firstMode.dataset.mode, pkgName);
        } else {
          setSelectedPackage(pkgId, readBookingValues()?.mode || '', pkgName);
        }
      }
    });

    grid.addEventListener('keydown', (e) => {
      if (e.key !== 'Enter' && e.key !== ' ') return;
      const card = e.target.closest('.booking-package-card');
      if (!card) return;
      e.preventDefault();
      card.click();
    });

    const form = document.getElementById('service-booking-form');
    if (!form || form.dataset.bound === '1') return;
    form.dataset.bound = '1';

    form.addEventListener('input', updateBookingSubmitState);
    form.addEventListener('change', (e) => {
      const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
      if (e.target?.name === 'booking-track') {
        refreshCoursPackagePrices(lang);
        const policyCheck = document.getElementById('booking-policy-accept');
        if (policyCheck) policyCheck.checked = false;
        refreshBookingPolicy(lang);
      }
      if (e.target?.name === 'booking-mode') {
        const policyCheck = document.getElementById('booking-policy-accept');
        if (policyCheck) policyCheck.checked = false;
        refreshBookingPolicy(lang);
        syncBookingPackageField(lang);
      }
      updateBookingSubmitState();
    });
    form.addEventListener('submit', submitServiceBooking);

    const waBtn = document.getElementById('booking-whatsapp-btn');
    if (waBtn) waBtn.addEventListener('click', sendBookingViaWhatsApp);

    const captchaMount = document.getElementById('booking-captcha');
    if (captchaMount && captchaMount.dataset.captchaBound !== '1') {
      captchaMount.dataset.captchaBound = '1';
      captchaMount.addEventListener('lx-captcha-change', updateBookingSubmitState);
    }
    updateBookingSubmitState();
  }

  window.refreshBookingPolicy = refreshBookingPolicy;

  function labelForMode(lang, mode) {
    if (mode === 'online') return t(lang, 'book.mode.online') || 'Online';
    if (mode === 'inperson') return t(lang, 'book.mode.inperson') || 'In person';
    return mode;
  }

  function labelForLanguage(lang, code) {
    if (code === 'english') return t(lang, 'book.lang.en') || 'English';
    if (code === 'french') return t(lang, 'book.lang.fr') || 'French';
    if (code === 'both') return t(lang, 'book.lang.both') || 'Both';
    return code;
  }

  function labelForTrack(lang, trackId) {
    if (typeof getCoursTracks === 'function') {
      const match = getCoursTracks(lang).find((row) => row.id === trackId);
      if (match?.label) return match.label;
    }
    return trackId;
  }

  function refreshCoursPackagePrices(lang) {
    const trackId = document.querySelector('input[name="booking-track"]:checked')?.value?.trim() || '';
    if (!trackId || typeof getCoursTrackPrice !== 'function') return;

    document.querySelectorAll('.booking-package-card--modes').forEach((card) => {
      const pkgId = card.dataset.bookingPackage;
      card.querySelectorAll('.mode-price-tile--selectable').forEach((tile) => {
        const mode = tile.dataset.mode;
        const xof = getCoursTrackPrice(pkgId, trackId, mode);
        if (!Number.isFinite(xof)) return;
        tile.dataset.priceXof = String(xof);
        const priceEl = tile.querySelector('.price-range[data-xof]');
        if (priceEl) priceEl.setAttribute('data-xof', String(xof));
      });
    });

    if (typeof applyGeoPrices === 'function') {
      applyGeoPrices(lang, typeof i18n !== 'undefined' ? i18n : {});
    }
    syncBookingPackageField(lang);
    updateBookingSubmitState();
  }

  function buildBookingWhatsAppUrl(v, serviceTitle, slug, lang) {
    const modeLabel = labelForMode(lang, v.mode);
    const trackLabel = v.track ? labelForTrack(lang, v.track) : '';
    const langLabel = v.language ? labelForLanguage(lang, v.language) : '';
    const priceLabel = formatBookingPackageDisplayPrice(
      lang,
      getSelectedPackagePriceInfo(v.packageId, v.mode),
      { exact: slug === 'cours' && Boolean(v.track) }
    );
    const waLines =
      lang === 'fr'
        ? [
            'Bonjour ! Je souhaite réserver ce service.',
            `Service : ${serviceTitle || slug}`,
            `Nom : ${v.name}`,
            `Email : ${v.email}`,
            `Forfait : ${v.packageName}`,
            ...(trackLabel ? [`Parcours : ${trackLabel}`] : []),
            `Mode : ${modeLabel}`,
            ...(langLabel ? [`Langue : ${langLabel}`] : []),
            ...(priceLabel ? [`Tarif : ${priceLabel}`] : []),
            `Date de début souhaitée : ${v.startDate}`,
            `Mon WhatsApp : ${v.phone}`,
          ]
        : [
            'Hello! I would like to book this service.',
            `Service: ${serviceTitle || slug}`,
            `Name: ${v.name}`,
            `Email: ${v.email}`,
            `Package: ${v.packageName}`,
            ...(trackLabel ? [`Track: ${trackLabel}`] : []),
            `Mode: ${modeLabel}`,
            ...(langLabel ? [`Language: ${langLabel}`] : []),
            ...(priceLabel ? [`Price: ${priceLabel}`] : []),
            `Preferred start date: ${v.startDate}`,
            `My WhatsApp: ${v.phone}`,
          ];
    const waId = cfg().phone?.waMe || '22892539953';
    return `https://wa.me/${waId}?text=${encodeURIComponent(waLines.join('\n'))}`;
  }

  async function sendBookingViaWhatsApp(e) {
    e.preventDefault();
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
    const slug = document.body.dataset.serviceSlug;
    const config = typeof getServiceBookingConfig === 'function'
      ? getServiceBookingConfig(slug, lang)
      : null;

    syncBookingPackageField(lang);
    const v = readBookingValues();
    const successEl = document.getElementById('booking-success-msg');
    const pkgDisplay = document.getElementById('booking-package-display');

    if (isBookingHoneypotFilled()) return;

    if (!isBookingFormComplete(v, config)) {
      if (!v.packageId && pkgDisplay) {
        pkgDisplay.classList.remove('is-filled');
        pkgDisplay.setAttribute('aria-invalid', 'true');
        pkgDisplay.focus();
      }
      updateBookingSubmitState();
      return;
    }

    if (!isValidBookingEmail(v.email)) {
      updateBookingSubmitState();
      return;
    }

    const captcha = await guardBookingCaptcha(lang);
    if (!captcha.ok) {
      showBookingCaptchaError(lang, captcha.message);
      return;
    }

    const serviceTitle = v.serviceName || getServiceBookingTitle(slug, lang);
    const waUrl = buildBookingWhatsAppUrl(v, serviceTitle, slug, lang);
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    if (successEl) {
      successEl.classList.remove('booking-captcha-error');
      successEl.textContent = t(lang, 'book.whatsappOpened') || '';
      successEl.hidden = false;
    }
    if (typeof resetFormCaptcha === 'function') {
      resetFormCaptcha(document.getElementById('booking-captcha'));
    }
    updateBookingSubmitState();
  }

  function buildCalendlyBookingUrl(v, serviceTitle, slug, lang) {
    const calBase = (cfg().calendlyUrl || 'https://calendly.com/linguaphix/call').split('?')[0];
    const modeLabel = labelForMode(lang, v.mode);
    const trackLabel = v.track ? labelForTrack(lang, v.track) : '';
    const langLabel = v.language ? labelForLanguage(lang, v.language) : '';
    const priceLabel = formatBookingPackageDisplayPrice(
      lang,
      getSelectedPackagePriceInfo(v.packageId, v.mode),
      { exact: slug === 'cours' && Boolean(v.track) }
    );
    const params = new URLSearchParams();
    if (v.name) params.set('name', v.name);
    if (v.email) params.set('email', v.email);
    const summary = [
      serviceTitle || slug,
      v.packageName,
      trackLabel,
      modeLabel,
      langLabel,
      priceLabel,
      v.startDate
        ? `${lang === 'fr' ? 'Début souhaité' : 'Preferred start'}: ${v.startDate}`
        : '',
    ].filter(Boolean).join(' · ');
    if (summary) params.set('a1', summary);
    if (v.phone) params.set('a2', v.phone);
    const query = params.toString();
    return query ? `${calBase}?${query}` : calBase;
  }

  async function submitServiceBooking(e) {
    e.preventDefault();
    const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
    const slug = document.body.dataset.serviceSlug;
    const config = typeof getServiceBookingConfig === 'function'
      ? getServiceBookingConfig(slug, lang)
      : null;

    syncBookingPackageField(lang);
    const v = readBookingValues();
    const btn = document.getElementById('booking-submit-btn');
    const successEl = document.getElementById('booking-success-msg');
    const pkgDisplay = document.getElementById('booking-package-display');

    if (isBookingHoneypotFilled()) return;

    if (!isBookingFormComplete(v, config)) {
      if (!v.packageId && pkgDisplay) {
        pkgDisplay.classList.remove('is-filled');
        pkgDisplay.setAttribute('aria-invalid', 'true');
        pkgDisplay.focus();
      }
      updateBookingSubmitState();
      return;
    }

    if (!isValidBookingEmail(v.email)) {
      updateBookingSubmitState();
      return;
    }

    const captcha = await guardBookingCaptcha(lang);
    if (!captcha.ok) {
      showBookingCaptchaError(lang, captcha.message);
      return;
    }

    const serviceTitle = v.serviceName || getServiceBookingTitle(slug, lang);
    const modeLabel = labelForMode(lang, v.mode);
    const trackLabel = v.track ? labelForTrack(lang, v.track) : '';
    const langLabel = v.language ? labelForLanguage(lang, v.language) : '';
    const priceLabel = formatBookingPackageDisplayPrice(
      lang,
      getSelectedPackagePriceInfo(v.packageId, v.mode),
      { exact: slug === 'cours' && Boolean(v.track) }
    );
    const timestamp = new Date().toISOString();
    const summary = [v.packageName, trackLabel, modeLabel, langLabel, priceLabel].filter(Boolean).join(' · ');

    if (btn) {
      btn.disabled = true;
      btn.dataset.prevLabel = btn.textContent;
      btn.textContent = t(lang, 'book.sending') || '…';
    }

    const emailSubject =
      lang === 'fr'
        ? `Nouvelle réservation – ${v.packageName} – ${v.name}`
        : `New Booking – ${v.packageName} – ${v.name}`;

    const emailBody = [
      `Service: ${serviceTitle || slug}`,
      `Name: ${v.name}`,
      `Email: ${v.email}`,
      `WhatsApp / Phone: ${v.phone}`,
      `Package: ${v.packageName}`,
      ...(trackLabel ? [`Track: ${trackLabel}`] : []),
      `Mode: ${modeLabel}`,
      ...(langLabel ? [`Language: ${langLabel}`] : []),
      ...(priceLabel ? [`Price: ${priceLabel}`] : []),
      `Start date: ${v.startDate}`,
      `Booked at: ${timestamp}`
    ].join('\n');

    fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(cfg().contactEmail || CONTACT_EMAIL)}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: v.name,
          email: v.email,
          _replyto: v.email,
          phone: v.phone,
          package: v.packageName,
          track: trackLabel || undefined,
          mode: modeLabel,
          language: langLabel || undefined,
          price: priceLabel || undefined,
          start_date: v.startDate,
          service: serviceTitle || slug,
          message: emailBody,
          _subject: emailSubject,
          _template: 'table',
          _gotcha: '',
          website: ''
        })
      }
    ).catch(() => null);

    const calUrl = buildCalendlyBookingUrl(v, serviceTitle, slug, lang);
    window.open(calUrl, '_blank', 'noopener,noreferrer');

    if (btn && btn.dataset.prevLabel) btn.textContent = btn.dataset.prevLabel;

    if (successEl) {
      successEl.classList.remove('booking-captcha-error');
      successEl.textContent = t(lang, 'book.calendlyOpened') || t(lang, 'book.success') || '';
      successEl.hidden = false;
    }
    if (typeof resetFormCaptcha === 'function') {
      resetFormCaptcha(document.getElementById('booking-captcha'));
    }
    updateBookingSubmitState();
  }

  window.renderServiceBooking = function renderServiceBooking(lang) {
    const slug = document.body.dataset.serviceSlug;
    if (!slug || !document.body.classList.contains('page-service')) return;

    const mount = document.getElementById('service-booking-mount');
    const embedded = Boolean(mount);
    const html = renderBookingSection(lang, slug, embedded);

    if (!html) {
      if (mount) mount.innerHTML = '';
      else document.querySelector('section.service-booking-section#book-now')?.remove();
      return;
    }

    if (embedded) {
      mount.innerHTML = html;
      document.querySelectorAll('section.service-booking-section#book-now').forEach((el) => el.remove());
    } else {
      let section = document.getElementById('book-now');
      if (!section) {
        const ctaBand = document.querySelector('.service-page-cta-band');
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        section = wrapper.firstElementChild;
        if (ctaBand?.parentNode) {
          ctaBand.parentNode.insertBefore(section, ctaBand);
        } else {
          document.getElementById('service-page-root')?.appendChild(section);
        }
      } else if (section.classList.contains('service-booking-section')) {
        section.outerHTML = html;
      }
    }

    const section = document.getElementById('book-now');

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const startInput = document.getElementById('booking-start');
    if (startInput) startInput.min = minDate.toISOString().slice(0, 10);

    bindBookingInteractions();
    syncBookingServiceField(lang, slug);
    updateBookingSubmitState();

    if (typeof initFormCaptcha === 'function') {
      initFormCaptcha(document.getElementById('booking-captcha'), { lang });
    }

    if (typeof applyGeoPrices === 'function') {
      applyGeoPrices(lang, typeof i18n !== 'undefined' ? i18n : {});
    }

    section?.querySelectorAll('.fade-up').forEach((el) => {
      if (typeof observer !== 'undefined') observer.observe(el);
    });
  };

  window.scrollToServiceBooking = function scrollToServiceBooking(e, trigger) {
    if (e) e.preventDefault();
    const el = document.getElementById('book-now');
    if (!el) return;
    const headerOffset =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--site-header-height')
      ) || 72;
    const top = el.getBoundingClientRect().top + window.scrollY - headerOffset - 16;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });

    if (trigger?.dataset?.bookingPkgId) {
      const pkgId = trigger.dataset.bookingPkgId;
      const pkgName = trigger.dataset.bookingPkgName || '';
      const mode = trigger.dataset.bookingMode || '';
      window.setTimeout(() => {
        setSelectedPackage(pkgId, mode, pkgName);
      }, 400);
    }
  };

  window.setBookingPackageFromPage = setSelectedPackage;
})();
