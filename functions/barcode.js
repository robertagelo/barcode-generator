const bwipjs = require("bwip-js");

app.get("/barcode", (req, res) => {
  const data = req.query.data || "123456789";
  bwipjs.toBuffer(
    {
      bcid: "code128", // oppure 'ean13' ecc.
      text: data,
      scale: 3,
      height: 10,
      includetext: false,
    },
    function (err, png) {
      if (err) {
        res.status(400).send("Errore nel generare il barcode");
      } else {
        res.set("Content-Type", "image/png");
        res.send(png);
      }
    }
  );
});
