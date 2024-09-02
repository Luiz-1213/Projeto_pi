const express = require("express");
const router = express.Router();

// middlewares de validação
const {
  validacoesDeFeedback,
  errosValidados,
} = require("../middlewares/feedbackValidacoes");
// helpers
const verifyToken = require("../helpers/verificarToken");
const checkFuncionario = require("../helpers/checkFunciario");

// controllers
const FeedBackController = require("../controllers/FeedBackController");

// rotas
router.post(
  "/create",
  verifyToken,
  validacoesDeFeedback,
  errosValidados,
  FeedBackController.criarFeedback
);
router.patch(
  "/update",
  verifyToken,
  validacoesDeFeedback,
  errosValidados,
  FeedBackController.editarFeedback
);
router.get("/findone/:id", verifyToken, FeedBackController.buscarPorId);
router.get("/findall", checkFuncionario, FeedBackController.buscarTodos);
router.delete("/remove", verifyToken, FeedBackController.deletarFeedback);

module.exports = router;
