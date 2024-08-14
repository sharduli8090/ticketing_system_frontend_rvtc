import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminLoginService from "../../services/adminLoginService/AdminLoginService";
import useToastNotifications from "../../services/toastify/ToasterService";
import Loader from "../loader/Loader"; 

const AdminLogin = () => {
  const { adminLogin } = useAdminLoginService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { notifyError } = useToastNotifications();
  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearError = () => {
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      notifyError("Please enter valid email and password.");
      setErrorMessage("Please enter valid email and password.");
      setLoading(false);
      clearInputs();
      return;
    }

    const loginData = { email, password };

    try {
      const response = await adminLogin(loginData);
      if (response.statuscode === 200) {
        setErrorMessage("");
        setLoading(false);
        clearInputs();
        clearError();
        navigate("/admindash");
      } else {
        notifyError("Invalid Credentials");
        console.error("Login error:", response);
        setLoading(false);
        setErrorMessage("Invalid Credentials");
        clearInputs();
      }
    } catch (error) {
      notifyError("An error occurred. Please try again later.");
      console.error("Login error:", error);
      setLoading(false);
      setErrorMessage("An error occurred. Please try again later.");
      clearInputs();
    }
  };

  const handleEmployeeLogin = () => {
    navigate("/employee-login");
  };

  const handleAlert = () => {
    notifyError("Please contact your admin for any queries.");
    navigate("/sendquery");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-black via-gray-900 to-gray-800">
      {!loading ? (
        <div className="lg:w-full md:w-full w-3/4 max-w-md glow-login rounded-lg px-8 py-12 shadow-2xl flex flex-col items-center text-gray-50">
          <h1 className="text-center lg:text-2xl md:text-2xl text-lg font-medium mb-8">
            Welcome Back Admin!
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6 ">
              <label
                htmlFor="email"
                className="block  text-xs lg:text-sm md:text-sm font-bold mb-2 text-gray-50"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-1 lg:py-2 md:py-2 px-2 lg:px-3 md:px-3  text-gray-50 focus:outline-none   text-sm lg:text-base md:text-base glow-input"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-50 text-xs lg:text-sm md:text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-1 lg:py-2 md:py-2 px-2 lg:px-3 md:px-3  text-gray-50 focus:outline-none    text-sm lg:text-base md:text-base glow-input "
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={handleAlert}
                className="text-purple-300 font-medium text-xs float-right mt-1 hover:cursor-pointer transition-transform transform hover:scale-110 duration-1000"
              >
                Have any queries?
              </span>
            </div>

            <div className="flex items-center mb-4 lg:mt-10 md:mt-10">
              <button
                type="submit"
                className="w-full   mt-5 lg:mt-0 md:mt-0   hover:bg-purple-500 text-gray-50 font-bold py-1 lg:py-2 md:py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all transform hover:scale-110 duration-1000 glow-button-purple"
              >
                Login
              </button>
            </div>
            <div className="text-red-500 lg:text-sm md:text-sm text-xs  text-center h-5">
              {errorMessage}
            </div>

            <div className="text-center text-gray-50 text-xs lg:text-sm md:text-sm ">
              Sign in as Employee &nbsp;
              <span
                className="text-purple-300 font-bold hover:cursor-pointer   "
                onClick={handleEmployeeLogin}
              >
                Employee Login
              </span>
            </div>
          </form>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default AdminLogin;
