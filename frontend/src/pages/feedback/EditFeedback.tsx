// Importações do react
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // react router

// Services
import { editFeedback, getFeedbackbyId } from "../../services/feedbackService";

// Interfaces
import { IFeedbackFormSchema } from "../../interfaces/IFeedbackFormSchema";
import { IFeedbackResponse } from "../../interfaces/IFeedbackResponse";

// Toast de notificação
import useToast from "../../hooks/useToast";

// Componentes
import FeedbackForm from "../../components/feedback/FeedForm";
import Container from "../../components/layouts/container/Container"; // componetes de layout

// Styles
import styles from "./AddFeedback.module.css";

const EditFeedback = () => {
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<IFeedbackResponse>();
  const { id } = useParams();

  // Buscar os dados do atual Evento
  useEffect(() => {
    const fetchEvents = async (id: string) => {
      try {
        const feedback = await getFeedbackbyId(id);
        if (feedback && feedback.status === "error") {
          useToast(feedback.msgError as string, feedback.status);
          navigate("/feedback");
        } else if (feedback && feedback.data) {
          setFeedback(feedback.data as IFeedbackResponse);
        }
      } catch {
        useToast("Erro ao buscar feedback", "error");
      }
    };
    fetchEvents(id as string);
  }, [id]);

  // Função de editar
  const handleEdit = async (data: IFeedbackFormSchema) => {
    try {
      const feedbackData: IFeedbackResponse = {
        ...data,
        id: feedback?.id as number,
      };
      const response = await editFeedback(feedbackData);
      if (response && response.status === "error") {
        useToast(response.msgError as string, response.status);
      } else {
        useToast(response.message as string, response.status);
        navigate("/feedback");
      }
    } catch {
      useToast("Erro ao buscar feedback", "error");
      navigate("/feedback");
    }
  };

  let defaultValues = {
    assuntoFeedback: feedback?.assuntoFeedback,
    descricaoFeedback: feedback?.descricaoFeedback,
    satisfacao: feedback?.satisfacao,
  };

  return (
    <Container
      Children={
        <div className={styles.feed_container}>
          <div>
            <h1>Editando Feedback!</h1>
            <p>
              Valorizamos sua opinião! Compartilhe suas críticas, sugestões e
              conselhos conosco para melhorarmos continuamente.
            </p>
          </div>
          {feedback && (
            <FeedbackForm
              onSubmit={handleEdit}
              initialValues={defaultValues as IFeedbackResponse}
              btnText={"Editar"}
            ></FeedbackForm>
          )}
        </div>
      }
    ></Container>
  );
};

export default EditFeedback;
