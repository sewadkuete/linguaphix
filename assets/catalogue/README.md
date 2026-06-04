# Catalogue photos

One folder per service. Use **square** images (1:1), e.g. 600×600 or 1200×1200 px (JPG/WebP/PNG).

## Language-specific images (FR / EN)

| File | Used when |
|------|-----------|
| `01.png` | Fallback for both languages |
| `01-fr.png` | French (optional; falls back to `01.png`) |
| `01-en.png` | English (optional; falls back to `01.png`) |

When you add an English visual, save it as `01-en.png` and update `en` in `CATALOGUE_IMAGE_PATHS` inside `js/catalogue.js`:

```javascript
tcf: {
  fr: 'assets/catalogue/tcf/01.png',
  en: 'assets/catalogue/tcf/01-en.png',
},
```

Alt text for each language is in `js/app.js` under `catalogue.alt.<service>` (FR and EN).

Switching **FR | EN** on the catalogue page updates images and alt text automatically.

## Folders

| Folder | Service |
|--------|---------|
| `tcf/` | Préparation TCF |
| `ielts/` | IELTS / TOEFL / Cambridge |
| `toeic/` | TOEIC |
| `cours/` | Cours de Français / Anglais |
| `interview/` | Préparation aux interviews |
| `soutien/` | Soutien scolaire |
| `formation/` | Formation linguistique en entreprise |
| `traduction/` | Traduction professionnelle |
| `logo/` | Création & animation de logo |
| `montage/` | Montage vidéo |
| `graphic/` | Design graphique |
| `livestream/` | Production live streaming |
| `materiel/` | Conseil & achat de matériel |

## Add photos

1. Save files in the matching folder.
2. Register paths in `js/catalogue.js` → `CATALOGUE_IMAGE_PATHS` (and optional `catalogue.alt.*` in `js/app.js`).
3. In `catalogue.html`, add a `catalogue-photo` block with `data-catalogue-base` and `data-i18n-alt`:

```html
<a href="assets/catalogue/tcf/01.png" class="catalogue-photo" target="_blank" rel="noopener">
  <img src="assets/catalogue/tcf/01.png"
       data-catalogue-base="assets/catalogue/tcf/01"
       data-catalogue-ext="png"
       data-i18n-alt="catalogue.alt.tcf"
       alt="…" loading="lazy" width="600" height="600">
</a>
```

The empty-state message hides when at least one `.catalogue-photo` is present.
