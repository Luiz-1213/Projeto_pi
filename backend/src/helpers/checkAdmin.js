const Funcionario = require("../models/Funcionario");

function checkAdmin(req, res, token) {
  if (!token) {
    return res.status(403).json({ message: "Acesso negado" });
  }

  const usuario = Funcionario.findByPk(id);

  if (usuario.tipoUsuario !== "Administrador") {
    return res
      .status(403)
      .json({
        message: "Somente administradores podem editar os dados do funcionário",
      });
  }
}

module.exports = { checkAdmin };
