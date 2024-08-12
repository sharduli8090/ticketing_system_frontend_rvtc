import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useEmployeeLoginService from "../../services/employeeLoginService/EmployeeLoginService";
import useToastNotifications from "../../services/toastify/ToasterService"; 
import Loader from "../loader/Loader";

const EmployeeLogin = () => {
  const { employeeLogin } = useEmployeeLoginService();
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
      const response = await employeeLogin(loginData);
      if (response.statuscode === 200) {
        setErrorMessage("");
        setLoading(false);
        clearInputs();
        clearError();
        navigate("/employeedash");
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

  const handleAdminContact = () => {
    navigate("/sendquery");
  };

  const handleAlert = () => {
    notifyError("Please contact your admin for password reset.");
    handleAdminContact();
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">
      {!loading ? (
        <div className="lg:w-full md:w-full w-3/4 max-w-md glow-login-blue rounded-lg px-8 py-12  flex flex-col items-center text-white ">
          <h1 className="text-center lg:text-2xl md:text-2xl text-lg font-medium mb-8 ">
            Welcome Back Employee!
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block  text-xs lg:text-sm md:text-sm font-bold mb-2 text-white   "
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-1 lg:py-2 md:py-2 px-2 lg:px-3 md:px-3  text-white focus:outline-none   text-sm lg:text-base md:text-base glow-input-blue"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-white text-xs lg:text-sm md:text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-1 lg:py-2 md:py-2 px-2 lg:px-3 md:px-3  text-white focus:outline-none    text-sm lg:text-base md:text-base glow-input-blue "
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={handleAlert}
                className="text-blue-300 font-medium text-xs float-right mt-1 hover:cursor-pointer transition-transform transform hover:scale-110 duration-1000"
              >
                Forgot Password?
              </span>
            </div>

            <div className="flex items-center mb-4 lg:mt-10 md:mt-10">
              <button
                type="submit"
                className="w-full   mt-5 lg:mt-0 md:mt-0   hover:bg-blue-500 text-white font-bold py-1 lg:py-2 md:py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 transition-all transform hover:scale-110 duration-1000 glow-button "
              >
                Login
              </button>
            </div>
            <div className="text-red-500 lg:text-sm md:text-sm text-xs  text-center h-5">
              {errorMessage}
            </div>
            <div className="text-center text-white text-xs lg:text-sm md:text-sm ">
              Sign up as Employee &nbsp;
              <span
                onClick={handleAdminContact}
                className="text-blue-300 font-bold hover:cursor-pointer"
              >
                Contact Admin
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

export default EmployeeLogin;
