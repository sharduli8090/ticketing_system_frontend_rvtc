import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useAuthService from "../authService/AuthService";
import useToastNotifications from "../toastify/ToasterService";

const useAdminService = () => {
  const { getAuthorizationHeaders } = useAuthService();
  const { notifySuccess } = useToastNotifications();
  const createEmployee = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.post(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.CREATE_EMPLOYEE}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getAllEmployee = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.get(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_ALL_EMPLOYEE}`,
      headers
    );
    notifySuccess(response.data.message);
    return response.data;
  }, [getAuthorizationHeaders, notifySuccess]);

  const getAllTicket = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.get(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_ALL_TICKET}`,
      headers
    );
    notifySuccess(response.data.message);
    return response.data;
  }, [getAuthorizationHeaders, notifySuccess]);

  const deleteAllTicket = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_ALL_TICKET}`,
      headers
    );
    notifySuccess(response.data.message);
    return response.data;
  }, [getAuthorizationHeaders, notifySuccess]);

  const deleteAllEmployee = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_ALL_EMPLOYEE}`,
      headers
    );
    notifySuccess(response.data.message);
    return response.data;
  }, [getAuthorizationHeaders, notifySuccess]);

  const deleteEmployee = useCallback(
    async (id) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.delete(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_EMPLOYEE}${id}`,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const deleteTicket = useCallback(
    async (id) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.delete(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_TICKET}${id}`,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const approveDenyTicket = useCallback(
    async (obj, ticketId) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.put(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.APPROVE_DENY_TICKET}${ticketId}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getEmployeeDeptWise = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.post(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_EMPLOYEE_DEPT_WISE}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsDeptWise = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.post(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_TICKET_DEPT_WISE}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const updateEmployee = useCallback(
    async (obj, empId) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.put(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.UPDATE_EMPLOYEE}${empId}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getquery = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.get(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_QUERY}`,
      headers
    );
    notifySuccess(response.data.message);
    return response.data;
  }, [getAuthorizationHeaders, notifySuccess]);

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
    updateEmployee,
    getquery,
  };
};

export default useAdminService;
