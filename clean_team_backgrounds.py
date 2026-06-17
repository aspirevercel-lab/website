from pathlib import Path

from PIL import Image, ImageFilter
from rembg import remove, new_session
from scipy import ndimage
import numpy as np


SOURCE_DIR = Path("assets/team")
OUTPUT_DIR = Path("assets/team/clean")
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

BACKGROUND = (242, 247, 244, 255)
session = new_session("u2net_human_seg")


def soften_alpha(image: Image.Image) -> Image.Image:
    alpha = image.getchannel("A")
    alpha_array = np.array(alpha)
    mask = alpha_array > 18
    labels, count = ndimage.label(mask)
    if count:
        sizes = ndimage.sum(mask, labels, range(1, count + 1))
        largest = int(np.argmax(sizes)) + 1
        alpha_array = np.where(labels == largest, alpha_array, 0).astype("uint8")
        alpha = Image.fromarray(alpha_array, "L")
    alpha = alpha.filter(ImageFilter.GaussianBlur(0.45))
    image.putalpha(alpha)
    return image


for path in SOURCE_DIR.glob("*.*"):
    if not path.is_file() or path.parent == OUTPUT_DIR:
        continue

    original = Image.open(path).convert("RGBA")
    cutout = remove(original, session=session).convert("RGBA")
    cutout = soften_alpha(cutout)

    background = Image.new("RGBA", cutout.size, BACKGROUND)
    background.alpha_composite(cutout)
    output = background.convert("RGB")
    output.save(OUTPUT_DIR / path.name, quality=94, optimize=True)

print(f"Cleaned {len(list(OUTPUT_DIR.glob('*.*')))} team images into {OUTPUT_DIR}")
