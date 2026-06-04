/**
 * Shared Online / In-person price tile markup for service & booking package cards.
 */
(function () {
  const ICON_ONLINE =
    '<svg class="mode-price-tile__icon-svg" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/></svg>';
  const ICON_INPERSON =
    '<svg class="mode-price-tile__icon-svg" viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>';

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

  function periodUnit(lang, period) {
    if (period === 'month') return t(lang, 'book.perMonth') || (lang === 'en' ? 'month' : 'mois');
    if (period === 'hour') return t(lang, 'book.perHour') || (lang === 'en' ? 'hour' : 'heure');
    if (period === 'session') return t(lang, 'book.perSession') || (lang === 'en' ? 'session' : 'séance');
    return '';
  }

  function renderTile(pkg, mode, lang, opts) {
    const isOnline = mode === 'online';
    const prices = isOnline ? pkg.online : pkg.inperson;
    const popular = opts.popularLabel || (lang === 'en' ? 'Popular' : 'Populaire');
    const label = isOnline
      ? t(lang, 'book.mode.online') || 'Online'
      : t(lang, 'book.mode.inperson') || 'In person';
    const desc = isOnline
      ? t(lang, 'book.mode.online.desc') ||
        (lang === 'en' ? 'Video call · flexible schedule' : 'Visio · horaires flexibles')
      : t(lang, 'book.mode.inperson.desc') ||
        (lang === 'en' ? 'Face-to-face in Lomé' : 'Présentiel à Lomé');
    const unit = periodUnit(lang, pkg.period);
    const showPopular = isOnline && prices.popular;
    const tag = opts.interactive ? 'button' : 'div';
    const typeAttr = opts.interactive ? ' type="button"' : '';
    const dataAttrs = opts.interactive
      ? ` data-package="${esc(opts.packageId)}" data-mode="${mode}" data-price-xof="${prices.priceXof}"`
      : '';
    const selectable = opts.interactive ? ' mode-price-tile--selectable' : '';

    return `<${tag}${typeAttr} class="mode-price-tile mode-price-tile--${mode}${selectable}${showPopular ? ' mode-price-tile--popular' : ''}"${dataAttrs}>
      ${showPopular ? `<span class="mode-price-tile__badge">${esc(popular)}</span>` : ''}
      <span class="mode-price-tile__icon mode-price-tile__icon--${mode}" aria-hidden="true">${isOnline ? ICON_ONLINE : ICON_INPERSON}</span>
      <span class="mode-price-tile__name">${esc(label)}</span>
      <span class="mode-price-tile__desc">${esc(desc)}</span>
      <span class="mode-price-tile__amount price-range" data-xof="${prices.priceXof}"></span>
      ${unit ? `<span class="mode-price-tile__unit">/ ${esc(unit)}</span>` : ''}
    </${tag}>`;
  }

  window.renderModePricePanel = function renderModePricePanel(pkg, lang, options) {
    const opts = options || {};
    const heading =
      t(lang, 'svcpage.mode.heading') ||
      (lang === 'en' ? 'Choose your format' : 'Choisissez votre format');
    const onlineLabel = t(lang, 'book.mode.online') || 'Online';
    const inpersonLabel = t(lang, 'book.mode.inperson') || 'In person';
    const popularLabel = opts.popularLabel || t(lang, 'services.popular') || 'Popular';

    const tileOpts = {
      interactive: Boolean(opts.interactive),
      packageId: opts.packageId || pkg.id,
      popularLabel
    };

    return `<div class="mode-price-panel">
      <p class="mode-price-panel__heading">${esc(heading)}</p>
      <div class="mode-price-panel__grid" role="${opts.interactive ? 'group' : 'presentation'}" aria-label="${esc(onlineLabel)} / ${esc(inpersonLabel)}">
        ${renderTile(pkg, 'online', lang, tileOpts)}
        ${renderTile(pkg, 'inperson', lang, tileOpts)}
      </div>
    </div>`;
  };
})();
