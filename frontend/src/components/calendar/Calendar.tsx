import React, { useState, useEffect } from "react";
import { Calendar as BigCalendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "dayjs/locale/pt-br"; // Aqui você importa o locale para português

import "react-big-calendar/lib/css/react-big-calendar.css";
import { IEventResponse } from "../../interfaces/IEventResponse";
import EventoDetails from "../../pages/events/EventDetails";

import "react-big-calendar/lib/css/react-big-calendar.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import styles from "./Calendar.module.css";

// Configurar o localizador para português usando date-fns
dayjs.locale("pt-br");
const localizer = dayjsLocalizer(dayjs);

interface Eventos {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  local: string;
}

interface CalendarProps {
  events: IEventResponse[];
  isModalOpenStatus: (status: boolean) => void;
}

const Calendar = ({ events, isModalOpenStatus }: CalendarProps) => {
  const [eventos, setEventos] = useState<Eventos[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Eventos | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (Array.isArray(events)) {
      const eventosFormatados = events.map((evento: any) => ({
        id: evento.idEvento,
        title: evento.assunto,
        start: new Date(`${evento.dataEvento}T${evento.horario}`),
        end: new Date(`${evento.dataEvento}T${evento.horario}`),
        description: evento.descricao,
        local: evento.local,
      }));
      setEventos(eventosFormatados);
    }
  }, [events]);

  // Função para abrir o modal com os detalhes do evento
  const handleEventClick = async (event: any) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
    isModalOpenStatus(true);
  };

  const handleNavigation = () => {
    navigate(`/event/create`);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setSelectedEvent(null);
    setIsModalOpen(false);
    isModalOpenStatus(false);
  };

  return (
    <div className={styles.calendar_container}>
      <div className={styles.new_btn}>
        <Button
          text={"Criar novo"}
          stylesType={"regular"}
          onClick={handleNavigation}
        ></Button>
      </div>
      <BigCalendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        onSelectEvent={handleEventClick}
        messages={{
          allDay: "Dia inteiro",
          previous: "Anterior",
          next: "Próximo",
          today: "Hoje",
          month: "Mês",
          week: "Semana",
          day: "Dia",
          agenda: "Agenda",
          date: "Data",
          time: "Hora",
          event: "Evento",
          noEventsInRange: "Nenhum evento neste período",
          showMore: (total) => `+ Ver mais (${total})`,
        }}
      />

      {/* Modal para mostrar detalhes do evento */}
      {isModalOpen && selectedEvent && (
        <EventoDetails
          event={
            events.find((evento) => evento.idEvento === selectedEvent.id) || {}
          }
          close_modal={closeModal}
        />
      )}
    </div>
  );
};

export default Calendar;
