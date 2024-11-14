const Responsavel = require("../models/Responsavel");
const Funcionario = require("../models/Funcionario");

// Helpers
const criarToken = require("../helpers/criarToken");
const pegarToken = require("../helpers/pegarToken");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

module.exports = class AuthController {
  // login de usuario
  static async login(req, res) {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res
        .status(400)
        .json({ message: "E-mail e senha são obrigatórios." });
    }

    const usuario = await Responsavel.findOne({ where: { email } });
    const funcionario = usuario
      ? null
      : await Funcionario.findOne({ where: { email } });
    const conta = usuario || funcionario;

    if (!conta) {
      return res.status(404).json({
        message: "Credenciais inválidas, entre em contato com o Administrador!",
      });
    }

    const verificarSenha = await bcrypt.compare(senha, conta.senha);
    if (!verificarSenha) {
      return res.status(422).json({ message: "Credenciais inválidas" });
    }

    criarToken(conta, req, res);
  }

  // descobrindo  o usuario pelo token
  static async checkUser(req, res) {
    if (req.headers.authorization) {
      const token = pegarToken(req);
      const decoded = jwt.verify(token, process.env.SECRET_JWT);

      const usuario = await Responsavel.findByPk(decoded.id, {
        attributes: ["id", "foto", "nome", "tipoUsuario"],
      });
      const funcionario = usuario
        ? null
        : await Funcionario.findByPk(decoded.id, {
            attributes: ["id", "foto", "nome", "tipoUsuario"],
          });
      const usuarioAtual = usuario || funcionario;

      if (!usuarioAtual) {
        return res.status(400).json({
          message: "Erro ao buscar seu usuario",
        });
      }

      res.status(200).send(usuarioAtual);
    } else {
      console.error("deu errado");
    }
  }
};
