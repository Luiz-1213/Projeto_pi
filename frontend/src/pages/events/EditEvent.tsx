// React
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // react-router
// Services
import { editEvent, getEventById } from "../../services/eventoService";
// Tipagem
import { IEventResponse } from "../../interfaces/IEventResponse";
// Components
import EventForm from "../../components/form/EventForm";
import Container from "../../components/layouts/container/Container";
import useToast from "../../hooks/useToast"; //toast de notificação
// Estilos
import styles from "../AddPagesStyles.module.css";

const EditEvent = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState<IEventResponse>();
  const { id } = useParams();

  // Buscar os dados do responsavel
  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const event = await getEventById(id);
        if (event && event.status === "error") {
          useToast(event.msgError as string, event.status);
          navigate("/home");
        } else if (event && event.data) {
          setEvent(event.data as IEventResponse);
        }
      } catch {
        useToast("Erro ao buscar o Evento", "error");
      }
    };
    fetchData(id as string);
  }, [id]);

  // Função para dispara a edição
  const handleEdit = async (data: any) => {
    try {
      const response = await editEvent(data, id as string);
      if (response && response.status === "error") {
        useToast(response.msgError as string, response.status);
      } else {
        useToast(response.message as string, response.status);
        navigate("/home");
      }
    } catch {
      useToast("Erro ao Criar Evento", "error");
      navigate("/home");
    }
  };

  let defaultValues = {
    assunto: event?.assunto,
    descricao: event?.descricao,
    dataEvento: event?.dataEvento,
    horario: event?.horario.slice(0, 5),
    local: event?.local,
    responsaveis: event?.responsaveis.map((item: any) => item.id) || [],
  };

  return (
    <Container
      children={
        <div className={styles.container_bg}>
          <h1>Edição de Evento</h1>
          <p>
            Altere o que for necessário, mas lembre de preencher todos os
            campos!
          </p>
          {!event ? (
            <p>Carregando dados...</p>
          ) : (
            <EventForm
              initialValues={defaultValues as IEventResponse}
              btnText="Editar"
              onSubmit={handleEdit}
            />
          )}
        </div>
      }
    ></Container>
  );
};

export default EditEvent;
