const express = require("express");
const router = express.Router();

// middlewares de validação

// helpers
const checkFuncionario = require("../helpers/checkFunciario");

// controllers
const EventoController = require("../controllers/EventoController");

router.post("/create", checkFuncionario, EventoController.criarEvento);

// router.post(
//   "/login",
//   validacaoDelogin,
//   errosValidados,
//   FuncionarioController.login
// );

// router.patch(
//   "/update",
//   checkAdmin,
//   validacoesDeFuncionario,
//   errosValidados,
//   FuncionarioController.atualizarFuncionario
// );
// router.get("/findone/:id", checkAdmin, FuncionarioController.buscarPorId);
// router.get("/findall", checkAdmin, FuncionarioController.buscarTodos);
// router.delete("/remove", checkAdmin, FuncionarioController.deletarFuncionario);

module.exports = router;
