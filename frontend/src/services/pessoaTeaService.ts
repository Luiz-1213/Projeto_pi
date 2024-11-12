// api
import api from "../utils/api";
// interfaces de tipagem
import {
  IPeopleTEAResponse,
  IPeopleTEAResponsibleResponse,
} from "../interfaces/IPeopleTEAResponse";

// Buscar todos os responsaveis
export const getAllPeopleTEA = async () => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get("/tea/findall", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });
    let data: IPeopleTEAResponse[] = response.data.usuarios;
    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Buscar PessoaTea e Responsvel
export const getPeopleTeaAndResponsible = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get(`/tea/findone/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IPeopleTEAResponsibleResponse = response.data;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Criar PessoaTEA
export const createPeopleTea = async (data: any) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.post(`/tea/create`, data, {
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

// Editar PessoaTEA
export const editPeopleTea = async (data: any, id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.patch(`/tea/update/${id}`, data, {
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
