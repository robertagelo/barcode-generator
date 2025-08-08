const bwipjs = require("bwip-js");

exports.handler = async (event) => {
  const data = event.queryStringParameters.data || "12345678";

  try {
    const png = await bwipjs.toBuffer({
      bcid: "code128", // Cambia se vuoi QR, EAN, ecc.
      text: data,
      scale: 3,
      height: 10,
      includetext: true,
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
      statusCode: 500,
      body: `Errore: ${err.message}`,
    };
  }
};
