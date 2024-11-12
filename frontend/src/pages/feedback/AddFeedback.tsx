// importação de react / React router
import { useNavigate } from "react-router-dom";

// Interfaces
import { createFeedback } from "../../services/feedbackService";
import { IFeedbackFormSchema } from "../../interfaces/IFeedbackFormSchema";

// Toast de notificação
import useToast from "../../hooks/useToast";

// Componentes
import FeedbackForm from "../../components/feedback/FeedForm";
import Container from "../../components/layouts/container/Container";

// Estilos
import styles from "./AddFeedback.module.css";


const AddFeedback = () => {
  const navigate = useNavigate()
  // Função para dispara a criação do feedback e tratar a resposta
  const handleCreate = async (data: IFeedbackFormSchema) => {
    try {
      const response = await createFeedback(data);
      if (response && response.status === "error") {
        useToast(response.msgError as string, response.status);
      } else {
        useToast(response.message as string, response.status);
        navigate('/feedback')
      }
    } catch {
      useToast("Erro ao buscar feedback", "error");
    }
  };

  return (
    <Container
      Children={
        <div className={styles.feed_container}>
          <div>
            <h1>Feedback!</h1>
            <p>
              Valorizamos sua opinião! Compartilhe suas críticas, sugestões e
              conselhos conosco para melhorarmos continuamente.
            </p>
          </div>
          <FeedbackForm onSubmit={handleCreate} btnText={"Enviar"}></FeedbackForm>
        </div>
      }
    ></Container>
  );
};

export default AddFeedback;
