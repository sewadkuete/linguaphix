/**
 * URL audience for split service pages (e.g. traduction particuliers / entreprises).
 * ?audience=particuliers | ?audience=entreprises
 */
(function () {
  function getServicePageAudience() {
    try {
      const raw = new URLSearchParams(window.location.search).get('audience');
      if (raw === 'entreprises' || raw === 'business' || raw === 'biz') return 'entreprises';
      if (raw === 'particuliers' || raw === 'individuals') return 'particuliers';
    } catch (_) {
      /* ignore */
    }
    return null;
  }

  function getTraductionAudienceOrDefault() {
    const slug = document.body?.dataset?.serviceSlug;
    if (slug !== 'traduction') return null;
    return getServicePageAudience() || 'particuliers';
  }

  function appendAudienceToHref(href, audience) {
    if (!audience || !href) return href;
    const hashIdx = href.indexOf('#');
    const hash = hashIdx >= 0 ? href.slice(hashIdx) : '';
    const beforeHash = hashIdx >= 0 ? href.slice(0, hashIdx) : href;
    const [pathOnly, existingQs] = beforeHash.split('?');
    const params = new URLSearchParams(existingQs || '');
    params.set('audience', audience);
    const qs = params.toString();
    return `${pathOnly}${qs ? `?${qs}` : ''}${hash}`;
  }

  window.getServicePageAudience = getServicePageAudience;
  window.getTraductionAudienceOrDefault = getTraductionAudienceOrDefault;
  window.appendAudienceToHref = appendAudienceToHref;
})();
