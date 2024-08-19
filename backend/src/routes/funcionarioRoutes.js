const express = require("express");
const router = express.Router();

const {
  validacoesDeFuncionario,
  errosValidados,
} = require("../middlewares/funcionarioValidacoes");

// controllers
const FuncionarioController = require("../controllers/FuncionarioContreller");

router.post(
  "/create",
  validacoesDeFuncionario,
  errosValidados,
  FuncionarioController.criarFuncionario
);
router.patch(
  "/update",
  validacoesDeFuncionario,
  errosValidados,
  FuncionarioController.atualizarFuncionario
);
router.get("/findone/:id", FuncionarioController.buscarPorId);
router.get("/findall", FuncionarioController.buscarTodos);
router.delete("/remove", FuncionarioController.deletarFuncionario);

module.exports = router;
