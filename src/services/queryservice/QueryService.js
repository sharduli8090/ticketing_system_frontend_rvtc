import axios from "axios";
import { useCallback } from "react";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";

const useSendQueryService = () => {
  const sendQuery = useCallback(async (queryObj) => {
    try {
      const url = `${environment.API_URL}${Constants.API_GENERAL_ENDPOINT.SEND_QUERY}`;
      const response = await axios.post(url, queryObj);
      return response.data;
    } catch (error) {
      console.error("Error sending query:", error);
      throw new Error("Error sending query");
    }
  }, []);

  return {
    sendQuery,
  };
};

export default useSendQueryService;
