const jwt = require("jsonwebtoken");

module.exports = function generateToken(user) {
  // A senha NUNCA pode ser enviada no token.
  const { _id, name, email, role } = user;

  // Acessando a variável de ambiente definida no .env
  const signature = process.env.TOKEN_SIGN_SECRET;
  const expiration = "6h";

  return jwt.sign({ _id, name, email, role }, signature, {
    expiresIn: expiration,
  });
};
