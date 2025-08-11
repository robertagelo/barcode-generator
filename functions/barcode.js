const bwipjs = require("bwip-js");

exports.handler = async (event) => {
  const data = event.queryStringParameters.data || "123456789";

  try {
    const png = await bwipjs.toBuffer({
      bcid: "code128", // oppure 'ean13'
      text: data,
      scale: 3,
      height: 10,
      includetext: false,
    });

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/png",
      },
      body: png.toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return {
      statusCode: 400,
      body: "Errore nella generazione del barcode. Utilizza il numero riportato sotto",
    };
  }
};
