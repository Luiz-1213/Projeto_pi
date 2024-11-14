const PessoaTEA = require("../models/PessoaTea");
const Responsavel = require("../models/Responsavel");

// Helpers

module.exports = class PessoaTEAController {
  // Criar PessoaTEA
  static async criarPessoaTEA(req, res) {
    const {
      nome,
      cpf,
      endereco,
      dataNascimento,
      genero,
      autorizacaoTratamento,
      diagnostico,
      grauTEA,
      comunicacao,
      observacao,
      idadeDiagnostico,
      medicacao,
      frequenciaUsoMedicacao,
      dataCadastro,
      responsavel,
    } = req.body;

    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    // Verificando se o cpf já existe
    const cpfJaExiste = await PessoaTEA.findOne({
      where: { cpf: cpf },
    });
    if (cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    const pessoaTea = {
      nome,
      foto: image,
      cpf,
      endereco,
      dataNascimento,
      genero,
      autorizacaoTratamento,
      diagnostico,
      grauTEA,
      comunicacao,
      observacao,
      idadeDiagnostico,
      medicacao,
      frequenciaUsoMedicacao,
      dataCadastro,
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
    const usuarios = await PessoaTEA.findAll({
      attributes: { exclude: ["createAt", "updatedAt"] },
    });

    if (!usuarios) {
      res.status(200).json({ message: "Não há Usuarios cadastrados" });
    }
    return res.status(200).json({ usuarios });
  }
  // Buscar por ID
  static async buscarPorId(req, res) {
    const id = req.params.id;

    const usuario = await PessoaTEA.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ message: "Usuario não encontrada!" });
    }

    const responsavel = await Responsavel.findByPk(usuario.responsavel, {
      attributes: ["id", "nome", "endereco", "telefone", "contatoEmergencia"],
    });

    if (!responsavel) {
      return res.status(404).json({ message: "Erro ao encontrar usuário!" });
    }

    return res.status(200).json({ usuario, responsavel });
  }

  // Atualizar Pessoa TEA
  static async atualizarPessoaTEA(req, res) {
    const id = req.params.id;
    const {
      nome,
      cpf,
      endereco,
      dataNascimento,
      genero,
      autorizacaoTratamento,
      diagnostico,
      grauTEA,
      comunicacao,
      observacao,
      idadeDiagnostico,
      medicacao,
      frequenciaUsoMedicacao,
      dataCadastro,
      responsavel,
    } = req.body;

    let foto = null;

    if (req.file) {
      foto = req.file.filename;
    }

    // Verificar se a Pessoa TEA existe
    const usuarioExiste = await PessoaTEA.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    // Verificar se o cpf já está cadastrado
    const cpfJaExiste = await PessoaTEA.findOne({
      where: { cpf: cpf },
    });
    if (usuarioExiste.cpf !== cpf && cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    // Criando objeto funcionario de update
    const pessoaTea = {
      nome,
      cpf,
      endereco,
      dataNascimento,
      genero,
      autorizacaoTratamento,
      diagnostico,
      grauTEA,
      comunicacao,
      observacao,
      idadeDiagnostico,
      medicacao,
      frequenciaUsoMedicacao,
      dataCadastro,
      responsavel,
    };

    if (foto !== null) {
      pessoaTea.foto = foto;
    }

    PessoaTEA.update(pessoaTea, {
      where: { id: id },
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

  //ativar | inativar PessoaTEA
  static async alternarPessoaTEA(req, res) {
    const id = req.params.id;
    // Verificar se o usuario existe
    const usuarioExiste = await PessoaTEA.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    // Alternar o valor do campo "ativo" (usando operador ternário)
    const novoValorAtivo = usuarioExiste.ativo === 1 ? 0 : 1;

    // Atualizar o campo "ativo" no banco de dados
    await PessoaTEA.update({ ativo: novoValorAtivo }, { where: { id: id } })
      .then(() => {
        const status = novoValorAtivo === 1 ? "ativado" : "desativado";
        res.status(200).json({
          message: `Usuário ${status} com sucesso!`,
        });
      })
      .catch((error) => {
        res.status(500).json({
          message:
            "Houve um erro ao atualizar o status do usuário, tente novamente mais tarde",
          error: error,
        });
      });
  }
};
