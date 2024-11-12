// api
import api from "../utils/api";
// interfaces de tipagem
import { IFeedbackResponse } from "../interfaces/IFeedbackResponse";
import { IFeedbackFormSchema } from "../interfaces/IFeedbackFormSchema";


// Buscar todos os feedbacks por responsaveis
export const getAllFeedbacksForResponsible = async () => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get("/feedback/findresponse", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IFeedbackResponse[] = response.data.feedbacks;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Buscar todos os feedbacks 
export const getAllFeedbacks = async () => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get("/feedback/findall", {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IFeedbackResponse[] = response.data.feedbacks;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Buscar  feedbacks por id
export const getFeedbackbyId = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.get(`/feedback/findone/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token as string)}`,
      },
    });

    let data: IFeedbackResponse = response.data.feedback;

    return { data, status };
  } catch (error: any) {
    status = "error";
    let msgError: string = error.response.data.message;
    return { msgError, status };
  }
};

// Criar Feedback
export const createFeedback = async (feedback: IFeedbackFormSchema) => {
  try {
    const token: string | null = localStorage.getItem("token");
    let status: string = "sucess";

    const response = await api.post(`/feedback/create`, feedback, {
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

// Editar feedback
export const editFeedback = async (feedback: IFeedbackResponse) => {
  try {
    const token: string | null = localStorage.getItem("token");
    let status: string = "sucess";

    const response = await api.patch(`/feedback/update`, feedback, {
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

// Remover Feedback
export const remove = async (id: string) => {
  const token: string | null = localStorage.getItem("token");
  let status: string = "sucess";
  try {
    const response = await api.delete(`/feedback/remove/${id}`, {
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



