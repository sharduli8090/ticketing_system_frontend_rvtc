import { useEffect, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import Img1 from "../../asset/images/favicon.ico";
import useAuthService from "../../services/authService/AuthService";

const Header = () => {
  const { isLoggedIn, logout , getUserType} = useAuthService();
  const [loggedIn, setLoggedIn] = useState(isLoggedIn());
  const [isEmployeeLogin, setIsEmployeeLogin] = useState(true);
  const navigate = useNavigate();

  // Sync loggedIn state with isLoggedIn
  useEffect(() => {
    setLoggedIn(isLoggedIn());
  }, [isLoggedIn]);

  // Handle logout
  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    if (isEmployeeLogin) {
      navigate("/employee-login");
    } else {
      navigate("/admin-login");
    }
  };

  // Toggle between admin and employee login
  const toggleLogin = () => {
    setIsEmployeeLogin(!isEmployeeLogin);
    navigate(isEmployeeLogin ? "/admin-login" : "/employee-login");
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
}

  return (
    <>
      <header className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-800 via-blue-700 to-blue-400 text-white shadow-md">
        <img
          src={Img1}
          alt="Logo"
          className="w-10 h-10 animate-pulse hover:cursor-pointer"
          onClick={handleNavigate}
        />
        <div className="md:text-3xl lg:text-3xl hidden lg:block md:block  text-md  font-medium">
          SmartTask Ticketing System
        </div>
        <div>
          {loggedIn ? (
            <div className="flex justify-between w-1/2"> 
              <button
                className="bg-blue-300   hover:bg-blue-700 text-white font-bold p-2 text-md rounded transition-transform transform hover:scale-110 duration-800 mr-2"
                onClick={handleNavigateDash}
              >
                <GoHomeFill className="lg:w-5 lg:h-5 " />
              </button>
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold md:py-2 lg:py-2 md:px-4 lg:px-4 py-1 px-2 text-sm rounded transition-transform transform hover:scale-110 duration-800"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold md:py-2 lg:py-2 md:px-4 lg:px-4 py-1 px-2 text-sm rounded transition-transform transform hover:scale-110 duration-800"
              onClick={toggleLogin}
            >
              {isEmployeeLogin ? "Admin Login" : "Employee Login"}
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
