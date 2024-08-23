const express = require("express");
const router = express.Router();

// middlewares de validação

// helpers

// controllers
const PessoaTEAController = require("../controllers/PessoaTeaController");

router.post("/create", PessoaTEAController.criarPessoaTEA);
router.patch("/update/", PessoaTEAController.atualizarPessoaTEA);
router.get("/findone/:id", PessoaTEAController.buscarPorId);
router.get("/findall", PessoaTEAController.buscarTodos);
router.delete("/remove/", PessoaTEAController.deletarPessoaTEA);

module.exports = router;
