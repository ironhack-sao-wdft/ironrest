const jwt = require("express-jwt");

function extractTokenFromHeaders(req, res) {
  if (!req.headers.authorization) {
    // O throw tem o mesmo efeito do return de encerrar a execução da função
    throw new Error("Missing Authorization Header.");
  }

  return req.headers.authorization.split(" ")[1];
}

module.exports = jwt({
  secret: process.env.TOKEN_SIGN_SECRET,
  userProperty: "user",
  getToken: extractTokenFromHeaders,
  algorithms: ["HS256"],
});
