const { hx, nums } = require("./colors");
function esc(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); }
function animWrap(a) {
  if (a === "fadeIn") return ['<g opacity="0"><animate attributeName="opacity" from="0" to="1" dur="1.2s" fill="freeze"/>', "</g>"];
  if (a === "scaleIn") return ['<g style="transform-origin:center;transform-box:fill-box" opacity="0"><animate attributeName="opacity" from="0" to="1" dur="0.8s" fill="freeze"/><animateTransform attributeName="transform" type="scale" from="0.6" to="1" dur="0.8s" fill="freeze"/>', "</g>"];
  if (a === "blink") return ['<g><animate attributeName="opacity" values="1;0;1" dur="0.6s" repeatCount="indefinite"/>', "</g>"];
  if (a === "blinking") return ['<g><animate attributeName="opacity" values="1;0.2;1" dur="1.6s" repeatCount="indefinite"/>', "</g>"];
  if (a === "twinkling") return ['<g><animate attributeName="opacity" values="1;0.25;1" dur="4s" repeatCount="indefinite"/>', "</g>"];
  return ["", ""];
}
function xFor(v, W) {
  v = v == null ? 50 : Math.max(0, Math.min(100, v));
  return { ax: (W * v / 100).toFixed(1), an: v <= 35 ? "start" : v >= 65 ? "end" : "middle" };
}
function buildCopy(q, o) {
  const W = o.W, h = o.h;
  const fam = esc(q.fontFamily || "Verdana");
  const fs = Math.max(10, Math.min(300, parseInt(q.fontSize) || 70));
  const dsfs = Math.max(8, Math.min(120, parseInt(q.descSize) || 20));
  const font = hx(q.fontColor || o.font);
  const stroke = hx(q.stroke || "000000"), strokeW = parseFloat(q["stroke-width"]) || 0;
  const sk = strokeW > 0 ? " stroke=\"#" + stroke + "\" stroke-width=\"" + strokeW + "\"" : "";
  const faX = nums(q.fontAlign), faY = nums(q.fontAlignY), dX = nums(q.descAlign), dY = nums(q.descAlignY);
  const lines = String(q.text == null ? "" : q.text).split("-nl-");
  const dlines = String(q.desc == null ? "" : q.desc).split("-nl-");
  const hasDesc = dlines.length && dlines[0] !== "";
  const baseY = faY.length ? faY[0] : 50;
  let txt = "";
  lines.forEach((ln, i) => {
    if (!ln) return;
    const x = xFor(faX.length ? faX[Math.min(i, faX.length - 1)] : 50, W);
    let y = faY.length > 1 ? faY[Math.min(i, faY.length - 1)] : baseY + (hasDesc ? -fs * 0.32 / h * 100 : 0) + (faY.length ? 0 : (i - (lines.length - 1) / 2) * (fs * 1.15 / h * 100));
    y = Math.max(0, Math.min(100, y));
    const yy = (y / 100 * h).toFixed(1);
    const bgRect = String(q.textBg || "false") === "true" ? '<rect x="0" y="' + (yy - fs * 0.62).toFixed(1) + '" width="' + W + '" height="' + (fs * 1.24).toFixed(1) + '" fill="#' + hx(o.textBg) + '" opacity="0.9"/>' : "";
    txt += bgRect + '<text x="' + x.ax + '" y="' + yy + '" text-anchor="' + x.an + '" dominant-baseline="middle" font-family="' + fam + '" font-weight="bold" font-size="' + fs + '" fill="#' + font + '"' + sk + ">" + esc(ln) + "</text>";
  });
  if (hasDesc) dlines.forEach((ln, i) => {
    if (!ln) return;
    const x = xFor(dX.length ? dX[Math.min(i, dX.length - 1)] : 50, W);
    const y = dY.length > 1 ? dY[Math.min(i, dY.length - 1)] : (dY.length ? dY[0] : 62);
    txt += '<text x="' + x.ax + '" y="' + (Math.max(0, Math.min(100, y)) / 100 * h).toFixed(1) + '" text-anchor="' + x.an + '" dominant-baseline="middle" font-family="' + fam + '" font-size="' + dsfs + '" fill="#' + font + '" opacity="0.85">' + esc(ln) + "</text>";
  });
  const rot = parseFloat(q.rotate) || 0;
  if (rot && txt) txt = '<g transform="rotate(' + rot + " " + (W / 2) + " " + (h / 2) + ')">' + txt + "</g>";
  const aw = animWrap(String(q.animation || "none"));
  return aw[0] + txt + aw[1];
}
module.exports = { esc, animWrap, xFor, buildCopy };
