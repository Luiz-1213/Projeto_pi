
const { body, validationResult } = require("express-validator");


// Verificações de registro de evento
const validacoesDeEvento = [
 body("assunto")
    .trim()
    .notEmpty()
    .withMessage("Digite qual o titulo do evento")
    .isLength({ min: 5, max: 10 })
    .withMessage("O titulo deve ter entre 5 e 10 caracteres"),


 body("descricao")
    .trim()
    .notEmpty()
    .withMessage("A descrição do evento não pode estar vazia")
    .isLength({ min: 10 })
    .withMessage("A descrição do evento deve ter pelo menos 10 caracteres")
    .escape()
    .toLowerCase(),


 body("horario")
    .trim()
    .notEmpty()
    .withMessage("O campo de horário é obrigatório")
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("O horário deve estar no formato HH:MM (24 horas)"),


    body("local")
    .trim()
    .notEmpty()
    .withMessage("O endereço não pode estar vazio")
    .matches(/^[^\d\s,]+,\s*\d+\s*,\s*[^\d\s,]+\s*,\s*[^\d\s,]+\s*,\s*[A-Z]{2}$/)
    .withMessage("O endereço deve estar no formato: Rua, Número, Bairro, Cidade, UF")
    .escape(),

    
    body("funcionarioCadastro")
    .trim()
    .notEmpty()
    .withMessage("Nome não pode estar vazio")
    .isString()
    .isLength({ min: 15 })
    .withMessage("Nome deve ter pelo menos 15 caracteres")
    .escape()
    .toLowerCase(),
];

function errosValidados(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0] });
    }
    next();
  }
  module.exports = {
    validacoesDeEvento,
    errosValidados,
  };

