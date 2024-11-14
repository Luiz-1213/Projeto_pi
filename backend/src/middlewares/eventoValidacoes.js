const { body, validationResult } = require("express-validator");

// Verificações de registro de evento
const validacoesDeEvento = [
  body("assunto")
    .trim()
    .notEmpty()
    .withMessage("Digite qual o título do evento")
    .isLength({ min: 5, max: 25 })
    .withMessage("O título deve ter entre 5 e 25 caracteres")
    .customSanitizer((value) => {
      if (value) {
        return value
          .toLowerCase() // Converte todo o texto para minúsculas
          .split(" ") // Divide o texto em palavras
          .map((word) => {
            // Capitaliza a primeira letra de cada palavra e mantém o restante minúsculo
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" "); // Junta as palavras novamente
      }
      return value;
    }),

  body("horario")
    .trim()
    .notEmpty()
    .withMessage("O campo de horário é obrigatório")
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("O horário deve estar no formato HH:MM (24 horas)"),

  body("dataEvento")
    .trim()
    .notEmpty()
    .withMessage("A data de nascimento não pode estar vazia")
    .isDate({ format: "YYYY-MM-DD", delimiters: ["-", "/"] })
    .withMessage("A data deve ser válida no formato DD-MM-YYYY"),

  body("descricao")
    .trim()
    .notEmpty()
    .withMessage("A descrição do evento não pode estar vazia")
    .isLength({ min: 10 })
    .withMessage("A descrição do evento deve ter pelo menos 10 caracteres")
    .escape()
    .toLowerCase(),

  body("local")
    .trim()
    .notEmpty()
    .withMessage("O endereço não pode estar vazio")
    .escape()
    .customSanitizer((value) => {
      if (value) {
        return value
          .toLowerCase() // Converte todo o texto para minúsculas
          .split(" ") // Divide o texto em palavras
          .map((word) => {
            // Capitaliza a primeira letra de cada palavra e mantém o restante minúsculo
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" "); // Junta as palavras novamente
      }
      return value;
    }),

  body("responsaveis")
    .trim()
    .notEmpty()
    .withMessage("O evento deve marcar ao menos 1 responsável")
    .isInt()
    .escape(),
];

function errosValidados(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }
  next();
}
module.exports = {
  validacoesDeEvento,
  errosValidados,
};
