const Funcionario = require("../models/Funcionario");
const bcrypt = require("bcrypt");

module.exports = class FuncionarioController {
  static async criarFuncionario(req, res) {
    const {
      email,
      senha,
      nome,
      idade,
      cpf,
      endereco,
      telefone,
      cargo,
      dataNascimento,
      qtdCadastroEvento,
      voluntario,
      dataCadastro,
      tipoUsuario,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const funcionario = {
      email,
      senha: senhaHash,
      nome,
      idade,
      cpf,
      endereco,
      telefone,
      cargo,
      dataNascimento,
      qtdCadastroEvento,
      voluntario,
      dataCadastro,
      tipoUsuario,
    };

    Funcionario.create(funcionario)
      .then(() => {
        res.status(200).json({ message: "Funcionario cadastrado com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }
};
