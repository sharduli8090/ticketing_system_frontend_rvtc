import axios from "axios";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";

const employeeLoginService = () => {
  const employeeLogin = async (obj) => {
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
        alert("Invalid Credentials");
        employeeLogout();
      }
      return res;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  };

  const employeeLogout = () => {
    localStorage.removeItem("emptoken");
    localStorage.removeItem("empid");
  };

  return {
    employeeLogin,
    employeeLogout,
  };
};

export default employeeLoginService();
