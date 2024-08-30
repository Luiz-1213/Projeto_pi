const jwt = require('jsonwebtoken')

const criarToken = async (usuario, req, res) => {
  // create token


  const token = jwt.sign(
    {
      nome: usuario.nome,
      id : usuario.id,
      tipoUsuario: usuario.tipoUsuario
    },
    process.env.SECRET_JWT
  );
  //   return token
  res.status(200).json({ message: "Você está autenticado", token });
};

module.exports = criarToken;
