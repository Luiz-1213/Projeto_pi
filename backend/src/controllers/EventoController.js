const Evento = require("../models/Evento");
const Responsavel = require("../models/Responsavel");
const jwt = require("jsonwebtoken");
// helpers
const pegarToken = require("../helpers/pegarToken");

module.exports = class EventoController {
  static async criarEvento(req, res) {
    const { assunto, descricao, horario, local, dataEvento, responsaveis } =
      req.body;

    const token = await pegarToken(req);
    const decodificado = jwt.verify(token, process.env.SECRET_JWT);

    try {
      const novoEvento = await Evento.create({
        assunto,
        horario,
        dataEvento,
        descricao,
        local,
        funcionarioCadastro: decodificado.id,
      });

      if (responsaveis && responsaveis.length > 0) {
        await novoEvento.addResponsaveis(responsaveis);
      }

      return res.status(200).json({ message: "Evento adicionado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(500).json({ message: "Erro ao criar evento" });
    }
  }

  // Buscar todos os eventos
  static async buscarTodos(req, res) {
    const eventos = await Evento.findAll();

    if (!eventos) {
      return res.status(200).json({ message: "Não há eventos cadastrados" });
    }
    return res.status(200).json({ eventos });
  }

  // Buscar por um evento
  static async buscarPorId(req, res) {
    const id = req.params.id;

    const eventos = await Evento.findOne({
      where: { idEvento: id },
      include: [
        {
          model: Responsavel,
          as: "Responsaveis",
          attributes: ["id"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!eventos) {
      return res.status(400).json({ message: "Evento não encontrado!" });
    }
    return res.status(200).json({ eventos });
  }

  // Atualizando evento
  static async atualizarEvento(req, res) {
    const id = req.params.id;
    const { assunto, descricao, horario, local, dataEvento, responsaveis } =
      req.body;

    // Verificar se o Evento existe
    const evento = await Evento.findByPk(id);
    if (!evento) {
      return res.status(404).json({ message: "evento não existe!" });
    }

    const token = await pegarToken(req);
    const decodificado = jwt.verify(token, process.env.SECRET_JWT);

    try {
      await Evento.update(
        {
          assunto,
          descricao,
          dataEvento,
          horario,
          local,
          funcionarioCadastro: decodificado.id,
        },
        {
          where: { idEvento: id },
        }
      );

      if (responsaveis && responsaveis.length > 0) {
        await evento.setResponsaveis(responsaveis);
      }

      return res.status(200).json({ message: "Evento atualizado com sucesso" });
    } catch (error) {
      console.error("Erro ao criar evento:", error);
      return res.status(500).json({ message: "Erro ao editar o evento" });
    }
  }

  // Remove evento
  static async deletarEvento(req, res) {
    const id = req.params.id;

    try {
      // Verificar se o evento existe
      const eventoExiste = await Evento.findByPk(id);
      if (!eventoExiste) {
        return res.status(404).json({ message: "Evento não existe!" });
      }

      await eventoExiste.setResponsaveis([]);

      await Evento.destroy({ where: { idEvento: id } });

      return res.status(200).json({ message: "Evento removido com sucesso" });
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      return res.status(500).json({
        message:
          "Houve um erro ao deletar o Evento, tente novamente mais tarde",
      });
    }
  }
};
