import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useAuthService from "../authService/AuthService";

const useEmployeeService = () => {
  const { getAuthorizationHeaders } = useAuthService();

  const getEmployee = useCallback(
    async (empId) => {
      const headers = getAuthorizationHeaders("employee");
      const response = await axios.get(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_EMPLOYEE}${empId}`,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const createTicket = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("employee");
      const response = await axios.post(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CREATE_TICKET}`,
        obj,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const closeTicket = useCallback(
    async (obj, ticketId) => {
      const headers = getAuthorizationHeaders("employee");
      console.log(obj);
      console.log(ticketId, "ticketId");
      console.log(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CLOSE_TICKET}${ticketId}`,
        obj,
        headers
      );
      const response = await axios.put(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CLOSE_TICKET}${ticketId}`,
        obj,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const getTicketsRaisedByMe = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("employee");
      console.log(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_RAISED_BY_ME}`,
        obj,
        headers
      );
      const response = await axios.post(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_RAISED_BY_ME}`,
        obj,
        headers
      );
      return response.data;
    },
    [getAuthorizationHeaders]
  );

  const getTicketsInMyName = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("employee");
      const response = await axios.post(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_IN_MY_NAME}`,
        obj,
        headers
      );

      return response.data;
    },
    [getAuthorizationHeaders]
  );

  return {
    getEmployee,
    createTicket,
    closeTicket,
    getTicketsRaisedByMe,
    getTicketsInMyName,
  };
};

export default useEmployeeService;
