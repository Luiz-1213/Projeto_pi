import React from "react";
import Button from "../../components/button/Button";
import styles from "./EventDetails.module.css";
import { useNavigate } from "react-router-dom";
import { normalizeDate } from "../../utils/masks";

const EventoDetails = ({ event, close_modal }: any) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    console.log("cai aqui");
    navigate(`/event/edit/${event.idEvento}`);
  };

  function deleteResponsible(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className={styles.bg_container}>
      <div>
        <button onClick={close_modal}>Fechar</button>
      </div>
      <div>
        <h1 className={styles.title}>{event.assunto}</h1>
        <div className={styles.data}>
          <p>
            Data: <span> {normalizeDate(event.dataEvento)}</span>
          </p>
          <p>
            Horário: <span>{event.horario}</span>
          </p>
          <p>
            Local:
            <span>{event.local}</span>
          </p>
          <p>
            Descrição: <span>{event.descricao}</span>
          </p>
          <p className={styles.full_width}>
            responsavel: <span>{event.descricao}</span>
          </p>
        </div>
      </div>
      <div className={styles.actions_container}>
        <Button
          text={"Editar"}
          stylesType={"regular"}
          onClick={handleNavigation}
        ></Button>
        <Button
          text={"Remover"}
          stylesType={"danger"}
          onClick={deleteResponsible}
        ></Button>
      </div>
    </div>
  );
};

export default EventoDetails;
