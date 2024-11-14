import React, { useContext, useEffect, useState } from "react";
import Container from "../components/layouts/container/Container";
import Calendar from "../components/calendar/Calendar";
import useToast from "../hooks/useToast";
import { Context } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IEventResponse } from "../interfaces/IEventResponse";
import { getAllEvents, getEventByResponsible } from "../services/eventoService";
import { jwtDecode } from "jwt-decode";
import { ITokenPayload } from "../interfaces/ITokenPayload";

const Home = () => {
  const [events, setEvents] = useState<IEventResponse[]>([]);
  const { userRole } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Buscas todos os feedbacks e trata os erros
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      let events;

      try {
        if (userRole === "administrador" || userRole === "funcionario") {
          events = await getAllEvents();
        } else if (userRole === "responsavel") {
          const token = localStorage.getItem("token");

          if (token) {
            const decodedToken = jwtDecode<ITokenPayload>(token);
            events = await getEventByResponsible(
              decodedToken.id as unknown as string
            );
          }
        }

        if (events && events.status === "error") {
          useToast(events.msgError as string, events.status);
        } else if (events && events.data) {
          setEvents(events.data as IEventResponse[]);
        }
      } catch (error) {
        useToast("Erro ao buscar feedbacks", "error");
      } finally {
        setIsLoading(false);
      }
    };
    if (userRole) {
      fetchEvents();
    }
  }, [userRole]);

  return (
    <Container
      Children={
        <>
          {isLoading ? <p>Carregando eventos</p> : <Calendar events={events} />}
        </>
      }
    ></Container>
  );
};

export default Home;
