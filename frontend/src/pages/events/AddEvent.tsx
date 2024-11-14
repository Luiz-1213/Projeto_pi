// React-router
import { useNavigate } from "react-router-dom";
// Services
import { createEvent } from "../../services/eventoService";
// Compoentes
import Container from "../../components/layouts/container/Container";
import EventForm from "../../components/form/EventForm";
import useToast from "../../hooks/useToast"; // toast de notificação
// Estilos
import styles from "../AddPagesStyles.module.css";
import { IEventResponse } from "../../interfaces/IEventResponse";

const AddEvent = () => {
  const navigate = useNavigate();
  // Função para dispara a edição
  const handleCreate = async (data: IEventResponse) => {
    console.log(data.horario);
    try {
      const response = await createEvent(data);
      if (response && response.status === "error") {
        useToast(response.msgError as string, response.status);
      } else {
        useToast(response.message as string, response.status);
        navigate("/home");
      }
    } catch {
      useToast("Erro ao criar Evento", "error");
      navigate("/home");
    }
  };

  let defaultValues = {
    assunto: "",
    descricao: "",
    dataEvento: "",
    horario: "",
    local: "",
    responsaveis: [],
  };

  return (
    <Container
      Children={
        <div className={styles.container_bg}>
          <h1>Criação de Evento</h1>
          <p>Preencha todos os dados para criar um novo evento!</p>
          <EventForm
            initialValues={defaultValues}
            btnText="Criar"
            onSubmit={handleCreate}
          />
        </div>
      }
    ></Container>
  );
};

export default AddEvent;
