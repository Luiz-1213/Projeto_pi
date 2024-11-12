import Container from "../../components/layouts/container/Container";
import EventForm from "../../components/form/EventForm";

import styles from "../AddPagesStyles.module.css";
import { createEvent } from "../../services/eventoService";
import useToast from "../../hooks/useToast";
import { useNavigate, useParams } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate();
  // Função para dispara a edição
  const handleCreate = async (data: any) => {
    try {
      const response = await createEvent(data);
      if (response && response.status === "error") {
        useToast(response.msgError as string, response.status);
      } else {
        useToast(response.message as string, response.status);
        navigate("/home");
      }
      console.log(response);
    } catch {
      useToast("Erro ao Criar", "error");
      navigate("/registered");
    }
  };

  return (
    <Container
      Children={
        <div className={styles.container_bg}>
          <h1>Criação de Evento</h1>
          <p>Preencha todos os dados para criar um novo evento!</p>
          <EventForm
            initialValues={""}
            btnText="Criar"
            onSubmit={handleCreate}
          />
        </div>
      }
    ></Container>
  );
};

export default AddEvent;
