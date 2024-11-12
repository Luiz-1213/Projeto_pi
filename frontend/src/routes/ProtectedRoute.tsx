// Redirecionamento
import { Navigate } from "react-router-dom";
// hook
import { getToken } from "../utils/getToken";

// Tipagem das props
interface ProtectedRouteProps {
  element: JSX.Element; // recebe o elemento
  allowedRoles: string[]; // as permisões que está rota aceita
}

const ProtectedRoute = ({ element, allowedRoles }: ProtectedRouteProps) => {
  const decodedToken = getToken();

  // Se não aceitar transfere para o login
  if (!allowedRoles.includes(decodedToken as string)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
