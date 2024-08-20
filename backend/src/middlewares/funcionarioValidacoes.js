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
    .isLength({ min: 15 })
    .withMessage("Nome deve ter pelo menos 15 caracteres")
    .escape()
    .toLowerCase(),

  body("idade")
    .trim()
    .notEmpty()
    .withMessage("Idade não pode estar vazia")
    .isInt({ min: 0 })
    .withMessage("Idade deve ser um número inteiro positivo"),

  // body("cpf")
  //   .trim()
  //   .notEmpty()
  //   .withMessage("O CPF não pode estar vazio")
  //   .isLength({ min: 11, max: 11 })
  //   .withMessage("O CPF deve ter 11 dígitos")
  //   .matches(/^\d{11}$/)
  //   .withMessage("O CPF deve conter apenas números")
  //   .custom((value) => {
  //     // Função personalizada para validar o CPF
  //     const cpf = value.replace(/\D/g, ""); // Remove caracteres não numéricos
  //     let sum = 0;
  //     let remainder;

  //     if (cpf == "00000000000") return false;

  //     for (let i = 1; i <= 9; i++)
  //       sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  //     remainder = (sum * 10) % 11;

  //     if (remainder == 10 || remainder == 11) remainder = 0;
  //     if (remainder != parseInt(cpf.substring(9, 10))) return false;

  //     sum = 0;
  //     for (let i = 1; i <= 10; i++)
  //       sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  //     remainder = (sum * 10) % 11;

  //     if (remainder == 10 || remainder == 11) remainder = 0;
  //     if (remainder != parseInt(cpf.substring(10, 11))) return false;

  //     return true;
  //   })
  //   .withMessage("O CPF informado é inválido"),

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
    .withMessage("Telefone não pode estar vazio")
    .isMobilePhone("pt-BR")
    .withMessage("O número de celular deve ser válido"),

  body("cargo")
    .trim()
    .notEmpty()
    .withMessage("O cargo não pode estar vazio")
    .isLength({ min: 5 })
    .withMessage("O cargo deve ter pelo menos 5 caracteres")
    .escape(),

  body("dataNascimento")
    .trim()
    .notEmpty()
    .withMessage("A data de nascimento não pode estar vazia")
    .isDate({ format: "YYYY-MM-DD", delimiters: ["-", "/"] })
    .withMessage(
      "A data de nascimento deve ser uma data válida no formato YYYY-MM-DD"
    ),

  body("qtdCadastroEvento")
    .trim()
    .notEmpty()
    .withMessage("A quantidade de cadastros no evento não pode estar vazia")
    .isInt({ min: 0 })
    .withMessage(
      "A quantidade de cadastros deve ser um número inteiro não negativo"
    ),

  body("voluntario")
    .trim()
    .notEmpty()
    .withMessage("O campo voluntário não pode estar vazio")
    .isIn(["sim", "não"])
    .withMessage("O valor do campo voluntário deve ser 'sim' ou 'não'"),

  body("dataCadastro")
    .trim()
    .notEmpty()
    .withMessage("A data de cadastro não pode estar vazia")
    .isDate({ format: "YYYY-MM-DD", delimiters: ["-", "/"] })
    .withMessage(
      "A data de cadastro deve ser uma data válida no formato YYYY-MM-DD"
    ),

  body("tipoUsuario")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("O campo não pode ser vazio")
    .isIn(["admin", "user"])
    .withMessage("O campo deve ser apenas admin ou user")
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
