const { render } = require("../lib/render");
module.exports = (req, res) => {
  try {
    const svg = render((req && req.query) || {});
    res.setHeader("Content-Type", "image/svg+xml");
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.status(200).send(svg);
  } catch (e) {
    res.status(400).send("Bad request");
  }
};
