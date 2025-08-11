const bwipjs = require("bwip-js");
const { createCanvas, loadImage } = require("canvas");

exports.handler = async (event) => {
  const data = event.queryStringParameters.data || "12345678";

  try {
    // Per generare le barre di testo
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: "code128",
      text: data,
      scale: 3,
      height: 10,
      includetext: false,
      paddingwidth: 20,
      paddingheight: 20,
    });

    // Per il testo
    const barcodeImage = await loadImage(barcodeBuffer);
    const marginBottom = 30;
    const canvas = createCanvas(
      barcodeImage.width,
      barcodeImage.height + marginBottom
    );
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.drawImage(barcodeImage, 0, 0);

    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText(data, canvas.width / 2, barcodeImage.height + 20);

    const finalBuffer = canvas.toBuffer("image/png");
    return {
      statusCode: 200,
      headers: { "Content-Type": "image/png" },
      body: finalBuffer.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: `Errore: ${err.message}`,
    };
  }
};
