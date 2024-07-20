import axios from "axios";
import { Constants } from "../../constant/Constant";
import { environment } from "../../environments/environment";

const AdminLoginService = () => {
  const adminLogin = async (obj) => {
    try {
      const response = await axios.post(
        `${environment.API_ADMIN_URL}${Constants.API_ADMIN_ENDPOINT.ADMIN_LOGIN}`,
        obj
      );
      const res = response.data;
      if (res.data.token && res.data.id) {
        localStorage.setItem("admintoken", res.data.token);
        localStorage.setItem("adminid", res.data.id);
      } else {
        alert("Invalid Credentials");
        adminLogout();
      }
      return res;
    } catch (error) {
      console.error("Error logging in", error);
      throw error;
    }
  };

  const adminLogout = () => {
    localStorage.removeItem("admintoken");
    localStorage.removeItem("adminid");
  };

  return {
    adminLogin,
    adminLogout,
  };
};

export default AdminLoginService();
