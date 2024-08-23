const Responsavel = require("../models/Responsavel");
const bcrypt = require("bcrypt");

// Helpers
const criarToken = require("../helpers/criarToken");

module.exports = class ResponsavelController {
  // ------------------------ criar responsável
  static async criarResponsavel(req, res) {
    const {
      email,
      foto,
      senha,
      nome,
      idade,
      cpf,
      endereco,
      genero,
      parentesco,
      telefone,
      autorizacaoTratamento,
      observacao,
      horarioDisponivel,
      dataNascimento,
      contatoEmergencia,
      tipoUsuario,
    } = req.body;

    // Verificando se o email já existe
    const emailJaExiste = await Responsavel.findOne({
      where: { email: email },
    });

    if (emailJaExiste) {
      return res
        .status(400)
        .json({ message: "Email já está em uso, informe outro!" });
    }

    const cpfJaExiste = await Responsavel.findOne({
      where: { cpf: cpf },
    });

    if (cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    // Criando senha forte
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    const responsavel = {
      email,
      foto,
      senha: senhaHash,
      nome,
      idade,
      cpf,
      endereco,
      genero,
      parentesco,
      telefone,
      autorizacaoTratamento,
      observacao,
      horarioDisponivel,
      dataNascimento,
      contatoEmergencia,
      tipoUsuario,
    };

    Responsavel.create(responsavel)
      .then(() => {
        res.status(200).json({ message: "Responsável cadastrado com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }

  // login de responsável
  static async login(req, res) {
    const { email, senha } = req.body;

    const usuario = await Responsavel.findOne({
      where: { email: email },
    });

    if (!usuario) {
      return res.status(404).json({
        message:
          "Usúario não cadastrado, entre em contato com o Administrador!",
      });
    }

    const verificarSenha = await bcrypt.compare(senha, usuario.senha);

    if (!verificarSenha) {
      return res.status(422).json({ message: "Senha inválida" });
    }

    criarToken(usuario, req, res);
  }

  // ------------------------ buscar todos
  static async buscarTodos(req, res) {
    const usuarios = await Responsavel.findAll({
      attributes: { exclude: ["senha", "tipoUsuario"] },
    });

    if (!usuarios) {
      res.status(200).json({ message: "Não há usuario cadastrados" });
    }
    res.status(200).json({ usuarios });
  }
  // ------------------------ buscar um
  static async buscarPorId(req, res) {
    const id = req.params.id;

    const usuario = await Responsavel.findByPk(id, {
      attributes: { exclude: ["senha"] },
    });

    if (!usuario) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }
    res.status(200).json({ usuario });
  }

  // ------------------------ atualizar funcionario
  static async atualizarResponsavel(req, res) {
    // const verificarSeAdmim = checkAdmin(token);

    const {
      idResponsavel,
      email,
      foto,
      senha,
      nome,
      idade,
      cpf,
      endereco,
      genero,
      parentesco,
      telefone,
      autorizacaoTratamento,
      observacao,
      horarioDisponivel,
      dataNascimento,
      contatoEmergencia,
      tipoUsuario,
    } = req.body;

    // Verificar se o usuario existe
    const usuarioExiste = await Responsavel.findByPk(idResponsavel);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    // Verificando se o email já existe
    const emailJaExiste = await Responsavel.findOne({
      where: { email: email },
    });
    if (emailJaExiste) {
      return res
        .status(400)
        .json({ message: "Email já está em uso, informe outro!" });
    }

    // Verificar se o cpf já está cadastrado
    const cpfJaExiste = await Responsavel.findOne({
      where: { cpf: cpf },
    });
    if (cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    // Criando senha forte
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    // Criando objeto responsável de update
    const responsavel = {
      email,
      foto,
      senha: senhaHash,
      nome,
      idade,
      cpf,
      endereco,
      genero,
      parentesco,
      telefone,
      autorizacaoTratamento,
      observacao,
      horarioDisponivel,
      dataNascimento,
      contatoEmergencia,
      tipoUsuario,
    };

    Responsavel.update(responsavel, {
      where: { idResponsavel: idResponsavel },
    })
      .then(() => {
        res.status(200).json({
          message: "Responsável atualizado com sucesso!",
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }
  // ------------------------ remover responsável
  static async deletarResponsavel(req, res) {
    // const verificarSeAdmim = checkAdmin(token)
    const { id } = req.body;

    // Verificar se o usuario existe
    const usuarioExiste = await Responsavel.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    await Responsavel.destroy({ where: { idResponsavel: id } })
      .then(() => {
        res.status(200).json({ message: "Usuário removido com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Houve um erro ao deletar o usuário, tente novamente mais tarde",
        });
      });
  }
};
