import { useEffect, useState } from "react";
import EventForm from "../../components/form/EventForm";
import Container from "../../components/layouts/container/Container";

import styles from "../AddPagesStyles.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { editEvent, getEventById } from "../../services/eventoService";
import useToast from "../../hooks/useToast";
import { IEventResponse } from "../../interfaces/IEventResponse";

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
      useToast("Erro ao Criar", "error");
      navigate("/registered");
    }
  };

  return (
    <Container
      Children={
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
              initialValues={event}
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
