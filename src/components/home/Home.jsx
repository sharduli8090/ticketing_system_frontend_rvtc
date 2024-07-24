import { useEffect } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Img1 from "../../asset/images/about.jpg";
import { featCards, statsCards } from "../../constant/Constant";
import useToastNotifications from "../../services/toastify/ToasterService";

const Home = () => {
  const navigate = useNavigate();
  const { notifyDefault } = useToastNotifications();

  const handleEmployeeLogin = () => {
    navigate("/employee-login");
  };

  const handleSendQuery = () => {
    navigate("/sendquery");
  };
  useEffect(() => {
    notifyDefault("Welcome to Ticketing System");
    notifyDefault("Use dummy data for login as employee ");
    notifyDefault(
      "Click on the icon below right corner of the page for dummy credentials"
    );
  }, [notifyDefault]);

  return (
    <div className="flex flex-col items-center">
      {/* Login Buttons Section */}
      <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center space-y-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="bg-white bg-gradient-to-r from-blue-100 via-white to-blue-100 shadow-2xl p-10 relative z-10 ">
            <h1 className="text-5xl font-medium mb-8 text-gray-800 ">
              Efficiency Meets Excellence
            </h1>
            <h5 className="font-light mb-10">
              <i>
                Our ticketing system is more than just a tool—it&apos;s a
                catalyst for exceptional customer service. By integrating
                cutting-edge technology with user-friendly features, we provide
                a platform that simplifies ticket management, accelerates issue
                resolution, and supports your team in delivering top-notch
                service. Discover how our solution can help you achieve
                efficiency and excellence in every interaction.
              </i>
            </h5>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleEmployeeLogin}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-110 duration-300 w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <svg
            className="w-2/3 h-2/3 opacity-20 text-blue-950 animate-pulse"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 2a10 10 0 100 20 10 10 0 000-20zM4 12a8 8 0 0114.9-4.2L4.2 16.9A8 8 0 014 12zm8 8a8 8 0 01-7-11.9l11.9 11.9A7.967 7.967 0 0112 20zm0-18a8 8 0 014.2.9L3.1 19.8A8 8 0 0112 2zm0 18a8 8 0 007-11.9L7.1 4.2A8 8 0 0112 20zm0-18a8 8 0 01-4.2.9l11.9 11.9A8 8 0 0112 2z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full min-h-screen bg-blue-800 py-20 text-white flex justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center text-center md:text-left">
          <div className="md:w-1/2 p-4">
            <h2 className="text-4xl font-bold mb-4">About Us</h2>
            <p className="text-xl mb-8 text-justify">
              Experience the future of ticket management with our cutting-edge
              system designed for seamless efficiency and user-friendly control.
              Whether you&apos;re an admin or an employee, our intuitive
              dashboards and real-time updates ensure you stay on top of every
              task. Empower your team with effortless logins, comprehensive
              management tools, and instant data synchronization, all in one
              dynamic platform. Join us and transform the way you handle
              tickets, making your workflow smoother and more productive than
              ever before.
            </p>
          </div>
          <div className="md:w-1/2 p-4 flex justify-center">
            <img
              src={Img1}
              alt="About Us"
              className="w-full max-w-md rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full min-h-screen bg-white py-20 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold mb-20">Our Stats</h2>
          <div className="flex justify-center flex-wrap  lg:space-x-8 ">
            {
              // Stats Cards
              statsCards.map((card, index) => (
                <div
                  className="bg-blue-200 w-full lg:w-auto md:w-3/4 p-10 lg:p-20 md:p-20 rounded-lg shadow-lg transition-transform transform hover:scale-110 duration-300 mb-5 hover:bg-blue-300 hover:cursor-default"
                  key={index}
                >
                  <h3 className="text-xl font-semibold mb-2">{card.head}</h3>
                  <p className="lg:text-9xl md:text-9xl text-7xl">
                    {card.desc}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full min-h-screen bg-blue-800 py-20 text-white flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Features</h2>
          <p className="text-xl mb-8">
            Explore our range of features designed to cater to all your
            ticketing needs.
          </p>
          <div className="flex justify-center flex-wrap">
            {featCards.map((card, index) => (
              <div
                className="bg-white text-blue-900 p-6 lg:w-1/3 md:w-1/3 w-full m-5 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300 hover:bg-gradient-to-br hover:from-blue-200 hover:via-white hover:to-indigo-200"
                key={index}
              >
                <h3 className="text-xl font-semibold mb-2">{card.head}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Info Section */}
      <section className="w-full min-h-screen bg-white py-20 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">More Information</h2>
          <p className="text-xl mb-8">
            Get in touch with us to know more about our services and how we can
            help you.
          </p>
        </div>
        <div
          className="bg-gradient-to-b from-blue-200  to-indigo-400 p-20 rounded-full animate-bounce shadow-2xl mt-20 drop-shadow-2xlll"
          onClick={handleSendQuery}
        >
          <FaAnglesDown
            className="text-9xl mt-5 text-white "
            style={{
              background: "linear-gradient(to right, #3b82f6, #6366f1)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          />
        </div>
      </section>
    </div>
  );
};

export default Home;
