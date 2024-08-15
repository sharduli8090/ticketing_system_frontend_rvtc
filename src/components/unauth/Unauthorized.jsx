import { FaLock } from "react-icons/fa";
import useToastNotifications from "../../services/toastify/ToasterService";
import { useNavigate } from "react-router-dom";
import useAuthService from "../../services/authService/AuthService";
const Unauthorized = () => {
  const navigate = useNavigate();
  const { notifyError } = useToastNotifications();
  notifyError("Unauthorized access");

  const { getUserType, isLoggedIn } = useAuthService();
  const navigateDashboard = () => {
    if (!isLoggedIn()) {
      navigate("/home");
    } else {
      const userType = getUserType();
      if (userType === "employee") navigate("/employeedash");
      else navigate("/admindash");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen  text-gray-50 p-6">
      <div className="flex items-center justify-center mb-6">
        <FaLock className="text-blue-800 text-6xl mr-4" />
        <h1 className="text-5xl font-extrabold">Oops!</h1>
      </div>
      <p className="text-xl mb-6 text-center">
        It seems you don&apos;t have the right credentials to access this page.
      </p>
      <p className="text-lg mb-8 text-center">
        If you believe this is a mistake, please contact your administrator or
        try logging in with the appropriate account.
      </p>
      <button
        className="  text-gray-50 font-bold py-3 px-6 rounded-full glow-button transition-all duration-1000  transform hover:scale-110"
        onClick={navigateDashboard}
      >
        Take me to the right place
      </button>
    </div>
  );
};

export default Unauthorized;
