const express = require("express");
const router = express.Router();

// middlewares de validação
const {
  validacoesDeFuncionario,
  validacoesDeEdicaoDeFuncionario,
  errosValidados,
} = require("../middlewares/funcionarioValidacoes");

// helpers
const checkAdmin = require("../helpers/checkAdmin");
const { imageUpload } = require("../helpers/imageUpload");

// controllers
const FuncionarioController = require("../controllers/FuncionarioController");

router.post(
  "/create",
  checkAdmin,
  imageUpload.single("foto"),
  validacoesDeFuncionario,
  errosValidados,
  FuncionarioController.criarFuncionario
);

router.patch(
  "/update/:id",
  checkAdmin,
  imageUpload.single("foto"),
  validacoesDeEdicaoDeFuncionario,
  errosValidados,
  FuncionarioController.atualizarFuncionario
);
router.get("/findone/:id", checkAdmin, FuncionarioController.buscarPorId);
router.get("/findall", checkAdmin, FuncionarioController.buscarTodos);
router.delete(
  "/remove/:id",
  checkAdmin,
  FuncionarioController.deletarFuncionario
);

module.exports = router;
