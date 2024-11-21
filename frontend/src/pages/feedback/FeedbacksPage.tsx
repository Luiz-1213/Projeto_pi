// Hooks
import { useContext, useEffect, useState } from "react";
// Services
import {
  getAllFeedbacks,
  getAllFeedbacksForResponsible,
} from "../../services/feedbackService";
// Contexto
import { Context } from "../../context/UserContext";
// Interface
import { IFeedbackResponse } from "../../interfaces/IFeedbackResponse";
// Toastify de notificações
import useToast from "../../hooks/useToast";
// Componentes
import FeedContainer from "../../components/feedback/FeedContainer";
import Container from "../../components/layouts/container/Container";
// Estilos
import styles from "./FeedbacksPage.module.css";
import Button from "../../components/button/Button";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";

const FeedbackContainer = () => {
  const [feedbacks, setFeedbacks] = useState<IFeedbackResponse[]>([]);
  const { userRole } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Buscas todos os feedbacks e trata os erros
  useEffect(() => {
    const fetchFeedbacks = async () => {
      setIsLoading(true);
      let events;

      try {
        if (userRole === "administrador" || userRole === "funcionario") {
          events = await getAllFeedbacks();
        } else if (userRole === "responsavel") {
          events = await getAllFeedbacksForResponsible();
        }

        if (events && events.status === "error") {
          useToast(events.msgError as string, events.status);
        } else if (events && events.data) {
          setFeedbacks(events.data as IFeedbackResponse[]);
        }
      } catch (error) {
        useToast("Erro ao buscar feedbacks", "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (userRole) {
      fetchFeedbacks();
    }
  }, [userRole]);

  const handleNavigation = () => {
    navigate(`/feedback/create`);
  };

  return (
    <Container
      children={
        <div className={styles.feed_container}>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {userRole === "responsavel" ? (
                <div className={styles.feed_header}>
                  <h1>Meus Feedbacks</h1>
                  <Button
                    text={"Criar Novo"}
                    stylesType={"regular"}
                    type="button"
                    onClick={handleNavigation}
                  ></Button>
                </div>
              ) : (
                <h1>Todos os Feedbacks</h1>
              )}
              {feedbacks.length === 0 && <p>Não há feedbacks cadastrados!</p>}

              {feedbacks.map((feedback) => (
                <FeedContainer
                  key={feedback.id}
                  id={feedback.id}
                  assunto={feedback.assuntoFeedback}
                  satisfacao={feedback.satisfacao}
                ></FeedContainer>
              ))}
            </>
          )}
        </div>
      }
    ></Container>
  );
};

export default FeedbackContainer;
