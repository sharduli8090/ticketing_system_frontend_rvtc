import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAdminLoginService from "../../services/adminLoginService/AdminLoginService";
import Loader from "../loader/Loader";
const AdminLogin = () => {
  const { adminLogin } = useAdminLoginService();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
        console.error("Login error:", response);
        setLoading(false);
        setErrorMessage("Invalid Credentials");
        clearInputs();
      }
    } catch (error) {
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
    alert("Please contact your admin for any queries.");
    navigate("/sendquery");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {!loading ? (
        <div className="w-full max-w-md bg-white rounded-lg px-8 py-12 shadow-2xl flex flex-col items-center">
          <h1 className="text-center text-2xl font-medium mb-8">
            Welcome Back Admin!
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={handleAlert}
                className="text-blue-500 text-xs float-right mt-1 hover:cursor-pointer"
              >
                Send Your Query
              </span>
            </div>

            <div className="flex items-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
              >
                Login
              </button>
            </div>
            <div className="text-red-500 text-sm text-center h-5">
              {errorMessage}
            </div>

            <div className="text-center text-gray-500 text-sm">
              Sign in as Employee
              <span
                className="text-blue-500 font-bold hover:cursor-pointer"
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
