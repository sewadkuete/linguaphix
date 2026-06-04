(function loadGoogleAnalytics() {
  const cfg = window.LINGUAPHIX_CONFIG || {};
  const id = (cfg.gaMeasurementId || '').trim();
  if (!id || id === 'G-XXXXXXXXXX' || !/^G-[A-Z0-9]+$/i.test(id)) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', id, { anonymize_ip: true });
})();
