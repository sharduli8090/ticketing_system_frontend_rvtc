import { FaLock } from "react-icons/fa";
import useToastNotifications from "../../services/toastify/ToasterService";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {
  const navigate = useNavigate();
  const { notifyError } = useToastNotifications();
  notifyError("Unauthorized access");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800 p-6">
      <div className="flex items-center justify-center mb-6">
        <FaLock className="text-blue-600 text-6xl mr-4" />
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
        className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        onClick={() => navigate("/home")}
      >
        Take me to Home
      </button>
    </div>
  );
};

export default Unauthorized;
