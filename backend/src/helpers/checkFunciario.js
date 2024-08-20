const jwt = require("jsonwebtoken");
const pegarToken = require("./pegarToken");

const checkFuncionario = (req, res, next) => {
  const token = pegarToken(req, res);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const usuario = jwt.verify(token, process.env.SECRET_JWT);
    const tipoUsuario = usuario.tipoUsuario;

    if (tipoUsuario !== "funcionario" && tipoUsuario === "administrador") {
      return res
        .status(403)
        .json({ message: "Acesso negado. Apenas administradores." });
    }
    req.usuario
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = checkFuncionario;
