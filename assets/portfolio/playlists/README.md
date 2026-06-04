# Portfolio playlists — one folder per card

Each card on `portfolio.html` reads from **one folder** below.  
After you add or remove files, rebuild:

```bash
node scripts/build-portfolio-playlists.mjs
```

That updates `assets/portfolio/portfolio-playlists.json` and `js/portfolio-playlists-data.js`.

---

## Folder → card

| Folder | Portfolio card |
|--------|----------------|
| `video-1/` | Animation (montage vidéo) |
| `video-2/` | Social handles (production AV) |
| `graphic-1/` | **Logo & identité** — Identité visuelle — marque |
| `graphic-2/` | Série visuels — campagne (réseaux sociaux) |
| `graphic-3/` | Flyer & affiche (print) |

---

## Files in each folder

### All cards

| File | Purpose |
|------|---------|
| `01-name.ext`, `02-…` | Playlist slides (order = numeric prefix) |
| `cover.jpg` / `cover.png` / `cover.mp4` | **Optional** — thumbnail on the card only (not in playlist) |
| `cover.url` | **Optional** — external cover (e.g. TikTok profile link for Social handles) |
| `labels.json` | **Optional** — custom captions, e.g. `{ "01-logo.png": "Client name" }` |

If there is no `cover.*`, the **first numbered file** is used as the card thumbnail.

### Video folders (`video-1`, `video-2`)

- `.mp4`, `.webm`, `.mov`
- YouTube: `youtube-VIDEO_ID.txt` or `youtube.txt` (ID or full URL)
- Vimeo: `vimeo-123456.txt` or `.url` with Vimeo link

### Design folders (`graphic-1` … `graphic-3`)

- `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.svg`

---

## On the website

1. **Card** — shows the cover image (or empty state with folder path).
2. **Click the image** — opens a modal with the full playlist (thumbnails + main viewer).

---

## Sending files to add

Tell which **folder** (`graphic-1`, `video-2`, …) and attach your files.  
We copy them into that folder, run the build command, and refresh the page.
