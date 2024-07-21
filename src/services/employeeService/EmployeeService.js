import axios from "axios";
import { environment } from "../../environments/environment";
import { Constants } from "../../constant/Constant";
import useAuthService from '../authService/AuthService'


const EmployeeService = () => {
  const { getAuthorizationHeaders } = useAuthService();

  const getEmployee = async (empId) => {
    const headers = getAuthorizationHeaders("employee");
    const response = await axios.get(
      `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_EMPLOYEE}${empId}`,
      headers 
    );
    return response.data;
  };

  const createTicket = async (obj) => {
    const headers = getAuthorizationHeaders("employee");
    const response = await axios.post(
      `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CREATE_TICKET}`,
      obj,
      headers 
    );
    return response.data;
  };

  const closeTicket = async (obj, ticketId) => {
    const headers = getAuthorizationHeaders("employee");
    const response = await axios.put(
      `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CLOSE_TICKET}${ticketId}`,
      obj,
      headers 
    );
    return response.data;
  };

  return {
    getEmployee,
    createTicket,
    closeTicket,
  };
};

export default EmployeeService();
