const express = require("express");
const router = express.Router();

// middlewares de validação
const {
  validacaoDelogin,
  errosValidados,
} = require("../middlewares/responsavelValidacoes");

// controllers
const AuthController = require("../controllers/AuthController");

router.post("/login", validacaoDelogin, errosValidados, AuthController.login);

router.get("/checkuser", AuthController.checkUser);

module.exports = router;
