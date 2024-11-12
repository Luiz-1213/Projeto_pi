const Funcionario = require("../models/Funcionario");
const bcrypt = require("bcrypt");

// Helpers
const criarToken = require("../helpers/criarToken");

module.exports = class FuncionarioController {
  // ------------------------ criar funcionario
  static async criarFuncionario(req, res) {
    const {
      email,
      senha,
      nome,
      cpf,
      endereco,
      telefone,
      cargo,
      dataNascimento,
      voluntario,
      horarioTrabalho,
    } = req.body;

    let image = "";

    if (req.file) {
      image = req.file.filename;
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
      foto: image,
      email,
      senha: senhaHash,
      nome,
      cpf,
      endereco,
      telefone,
      cargo,
      dataNascimento,
      voluntario,
      horarioTrabalho,
      tipoUsuario: "funcionario",
    };

    Funcionario.create(funcionario)
      .then(() => {
        res.status(200).json({ message: "Funcionário cadastrado com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }

  // ------------------------ buscar todos
  static async buscarTodos(req, res) {
    const usuarios = await Funcionario.findAll({
      attributes: { exclude: ["senha", "createAt", "updatedAt"] },
    });

    if (!usuarios) {
      res.status(200).json({ message: "Não há usuario cadastrados" });
    }
    res.status(200).json({ usuarios });
  }
  // ------------------------ buscar um
  static async buscarPorId(req, res) {
    const id = req.params.id;

    const usuario = await Funcionario.findByPk(id, {
      attributes: { exclude: ["senha"] },
    });

    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }
    console.log(
      "--------------------------------------------------Estou aqui",
      usuario
    );
    res.status(200).json({ usuario });
  }

  // ------------------------ atualizar funcionario
  static async atualizarFuncionario(req, res) {
    // const verificarSeAdmim = checkAdmin(token);
    const id = req.params.id;

    const {
      email,
      nome,
      cpf,
      endereco,
      telefone,
      cargo,
      dataNascimento,
      qtdCadastroEvento,
      voluntario,
      horarioTrabalho,
    } = req.body;

    // Verificar se o usuario existe
    const usuarioExiste = await Funcionario.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    let foto = null;

    if (req.file) {
      foto = req.file.filename;
    }

    // Verificando se o email já existe
    const emailJaExiste = await Funcionario.findOne({
      where: { email: email },
    });

    if (usuarioExiste.email !== email && emailJaExiste) {
      return res
        .status(400)
        .json({ message: "Email já está em uso, informe outro!" });
    }

    // Verificar se o cpf já está cadastrado
    const cpfJaExiste = await Funcionario.findOne({
      where: { cpf: cpf },
    });
    if (usuarioExiste.cpf !== cpf && cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    let funcionario = {
      email,
      nome,
      cpf,
      endereco,
      telefone,
      cargo,
      dataNascimento,
      qtdCadastroEvento,
      voluntario,
      horarioTrabalho,
      tipoUsuario: "funcionario",
    };

    if (foto !== null) {
      funcionario.foto = foto;
    }

    Funcionario.update(funcionario, {
      where: { id: id },
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
  // ------------------------ remover funcionario
  static async deletarFuncionario(req, res) {
    // const verificarSeAdmim = checkAdmin(token)
    const id = req.params.id;

    // Verificar se o usuario existe
    const usuarioExiste = await Funcionario.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    await Funcionario.destroy({ where: { id: id } })
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
