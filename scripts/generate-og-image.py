#!/usr/bin/env python3
"""Generate public/og-image.png for social sharing previews."""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
PROFILE = ROOT / "src/assets/images/profile.jpeg"
OUT = ROOT / "public/og-image.png"

W, H = 1200, 630
BG = (10, 10, 10)
ACCENT = (34, 224, 107)
TEXT = (237, 237, 237)
MUTED = (138, 138, 138)
GRID = (35, 35, 35)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf"
        if bold
        else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/Library/Fonts/Arial Bold.ttf" if bold else "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                pass
    return ImageFont.load_default()


def draw_grid(draw: ImageDraw.ImageDraw) -> None:
    for x in range(0, W, 48):
        draw.line([(x, 0), (x, H)], fill=GRID, width=1)
    for y in range(0, H, 48):
        draw.line([(0, y), (W, y)], fill=GRID, width=1)


def prepare_profile_photo() -> Image.Image:
    profile = Image.open(PROFILE).convert("RGB")
    photo_size = 400
    width, height = profile.size
    top = int(height * 0.05)
    side = min(width, height - top)
    profile = profile.crop((0, top, side, top + side))
    return profile.resize((photo_size, photo_size), Image.Resampling.LANCZOS)


def draw_cta_button(
    draw: ImageDraw.ImageDraw,
    x: int,
    y: int,
    label: str,
    font: ImageFont.FreeTypeFont | ImageFont.ImageFont,
) -> None:
    padding_x = 28
    padding_y = 14
    bbox = draw.textbbox((0, 0), label, font=font)
    text_w = bbox[2] - bbox[0]
    text_h = bbox[3] - bbox[1]
    button_w = text_w + padding_x * 2
    button_h = text_h + padding_y * 2
    radius = 10

    draw.rounded_rectangle(
        [x, y, x + button_w, y + button_h],
        radius=radius,
        fill=ACCENT,
    )
    draw.text(
        (x + padding_x, y + padding_y - 2),
        label,
        fill=BG,
        font=font,
    )


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)
    draw_grid(draw)

    mono = load_font(26)
    title = load_font(50, bold=True)
    subtitle = load_font(28, bold=True)
    body = load_font(22)
    cta = load_font(24, bold=True)
    footer = load_font(22)

    profile = prepare_profile_photo()
    photo_size = profile.size[0]
    radius = 16
    photo_x = W - photo_size - 72
    photo_y = (H - photo_size) // 2
    border = 4

    mask = Image.new("L", (photo_size, photo_size), 0)
    mask_draw = ImageDraw.Draw(mask)
    mask_draw.rounded_rectangle([0, 0, photo_size, photo_size], radius=radius, fill=255)

    draw.rounded_rectangle(
        [
            photo_x - border,
            photo_y - border,
            photo_x + photo_size + border,
            photo_y + photo_size + border,
        ],
        radius=radius + 2,
        outline=ACCENT,
        width=border,
    )
    img.paste(profile, (photo_x, photo_y), mask)

    left = 72
    draw.text((left, 88), "/* Senior Product Engineer */", fill=ACCENT, font=mono)
    draw.text((left, 160), "Weverton Rodrigues", fill=TEXT, font=title)
    draw.text((left, 232), "I turn complex product ideas", fill=MUTED, font=subtitle)
    draw.text((left, 268), "into scalable software.", fill=MUTED, font=subtitle)
    draw.text((left, 330), "React · TypeScript · AWS · AI", fill=MUTED, font=body)
    draw.text((left, 368), "Open to senior engineering roles", fill=ACCENT, font=body)
    draw_cta_button(draw, left, 418, "View Portfolio  →", cta)
    draw.text((left, 548), "<weverton /> · weverton.me", fill=MUTED, font=footer)

    img.save(OUT, "PNG", optimize=True)
    print(f"Saved {OUT} ({OUT.stat().st_size} bytes, {W}x{H})")


if __name__ == "__main__":
    main()
