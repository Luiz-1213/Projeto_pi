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
const { imageUpload } = require("../helpers/imageUpload");

// controllers
const FuncionarioController = require("../controllers/FuncionarioController");

router.post(
  "/create",
  checkAdmin,
  imageUpload.single("image"),
  validacoesDeFuncionario,
  errosValidados,
  FuncionarioController.criarFuncionario
);

router.post(
  "/login",
  validacaoDelogin,
  errosValidados,
  FuncionarioController.login
);

router.patch(
  "/update",
  checkAdmin,
  imageUpload.single("image"),
  validacoesDeFuncionario,
  errosValidados,
  FuncionarioController.atualizarFuncionario
);
router.get("/findone/:id", checkAdmin, FuncionarioController.buscarPorId);
router.get("/findall", checkAdmin, FuncionarioController.buscarTodos);
router.delete("/remove", checkAdmin, FuncionarioController.deletarFuncionario);

module.exports = router;
