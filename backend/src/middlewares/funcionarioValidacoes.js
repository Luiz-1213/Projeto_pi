const { body, validationResult } = require("express-validator");

// Verificações de registro usuario
const validacoesDeFuncionario = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email não pode estar vazio")
    .isEmail()
    .withMessage("Email deve ser válido ")
    .normalizeEmail(),

  body("nome")
    .trim()
    .notEmpty()
    .withMessage("Nome não pode estar vazio")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Nome deve ter pelo menos 5 caracteres")
    .escape()
    .toLowerCase(),

  body("idade")
    .trim()
    .notEmpty()
    .withMessage("Idade não pode estar vazia")
    .isInt({ min: 0 })
    .withMessage("Idade deve ser um número inteiro positivo"),

  body("cpf")
    .trim()
    .notEmpty()
    .withMessage("O CPF não pode estar vazio")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .withMessage("O CPF deve estar no formato XXX.XXX.XXX-XX")
    .custom((value) => {
      // Remove caracteres não numéricos
      const cleanedValue = value.replace(/\D/g, "");

      // Verifica se o CPF tem 11 dígitos
      if (cleanedValue.length !== 11) {
        throw new Error("O CPF deve conter 11 dígitos");
      }

      // Função de validação do CPF
      const isValidCPF = (cpf) => {
        // Função para verificar CPF
        const checkDigit = (cpf, factor) => {
          let sum = 0;
          for (let i = 0; i < factor; i++) {
            sum += cpf[i] * (factor + 1 - i);
          }
          const remainder = (sum * 10) % 11;
          return remainder === 10 ? 0 : remainder;
        };

        const cpfDigits = cpf.split("").map(Number);
        const firstDigit = checkDigit(cpfDigits, 9);
        const secondDigit = checkDigit(cpfDigits.concat(firstDigit), 10);

        return cpfDigits[9] === firstDigit && cpfDigits[10] === secondDigit;
      };

      return isValidCPF(cleanedValue);
    })
    .withMessage("O CPF informado é inválido")
    .escape(),

  body("endereco")
    .trim()
    .notEmpty()
    .withMessage("O endereço não pode estar vazio")
    .isLength({ min: 10 })
    .withMessage("O endereço deve ter pelo menos 10 caracteres")
    .escape(),

  body("telefone")
    .trim()
    .notEmpty()
    .withMessage("O contato de emergência não pode estar vazio")
    .matches(/\(\d{2}\) \d{5}-\d{4}$/)
    .isMobilePhone("pt-BR")
    .withMessage(
      "O telefone deve estar no formato (XX) XXXXX-XXXX"
    )
    .escape(),

  body("cargo")
    .trim()
    .notEmpty()
    .withMessage("O cargo não pode estar vazio")
    .isLength({ min: 5 })
    .withMessage("O cargo deve ter pelo menos 5 caracteres")
    .escape(),

  body("voluntario")
    .trim()
    .notEmpty()
    .withMessage("O campo voluntário não pode estar vazio")
    .isIn([1, 0])
    .withMessage("O valor do campo voluntário deve ser 'sim' ou 'não'"),

  body("dataNascimento")
    .trim()
    .notEmpty()
    .withMessage("A data de nascimento não pode estar vazia")
    .isDate("DD-MM-YYYY")
    .withMessage("O valor da data deve ser DD-MM-YYYY"),

  body("tipoUsuario")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("O campo não pode ser vazio")
    .isIn(["administrador", "funcionario"])
    .withMessage("O campo deve ser apenas administrador ou funionario")
    .escape(),

  body("senha")
    .trim()
    .notEmpty()
    .withMessage("O campo senha é obrigatório")
    .isLength({ min: 8, max: 30 })
    .withMessage("A senha deve ter entre 8 e 30 caracteres")
    .escape(),

  body("confirmasenha")
    .trim()
    .notEmpty()
    .withMessage("O campo confirmação de senha é obrigatório")
    .isLength({ min: 8, max: 30 })
    .withMessage("As senhas não são iguais")
    .custom((value, { req }) => {
      if (value !== req.body.senha) {
        throw new Error("A senha e a confirmação devem ser iguais!");
      }
      return true;
    })
    .escape(),
];

// Verificações de login de usuario
const validacaoDelogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email não pode estar vazio")
    .isEmail()
    .withMessage("Email deve ser válido")
    .normalizeEmail(),

  body("senha")
    .trim()
    .notEmpty()
    .withMessage("O campo senha é obrigatório")
    .isLength({ min: 8, max: 30 })
    .withMessage("A senha deve ter entre 8 e 30 caracteres")
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
  validacoesDeFuncionario,
  validacaoDelogin,
  errosValidados,
};
