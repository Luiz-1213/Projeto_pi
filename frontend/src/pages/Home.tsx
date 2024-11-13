import React, { useContext, useEffect, useState } from "react";
import Container from "../components/layouts/container/Container";
import Calendar from "../components/calendar/Calendar";
import useToast from "../hooks/useToast";
import { Context } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IEventResponse } from "../interfaces/IEventResponse";
import { getAllEvents } from "../services/eventoService";

const Home = () => {
  const [events, setEvents] = useState<IEventResponse[]>([]);
  const { userRole } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  // Buscas todos os feedbacks e trata os erros
  useEffect(() => {
    const url =
      "https://api.themoviedb.org/4/account/%3C%3Caccount_object_id%3E%3E/lists?page=1";
    const options = { method: "GET", headers: { accept: "application/json" } };

    fetch(url, options)
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.error(err));

    const fetchEvents = async () => {
      setIsLoading(true);
      let events;

      try {
        if (userRole === "administrador" || userRole === "funcionario") {
          events = await getAllEvents();
        } else if (userRole === "responsavel") {
          //events = await getAllEventsForResponsible();
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
  }, [userRole, isModalOpen]);

  return (
    <Container
      Children={
        <>
          {isLoading ? (
            <p>Carregando eventos</p>
          ) : (
            <Calendar
              events={events}
              isModalOpenStatus={(status) => setIsModalOpen(status)}
            />
          )}
        </>
      }
    ></Container>
  );
};

export default Home;
