#!/usr/bin/env python3
"""Generate WebP variants for LCP-critical branding and payment logos."""
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
BRANDING = ROOT / "assets" / "branding"
PAYMENTS = ROOT / "assets" / "payments"

MARK_SIZES = (38, 76, 280, 400, 800)


def save_webp(img: Image.Image, path: Path, quality: int = 82) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, "WEBP", quality=quality, method=6)
    print(f"  {path.relative_to(ROOT)} ({path.stat().st_size:,} B)")


def resize_mark(src: Path, width: int) -> Image.Image:
    img = Image.open(src).convert("RGBA")
    ratio = width / img.width
    height = max(1, round(img.height * ratio))
    return img.resize((width, height), Image.Resampling.LANCZOS)


def main() -> None:
    mark = BRANDING / "logo-mark-original.png"
    if not mark.exists():
        raise SystemExit(f"Missing {mark}")

    print("Branding mark WebP:")
    for w in MARK_SIZES:
        save_webp(resize_mark(mark, w), BRANDING / f"logo-mark-original-{w}.webp")

    print("Payment logos WebP:")
    for name in ("mixx-by-yas.png", "orabank.png"):
        src = PAYMENTS / name
        if not src.exists():
            print(f"  skip missing {src.name}")
            continue
        img = Image.open(src).convert("RGBA")
        save_webp(img, PAYMENTS / f"{src.stem}.webp", quality=85)


if __name__ == "__main__":
    main()
