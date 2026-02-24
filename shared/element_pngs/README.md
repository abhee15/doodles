Element PNG generator

This folder contains a small Node-based generator that creates simple SVG illustrations (2000x2000) for the first 20 elements, and a conversion script to make PNGs.

Quick steps (Windows):

1. Open a terminal at this folder:

```powershell
cd shared\element_pngs
```

2. Install dependencies:

```powershell
npm install
```

3. Generate SVGs:

```powershell
npm run generate
```

4. Convert to PNGs:

```powershell
npm run convert
```

-or run both together:

```powershell
npm run all
```

Notes:
- The generated SVGs are simple placeholders (title, caption, color block). You can edit `generate_svgs.js` to replace the placeholder graphic with richer SVG shapes or to export PNG directly using an external renderer.
- `sharp` is used for SVG → PNG conversion. If installation of `sharp` fails on some Windows setups, you can convert SVGs using an online tool or another converter (Inkscape, ImageMagick, or cairosvg).

Files produced:
- `*.svg` — generated vector files; visible and editable in any vector editor.
- `*.png` — output when you run the conversion step.

If you want, I can:
- Replace placeholder SVG artwork with richer SVG shapes per prompt (I can update the script),
- Produce the PNGs here and attach them (requires an image-generation capability I don't have locally), or
- Generate higher-fidelity SVGs intended for printing; tell me which you prefer.

SVG workflow note:
- These SVGs are the canonical assets (scalable for any size). Use `preview.html` to inspect and print the cards directly from your browser.
- To make a printable PDF: open `preview.html` in a browser and Print → Save as PDF (use 100% scale / no margins for best results).
- If you prefer, I can package the SVGs into a ZIP or generate a multi-page PDF for you.
