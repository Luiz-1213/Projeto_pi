// Components
import { ToastContainer } from "react-toastify"; // componente de toast
import Sidebar from "./components/layouts/sidebar/Sidebar.tsx"; // barra de navegação

// Rotas do sistema
import AppRoutes from "./routes/Routes.tsx";

// Context e hook de contexto
import { Context } from "./context/UserContext.tsx";
import { useContext, useEffect, useState } from "react";

// Styles
import "./App.css";
import "react-toastify/dist/ReactToastify.css"; // estilos do toast

function App() {
  const { authenticated } = useContext(Context);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ToastContainer limit={1} />
      <AppRoutes />
    </>
  );
}

export default App;
