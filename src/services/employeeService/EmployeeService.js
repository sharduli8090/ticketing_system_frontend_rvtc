import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useAuthService from "../authService/AuthService";
import useToastNotifications from "../toastify/ToasterService";

const useEmployeeService = () => {
  const { getAuthorizationHeaders } = useAuthService();
  const { notifySuccess } = useToastNotifications();

  const getEmployee = useCallback(
    async (empId) => {
      const headers = getAuthorizationHeaders("employee");
      const response = await axios.get(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_EMPLOYEE}${empId}`,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const createTicket = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("employee");
      const response = await axios.post(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CREATE_TICKET}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const closeTicket = useCallback(
    async (obj, ticketId) => {
      const headers = getAuthorizationHeaders("employee");
      const response = await axios.put(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CLOSE_TICKET}${ticketId}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsRaisedByMe = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("employee");
      const response = await axios.post(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_RAISED_BY_ME}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsInMyName = useCallback(
    async (obj) => {
      const headers = getAuthorizationHeaders("employee");
      const response = await axios.post(
        `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_IN_MY_NAME}`,
        obj,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    },
    [getAuthorizationHeaders, notifySuccess]
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
