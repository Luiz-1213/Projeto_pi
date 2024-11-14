const express = require("express");
const router = express.Router();

// middlewares de validação
const {
  validacoes,
  errosValidados,
} = require("../middlewares/pessoaTeaValidacoes");

// helpers
const checkFuncionario = require("../helpers/checkFunciario");
const { imageUpload } = require("../helpers/imageUpload");

// controllers
const PessoaTEAController = require("../controllers/PessoaTeaController");

router.post(
  "/create",
  checkFuncionario,
  imageUpload.single("foto"),
  validacoes,
  errosValidados,
  PessoaTEAController.criarPessoaTEA
);
router.patch(
  "/update/:id",
  imageUpload.single("foto"),
  checkFuncionario,
  validacoes,
  errosValidados,
  PessoaTEAController.atualizarPessoaTEA
);
router.get("/findone/:id", checkFuncionario, PessoaTEAController.buscarPorId);
router.get("/findall", checkFuncionario, PessoaTEAController.buscarTodos);
router.patch(
  "/toggle/:id",
  checkFuncionario,
  PessoaTEAController.alternarPessoaTEA
);

module.exports = router;
