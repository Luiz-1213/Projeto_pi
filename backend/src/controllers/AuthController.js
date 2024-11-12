const Responsavel = require("../models/Responsavel");
const Funcionario = require("../models/Funcionario");

// Helpers
const criarToken = require("../helpers/criarToken");

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
};
