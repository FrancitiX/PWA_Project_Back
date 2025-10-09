const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const roles = require("../Api/Role/RolesController");

// require("./../Api/Tokens/TokenModel");
const Token = mongoose.model("token");

module.exports = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      const token = await Token.findOne({ token: token });
      if (!token) {
        return res
          .status(401)
          .json({ error: "Acceso denegado. Token no proporcionado." });
      }
    }
    const isAdmin = decoded.role === roles.ADMIN; // Verifica si el rol es 'admin'

    req.isAdmin = isAdmin;
    next();
  } catch (error) {
    res.status(400).json({ error: "Token inválido" });
  }
};
