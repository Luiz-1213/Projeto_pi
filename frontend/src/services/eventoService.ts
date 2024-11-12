import { IEventResponse } from "../interfaces/IEventResponse";
import api from "../utils/api";

// Buscar Evento por ID
export const getAllEvents = async () => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get(`/evento/findall`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });
    let data: IEventResponse[] = response.data.eventos;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Buscar Evento por ID
export const getEventById = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get(`/evento/findone/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });
    let data: IEventResponse = response.data.eventos;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Criar Responsavel
export const createEvent = async (data: any) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.post(`/evento/create`, data, {
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

// Editar Eesponsavel
export const editEvent = async (responsavel: any, id: string) => {
  try {
    const token: string | null = localStorage.getItem("token");
    let status: string = "sucess";

    const response = await api.patch(`/evento/edit/${id}`, responsavel, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });
    console.log(response);

    let message: string = response.data.message;

    return { message, status };
  } catch (error: any) {
    console.log(error);
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};
