const { body, validationResult } = require("express-validator");

// Verificações de registro usuario
const validations = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nome não pode estar vazio")
    .isString()
    .isLength({ min: 15 })
    .withMessage("Nome deve ter pelo menos 15 caracteres")
    .escape()
    .toLowerCase(),

    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email não pode estar vazio")
    .isEmail()
    .withMessage("Email deve ser válido")
    .isLength({max: 255})
    .withMessage("O email não pode exceder 255 caracteres")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Telefone não pode estar vazio")
    .isMobilePhone()
    .withMessage("O número de celular deve ser valido"),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("O campo senha é obrigatório")
    .isLength({ min: 8, max: 30 })
    .withMessage("A senha deve ter entre 8 e 30 caracteres")
    .escape(),

  body("confirmpassword")
    .trim()
    .notEmpty()
    .withMessage("O campo confirmação de senha é obrigatório")
    .isLength({ min: 8, max: 30 })
    .withMessage("As senhas não são iguais")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("A senha e a confirmação devem ser iguais!");
      }
      return true;
    })
    .escape(),

  body("userType")
    .trim()
    .notEmpty()
    .withMessage("O campo não pode ser vazio")
    .isIn(["admin", "user"])
    .withMessage("O campo deve ser apenas admin ou user")
    .escape(),
];
// Verificações de login de usuario
const loginValidations = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email não pode estar vazio")
    .isEmail()
    .withMessage("Email deve ser válido")
    .normalizeEmail(),
];

const updated = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nome não pode estar vazio")
    .isString()
    .isLength({ min: 15 })
    .withMessage("Nome deve ter pelo menos 15 caracteres")
    .escape()
    .toLowerCase(),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email não pode estar vazio")
    .isEmail()
    .withMessage("Email deve ser válido")
    .normalizeEmail(),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Telefone não pode estar vazio")
    .isMobilePhone()
    .withMessage("O número de celular deve ser valido"),
];

// Verificações de atualização de senha usuario
const passValidator = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("O campo senha é obrigatório")
    .isLength({ min: 8, max: 30 })
    .withMessage("A senha deve ter entre 8 e 30 caracteres")
    .escape(),

  body("confirmpassword")
    .trim()
    .notEmpty()
    .withMessage("O campo confirmação de senha é obrigatório")
    .isLength({ min: 8, max: 30 })
    .withMessage("As senhas não são iguais")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("A senha e a confirmação devem ser iguais!");
      }
      return true;
    })
    .escape(),
];

// Verificações de favoritos do usuario
const validateFavorite = [
  body("favorite")
    .trim()
    .notEmpty()
    .withMessage("O campo favorito é obrigatório")
    .isMongoId()
    .withMessage("ID inválido"),
];

function validateFields(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array()[0] });
  }
  next();
}
module.exports = {
  validateFavorite,
  loginValidations,
  updated,
  passValidator,
  validations,
  validateFields,
};
