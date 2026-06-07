/**
 * Mobile performance helpers — dns-prefetch, deferred third-party bootstrap.
 */
(function () {
  const PREFETCH = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com',
    'https://challenges.cloudflare.com',
    'https://calendly.com',
  ];

  PREFETCH.forEach((href) => {
    if (document.querySelector(`link[rel="dns-prefetch"][href="${href}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = href;
    document.head.appendChild(link);
  });
})();
