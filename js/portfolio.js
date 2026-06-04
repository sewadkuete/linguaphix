/**
 * Portfolio cards: each card maps to assets/portfolio/playlists/{id}/
 * Cover on grid → click opens modal playlist.
 * After adding files: node scripts/build-portfolio-playlists.mjs
 */

const PORTFOLIO_MANIFEST_URL = 'assets/portfolio/portfolio-playlists.json';

function portfolioT(key) {
  const lang = typeof currentLang !== 'undefined' ? currentLang : 'fr';
  return (typeof i18n !== 'undefined' && i18n[lang]?.[key]) || '';
}

function portfolioEsc(str) {
  if (typeof escapeHtml === 'function') return escapeHtml(str);
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Only local assets/ paths from the build manifest (blocks open redirects). */
function isSafePortfolioAssetSrc(src) {
  if (typeof src !== 'string') return false;
  const s = src.trim();
  if (!s.startsWith('assets/portfolio/')) return false;
  if (/[\s<>"']/.test(s) || s.includes('..')) return false;
  return true;
}

function isSafeTikTokUrl(url) {
  try {
    const u = new URL(url);
    if (u.protocol !== 'https:') return false;
    return /^(www\.)?tiktok\.com$/i.test(u.hostname);
  } catch {
    return false;
  }
}

function isSafeYoutubeId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{11}$/.test(id);
}

function isSafeVimeoId(id) {
  return typeof id === 'string' && /^\d{1,12}$/.test(id);
}

function sanitizePlaylistItem(item) {
  if (!item || typeof item !== 'object') return null;
  if (item.kind === 'image' || item.kind === 'file') {
    if (!isSafePortfolioAssetSrc(item.src)) return null;
    return item;
  }
  if (item.kind === 'youtube') {
    if (!isSafeYoutubeId(item.id)) return null;
    return item;
  }
  if (item.kind === 'vimeo') {
    if (!isSafeVimeoId(item.id)) return null;
    return item;
  }
  if (item.kind === 'tiktok') {
    if (!isSafeTikTokUrl(item.url)) return null;
    return item;
  }
  return null;
}

function sanitizePlaylistEntry(entry) {
  const items = (entry?.items || []).map(sanitizePlaylistItem).filter(Boolean);
  let cover = sanitizePlaylistItem(entry?.cover);
  if (!cover && items.length) cover = items[0];
  return { cover, items };
}

function switchPortfolioFilter(type, btn) {
  document.querySelectorAll('.portfolio-filter-bar .stab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const items = document.querySelectorAll('#portfolioGrid .portfolio-item');
  let visible = 0;

  items.forEach(item => {
    const show = type === 'all' || item.dataset.type === type;
    item.hidden = !show;
    if (show) visible += 1;
  });

  const empty = document.getElementById('portfolioEmpty');
  if (empty) empty.hidden = visible > 0;
}

function getPlaylistEntry(manifest, id) {
  const raw = manifest?.playlists?.[id];
  if (!raw) return { cover: null, items: [] };
  return sanitizePlaylistEntry(raw);
}

async function loadPortfolioManifest() {
  if (typeof window.__PORTFOLIO_PLAYLISTS__ !== 'undefined') {
    return window.__PORTFOLIO_PLAYLISTS__;
  }
  try {
    const res = await fetch(PORTFOLIO_MANIFEST_URL, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('Portfolio manifest not loaded:', err);
    return null;
  }
}

function renderMediaItem(item, cardType, { contain = false, link = false, preview = false } = {}) {
  if (!item) return '';
  const label = portfolioEsc(item.label || '');
  const fitClass = contain ? ' portfolio-player-img--contain' : '';

  if (item.kind === 'youtube' && isSafeYoutubeId(item.id)) {
    return `<iframe src="https://www.youtube-nocookie.com/embed/${portfolioEsc(item.id)}" title="${label}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
  }
  if (item.kind === 'vimeo' && isSafeVimeoId(item.id)) {
    return `<iframe src="https://player.vimeo.com/video/${portfolioEsc(item.id)}" title="${label}" loading="lazy" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
  }
  if (item.kind === 'file' && cardType === 'video' && isSafePortfolioAssetSrc(item.src)) {
    const attrs = preview
      ? 'class="portfolio-cover-video" muted autoplay loop playsinline preload="metadata"'
      : 'controls preload="metadata"';
    return `<video ${attrs} title="${label}"><source src="${portfolioEsc(item.src)}" type="${portfolioEsc(item.mime || 'video/mp4')}"></video>`;
  }
  if (item.kind === 'image' && isSafePortfolioAssetSrc(item.src)) {
    const img = `<img class="portfolio-player-img portfolio-player-img--contain${fitClass}" src="${portfolioEsc(item.src)}" alt="${label}" loading="lazy" width="800" height="600">`;
    if (link) {
      return `<a href="${portfolioEsc(item.src)}" class="portfolio-player-image-link" target="_blank" rel="noopener">${img}</a>`;
    }
    return img;
  }
  if (item.kind === 'tiktok') {
    return renderTikTokCoverMarkup(item);
  }
  return '';
}

function renderTikTokCoverMarkup(item) {
  const handle = portfolioEsc(item.handle || '');
  const name = portfolioEsc(item.label || handle || 'TikTok');
  return `
    <span class="portfolio-cover-tiktok" aria-hidden="true">
      <span class="portfolio-cover-tiktok__icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" focusable="false">
          <path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
        </svg>
      </span>
      <span class="portfolio-cover-tiktok__handle">${handle}</span>
      <span class="portfolio-cover-tiktok__name">${name}</span>
    </span>`;
}

function renderCardEmpty(card) {
  const player = card.querySelector('[data-portfolio-player]');
  const openBtn = card.querySelector('[data-portfolio-open]');
  const playlistId = card.dataset.playlistId || '';
  const hint = portfolioT('portfolio.playlist.empty') || 'Add files to this playlist folder, then rebuild.';
  const sync = portfolioT('portfolio.playlist.sync') || 'node scripts/build-portfolio-playlists.mjs';

  card.classList.remove('portfolio-item--ready');
  if (openBtn) openBtn.disabled = true;

  if (!player) return;
  player.innerHTML = `
    <div class="portfolio-player-placeholder">
      <p>${portfolioEsc(hint)}</p>
      <p class="portfolio-player-placeholder__path"><code>assets/portfolio/playlists/${portfolioEsc(playlistId)}/</code></p>
      <p class="portfolio-player-placeholder__cmd"><code>${portfolioEsc(sync)}</code></p>
    </div>`;
}

function renderCardCover(card, cover, itemCount) {
  const player = card.querySelector('[data-portfolio-player]');
  const openBtn = card.querySelector('[data-portfolio-open]');
  const cardType = card.dataset.type || 'graphic';
  const hint = portfolioEsc(portfolioT('portfolio.gallery.open') || 'View playlist');
  const countTpl = portfolioT('portfolio.gallery.count') || '{n} items';
  const countText = portfolioEsc(countTpl.replace('{n}', String(itemCount)));

  if (!player || !cover) return;

  card.classList.add('portfolio-item--ready');
  if (openBtn) openBtn.disabled = false;

  const isTikTok = cover.kind === 'tiktok';
  const tiktokHint = portfolioEsc(portfolioT('portfolio.tiktok.open') || 'View on TikTok');
  const useContain = cover.kind === 'image';
  const isPreviewVideo = cover.kind === 'file' && cardType === 'video';
  player.innerHTML = `
    <span class="portfolio-cover${isTikTok ? ' portfolio-cover--tiktok' : ''}">
      ${renderMediaItem(cover, cardType, { contain: useContain, link: false, preview: isPreviewVideo })}
      ${isTikTok ? '' : '<span class="portfolio-cover__shade" aria-hidden="true"></span>'}
      ${itemCount > 1 ? `<span class="portfolio-cover__badge">${countText}</span>` : ''}
      <span class="portfolio-cover__hint">${isTikTok ? tiktokHint : hint}</span>
    </span>`;
}

function buildPlaylistButtonsHtml(items, cardType, activeIndex) {
  const isVideo = cardType === 'video';
  return items.map((item, index) => {
    const thumbInner = isVideo
      ? '<span class="portfolio-playlist-thumb__icon" aria-hidden="true">▶</span>'
      : `<img src="${portfolioEsc(item.kind === 'image' ? item.src : '')}" alt="" loading="lazy" decoding="async">`;

    return `
      <button type="button"
        class="portfolio-playlist__btn${index === activeIndex ? ' is-active' : ''}"
        data-playlist-index="${index}"
        aria-label="${portfolioEsc(item.label || `Item ${index + 1}`)}"
        aria-selected="${index === activeIndex ? 'true' : 'false'}">
        <span class="portfolio-playlist-thumb">${thumbInner}</span>
        <span class="portfolio-playlist__label">${portfolioEsc(item.label || `Item ${index + 1}`)}</span>
      </button>`;
  }).join('');
}

let modalState = { items: [], cardType: 'graphic', index: 0, title: '' };

function getPortfolioModal() {
  return document.getElementById('portfolioPlaylistModal');
}

function syncModalThumbs(activeIndex) {
  const playlistEl = document.querySelector('[data-portfolio-modal-playlist]');
  if (!playlistEl) return;
  playlistEl.querySelectorAll('.portfolio-playlist__btn').forEach((b) => {
    const idx = Number(b.dataset.playlistIndex);
    const on = idx === activeIndex;
    b.classList.toggle('is-active', on);
    b.setAttribute('aria-selected', on ? 'true' : 'false');
  });
  const activeBtn = playlistEl.querySelector(`[data-playlist-index="${activeIndex}"]`);
  activeBtn?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
}

function updateModalNavUi() {
  const { items, cardType, index } = modalState;
  const multi = items.length > 1;
  const isImageNav = cardType === 'graphic' && items.every((it) => it.kind === 'image');

  const prevBtn = document.querySelector('[data-portfolio-modal-prev]');
  const nextBtn = document.querySelector('[data-portfolio-modal-next]');
  const stage = document.querySelector('[data-portfolio-modal-stage]');
  const hint = document.querySelector('[data-portfolio-modal-hint]');

  if (prevBtn) prevBtn.hidden = !multi;
  if (nextBtn) nextBtn.hidden = !multi;

  if (stage) {
    stage.classList.toggle('portfolio-modal__stage--static', !isImageNav || !multi);
    if (multi && isImageNav) {
      const tpl = portfolioT('portfolio.gallery.clickNav') || 'Click right for next · left for previous';
      stage.setAttribute('aria-label', tpl);
    } else {
      stage.removeAttribute('aria-label');
    }
  }

  if (hint) {
    if (multi && isImageNav) {
      hint.textContent = portfolioT('portfolio.gallery.clickNext') || 'Click to see next';
      hint.hidden = false;
    } else {
      hint.hidden = true;
    }
  }

  if (prevBtn) prevBtn.disabled = !multi;
  if (nextBtn) nextBtn.disabled = !multi;
  if (prevBtn) prevBtn.setAttribute('aria-label', portfolioT('portfolio.gallery.prev') || 'Previous');
  if (nextBtn) nextBtn.setAttribute('aria-label', portfolioT('portfolio.gallery.next') || 'Next');
  void index;
}

function setModalSlide(index) {
  const { items, cardType } = modalState;
  if (!items.length || index < 0 || index >= items.length) return;
  modalState.index = index;
  renderModalSlide(items[index], index, items.length, cardType);
  syncModalThumbs(index);
  updateModalNavUi();
}

function goModalSlide(delta) {
  const { items } = modalState;
  if (items.length < 2) return;
  const next = (modalState.index + delta + items.length) % items.length;
  setModalSlide(next);
}

function renderModalSlide(item, index, total, cardType) {
  const player = document.querySelector('[data-portfolio-modal-player]');
  const counter = document.querySelector('[data-portfolio-modal-counter]');
  if (!player || !item) return;

  const isVideo = cardType === 'video' && (item.kind === 'file' || item.kind === 'youtube' || item.kind === 'vimeo');
  player.className = `portfolio-modal__player portfolio-media portfolio-media--${isVideo ? 'video' : 'image'}`;
  player.innerHTML = renderMediaItem(item, cardType, { contain: item.kind === 'image', link: false });

  if (counter) {
    const tpl = portfolioT('portfolio.gallery.slide') || '{current} / {total}';
    counter.textContent = tpl
      .replace('{current}', String(index + 1))
      .replace('{total}', String(total));
  }
}

function bindModalPlaylistClicks(container) {
  container.querySelectorAll('[data-playlist-index]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.playlistIndex);
      setModalSlide(idx);
    });
  });
}

function openPortfolioModal({ title, items, cardType, startIndex = 0 }) {
  const modal = getPortfolioModal();
  if (!modal || !items.length) return;

  modalState = { items, cardType, index: startIndex, title: title || '' };

  const titleEl = document.getElementById('portfolioModalTitle');
  const playlistEl = document.querySelector('[data-portfolio-modal-playlist]');
  if (titleEl) titleEl.textContent = title || '';

  if (playlistEl) {
    playlistEl.hidden = items.length < 2;
    playlistEl.innerHTML = items.length >= 2
      ? buildPlaylistButtonsHtml(items, cardType, startIndex)
      : '';
    if (items.length >= 2) bindModalPlaylistClicks(playlistEl);
  }

  setModalSlide(startIndex);

  modal.setAttribute('aria-hidden', 'false');
  modal.classList.add('open');
  document.body.classList.add('portfolio-modal-open');
  document.querySelector('[data-portfolio-modal-stage]')?.focus();
}

function closePortfolioModal() {
  const modal = getPortfolioModal();
  if (!modal) return;

  const player = document.querySelector('[data-portfolio-modal-player]');
  if (player) {
    const video = player.querySelector('video');
    if (video) {
      video.pause();
      video.removeAttribute('src');
    }
    player.innerHTML = '';
  }

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('portfolio-modal-open');
  modalState = { items: [], cardType: 'graphic', index: 0 };
}

function bindPortfolioCard(card, playlist) {
  const { cover, items } = playlist;
  const openBtn = card.querySelector('[data-portfolio-open]');
  const cardType = card.dataset.type || 'graphic';

  if (!items.length && !cover) {
    renderCardEmpty(card);
    return;
  }

  const displayCover = cover || items[0];
  const count = items.length || (displayCover?.kind === 'tiktok' ? 0 : 1);
  renderCardCover(card, displayCover, Math.max(count, 1));

  if (!openBtn) return;

  const title = card.querySelector('.portfolio-caption h3')?.textContent?.trim() || '';
  const openLabel = portfolioT('portfolio.gallery.openAria') || 'Open playlist';
  const tiktokLabel = portfolioT('portfolio.tiktok.openAria') || 'Open TikTok profile';

  if (displayCover?.kind === 'tiktok' && !items.length) {
    openBtn.setAttribute('aria-label', `${tiktokLabel}${displayCover.handle ? ` — ${displayCover.handle}` : ''}`);
    openBtn.onclick = () => {
      if (isSafeTikTokUrl(displayCover.url)) {
        window.open(displayCover.url, '_blank', 'noopener,noreferrer');
      }
    };
    return;
  }

  openBtn.setAttribute('aria-label', `${openLabel}${title ? ` — ${title}` : ''}`);

  const playlistItems = items.length ? items : [displayCover];
  openBtn.onclick = () => openPortfolioModal({
    title,
    items: playlistItems,
    cardType,
    startIndex: 0,
  });
}

function initPortfolioModal() {
  const modal = getPortfolioModal();
  if (!modal) return;

  modal.querySelector('[data-portfolio-modal-close]')?.addEventListener('click', closePortfolioModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePortfolioModal();
  });

  document.querySelector('[data-portfolio-modal-prev]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    goModalSlide(-1);
  });
  document.querySelector('[data-portfolio-modal-next]')?.addEventListener('click', (e) => {
    e.stopPropagation();
    goModalSlide(1);
  });

  const stage = document.querySelector('[data-portfolio-modal-stage]');
  stage?.addEventListener('click', (e) => {
    if (!modal.classList.contains('open')) return;
    const { items, cardType } = modalState;
    if (items.length < 2 || cardType !== 'graphic') return;
    if (e.target.closest('video, iframe, a')) return;

    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    goModalSlide(x < rect.width * 0.35 ? -1 : 1);
  });
  stage?.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'ArrowRight' || e.key === ' ') {
      e.preventDefault();
      goModalSlide(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goModalSlide(-1);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') {
      closePortfolioModal();
      return;
    }
    if (modalState.items.length < 2) return;
    if (e.key === 'ArrowRight') goModalSlide(1);
    if (e.key === 'ArrowLeft') goModalSlide(-1);
  });
}

async function initPortfolioPlaylists() {
  const manifest = await loadPortfolioManifest();
  if (!manifest) {
    document.querySelectorAll('[data-playlist-id]').forEach(renderCardEmpty);
    return;
  }

  document.querySelectorAll('[data-playlist-id]').forEach((card) => {
    const id = card.dataset.playlistId;
    bindPortfolioCard(card, getPlaylistEntry(manifest, id));
  });
}

function initPortfolioPage() {
  const active = document.querySelector('.portfolio-filter-bar .stab.active');
  switchPortfolioFilter(active?.dataset.filter || 'all', active);
  initPortfolioModal();
  initPortfolioPlaylists();

  document.querySelectorAll('.fade-up').forEach((el) => {
    if (typeof IntersectionObserver !== 'undefined') {
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.08 });
      obs.observe(el);
    } else {
      el.classList.add('visible');
    }
  });
}
