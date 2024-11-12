const { body, validationResult } = require("express-validator");

// Verificações de registro usuario
const validacoes = [
  body("nome")
    .trim()
    .notEmpty()
    .withMessage("Nome não pode estar vazio")
    .isString()
    .isLength({ min: 5 })
    .withMessage("Nome deve ter pelo menos 5 caracteres")
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
  body("genero")
    .trim()
    .notEmpty()
    .withMessage("O gênero não pode estar vazio")
    .isIn(["Masculino", "Feminino", "Outro"])
    .withMessage(
      "O gênero deve ser um dos seguintes: Masculino, Feminino, Outro"
    )
    .escape(),

  body("autorizacaoTratamento")
    .trim()
    .notEmpty()
    .withMessage("A autorização para tratamento não pode estar vazia")
    .isIn([1, 0])
    .withMessage("A autorização para tratamento deve ser 'Sim' ou 'Não'")
    .escape(),

  body("diagnostico")
    .trim()
    .notEmpty()
    .withMessage("O diagnóstico não pode estar vazio")
    .escape(),

  body("grauTEA")
    .trim()
    .notEmpty()
    .withMessage("O grau de TEA não pode estar vazio")
    .isIn(["Leve", "Moderado", "Grave"])
    .withMessage(
      "O grau de TEA deve ser um dos seguintes: Leve, Moderado, Grave"
    )
    .escape(),

  body("comunicacao")
    .trim()
    .notEmpty()
    .withMessage("Comunicação não pode estar vazio")
    .isString()
    .isLength({ min: 1, max: 50 })
    .withMessage("Comunicação deve ter entre 5 e 50 caracteres")
    .escape(),

  body("observacao")
    .trim()
    .optional()
    .isLength({ min: 5, max: 500 })
    .withMessage("A observação deve ter entre 5 e 500 caracteres")
    .escape(),

  body("idadeDiagnostico")
    .trim()
    .notEmpty()
    .withMessage("A idade no momento do diagnóstico não pode estar vazia")
    .isInt({ min: 0, max: 100 })
    .withMessage("A idade deve ser um número inteiro entre 0 e 100")
    .escape(),

  body("medicacao")
    .trim()
    .notEmpty()
    .withMessage("medicacao não pode estar vazio")
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage("Comunicação deve ter entre 5 e 500 caracteres")
    .escape(),

  body("frequenciaUsoMedicacao")
    .trim()
    .notEmpty()
    .withMessage("A frequência de uso da medicação não pode estar vazia")
    .isString()
    .isLength({ min: 1, max: 500 })
    .withMessage(
      "A frequência de uso da medicação deve ter entre 1 e 500 caracteres"
    )
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
  validacoes,
  errosValidados,
};
