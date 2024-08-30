const jwt = require("jsonwebtoken");
const pegarToken = require("./pegarToken");

const checkAdmin = (req, res, next) => {
  const token = pegarToken(req, res);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const { tipoUsuario } = jwt.verify(token, process.env.SECRET_JWT);

    if (tipoUsuario !== "administrador") {
      return res
        .status(403)
        .json({ message: "Acesso negado. Apenas administradores." });
    }

    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = checkAdmin;
