// Importações do react
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Services e tipagem de interfaces
import { IFeedbackResponse } from "../../interfaces/IFeedbackResponse";
import { getFeedbackbyId, remove } from "../../services/feedbackService";

// Toast de notificação
import useToast from "../../hooks/useToast";

// Componentes
import Container from "../../components/layouts/container/Container"; // Componentes de layout
import { Rating } from "@mui/material";
import { Context } from "../../context/UserContext";
import Button from "../../components/button/Button";

// Styles
import styles from "./FeedbackDetails.module.css";

const FeedbackDetails = () => {
  const navigate = useNavigate();
  const { userRole } = useContext(Context);
  const [feedback, setFeedback] = useState<IFeedbackResponse>();
  const { id } = useParams();

  // Buscar evento e atualizar seis dados
  useEffect(() => {
    const fetchEvents = async (id: string) => {
      try {
        const feedback = await getFeedbackbyId(id);
        if (feedback && feedback.status === "error") {
          useToast(feedback.msgError as string, feedback.status);
        } else if (feedback && feedback.data) {
          setFeedback(feedback.data as IFeedbackResponse);
        }
      } catch {
        useToast("Erro ao buscar feedback", "error");
      }
    };

    fetchEvents(id as string);
  }, [id]);

  // Navegar para o local de edição
  const handleNavigation = () => {
    navigate(`/feedback/edit/${id}`);
  };

  const deleteFeedback = async () => {
    // Dispara o evento de delete
    const data = await remove(id as string);

    useToast(data.message as string, data.status);

    if (data && data.status === "sucess") {
      navigate("/feedback");
    }
  };

  return (
    <Container
      Children={
        <>
          {feedback ? (
            <div className={styles.feed_container}>
              <div className={styles.feed_content}>
                <h1>Feedback</h1>
                <p>
                  <span className={styles.title}>Assunto: </span>
                  <span>{feedback!.assuntoFeedback}</span>
                </p>
                <div className={styles.feedback_rating}>
                  <p className={styles.title}>Avaliação:</p>
                  <Rating
                    name="read-only"
                    value={feedback!.satisfacao}
                    precision={0.5}
                    readOnly
                  />
                </div>
                <p>
                  <span className={styles.title}>Descrição: </span>
                  <span>{feedback!.descricaoFeedback}</span>
                </p>
              </div>
              {userRole === "responsavel" && (
                // Somente disponivel para responsaveis
                <div className={styles.feed_btn_actions}>
                  <Button
                    text={"Editar"}
                    stylesType={"regular"}
                    type="button"
                    onClick={handleNavigation}
                  ></Button>
                  <Button
                    text={"Deletar"}
                    stylesType={"danger"}
                    type="button"
                    onClick={deleteFeedback}
                  ></Button>
                </div>
              )}
            </div>
          ) : (
            <p>Não há feedback</p>
          )}
        </>
      }
    ></Container>
  );
};

export default FeedbackDetails;
