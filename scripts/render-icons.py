"""
Renders the felixdev favicon straight to PNG/ICO in pure Python.

No image libraries and no round-tripping base64 through the browser — the mark
is pure geometry, so it's cheaper and far more reliable to rasterise it here
with 4x supersampling than to transcribe canvas output.
"""
import zlib, struct, pathlib, sys

# ---- geometry, in the SVG's 64-unit coordinate space -------------------------
TILE_R = 13.0
INK        = (0x14, 0x14, 0x14)
TITLEBAR   = (0x26, 0x28, 0x2A)
DIVIDER    = (0x3E, 0x41, 0x44)
GREEN      = (0x7B, 0xA8, 0x8B)
GREY       = (0x5B, 0x5E, 0x61)
PAPER      = (0xFA, 0xFA, 0xF8)

def in_round_rect(px, py, x, y, w, h, r):
    if px < x or py < y or px > x + w or py > y + h:
        return False
    r = min(r, w / 2, h / 2)
    cx = min(max(px, x + r), x + w - r)
    cy = min(max(py, y + r), y + h - r)
    return (px - cx) ** 2 + (py - cy) ** 2 <= r * r

def in_circle(px, py, cx, cy, r):
    return (px - cx) ** 2 + (py - cy) ** 2 <= r * r

def sample(px, py):
    """Topmost opaque colour at a point, or None outside the tile."""
    if not in_round_rect(px, py, 0, 0, 64, 64, TILE_R):
        return None
    if in_round_rect(px, py, 36, 29, 10, 24, 1.5):
        return PAPER
    if in_round_rect(px, py, 15, 38, 16, 6, 3):
        return GREEN
    if in_circle(px, py, 13, 9, 2.7):
        return GREEN
    if in_circle(px, py, 22.5, 9, 2.7) or in_circle(px, py, 32, 9, 2.7):
        return GREY
    if 17.0 <= py < 18.4:
        return DIVIDER
    if py < 18.0:
        return TITLEBAR
    return INK

def render(size, ss=4):
    """RGBA rows, premultiplied-averaged so the rounded edge stays clean."""
    rows = []
    scale = 64.0 / size
    step = 1.0 / ss
    off = step / 2.0
    n = ss * ss
    for iy in range(size):
        row = bytearray()
        for ix in range(size):
            ar = ag = ab = aa = 0.0
            for sy in range(ss):
                py = (iy + off + sy * step) * scale
                for sx in range(ss):
                    px = (ix + off + sx * step) * scale
                    c = sample(px, py)
                    if c is not None:
                        ar += c[0]; ag += c[1]; ab += c[2]; aa += 255.0
            if aa == 0:
                row += b"\x00\x00\x00\x00"
            else:
                cov = aa / (n * 255.0)
                # un-premultiply: colour is the mean over *covered* samples
                covered = aa / 255.0
                row += bytes((
                    int(round(ar / covered)),
                    int(round(ag / covered)),
                    int(round(ab / covered)),
                    int(round(cov * 255)),
                ))
        rows.append(bytes(row))
    return rows

def png_bytes(size):
    rows = render(size)
    raw = b"".join(b"\x00" + r for r in rows)
    def chunk(tag, data):
        return (struct.pack(">I", len(data)) + tag + data
                + struct.pack(">I", zlib.crc32(tag + data) & 0xFFFFFFFF))
    return (b"\x89PNG\r\n\x1a\n"
            + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 6, 0, 0, 0))
            + chunk(b"IDAT", zlib.compress(raw, 9))
            + chunk(b"IEND", b""))

def make_ico(sizes, out):
    blobs = [(s, png_bytes(s)) for s in sizes]
    header = struct.pack("<HHH", 0, 1, len(blobs))
    offset = 6 + 16 * len(blobs)
    entries = data = b""
    for s, blob in blobs:
        dim = s if s < 256 else 0
        entries += struct.pack("<BBBBHHII", dim, dim, 0, 0, 1, 32, len(blob), offset)
        offset += len(blob)
        data += blob
    out.write_bytes(header + entries + data)

if __name__ == "__main__":
    # usage: python3 scripts/render-icons.py app
    app = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "app")
    make_ico([16, 32, 48], app / "favicon.ico")
    (app / "apple-icon.png").write_bytes(png_bytes(180))
    for name in ("favicon.ico", "apple-icon.png"):
        print(f"{name:16} {(app / name).stat().st_size:>6} bytes")
