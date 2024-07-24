import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";
import useToastNotifications from "../toastify/ToasterService";

const useSendQueryService = () => {
  const { notifyError, notifySuccess } = useToastNotifications();
  const sendQuery = useCallback(async (queryObj) => {
    try {
      const url = `${environment.API_URL}${Constants.API_GENERAL_ENDPOINT.SEND_QUERY}`;
      if (!queryObj.name || !queryObj.query) {
        notifyError("Please fill all the entries.");
        return;
      }
      const response = await axios.post(url, queryObj);
      notifySuccess(response.data.message);
      return response.data;
    } catch (error) {
      console.error("Error sending query:", error);
      notifyError("Error sending query", error);
      throw new Error("Error sending query");
    }
  }, []);

  return {
    sendQuery,
  };
};

export default useSendQueryService;
