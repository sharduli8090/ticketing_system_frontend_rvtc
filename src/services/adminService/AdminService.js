import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useAuthService from "../authService/AuthService";

const useAdminService = () => {
  const { getAuthorizationHeaders } = useAuthService();

  const createEmployee = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.post(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.CREATE_EMPLOYEE}`,
        obj,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const getAllEmployee = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.get(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_ALL_EMPLOYEE}`,
      headers
    );
    return response.data;
  }, [getAuthorizationHeaders]);

  const getAllTicket = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.get(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_ALL_TICKET}`,
      headers
    );
    return response.data;
  }, [getAuthorizationHeaders]);

  const deleteAllTicket = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_ALL_TICKET}`,
      headers
    );
    return response.data;
  }, [getAuthorizationHeaders]);

  const deleteAllEmployee = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_ALL_EMPLOYEE}`,
      headers
    );
    return response.data;
  }, [getAuthorizationHeaders]);

  const deleteEmployee = useCallback(
    async (id) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.delete(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_EMPLOYEE}${id}`,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const deleteTicket = useCallback(
    async (id) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.delete(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_TICKET}${id}`,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const approveDenyTicket = useCallback(
    async (obj, ticketId) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.put(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.APPROVE_DENY_TICKET}${ticketId}`,
        obj,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const getEmployeeDeptWise = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.post(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_EMPLOYEE_DEPT_WISE}`,
        obj,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const getTicketsDeptWise = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.post(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_TICKET_DEPT_WISE}`,
        obj,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const updateEmployee = useCallback(
    async (obj, empId) => {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.put(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.UPDATE_EMPLOYEE}${empId}`,
        obj,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const getquery = useCallback(async () => {
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.get(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_QUERY}`,
      headers
    );
    return response.data;
  }, [getAuthorizationHeaders]);

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
    getquery
  };
};

export default useAdminService;
