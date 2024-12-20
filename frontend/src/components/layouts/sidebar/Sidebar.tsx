// React | react router
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
// Contexto
import { Context } from "../../../context/UserContext";
// Images
import imgLogo from "/logo.png";

// Styles
import styles from "./Sidebar.module.css";
import api from "../../../utils/api";
import { Avatar } from "@mui/material";

const Sidebar = () => {
  const { userRole, logout } = useContext(Context);
  const [user, setUser] = useState<any>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token: string | null = localStorage.getItem("token");
        const response = await api.get("/auth/checkuser", {
          headers: {
            Authorization: `Bearer ${JSON.parse(token as string)}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUser();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <button className={styles.hamburger} onClick={toggleSidebar}>
        <i className="bi bi-list"></i>
      </button>
      <div className={`${isOpen ? styles.sidebar_mobile : styles.sidebar}`}>
        <div className={styles.sidebar_logo}>
          <img src={imgLogo} alt="logo ONG AAPEA" />
        </div>
        <nav>
          <ul className={styles.sidebar_itens}>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/feedback">Feedback</NavLink>
            </li>

            {userRole === "administrador" || userRole === "funcionario" ? (
              // navbar caso seja administrador ou funcionario
              <li>
                <NavLink to="/registered">Cadastrados</NavLink>
              </li>
            ) : (
              <></>
            )}
          </ul>
        </nav>
        {/* Container do usuario */}
        {user && (
          <div className={styles.sidebar_user_container}>
            <div className={styles.user_photo}>
              <Avatar
                alt={user?.nome}
                src={
                  user.tipoUsuario === "responsavel"
                    ? `${import.meta.env.VITE_API_URL}/images/responsavel/${
                        user.foto
                      }`
                    : `${import.meta.env.VITE_API_URL}/images/funcionario/${
                        user.foto
                      }`
                }
              />
            </div>
            <div className={styles.user_content}>
              <h3>{user?.nome.split(" ")[0]}</h3>
              <p onClick={logout}>Logout</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default Sidebar;
