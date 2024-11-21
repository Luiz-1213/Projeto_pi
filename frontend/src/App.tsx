// Components
import { ToastContainer } from "react-toastify"; // componente de toast

// Rotas do sistema
import AppRoutes from "./routes/Routes.tsx";

// Styles
import "./App.css";
import "react-toastify/dist/ReactToastify.css"; // estilos do toast

function App() {
  return (
    <>
      <ToastContainer limit={1} />
      <AppRoutes />
    </>
  );
}

export default App;
