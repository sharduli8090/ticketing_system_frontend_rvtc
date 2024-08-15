import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useHomeToastNotifications = () => {
  const notifySuccess = (message) => {
    toast.success(message, {
      position: "bottom-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const notifyError = (message) => {
    toast.error(message, {
      position: "bottom-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  const notifyDefault = (message) => {
    toast(message, {
      position: "bottom-left",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return { notifySuccess, notifyError, notifyDefault };
};

export default useHomeToastNotifications;
