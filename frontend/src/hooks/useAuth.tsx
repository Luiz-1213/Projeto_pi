// API
import api from "../utils/api";
// hooks
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useToast from "./useToast";

import { jwtDecode } from "jwt-decode";
import { ITokenPayload } from "../interfaces/ITokenPayload";

type userLoginType = {
  email: string;
  senha: string;
};

export default function useAuth() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Setar o token do usuario no corpo da requisição se houver
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
      const decodedToken = jwtDecode<ITokenPayload>(token);
      setUserRole(decodedToken.tipoUsuario);
    }
  }, [authenticated]);

  // Função de login
  async function login(user: userLoginType) {
    let status: string = "sucess";

    try {
      const data = await api.post(`/auth/login`, user).then((response: any) => {
        return response.data;
      });

      useToast(data.message, status);
      await authUser(data);
    } catch (error: any) {
      status = "error";

      const errorMsg: string = error.response.data.message;
      useToast(errorMsg, status);
    }
  }

  // Função de autenticar
  async function authUser(data: any) {
    setAuthenticated(true);
    localStorage.setItem("token", JSON.stringify(data.token));
    const decodedToken = jwtDecode<ITokenPayload>(data.token);
    setUserRole(decodedToken.tipoUsuario);
    navigate("/home");
  }

  // Função de deslogar
  async function logout() {
    const msgText = "Logout realizado com sucesso";
    const status = "success";

    setAuthenticated(false);
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = null;
    useToast(msgText, status);
    navigate("/");
  }

  return { authenticated, userRole, login, logout };
}
