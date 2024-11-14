const Responsavel = require("../models/Responsavel");
const PessoaTea = require("../models/PessoaTea");
const bcrypt = require("bcrypt");

module.exports = class ResponsavelController {
  // ------------------------ criar responsável
  static async criarResponsavel(req, res) {
    const {
      email,
      senha,
      nome,
      cpf,
      endereco,
      genero,
      telefone,
      observacao,
      horarioDisponivel,
      dataNascimento,
      contatoEmergencia,
    } = req.body;

    // Verificando se o email já existe
    const emailJaExiste = await Responsavel.findOne({
      where: { email: email },
    });

    if (emailJaExiste) {
      return res
        .status(400)
        .json({ message: "Email já está em uso, informe outro!" });
    }

    const cpfJaExiste = await Responsavel.findOne({
      where: { cpf: cpf },
    });

    if (cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    // Criando senha forte
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);

    let image = "";

    if (req.file) {
      image = req.file.filename;
    }

    const responsavel = {
      email,
      foto: image,
      senha: senhaHash,
      nome,
      cpf,
      endereco,
      genero,
      telefone,
      observacao,
      horarioDisponivel,
      dataNascimento,
      contatoEmergencia,
      tipoUsuario: "responsavel",
    };

    Responsavel.create(responsavel)
      .then(() => {
        res.status(200).json({ message: "Responsável cadastrado com sucesso" });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }

  // ------------------------ buscar todos
  static async buscarTodos(req, res) {
    const responsaveis = await Responsavel.findAll({
      attributes: { exclude: ["senha", "createAt", "updatedAt"] },
    });

    if (!responsaveis) {
      res.status(200).json({ message: "Não há usuario cadastrados" });
    }
    res.status(200).json({ responsaveis });
  }
  // ------------------------ buscar um
  static async getResponsavelComPessoasTEA(req, res) {
    const id = req.params.id;

    try {
      const responsavel = await Responsavel.findByPk(id, {
        include: [
          {
            model: PessoaTea,
            as: "PessoaTEA",
            attributes: ["id", "nome", "foto", "dataNascimento", "diagnostico"],
          },
        ],
        attributes: { exclude: ["senha", "updatedAt", "createdAt"] },
      });

      if (!responsavel) {
        return res.status(400).json({ message: "Usuário não encontrado!" });
      }

      res.status(200).json(responsavel);
    } catch (error) {
      res.status(500).json({ error: error });

      console.error("Erro ao buscar responsáveis com suas pessoas TEA:", error);
    }
  }

  // ------------------------ buscar um
  static async buscarPorId(req, res) {
    const id = req.params.id;

    const responsavel = await Responsavel.findByPk(id, {
      attributes: { exclude: ["senha", "updatedAt", "createdAt"] },
    });

    if (!responsavel) {
      return res.status(400).json({ message: "Usuário não encontrado!" });
    }

    res.status(200).json(responsavel);
  }

  // ------------------------ atualizar
  static async atualizarResponsavel(req, res) {
    const id = req.params.id;
    const {
      email,
      nome,
      cpf,
      endereco,
      genero,
      telefone,
      observacao,
      horarioDisponivel,
      dataNascimento,
      contatoEmergencia,
    } = req.body;

    // Verificar se o usuario existe
    const usuarioExiste = await Responsavel.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    // Verificando se o email já existe
    const emailJaExiste = await Responsavel.findOne({
      where: { email: email },
    });
    if (usuarioExiste.email !== email && emailJaExiste) {
      return res
        .status(400)
        .json({ message: "Email já está em uso, informe outro!" });
    }

    // Verificar se o cpf já está cadastrado
    const cpfJaExiste = await Responsavel.findOne({
      where: { cpf: cpf },
    });
    if (usuarioExiste.cpf !== cpf && cpfJaExiste) {
      return res.status(400).json({ message: "O CPF já está cadastrado!" });
    }

    let foto = null;

    if (req.file) {
      foto = req.file.filename;
    }

    // Criando objeto responsável de update
    const responsavel = {
      email,
      nome,
      cpf,
      endereco,
      genero,
      telefone,
      observacao,
      horarioDisponivel,
      dataNascimento,
      contatoEmergencia,
      tipoUsuario: "responsavel",
    };

    if (foto !== null) {
      responsavel.foto = foto;
    }

    Responsavel.update(responsavel, {
      where: { id: id },
    })
      .then(() => {
        res.status(200).json({
          message: "Responsável atualizado com sucesso!",
        });
      })
      .catch((error) => {
        res.status(500).json({ error: error });
      });
  }
  // ------------------------ inativar| ativar responsável
  // ------------------------ ativar responsável
  static async alternarResponsavel(req, res) {
    const id = req.params.id;
    // Verificar se o usuario existe
    const usuarioExiste = await Responsavel.findByPk(id);
    if (!usuarioExiste) {
      return res.status(404).json({ message: "Usuario não existe!" });
    }

    // Alternar o valor do campo "ativo" (usando operador ternário)
    const novoValorAtivo = usuarioExiste.ativo === 1 ? 0 : 1;

    // Atualizar o campo "ativo" no banco de dados
    await Responsavel.update({ ativo: novoValorAtivo }, { where: { id: id } })
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
