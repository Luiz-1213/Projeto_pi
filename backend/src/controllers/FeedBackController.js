const Feedback = require("../models/Feedback");
const Responsavel = require("../models/Responsavel");
const jwt = require("jsonwebtoken");
const pegarToken = require("../helpers/pegarToken");

module.exports = class FeedbackController {
  // ------------------------ criar feedback
  static async criarFeedback(req, res) {
    // recebe os dados
    const { assuntoFeedback, descricaoFeedback, satisfacao } = req.body;

    // pega o responsavel pelo token
    const token = await pegarToken(req);

    const decodificado = jwt.verify(token, process.env.SECRET_JWT);
    if (decodificado.tipoUsuario !== "responsavel") {
      return res
        .status(400)
        .json({ message: "Somente responsaveis podem mandar feedback" });
    }
    //   verifica se o responsavel existe
    const usuario = await Responsavel.findByPk(decodificado.id);

    if (!usuario) {
      return res
        .status(404)
        .json({ message: "Houve um problema ao enviar o feedback" });
    }
    // cria o objeto feedback
    const feedback = {
      assuntoFeedback,
      descricaoFeedback,
      satisfacao,
      responsavelId: decodificado.id,
    };

    // Salva no banco
    Feedback.create(feedback)
      .then(() => {
        return res
          .status(200)
          .json({ message: "Feedback enviado com sucesso" });
      })
      .catch((error) => {
        return res.status(500).json({ error: error });
      });
  }

  // ------------------------ buscar todos
  static async buscarTodos(req, res) {
    // Busca todos e retira o id do responsavel
    const feedbacks = await Feedback.findAll({
      attributes: { exclude: ["responsavelId"] },
    }).catch((error) => {
      return res.status(500).json({ message: error });
    });

    if (!feedbacks) {
      return res.status(200).json({ message: "Não há feedbacks enviados" });
    } else {
      return res.status(200).json({ feedbacks });
    }
  }

  // ------------------------ buscar um
  static async buscarPorId(req, res) {
    const id = req.params.id;

    const feedback = await Feedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback não encontrado!" });
    }
    return res.status(200).json({ feedback });
  }

  static async editarFeedback(req, res) {
    // recebe os dados de edição
    const { id, assuntoFeedback, descricaoFeedback, satisfacao } = req.body;

    const feedback = await Feedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback não encontrado!" });
    }

    const token = await pegarToken(req);
    const decodificado = jwt.verify(token, process.env.SECRET_JWT);
    if (decodificado.tipoUsuario !== "responsavel") {
      return res
        .status(400)
        .json({ message: "Somente responsaveis podem editar feedback" });
    }
    // Verifica se a pessoa que está tentando fazer a edição é o memso que escreveu
    console.log(decodificado.id);
    console.log(feedback.responsavelId);

    if (decodificado.id !== feedback.responsavelId) {
      return res.status(401).json({
        message: "Somente o usuário que criou o feedback pode edita-lo",
      });
      //   Se sim atualiza
    } else {
      const editarfeedback = {
        id,
        assuntoFeedback,
        descricaoFeedback,
        satisfacao,
      };

      Feedback.update(editarfeedback, {
        where: { id: id },
      })
        .then(() => {
          res.status(200).json({
            message: "Feedback atualizado com sucesso!",
          });
        })
        .catch((error) => {
          res.status(500).json({ error: error });
        });
    }
  }

  // ------------------------ remover feedback
  static async deletarFeedback(req, res) {
    const { id } = req.body;

    const feedback = await Feedback.findByPk(id);

    if (!feedback) {
      return res.status(404).json({ message: "Feedback não encontrado!" });
    }

    const token = await pegarToken(req);
    const decodificado = jwt.verify(token, process.env.SECRET_JWT);

    if (decodificado.tipoUsuario !== "responsavel") {
      return res
        .status(400)
        .json({ message: "Somente responsaveis podem deletar feedback" });
    }

    if (decodificado.id !== feedback.responsavelId) {
      return res.status(401).json({
        message: "Somente o usuário que criou o feedback pode remove-lo",
      });
    } else {
      Feedback.destroy({ where: { id: id } })
        .then(() => {
          res.status(200).json({ message: "Feedback  removido com sucesso" });
        })
        .catch((error) => {
          res.status(500).json({
            message:
              "Houve um erro ao deletar o feedback, tente novamente mas tarde",
          });
        });
    }
  }
};
