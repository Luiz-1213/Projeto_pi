const pegarToken = (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Acesso negado!" });
  }

  const autenticacao = req.headers.authorization;

  const token = autenticacao.split(" ")[1];

  return token;
};

module.exports = pegarToken;
