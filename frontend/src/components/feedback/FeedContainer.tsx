// Componentes
import { Rating } from "@mui/material";
import NewTabBtn from "../newTabBtn/NewTabBtn";
// Estilos
import styles from "./FeedContainer.module.css";

const FeedContainer = ({ id, assunto, satisfacao }: any) => {
  return (
    <div className={styles.feedback_container}>
      <div className={styles.feed_content}>
        <p>
          <span className={styles.title}>Assunto: </span>
          <span>{assunto}</span>
        </p>
        <div className={styles.feedback_rating}>
          <p>Avaliação:</p>
          <Rating
            name="read-only"
            value={satisfacao}
            readOnly
            precision={0.5}
          />
        </div>
      </div>
      <div>
        <NewTabBtn link={`/feedback/${id}`} />
      </div>
    </div>
  );
};

export default FeedContainer;
