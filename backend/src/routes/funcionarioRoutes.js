const express = require("express")
const router = express.Router()

const {
  loginValidations,
  validateFields,
} = require("../middlewares/funcionarioValidacoes");

// controllers
const FuncionarioController = require("../controllers/FuncionarioContreller")

router.post("/create", loginValidations, validateFields,  FuncionarioController.criarFuncionario)

module.exports = router