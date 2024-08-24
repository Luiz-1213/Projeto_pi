const { body, validationResult } = require("express-validator");

// Verificações de registro usuario
const validacoesDeResponsavel= [
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

 body("cpf")
    .trim()
    .notEmpty()
    .withMessage("O CPF não pode estar vazio")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    .withMessage("O CPF deve estar no formato XXX.XXX.XXX-XX")
    .custom(value => {
        // Remove caracteres não numéricos
        const cleanedValue = value.replace(/\D/g, '');
        
        // Verifica se o CPF tem 11 dígitos
        if (cleanedValue.length !== 11) {
            throw new Error('O CPF deve conter 11 dígitos');
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

            const cpfDigits = cpf.split('').map(Number);
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

 body("genero")
    .trim()
    .notEmpty()
    .withMessage("O gênero não pode estar vazio")
    .isIn(["Masculino", "Feminino", "Não-Binário", "Outro"]) 
    .withMessage("O gênero deve ser um dos seguintes: Masculino, Feminino, Não-Binário, Outro")
    .escape(),

 body("parentesco")
    .trim()
    .notEmpty()
    .withMessage("O parentesco não pode estar vazio")
    .isIn(["Pai", "Mãe", "Irmão", "Irmã", "Cônjuge", "Tio", "Tia", "Avô", "Avó", "Outro"]) 
    .withMessage("O parentesco deve ser um dos seguintes: Pai, Mãe, Irmão, Irmã, Cônjuge, Tio, Tia, Avô, Avó, Outro")
    .escape(),

 body("telefone")
    .trim()
    .notEmpty()
    .withMessage("Telefone não pode estar vazio")
    .isMobilePhone("pt-BR")
    .withMessage("O número de celular deve ser válido"),

 body("autorizacaoTratamento")
 .trim()
 .notEmpty()
 .withMessage("A autorização para tratamento não pode estar vazia")
 .isIn(["Sim", "Não"]) 
 .withMessage("A autorização para tratamento deve ser 'Sim' ou 'Não'")
 .escape(),


 body("observacao") 
    .trim()
    .optional() // Permite que o campo seja opcional
    .isLength({ min: 5, max: 500 }) 
    .withMessage("A observação deve ter entre 5 e 500 caracteres")
    .escape(),


 body("horarioDisponivel")
    .trim()
    .notEmpty()
    .withMessage("O horário disponível não pode estar vazio")
    .matches(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .withMessage("O horário disponível deve estar no formato HH:MM (24 horas)")
    .escape(),


 body("dataNascimento")
    .trim()
    .notEmpty()
    .withMessage("A data de nascimento não pode estar vazia")
    .isDate({ format: "YYYY-MM-DD", delimiters: ["-", "/"] })
    .withMessage(
      "A data de nascimento deve ser uma data válida no formato YYYY-MM-DD"
    ),

 body("contatoEmergencia") 
    .trim()
    .notEmpty()
    .withMessage("O contato de emergência não pode estar vazio")
    .matches(/^\+55 \(\d{2}\) \d{5}-\d{4}$/) 
    .isMobilePhone("pt-BR")
    .withMessage("O contato de emergência deve estar no formato +55 (XX) XXXXX-XXXX")
    .escape(),

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
  validacoesDeResponsavel,
  validacaoDelogin,
  errosValidados,
};