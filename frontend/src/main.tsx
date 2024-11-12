import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// importando o Provedor de rotas
import { BrowserRouter} from "react-router-dom";
// Importando o contexto
import { UserProvider } from "./context/UserContext.tsx";



createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </StrictMode>
);
