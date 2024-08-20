const pegarToken = (req, res) => {
  if (!req.headers.authorization) {
    return null;
  }

  const autenticacao = req.headers.authorization;

  const token = autenticacao.split(" ")[1];

  return token;
};

module.exports = pegarToken;
