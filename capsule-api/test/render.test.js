const { describe, it } = require("node:test");
const assert = require("node:assert/strict");
const { render } = require("../lib/render");
const { resolveColor } = require("../lib/colors");
const TYPES = ["wave", "egg", "shark", "slice", "rect", "soft", "rounded", "cylinder", "waving", "venom", "speech", "blur", "pulse", "checkered", "transparent"];
function svg(q, env) {
  const out = render(q, env);
  assert.match(out, /^<svg/);
  assert.match(out, /<\/svg>$/);
  return out;
}
describe("types", () => {
  for (const t of TYPES) {
    it("renders " + t, () => {
      const out = svg({ type: t, text: "Hi" });
      if (t === "transparent") assert.doesNotMatch(out, /<path d=/);
      else assert.match(out, /<path d="M0,0/);
    });
  }
  it("animates waving", () => {
    assert.match(svg({ type: "waving" }), /<animate attributeName="d"/);
  });
});
describe("color", () => {
  it("auto picks a palette entry", () => {
    const out = svg({ color: "auto" }, { rnd: () => 0 });
    assert.match(out, /#A3DCBE/);
  });
  it("timeAuto is decided by time", () => {
    const a = svg({ color: "timeAuto" }, { now: 0, rnd: () => 0.99 });
    const b = svg({ color: "timeAuto" }, { now: 60000 * 5, rnd: () => 0 });
    assert.notEqual(a, b);
  });
  it("customColorList filters idx", () => {
    const out = svg({ color: "auto", customColorList: "2" }, { rnd: () => 0.99 });
    assert.match(out, /#FD866E/);
  });
  it("gradient + theme", () => {
    assert.match(svg({ color: "gradient" }, { rnd: () => 0 }), /stop-color/);
    assert.match(svg({ theme: "radical" }), /#141321/);
  });
  it("custom gradient stops", () => {
    const out = svg({ color: "0:EEFF00,100:a82da8" });
    assert.match(out, /#EEFF00/);
    assert.match(out, /#A82DA8/);
  });
});
describe("content", () => {
  it("multiline text, desc, textBg, rotate, reversal, footer", () => {
    const out = svg({ text: "a-nl-b", desc: "d", textBg: "true", rotate: "-10", reversal: "true", section: "footer", fontAlign: "30,70" });
    assert.match(out, /rotate\(-10/);
    assert.match(out, /scale\(-1,1\)/);
    assert.match(out, /<rect[^>]*opacity="0.9"/);
  });
  it("animations + stroke", () => {
    for (const a of ["fadeIn", "scaleIn", "blink", "blinking", "twinkling"]) assert.match(svg({ text: "x", animation: a }), /<animate/);
    assert.match(svg({ text: "x", stroke: "ff0000", "stroke-width": "2" }), /stroke="#FF0000"/);
  });
  it("resolveColor exposes font pairing", () => {
    assert.equal(resolveColor({ color: "auto" }, { rnd: () => 0 }).font, "363636");
  });
});
