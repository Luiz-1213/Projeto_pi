const express = require("express");
const router = express.Router();

// middlewares de validação
// helpers
const verifyToken = require("../helpers/verificarToken");

// controllers
const FeedBackController = require("../controllers/FeedBackController");
const checkFuncionario = require("../helpers/checkFunciario");

// rotas
router.post("/create", verifyToken, FeedBackController.criarFeedback);
router.patch("/update", verifyToken, FeedBackController.editarFeedback);
router.get("/findone/:id", verifyToken, FeedBackController.buscarPorId);
router.get("/findall", checkFuncionario, FeedBackController.buscarTodos);
router.delete("/remove", verifyToken, FeedBackController.deletarFeedback);

module.exports = router;
