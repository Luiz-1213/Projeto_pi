const express = require("express");
const router = express.Router();

// middlewares de validação
const {
  validacoesDeResponsavel,
  validacoesDeEdicaoDeResponsavel,
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
  imageUpload.single("foto"),
  validacoesDeResponsavel,
  errosValidados,

  ResponsavelController.criarResponsavel
);

router.patch(
  "/update/:id",
  checkFuncionario,
  imageUpload.single("foto"),
  validacoesDeEdicaoDeResponsavel,
  errosValidados,
  ResponsavelController.atualizarResponsavel
);
router.get("/findone/:id", checkFuncionario, ResponsavelController.buscarPorId);
router.get(
  "/finddependent/:id",
  checkFuncionario,
  ResponsavelController.getResponsavelComPessoasTEA
);
router.get("/findall", checkFuncionario, ResponsavelController.buscarTodos);
router.delete(
  "/remove/:id",
  checkFuncionario,
  ResponsavelController.deletarResponsavel
);

module.exports = router;
