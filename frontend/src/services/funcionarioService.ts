// api
import api from "../utils/api";
// interfaces de tipagem
import { IEmployeeResponse } from "../interfaces/IEmployeeResponse";

// Buscar todos os Funcionários
export const getAllEmployee = async () => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get("/func/findall", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IEmployeeResponse[] = response.data.usuarios;
    return { data, status };
  } catch (error: any) {
    status = "error";

    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Buscar Funcionário por id
export const getEmployeebyId = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get(`/func/findone/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IEmployeeResponse = response.data.usuario;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Criar Funcionário 
export const createEmployee = async (data: any) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.post(`/func/create`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
        "Content-Type": "multipart/form-data",
      },
    });

    let message: string = response.data.message;

    return { message, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Editar Funcionário 
export const editEmployee = async (data: any, id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.patch(`/func/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
        "Content-Type": "multipart/form-data",
      },
    });

    let message: string = response.data.message;

    return { message, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Remover Funcionário 
export const removeEmployee = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.delete(`/func/remove/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let message: string = response.data.message;

    return { message, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};
