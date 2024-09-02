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

  body("informacaoMedica")
    .trim()
    .notEmpty()
    .withMessage("A informação médica não pode estar vazio")
    .isLength({ min: 10, max: 1000 })
    .withMessage("A informação médica deve ter entre 10 e 1000 caracteres")
    .escape(),

  body("genero")
    .trim()
    .notEmpty()
    .withMessage("O gênero não pode estar vazio")
    .isIn(["Masculino", "Feminino", "Não-Binário", "Outro"])
    .withMessage(
      "O gênero deve ser um dos seguintes: Masculino, Feminino, Não-Binário, Outro"
    )
    .escape(),

  body("telefoneResponsavel")
    .trim()
    .notEmpty()
    .withMessage("O contato de emergência não pode estar vazio")
    .matches(/\(\d{2}\) \d{5}-\d{4}$/)
    .isMobilePhone("pt-BR")
    .withMessage(
      "O contato de emergência deve estar no formato (XX) XXXXX-XXXX"
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
    .toLowerCase()
    .withMessage("O grau de TEA não pode estar vazio")
    .isIn(["leve", "moderado", "grave"])
    .withMessage(
      "O grau de TEA deve ser um dos seguintes: Leve, Moderado, Grave"
    )
    .escape(),

  body("contatoEmergencia")
    .trim()
    .notEmpty()
    .withMessage("O contato de emergência não pode estar vazio")
    .matches(/\(\d{2}\) \d{5}-\d{4}$/)
    .isMobilePhone("pt-BR")
    .withMessage(
      "O contato de emergência deve estar no formato (XX) XXXXX-XXXX"
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

  body("pontuacaoProgressoInicial")
    .trim()
    .notEmpty()
    .withMessage("A pontuação do progresso inicial não pode estar vazia")
    .isInt({ min: 0, max: 100 })
    .withMessage(
      "A pontuação do progresso inicial deve ser um valor entre 0 e 100"
    )
    .escape(),

  body("pontuacaoProgressoAtual")
    .trim()
    .notEmpty()
    .withMessage("A pontuação do progresso atual não pode estar vazia")
    .isInt({ min: 0, max: 100 })
    .withMessage(
      "A pontuação do progresso atual deve ser um valor entre 0 e 100"
    )
    .escape(),

  body("tipoUsuario")
    .trim()
    .toLowerCase()
    .notEmpty()
    .withMessage("O campo não pode ser vazio")
    .toLowerCase()
    .isIn(["administrador", "funcionario", "responsavel", "pessoatea"])
    .withMessage("O campo deve ser estar dentro de Responsável ou PessoaTea")
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
  validacoes,
  errosValidados,
};
