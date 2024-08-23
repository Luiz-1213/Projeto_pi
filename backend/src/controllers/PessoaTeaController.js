const PessoaTEA = require("../models/PessoaTea");

// Helpers

module.exports = class PessoaTEAController {
  // Criar PessoaTEA
  static async criarPessoaTEA(req, res) {
    const {
      nome,
      foto,
      idade,
      cpf,
      endereco,
      informacaoMedica,
      genero,
      telefoneResponsavel,
      autorizacaoTratamento,
      diagnostico,
      grauTEA,
      contatoEmergencia,
      comunicacao,
      observacao,
      idadeDiagnostico,
      medicacao,
      frequenciaUsoMedicacao,
      presenca,
      dataCadastro,
      pontuacaoProgressoInicial,
      pontuacaoProgressoAtual,
      tipoUsuario,
      responsavel,
    } = req.body;

    // Verificando se o cpf já existe
    const cpfJaExiste = await PessoaTEA.findOne({
      where: { cpf: cpf },
    });
    if (cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    const pessoaTea = {
      nome,
      foto,
      idade,
      cpf,
      endereco,
      informacaoMedica,
      genero,
      telefoneResponsavel,
      autorizacaoTratamento,
      diagnostico,
      grauTEA,
      contatoEmergencia,
      comunicacao,
      observacao,
      idadeDiagnostico,
      medicacao,
      frequenciaUsoMedicacao,
      presenca,
      dataCadastro,
      pontuacaoProgressoInicial,
      pontuacaoProgressoAtual,
      tipoUsuario,
      responsavel,
    };

    PessoaTEA.create(pessoaTea)
      .then(() => {
        res.status(200).json({ message: "Usuario foi cadastrado com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }

  // Buscar todas as PessoasTEA
  static async buscarTodos(req, res) {
    const usuarios = await PessoaTEA.findAll({});

    if (!usuarios) {
      res.status(200).json({ message: "Não há Usuarios cadastrados" });
    }
    res.status(200).json({ usuarios });
  }
  // Buscar por ID
  static async buscarPorId(req, res) {
    const id = req.params.id;

    const usuario = await PessoaTEA.findByPk(id);

    if (!usuario) {
      return res.status(400).json({ message: "Usuario não encontrada!" });
    }

    res.status(200).json({ usuario });
  }

  // Atualizar Pessoa TEA
  static async atualizarPessoaTEA(req, res) {
    const {
      idPessoaTea,
      nome,
      foto,
      idade,
      cpf,
      endereco,
      informacaoMedica,
      genero,
      telefoneResponsavel,
      autorizacaoTratamento,
      diagnostico,
      grauTEA,
      contatoEmergencia,
      comunicacao,
      observacao,
      idadeDiagnostico,
      medicacao,
      frequenciaUsoMedicacao,
      presenca,
      dataCadastro,
      pontuacaoProgressoInicial,
      pontuacaoProgressoAtual,
      tipoUsuario,
      responsavel,
    } = req.body;

    // Verificar se a Pessoa TEA existe
    const usuarioExiste = await PessoaTEA.findByPk(idPessoaTea);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    // Criando objeto funcionario de update
    const pessoaTea = {
      nome,
      foto,
      idade,
      cpf,
      endereco,
      informacaoMedica,
      genero,
      telefoneResponsavel,
      autorizacaoTratamento,
      diagnostico,
      grauTEA,
      contatoEmergencia,
      comunicacao,
      observacao,
      idadeDiagnostico,
      medicacao,
      frequenciaUsoMedicacao,
      presenca,
      dataCadastro,
      pontuacaoProgressoInicial,
      pontuacaoProgressoAtual,
      tipoUsuario,
      responsavel,
    };

    PessoaTEA.update(pessoaTea, {
      where: { idPessoaTea: idPessoaTea },
    })
      .then(() => {
        res.status(200).json({
          message: "Pessoa TEA atualizado com sucesso!",
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }

  // Deletar PessoaTEA
  static async deletarPessoaTEA(req, res) {
    // const verificarSeAdmim = checkAdmin(token)
    const { id } = req.body;

    // Verificar se o usuario existe
    const usuarioExiste = await PessoaTEA.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    await PessoaTEA.destroy({ where: { idPessoaTea: id } })
      .then(() => {
        res.status(200).json({ message: "Usuário removido com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Houve um erro ao deletar o usuário, tente novamente mas tarde",
        });
      });
  }
};
