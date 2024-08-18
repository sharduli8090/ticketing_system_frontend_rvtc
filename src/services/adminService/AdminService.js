import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useAuthService from "../authService/AuthService";
import useToastNotifications from "../toastify/ToasterService";

const useAdminService = () => {
  const { getAuthorizationHeaders, logout } = useAuthService();
  const { notifySuccess } = useToastNotifications();
  const navigate = useNavigate();
  const createEmployee = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.post(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.CREATE_EMPLOYEE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess, logout]
  );

  const getAllEmployee = useCallback(async () => {
    try {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.get(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_ALL_EMPLOYEE}`,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    } catch (error) {
      logout();
      navigate("/admin-login");
    }
  }, [getAuthorizationHeaders, notifySuccess]);

  const getAllTicket = useCallback(async () => {
    try {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.get(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_ALL_TICKET}`,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    } catch (error) {
      logout();
      navigate("/admin-login");
    }
  }, [getAuthorizationHeaders, notifySuccess]);

  const deleteAllTicket = useCallback(async () => {
    try {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.delete(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_ALL_TICKET}`,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    } catch (error) {
      logout();
      navigate("/admin-login");
    }
  }, [getAuthorizationHeaders, notifySuccess]);

  const deleteAllEmployee = useCallback(async () => {
    try{
    const headers = getAuthorizationHeaders("admin");
    const response = await axios.delete(
      `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_ALL_EMPLOYEE}`,
      headers
    );
    notifySuccess(response.data.message);
    return response.data;
  } catch (error) {
    logout();
    navigate("/admin-login");
  }
  }, [getAuthorizationHeaders, notifySuccess]);

  const deleteEmployee = useCallback(
    async (id) => {
      try{
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.delete(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_EMPLOYEE}${id}`,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    } catch (error) {
      logout();
      navigate("/admin-login");
    }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const deleteTicket = useCallback(
    async (id) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.delete(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.DELETE_TICKET}${id}`,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const approveDenyTicket = useCallback(
    async (obj, ticketId) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.put(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.APPROVE_DENY_TICKET}${ticketId}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getEmployeeDeptWise = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.post(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_EMPLOYEE_DEPT_WISE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getPositionWiseEmployee = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.post(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_POSITION_WISE_EMPLOYEE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getGenderWiseEmployee = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.post(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_GENDER_WISE_EMPLOYEE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketStatusWise = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.post(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_TICKET_STATUS_WISE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getTicketsDeptWise = useCallback(
    async (obj) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.post(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_TICKET_DEPT_WISE}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const updateEmployee = useCallback(
    async (obj, empId) => {
      try {
        const headers = getAuthorizationHeaders("admin");
        const response = await axios.put(
          `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.UPDATE_EMPLOYEE}${empId}`,
          obj,
          headers
        );
        notifySuccess(response.data.message);
        return response.data;
      } catch (error) {
        logout();
        navigate("/admin-login");
      }
    },
    [getAuthorizationHeaders, notifySuccess]
  );

  const getquery = useCallback(async () => {
    try {
      const headers = getAuthorizationHeaders("admin");
      const response = await axios.get(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.GET_QUERY}`,
        headers
      );
      notifySuccess(response.data.message);
      return response.data;
    } catch (error) {
      logout();
      navigate("/admin-login");
    }
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
    getPositionWiseEmployee,
    getGenderWiseEmployee,
    getTicketStatusWise,
    getTicketsDeptWise,
    updateEmployee,
    getquery,
  };
};

export default useAdminService;
