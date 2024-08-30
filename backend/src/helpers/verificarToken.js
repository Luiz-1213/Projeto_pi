const jwt = require("jsonwebtoken");
const pegarToken = require("./pegarToken");

// midddleware de validação de token
const verificarToken = (req, res, next) => {
  const token = pegarToken(req);

  if (!token) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  try {
    const verified = jwt.verify(token, process.env.SECRET_JWT);
    req.usuario = verified;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido!" });
  }
};

module.exports = verificarToken;
