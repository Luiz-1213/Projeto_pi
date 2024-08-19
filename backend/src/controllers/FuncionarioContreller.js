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

    // Verificando se o email já existe
    const emailJaExiste = await Funcionario.findOne({
      where: { email: email },
    });
    if (emailJaExiste) {
      return res
        .status(400)
        .json({ message: "Email já está em uso, informe outro!" });
    }

    const cpfJaExiste = await Funcionario.findOne({
      where: { cpf: cpf },
    });
    if (cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    // Criando senha forte
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

  static async buscarTodos(req, res) {
    const usuarios = await Funcionario.findAll({
      attributes: { exclude: ["senha", "tipoUsuario"] },
    });

    if (!usuarios) {
      res.status(200).json({ message: "Não há usuario cadastrados" });
    }
    res.status(200).json({ usuarios });
  }

  static async buscarPorId(req, res) {
    const id = req.params.id;

    const usuario = await Funcionario.findByPk(id, {
      attributes: { exclude: ["senha"] },
    });

    if (!usuario) {
      res.status(400).json({ message: "Usuário não encontrado!" });
    }
    res.status(200).json({ usuario });
  }

  static async atualizarFuncionario(req, res) {
    // const verificarSeAdmim = checkAdmin(token);

    const {
      id,
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

    // Verificar se o usuario existe
    const usuarioExiste = await Funcionario.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    // Verificando se o email já existe
    const emailJaExiste = await Funcionario.findOne({
      where: { email: email },
    });
    if (emailJaExiste) {
      return res
        .status(400)
        .json({ message: "Email já está em uso, informe outro!" });
    }

    // Verificar se o cpf já está cadastrado
    const cpfJaExiste = await Funcionario.findOne({
      where: { cpf: cpf },
    });
    if (cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    // Criando senha forte
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criando objeto funcionario de update
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

    Funcionario.update(funcionario, {
      where: { idFuncionario: id },
    })
      .then(() => {
        res.status(200).json({
          message: "Funcionario atualizado com sucesso!",
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }

  static async deletarFuncionario(req, res) {
    // const verificarSeAdmim = checkAdmin(token)
    const { id } = req.body;

    // Verificar se o usuario existe
    const usuarioExiste = await Funcionario.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    await Funcionario.destroy({ where: { idFuncionario: id } })
      .then(() => {
        res.status(200).json({ message: "Usuário removido com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Houve um erro ao deletar o usuário, tente novamente mas tarde",
        });
      });
  }
};
