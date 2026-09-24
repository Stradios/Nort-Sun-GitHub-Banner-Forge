const { W, shapeD, frames } = require("./shapes");
const { resolveColor } = require("./colors");
const { buildCopy } = require("./text");
function render(q, env) {
  q = q || {};
  const type = String(q.type || "wave");
  const h = Math.max(60, Math.min(800, parseInt(q.height) || 200));
  const dip = Math.min(90, h * 0.35);
  const section = String(q.section || "header");
  const reversal = String(q.reversal || "false") === "true";
  const col = resolveColor(q, env);
  const gid = "g" + Math.floor(Math.random() * 1e9);
  const defs = col.grad ? '<linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="0">' + col.stops.map(s => '<stop offset="' + (s[0] / 100) + '" stop-color="#' + s[1] + '"/>').join("") + "</linearGradient>" : null;
  const fill = col.grad ? "url(#" + gid + ")" : "#" + col.bg;
  let bg = "";
  if (type !== "transparent") {
    const fr = frames(type, W, h, dip);
    bg = '<path d="' + fr[0] + '" fill="' + fill + '"' + (type === "blur" ? ' filter="url(#bfblur)"' : "") + ">" + (fr.length > 1 ? '<animate attributeName="d" values="' + fr.join(";") + '" dur="3s" repeatCount="indefinite"/>' : "") + "</path>";
  }
  let inner = bg + (defs || "");
  if (section === "footer" && bg) inner = '<g transform="translate(0,' + h + ') scale(1,-1)">' + bg + "</g>" + (defs || "");
  if (reversal && bg) inner = '<g transform="translate(' + W + ',0) scale(-1,1)">' + inner + "</g>";
  const copy = buildCopy(q, { W: W, h: h, font: col.font, textBg: col.textBg });
  const blurDef = type === "blur" ? '<filter id="bfblur" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="10"/></filter>' : "";
  return '<svg xmlns="http://www.w3.org/2000/svg" width="' + W + '" height="' + h + '" viewBox="0 0 ' + W + " " + h + '"><defs>' + (defs || "") + blurDef + "</defs>" + inner + copy + "</svg>";
}
module.exports = { render, W };
