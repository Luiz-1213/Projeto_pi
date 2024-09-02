const express = require("express");
const router = express.Router();

// middlewares de validação
const {
  validacoesDeResponsavel,
  validacaoDelogin,
  errosValidados,
} = require("../middlewares/responsavelValidacoes");

// helpers
const checkFuncionario = require("../helpers/checkFunciario");
const { imageUpload } = require("../helpers/imageUpload");

// controllers
const ResponsavelController = require("../controllers/ResponsavelController");

router.post(
  "/create",
  checkFuncionario,
  imageUpload.single("image"),
  validacoesDeResponsavel,
  errosValidados,
  ResponsavelController.criarResponsavel
);

router.post(
  "/login",
  validacaoDelogin,
  errosValidados,
  ResponsavelController.login
);

router.patch(
  "/update/",
  checkFuncionario,
  imageUpload.single("image"),
  validacoesDeResponsavel,
  errosValidados,
  ResponsavelController.atualizarResponsavel
);
router.get("/findone/:id", checkFuncionario, ResponsavelController.buscarPorId);
router.get("/findall", checkFuncionario, ResponsavelController.buscarTodos);
router.delete(
  "/remove/",
  checkFuncionario,
  ResponsavelController.deletarResponsavel
);

module.exports = router;
