import axios from "axios";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useAuthService from "../authService/AuthService";

const AdminService = () => {
  const { getAuthorizationHeaders } = useAuthService();

  const createEmployee = async (obj) => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.post(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.CREATE_EMPLOYEE}`,
      obj,
      headers
    );
    return response.data;
  };

  const getAllEmployee = async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.get(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_ALL_EMPLOYEE}`,
      headers
    );
    return response.data;
  };

  const getAllTicket = async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.get(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_ALL_TICKET}`,
      headers
    );
    return response.data;
  };

  const deleteAllTicket = async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_ALL_TICKET}`,
      headers
    );
    return response.data;
  };

  const deleteAllEmployee = async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_ALL_EMPLOYEE}`,
      headers
    );
    return response.data;
  };

  const deleteEmployee = async (id) => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_EMPLOYEE}${id}`,
      headers
    );
    return response.data;
  };

  const deleteTicket = async (id) => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_TICKET}${id}`,
      headers
    );
    return response.data;
  };

  const approveDenyTicket = async (obj, ticketId) => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.put(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.APPROVE_DENY_TICKET}${ticketId}`,
      obj,
      headers
    );
    return response.data;
  };

  const getEmployeeDeptWise = async (obj) => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.post(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_EMPLOYEE_DEPT_WISE}`,
      obj,
      headers
    );
    return response.data;
  };

  const getTicketsDeptWise = async (obj) => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.post(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_TICKET_DEPT_WISE}`,
      obj,
      headers
    );
    return response.data;
  };

  return {
    createEmployee,
    getAllEmployee,
    getAllTicket,
    deleteAllTicket,
    deleteAllEmployee,
    deleteEmployee,
    deleteTicket,
    approveDenyTicket,
    getEmployeeDeptWise,
    getTicketsDeptWise,
  };
};

export default AdminService();
