// api
import api from "../utils/api";
// interfaces de tipagem
import { IResponsibleResponse } from "../interfaces/IResponsibleResponse";
import { IResponsibleAndPeopleTea } from "../interfaces/IResponsibleAndPeopleTea";

// Buscar todos os responsaveis
export const getAllResponsible = async () => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get("/respon/findall", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IResponsibleResponse[] = response.data.responsaveis;

    return { data, status };
  } catch (error: any) {
    status = "error";

    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Buscar  responsavel e seus dependentes
export const getResponsibleAndDependent = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get(`/respon/finddependent/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IResponsibleAndPeopleTea = response.data;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};
// Buscar responsavel por id
export const getResponsibleById = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get(`/respon/findone/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IResponsibleResponse = response.data;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Criar Responsavel
export const createResponsible = async (data: any) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.post(`/respon/create`, data, {
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

// Editar Eesponsavel
export const editResponsible = async (responsavel: any, id: string) => {
  try {
    const token: string | null = localStorage.getItem("token");
    let status: string = "sucess";

    const response = await api.patch(`/respon/update/${id}`, responsavel, {
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

// inativar Reponsavel
export const removeResponsible = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.delete(`/respon/remove/${id}`, {
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
