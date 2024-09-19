const { body, validationResult } = require("express-validator");

// Verificações de registro de evento
const validacoesDeFeedback = [
  body("assuntoFeedback")
    .trim()
    .notEmpty()
    .withMessage("Digite qual o título do evento")
    .isLength({ min: 5, max: 25 })
    .withMessage("O título deve ter entre 5 e 25 caracteres"),

  body("descricaoFeedback")
    .trim()
    .notEmpty()
    .withMessage("A descrição do evento não pode estar vazia")
    .isLength({ min: 10 })
    .withMessage("A descrição do evento deve ter pelo menos 10 caracteres")
    .escape()
    .toLowerCase(),

  body("satisfacao")
    .trim()
    .notEmpty()
    .withMessage("O campo satisfação não pode ser vazio")
    .isFloat()
    .withMessage("A avaliação deve ser um número de 0 a 5")
    .escape(),
];

function errosValidados(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }
  next();
}
module.exports = {
  validacoesDeFeedback,
  errosValidados,
};