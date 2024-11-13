const express = require("express");
const router = express.Router();

// middlewares de validação
const {
  validacoesDeEvento,
  errosValidados,
} = require("../middlewares/eventoValidacoes");

// helpers
const checkFuncionario = require("../helpers/checkFunciario");

// controllers
const EventoController = require("../controllers/EventoController");

router.post(
  "/create",
  checkFuncionario,
  validacoesDeEvento,
  errosValidados,
  EventoController.criarEvento
);
router.get("/findone/:id", checkFuncionario, EventoController.buscarPorId);
router.get("/findall", checkFuncionario, EventoController.buscarTodos);
router.patch(
  "/edit/:id",
  checkFuncionario,
  validacoesDeEvento,
  errosValidados,
  EventoController.atualizarEvento
);
router.delete("/remove/:id", checkFuncionario, EventoController.deletarEvento);

module.exports = router;
