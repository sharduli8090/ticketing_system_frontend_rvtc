import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";

const useEmployeeLoginService = () => {
  const employeeLogin = useCallback(async (obj) => {
    try {
      const response = await axios.post(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.EMPLOYEE_LOGIN}`,
        obj
      );
      const res = response.data;
      if (res.data.token && res.data.id) {
        localStorage.setItem("emptoken", res.data.token);
        localStorage.setItem("empid", res.data.id);
      } else {
        alert(response.data.message);
        employeeLogout();
      }
      return res;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  }, []);

  const employeeLogout = useCallback(() => {
    localStorage.removeItem("emptoken");
    localStorage.removeItem("empid");
  }, []);

  return {
    employeeLogin,
    employeeLogout,
  };
};

export default useEmployeeLoginService;
