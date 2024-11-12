import { useNavigate } from "react-router-dom";
import imgBackIcon from "/BackIcon.png";
import styles from "./BackBtn.module.css";

const BackBtn = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <button className={styles.back_btn} onClick={handleBack}>
      <img src={imgBackIcon} alt="Icone de nova tela" />
      Voltar
    </button>
  );
};

export default BackBtn;
