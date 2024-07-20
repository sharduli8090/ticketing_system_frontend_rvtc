import axios from "axios";
import { environment } from "../../environments/environment";
import { Constants } from "../constants/Constants";
import useAuthService from "./authService";

const EmployeeService = () => {
  const { getAuthorizationHeaders } = useAuthService();

  const createTicket = async (obj) => {
    const headers = getAuthorizationHeaders("employee");
    const response = await axios.post(
      `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CREATE_TICKET}`,
      obj,
      { headers }
    );
    return response.data;
  };

  const closeTicket = async (obj, ticketId) => {
    const headers = getAuthorizationHeaders("employee");
    const response = await axios.put(
      `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CLOSE_TICKET}${ticketId}`,
      obj,
      { headers }
    );
    return response.data;
  };

  return {
    createTicket,
    closeTicket,
  };
};

export default EmployeeService();
