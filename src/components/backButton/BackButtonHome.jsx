import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const BackButtonHome = () => {
  const navigate = useNavigate();
  const navigateDashboard = () => {
    navigate("/home");
  };
  return (
    <button
      className="absolute top-16 lg:top-20 md:top-20 left-5 flex items-center justify-between shadow-xl px-3 transition-transform transform hover:scale-110  hover:cursor-pointer duration-1000  bg-gradient-to-br from-blue-300   to-blue-500 rounded-3xl text-white  "
      onClick={navigateDashboard}
    >
      <IoArrowBack className="lg:h-6 lg:w-6 md:h-8 md:w-8 " />
      &nbsp;
      <span className="text-xs lg:text-sm md:text-sm">Back To Home</span>
    </button>
  );
};

export default BackButtonHome;
