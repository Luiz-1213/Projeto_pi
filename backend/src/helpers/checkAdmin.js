const jwt = require("jsonwebtoken");
const pegarToken = require("./pegarToken");

const checkAdmin = async (req, res, next) => {
  const token = pegarToken(req, res);

  const decoded = jwt.verify(token, process.env.SECRET_JWT);

  const permissao = decoded.tipoUsuario;
  console.log(permissao);
  console.log(permissao === "admin");

  if (permissao === "admin") {
    return res
      .status(403)
      .json({ message: "Rota privada para administradores" });
  } else {
    next();
  }
};

module.exports = checkAdmin;
