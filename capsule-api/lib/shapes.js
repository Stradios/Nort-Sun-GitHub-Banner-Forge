const W = 1200;
function waveY(u, dip, h, ph) { return h - dip / 2 - (dip / 2) * Math.sin(u * Math.PI * 3 + (ph || 0)); }
function shapeD(type, w, h, dip, ph) {
  const f = n => +n.toFixed(1), y0 = h - dip;
  if (type === "rect" || type === "blur") return "M0,0L" + w + ",0L" + w + "," + f(h) + "L0," + f(h) + "Z";
  if (type === "rounded") { const r = Math.min(28, h * 0.35); return "M" + f(r) + ",0H" + f(w - r) + "Q" + w + ",0 " + w + "," + f(r) + "V" + f(h - r) + "Q" + w + "," + f(h) + " " + f(w - r) + "," + f(h) + "H" + f(r) + "Q0," + f(h) + " 0," + f(h - r) + "V" + f(r) + "Q0,0 " + f(r) + ",0Z"; }
  if (type === "arch") return "M0,0L" + w + ",0L" + w + "," + f(y0) + "Q" + f(w / 2) + "," + f(h + dip * 0.6) + " 0," + f(y0) + "Z";
  if (type === "slice") return "M0,0L" + w + ",0L" + w + "," + f(h - dip * 1.6) + "L0," + f(h) + "Z";
  if (type === "egg") return "M0,0L" + w + ",0L" + w + "," + f(h - dip * 0.9) + "Q" + f(w * 0.75) + "," + f(h + dip * 0.3) + " " + f(w / 2) + "," + f(h - dip * 0.2) + "Q" + f(w * 0.25) + "," + f(h + dip * 0.3) + " 0," + f(h - dip * 0.9) + "Z";
  if (type === "cylinder") return "M0,0L" + w + ",0L" + w + "," + f(y0) + "A" + f(w / 2) + "," + f(Math.max(1, dip)) + " 0 0 1 0," + f(y0) + "Z";
  if (type === "soft") return "M0,0L" + w + ",0L" + w + "," + f(h - dip * 0.7) + "Q" + f(w / 2) + "," + f(h - dip * 0.2) + " 0," + f(h - dip * 0.7) + "Z";
  if (type === "shark") return "M0,0L" + w + ",0L" + w + "," + f(h - dip * 0.5) + "L" + f(w * 0.60) + "," + f(h - dip * 0.5) + "L" + f(w * 0.47) + "," + f(Math.max(0, h - dip * 1.9)) + "L" + f(w * 0.34) + "," + f(h - dip * 0.5) + "L0," + f(h - dip * 0.5) + "L0," + f(h) + "Z";
  if (type === "venom") { let d = "M0,0L" + w + ",0L" + w + "," + f(h - dip * 0.5); const n = 9; for (let i = n; i >= 0; i--) { const x = w * (i / n); d += "L" + f(x) + "," + f(Math.min(h, h - dip * 0.5 + dip * (i % 2 === 0 ? 0.9 : 0.12) + Math.sin(i) * dip * 0.05)); } return d + "L0," + f(h) + "Z"; }
  if (type === "speech") return "M0,0L" + w + ",0L" + w + "," + f(y0) + "L" + f(w * 0.62) + "," + f(y0) + "L" + f(w * 0.50) + "," + f(Math.min(h, y0 + dip)) + "L" + f(w * 0.40) + "," + f(y0) + "L0," + f(y0) + "L0," + f(h) + "Z";
  if (type === "pulse") { let d = "M0,0L" + w + ",0L" + w + "," + f(h - dip * 0.5); const s = 60; for (let i = s; i >= 0; i--) { const u = i / s; let y = h - dip * 0.5; const dd = Math.abs(u - 0.5); if (dd < 0.045) y -= dip * 1.3 * (1 - dd / 0.045); else if (dd < 0.075) y += dip * 0.25 * (1 - (dd - 0.045) / 0.03); d += "L" + f(w * u) + "," + f(Math.max(0, y)); } return d + "L0," + f(h) + "Z"; }
  if (type === "checkered") { let d = "M0,0L" + w + ",0L" + w + "," + f(h - dip); const n = 12, sw = w / n; for (let i = 0; i < n; i++) { const x = w - i * sw, dd = (i % 2 ? dip : dip * 0.45); d += "L" + f(x) + "," + f(h - dd) + "L" + f(x - sw) + "," + f(h - dd); } return d + "L0," + f(h) + "Z"; }
  if (type === "transparent") return "";
  let d = "M0,0L" + w + ",0L" + w + "," + f(waveY(1, dip, h, ph || 0));
  const s = 60; for (let i = s; i >= 0; i--) { const u = i / s; d += "L" + f(w * u) + "," + f(waveY(u, dip, h, ph || 0)); }
  return d + "Z";
}
function frames(type, w, h, dip) {
  if (type === "waving" || type === "wave") return [0, 2.09, 4.19].map(p => shapeD(type, w, h, dip, p));
  return [shapeD(type, w, h, dip, 0)];
}
module.exports = { W, shapeD, frames };
