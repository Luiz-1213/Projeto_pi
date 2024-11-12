// React | react router
import { NavLink } from "react-router-dom";
import { useContext } from "react";
// Contexto
import { Context } from "../../../context/UserContext";
// Images
import imgLogo from "/logo.png";
import userPhoto from "/logo.png";

// Styles
import styles from "./Sidebar.module.css";

const Sidebar = () => {
  const { userRole, logout } = useContext(Context);

  return (
    <div className={styles.sidebar}>
      <nav>
        <div className={styles.sidebar_logo}>
          <img src={imgLogo} alt="logo ONG AAPEA" />
        </div>
        <ul className={styles.sidebar_itens}>
          {userRole === "responsavel" ? (
            // navbar caso seja responsavel
            <>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/feedback">Feedback</NavLink>
              </li>
            </>
          ) : userRole === "administrador" || userRole === "funcionario" ? (
            // navbar caso seja administrador ou funcionario
            <>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/feedback">Feedbacks</NavLink>
              </li>
              <li>
                <NavLink to="/registered">Cadastrados</NavLink>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </nav>
      {/* Container do usuario */}
      <div className={styles.sidebar_user_container}>
        <div className={styles.user_photo}>
          <img src={userPhoto} alt="Imagem do usuário" />
        </div>
        <div className={styles.user_content}>
          <h3>User name</h3>
          <p onClick={logout}>Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
