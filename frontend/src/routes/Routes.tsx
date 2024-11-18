// Importações do react router dom
import { Routes, Route } from "react-router-dom";
// Componente que cria a rota de proteção
import ProtectedRoute from "./ProtectedRoute";
// Todas as paginas
// 1. página de autenticação
import LoginPage from "../pages/auth/LoginPage";
// 2.página de cadastrados
import Registered from "../pages/Registered";
// 3. páginas de feedback
import FeedbackPage from "../pages/feedback/FeedbacksPage"; // 3.1.todos os feedbacks
import FeedbackDetails from "../pages/feedback/FeedbackDetails"; //3.2 um feedback detalhado
import EditFeedback from "../pages/feedback/EditFeedback"; // 3.3 editar feedback
import AddFeedback from "../pages/feedback/AddFeedback"; //3.4  criar feedback
// 4. páginas de Responsável
import ResponsibleDetails from "../pages/responsible/ResponsibleDetails"; //3.1 Detalhes do Responsável
import AddResponsible from "../pages/responsible/AddResponsible"; //3.2 Criação do Responsável
import EditResponsible from "../pages/responsible/EditResponsible"; //3.3 Edição do Responsável
// 5. páginas de PessoaTEA
import PeopleTeaDetails from "../pages/peopleTEA/PeopleTeaDetails"; //3.1 Detalhes do PessoaTEA
import AddPeopleTea from "../pages/peopleTEA/AddPeopleTea"; //3.2 Criação do PessoaTEA
import EditPeopleTea from "../pages/peopleTEA/EditPeopleTea"; //3.3 Edição do PessoaTEA
// 6. páginas de Funcionário
import EmployeeDetails from "../pages/employee/EmployeeDetails"; //3.1 Detalhes do Funcionário
import AddEmployee from "../pages/employee/AddEmployee"; //3.2 Criação do Funcionário
import EditEmployee from "../pages/employee/EditEmployee"; //3.3 Edição do Funcionário
// 6. páginas de Evento
import EventDetails from "../pages/events/EventDetails"; //3.1 Detalhes do Evento
import AddEvent from "../pages/events/AddEvent"; //3.2 Criação do Evento
import EditEvent from "../pages/events/EditEvent"; //3.3 Edição do Evento
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";

// import Home from "../pages/Home";

const AppRoutes = () => (
  <Routes>
    {/* // 1. página de autenticação */}
    <Route path="/" element={<LoginPage />} />
    <Route path="/notfound" element={<NotFound />} />
    <Route path="*" element={<NotFound />} />
    {/* // 2.página de cadastrados */}
    <Route
      path="/registered"
      element={
        <ProtectedRoute
          element={<Registered />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    {/* Home */}
    <Route
      path="/home"
      element={
        <ProtectedRoute
          element={<Home />}
          allowedRoles={["administrador", "funcionario", "responsavel"]}
        />
      }
    />

    {/* // 3. páginas de feedback */}
    <Route
      path="/feedback"
      element={
        <ProtectedRoute
          element={<FeedbackPage />}
          allowedRoles={["administrador", "funcionario", "responsavel"]}
        />
      }
    />
    <Route
      path="/feedback/edit/:id"
      element={
        <ProtectedRoute
          element={<EditFeedback />}
          allowedRoles={["responsavel"]}
        />
      }
    />
    <Route
      path="/feedback/create"
      element={
        <ProtectedRoute
          element={<AddFeedback />}
          allowedRoles={["responsavel"]}
        />
      }
    />
    <Route
      path="/feedback/:id"
      element={
        <ProtectedRoute
          element={<FeedbackDetails />}
          allowedRoles={["administrador", "funcionario", "responsavel"]}
        />
      }
    />

    {/* // 5. páginas de PessoaTEA */}
    <Route
      path="/pessoatea/create"
      element={
        <ProtectedRoute
          element={<AddPeopleTea />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    <Route
      path="/pessoatea/edit/:id"
      element={
        <ProtectedRoute
          element={<EditPeopleTea />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    <Route
      path="/pessoatea/:id"
      element={
        <ProtectedRoute
          element={<PeopleTeaDetails />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    {/* 4. páginas de Responsável */}
    <Route
      path="/responsavel/create"
      element={
        <ProtectedRoute
          element={<AddResponsible />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    <Route
      path="/responsavel/:id"
      element={
        <ProtectedRoute
          element={<ResponsibleDetails />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    <Route
      path="/responsavel/edit/:id"
      element={
        <ProtectedRoute
          element={<EditResponsible />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    {/* 6. páginas de Funcionário */}
    <Route
      path="/funcionario/create"
      element={
        <ProtectedRoute
          element={<AddEmployee />}
          allowedRoles={["administrador"]}
        />
      }
    />
    <Route
      path="/funcionario/:id"
      element={
        <ProtectedRoute
          element={<EmployeeDetails />}
          allowedRoles={["administrador"]}
        />
      }
    />
    <Route
      path="/funcionario/edit/:id"
      element={
        <ProtectedRoute
          element={<EditEmployee />}
          allowedRoles={["administrador"]}
        />
      }
    />
    {/* 7. páginas de Evento */}
    <Route
      path="/event/create"
      element={
        <ProtectedRoute
          element={<AddEvent />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    <Route
      path="/event/edit/:id"
      element={
        <ProtectedRoute
          element={<EditEvent />}
          allowedRoles={["administrador", "funcionario"]}
        />
      }
    />
    <Route
      path="/event/:id"
      element={
        <ProtectedRoute
          element={<EventDetails />}
          allowedRoles={["administrador", "funcionario", "responsavel"]}
        />
      }
    />
  </Routes>
);

export default AppRoutes;
