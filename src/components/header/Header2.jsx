import { useEffect, useState } from "react";
import { AiFillDashboard } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Img1 from "../../asset/images/favicon.ico";
import useAuthService from "../../services/authService/AuthService";

const Header = () => {
  const { isLoggedIn, logout, getUserType } = useAuthService();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const navigate = useNavigate();

  // Sync loggedIn state with isLoggedIn
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [isLoggedIn]);

  // Handle logout
  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    navigate("/home");
  };

  // Handle navigation to home
  const handleNavigate = () => {
    navigate("/home");
  };

  const handleNavigateDash = () => {
    const userType = getUserType();
    if (userType === "admin") {
      navigate("/admindash");
    } else {
      navigate("/employeedash");
    }
  };
  const handleScrollToSection = (sectionId) => {
    navigate(`/home#${sectionId}`);
  };
  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-black text-gray-50 transition-colors duration-1000  shadow-lg ">
        <div
          className="flex items-center animate-pulse hover:cursor-pointer"
          onClick={handleNavigate}
        >
          <img src={Img1} alt="Logo" className="w-10 h-10 " />
          <div
            className={`md:text-2xl text-lg lg:text-2xl ml-5 font-medium text-gray-200
           ${window.innerWidth < 330 ? "hidden" : ""}`}
          >
            SmartTask
          </div>
        </div>
        <div
          className={`md:text-lg lg:text-lg lg:block md:block text-lg ${
            window.innerWidth < 712 ? "hidden" : ""
          }`}
        >
          <button
            className="cursor-pointer mx-2 hover:underline hover:font-medium text-gray-300 transition-all transform hover:text-gray-100 duration-900 hover:scale-110"
            onClick={() => {
              navigate("/home#home");
            }}
          >
            Home
          </button>
          <button
            onClick={() => handleScrollToSection("about")}
            className="cursor-pointer mx-2 hover:underline hover:font-medium text-gray-300 transition-all transform hover:text-gray-100 duration-900 hover:scale-110"
          >
            About
          </button>
          <button
            onClick={() => handleScrollToSection("stats")}
            className="cursor-pointer mx-2 hover:underline hover:font-medium text-gray-300 transition-all transform hover:text-gray-100 duration-900 hover:scale-110"
          >
            Stats
          </button>
          <button
            onClick={() => handleScrollToSection("features")}
            className="cursor-pointer mx-2 hover:underline hover:font-medium text-gray-300 transition-all transform hover:text-gray-100 duration-900 hover:scale-110"
          >
            Features
          </button>
          <button
            onClick={() => handleScrollToSection("more-info")}
            className="cursor-pointer mx-2 hover:underline hover:font-medium text-gray-300 transition-all transform hover:text-gray-100 duration-900 hover:scale-110"
          >
            More
          </button>
        </div>
        <div>
          {loggedIn ? (
            <div className="flex justify-between w-1/2">
              <button
                onClick={handleNavigateDash}
                className="    text-gray-50 font-bold p-2 text-md rounded transition-all transform hover:scale-110 duration-1000 mr-2 glow-button"
              >
                <AiFillDashboard className="lg:w-5 lg:h-5 " />
                <div className="info-text">Dashboard</div>
              </button>
              <button
                className=" text-gray-50 font-bold md:py-2 lg:py-2 md:px-4 lg:px-4 py-1 px-2 text-sm rounded transition-all transform hover:scale-110 duration-1000 glow-button-logout"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-between  ">
              <button
                className="   text-gray-50 w-22 font-bold md:py-2 lg:py-2 md:px-4 lg:px-4 py-1 px-1 text-sm rounded transition-all transform hover:scale-110 duration-1000  glow-button "
                onClick={() => navigate("/admin-login")}
              >
                Admin
              </button>
              <button
                className="   text-gray-50 w-30 ml-2 font-bold md:py-2 lg:py-2 md:px-4 lg:px-4 py-1 px-1 text-sm rounded transition-all transform hover:scale-110 duration-1000  glow-button "
                onClick={() => navigate("/employee-login")}
              >
                Employee
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
