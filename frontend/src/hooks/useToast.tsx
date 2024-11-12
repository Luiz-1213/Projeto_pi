import { toast } from "react-toastify";

const useToast = (msg: string, status: string) => {
  if (status === "sucess") {
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "light",
    });
  } else if (status === "error") {
    toast.error(msg, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
    });
  }
};

export default useToast;
