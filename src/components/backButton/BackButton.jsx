import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import useAuthService from "../../services/authService/AuthService";
const BackButton = () => {
  const navigate = useNavigate();
  const { getUserType } = useAuthService();
  const navigateDashboard = () => {
    const userType = getUserType();
    if (userType === "employee") navigate("/employeedash");
    else navigate("/admindash");
  };
  return (
    <button
      className="absolute top-16 lg:top-20 md:top-20 left-5 flex items-center justify-between shadow-xl px-3 transition-transform transform hover:scale-110  hover:cursor-pointer duration-1000  bg-gradient-to-br from-gray-900 via-gray-800   to-gray-700 rounded-3xl text-blue-200 font-medium glow-button-back "
      onClick={navigateDashboard}
    >
      <IoArrowBack className="lg:h-6 lg:w-6 md:h-8 md:w-8 " />
      &nbsp;
      <span className="text-xs lg:text-sm md:text-sm">Back To Dashboard</span>
    </button>
  );
};

export default BackButton;
