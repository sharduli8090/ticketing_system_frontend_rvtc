import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useToastNotifications from "../toastify/ToasterService";

const useEmployeeLoginService = () => {
  const { notifyError, notifySuccess } = useToastNotifications();
  const employeeLogin = useCallback(
    async (obj) => {
      try {
        const response = await axios.post(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.EMPLOYEE_LOGIN}`,
          obj
        );
        const res = response.data;
        if (res.data.token && res.data.id) {
          localStorage.setItem("emptoken", res.data.token);
          localStorage.setItem("empid", res.data.id);
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
    employeeLogin,
  };
};

export default useEmployeeLoginService;
