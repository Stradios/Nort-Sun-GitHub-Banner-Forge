const PALETTE = require("../src/palette.json");
const GRADIENTS = require("../src/gradients.json");
const THEMES = require("../src/themes.json");
function hx(s) {
  s = String(s == null ? "" : s).replace(/^#/, "");
  if (/^[0-9a-fA-F]{3}$/.test(s)) s = s.split("").map(c => c + c).join("");
  return /^[0-9a-fA-F]{6}$/.test(s) ? s.toUpperCase() : "000000";
}
function nums(v) { return String(v == null ? "" : v).split(",").map(x => parseFloat(x)).filter(x => !isNaN(x)); }
function pickList(list, idxs) {
  if (!idxs.length) return list;
  return idxs.map(i => list[((Math.floor(i) % list.length) + list.length) % list.length]);
}
function resolveColor(q, env) {
  const now = env && env.now != null ? env.now : Date.now();
  const rnd = env && env.rnd ? env.rnd : Math.random;
  const th = THEMES[String(q.theme || "").toLowerCase()];
  if (th) {
    if (th.color && th.color.includes && th.color.includes(",")) {
      const parts = th.color.split(",").map(hx);
      return { grad: true, stops: parts.map((c, i) => [parts.length === 1 ? 0 : i * 100 / (parts.length - 1), c]), font: hx(th.text) };
    }
    return { grad: false, bg: hx(th.color), font: hx(th.text), textBg: hx(th.textBg) };
  }
  const c = String(q.color == null ? "B897FF" : q.color);
  const idxs = nums(q.customColorList);
  const minute = Math.floor(now / 60000);
  if (c === "auto" || c === "timeAuto") {
    const l = pickList(PALETTE, idxs);
    const p = c === "timeAuto" ? l[minute % l.length] : l[Math.floor(rnd() * l.length)];
    return { grad: false, bg: hx(p.color), font: hx(p.text), textBg: hx(p.textBg) };
  }
  if (c === "random") return { grad: false, bg: Math.floor(rnd() * 16777215).toString(16).padStart(6, "0").toUpperCase(), font: "000000", textBg: "282829" };
  if (c === "gradient" || c === "timeGradient") {
    const l = pickList(GRADIENTS, idxs);
    const g = c === "timeGradient" ? l[minute % l.length] : l[Math.floor(rnd() * l.length)];
    const stops = Object.keys(g.color).map(k => [parseFloat(k), hx(g.color[k])]).sort((a, b) => a[0] - b[0]);
    return { grad: true, stops: stops, font: hx(g.text), textBg: hx(g.textBg) };
  }
  const gm = c.match(/(\d+):#?([0-9a-fA-F]{3,6})/g);
  if (gm && gm.length > 1) {
    const stops = gm.map(s => { const m = s.match(/(\d+):#?([0-9a-fA-F]{3,6})/); return [parseFloat(m[1]), hx(m[2])]; }).sort((a, b) => a[0] - b[0]);
    return { grad: true, stops: stops, font: "000000", textBg: "282829" };
  }
  return { grad: false, bg: hx(c), font: "000000", textBg: "282829" };
}
module.exports = { hx, nums, pickList, resolveColor, PALETTE, GRADIENTS, THEMES };
