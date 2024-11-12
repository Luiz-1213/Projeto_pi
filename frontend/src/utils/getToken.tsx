import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { ITokenPayload } from "../interfaces/ITokenPayload";

export function getToken(): string | JSX.Element {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" />;
  }

  const decodedToken = jwtDecode<ITokenPayload>(token);
  return decodedToken.tipoUsuario;
}
