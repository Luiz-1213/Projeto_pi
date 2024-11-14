import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/button/Button";
import styles from "./EventDetails.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { normalizeDate } from "../../utils/masks";
import { getEventById, remove } from "../../services/eventoService";
import useToast from "../../hooks/useToast";
import { IEventResponse } from "../../interfaces/IEventResponse";
import Container from "../../components/layouts/container/Container";
import { Context } from "../../context/UserContext";

const EventoDetails = () => {
  const navigate = useNavigate();
  const [event, setEvent] = useState<IEventResponse>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const { id } = useParams();
  const { userRole } = useContext(Context);



  // Buscar os dados do responsavel
  useEffect(() => {
    setIsLoading(true);
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
      } finally {
        setIsLoading(false);
      }
    };
    fetchData(id as string);
  }, [id]);

  const handleNavigation = () => {
    navigate(`/event/edit/${event?.idEvento as number}`);
  };

  async function deleteEvent() {
    const data = await remove(event?.idEvento as number);

    useToast(data.message as string, data.status);

    if (data && data.status === "sucess") {
      navigate("/home");
    }
  }

  return (
    <Container
      Children={
        <>
          {/* Quando estive carregando */}
          {isLoading ? (
            <p>Carregando</p>
          ) : (
            // Depois de carregado
            <div className={styles.bg_container}>
              <div>
                <h1 className={styles.title}>{event?.assunto}</h1>
                <div className={styles.data}>
                  <p>
                    Data:{" "}
                    <span> {normalizeDate(event?.dataEvento as string)}</span>
                  </p>
                  <p>
                    Horário: <span>{event?.horario.slice(0, 5)}</span>
                  </p>
                  <p>
                    Local:
                    <span>{event?.local}</span>
                  </p>
                  <p>
                    Descrição: <span>{event?.descricao}</span>
                  </p>
                </div>
              </div>
              {userRole === "administrador" || userRole === "funcionario" ? (
                <div className={styles.actions_container}>
                  <Button
                    text={"Editar"}
                    stylesType={"regular"}
                    onClick={handleNavigation}
                  ></Button>
                  <Button
                    text={"Remover"}
                    stylesType={"danger"}
                    onClick={deleteEvent}
                  ></Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          )}
        </>
      }
    ></Container>
  );
};

export default EventoDetails;
