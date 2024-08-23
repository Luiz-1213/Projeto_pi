const express = require("express");
const router = express.Router();

// middlewares de validação
const {
  validacoesDeFuncionario,
  validacaoDelogin,
  errosValidados,
} = require("../middlewares/funcionarioValidacoes");

// helpers
const checkAdmin = require("../helpers/checkAdmin");

// controllers
const ResponsavelController = require("../controllers/ResponsavelController");

router.post("/create", ResponsavelController.criarResponsavel);

router.post("/login", ResponsavelController.login);

router.patch("/update/", ResponsavelController.atualizarResponsavel);
router.get("/findone/:id", ResponsavelController.buscarPorId);
router.get("/findall", ResponsavelController.buscarTodos);
router.delete("/remove/", ResponsavelController.deletarResponsavel);

module.exports = router;
