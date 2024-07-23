import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useToastNotifications from "../toastify/ToasterService";

const useAdminLoginService = () => {
  const { notifyError, notifySuccess } = useToastNotifications();
  const adminLogin = useCallback(
    async (obj) => {
      try {
        const response = await axios.post(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.ADMIN_LOGIN}`,
          obj
        );
        const res = response.data;
        if (res.data.token && res.data.id) {
          localStorage.setItem("admintoken", res.data.token);
          localStorage.setItem("adminid", res.data.id);
          notifySuccess(response.data.message);
        } else {
          notifyError(response.data.message);
        }
        return res;
      } catch (error) {
        console.error("Error logging in", error);
        notifyError("Error logging in", error);
        throw error;
      }
    },
    [notifyError, notifySuccess]
  );

  return {
    adminLogin,
  };
};

export default useAdminLoginService;
