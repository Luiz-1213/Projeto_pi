// importação do react router
import { NavLink } from "react-router-dom";
// Estilo
import styles from "./NewTabBtn.module.css";
// Imagem do icone
import imgNewTab from "/OpenAnotherPage.svg";

const NewTabBtn = ({ link }: { link: string }) => {
  return (
    <div className={styles.newtab_container}>
      <NavLink to={link}>
        <img src={imgNewTab} alt="Icone de nova tela" />
      </NavLink>
    </div>
  );
};

export default NewTabBtn;
