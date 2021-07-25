const EstabModel = require("../models/Estab.model");

module.exports = async (req, res, next) => {
  try {
    // Ver linha 14 do arquivo isAuthenticated.js
    const loggedInEstab = req.user;

    const estab = await EstabModel.findOne(
      { _id: loggedInEstab._id },
      { passwordHash: 0, __v: 0 } // Excluindo o hash da senha da resposta que vai pro servidor, por segurança
    );

    if (!estab) {
      // 400 significa Bad Request
      return res.status(400).json({ msg: "User does not exist." });
    }

    req.currentUser = estab;
    return next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: JSON.stringify(err) });
  }
};
