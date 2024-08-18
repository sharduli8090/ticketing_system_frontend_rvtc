import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useAuthService from "../authService/AuthService";
import useToastNotifications from "../toastify/ToasterService";

const useEmployeeService = () => {
  const { getAuthorizationHeaders, logout } = useAuthService();
  const { notifySuccess } = useToastNotifications();
  const navigate = useNavigate();

  const getEmployee = useCallback(
    async (empId) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.get(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_EMPLOYEE}${empId}`,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const createTicket = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.post(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CREATE_TICKET}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const closeTicket = useCallback(
    async (obj, ticketId) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.put(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.CLOSE_TICKET}${ticketId}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsRaisedByMe = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.post(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_RAISED_BY_ME}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsRaisedByMeDeptWise = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.post(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_RAISED_BY_ME_DEPT_WISE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsRaisedByMeStatusWise = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.post(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_RAISED_BY_ME_STATUS_WISE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsInMyNameDeptWise = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.post(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_IN_MY_NAME_DEPT_WISE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsInMyNameStatusWise = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.post(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_IN_MY_NAME_STATUS_WISE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsInMyName = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.post(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.GET_TICKETS_IN_MY_NAME}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const approveDenyTicketEmployee = useCallback(
    async (obj, ticketId) => {
      try {
        const headers = getAuthorizationHeaders("employee");
        const response = await axios.put(
          `${environment.API_EMPLOYEE_URL}${Constants.API_EMPLOYEE_ENDPOINT.APPROVE_DENY_TICKET}${ticketId}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/employee-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  return {
    getEmployee,
    createTicket,
    closeTicket,
    getTicketsRaisedByMe,
    getTicketsInMyName,
    getTicketsRaisedByMeDeptWise,
    getTicketsRaisedByMeStatusWise,
    getTicketsInMyNameDeptWise,
    getTicketsInMyNameStatusWise,
    approveDenyTicketEmployee,
  };
};

export default useEmployeeService;
