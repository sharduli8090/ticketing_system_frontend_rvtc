// import React from 'react';
import { FaAnglesDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const navigate = useNavigate();

  //   const handleAdminLogin = () => {
  //     navigate("/admin-login");
  //   };

  const handleEmployeeLogin = () => {
    navigate("/employee-login");
  };

  return (
    <div className="flex flex-col items-center">
      {/* Login Buttons Section */}
      <section className="w-full min-h-screen bg-white flex flex-col justify-center items-center space-y-8 relative">
        {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-300 opacity-50"></div> */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="bg-whitek bg-gradient-to-r from-blue-100 via-white to-blue-100  shadow-2xl p-10 relative z-10  ">
            <h1 className="text-5xl font-medium mb-8 text-gray-800">
              Efficiency Meets Excellence
            </h1>
            <h5 className="font-thin h-24">
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
              {/* <button
                onClick={handleAdminLogin}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-transform duration-300"
              >
                Admin Login
              </button> */}
              <button
                onClick={handleEmployeeLogin}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-110 duration-300 w-full"
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
      <section className="w-full min-h-screen bg-blue-800 py-20 text-white flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">About Us</h2>
          <p className="text-xl mb-8">
            We provide excellent ticketing system services to streamline your
            workflow and enhance productivity.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full min-h-screen bg-white py-20 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-semibold mb-20 ">Our Stats</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-blue-200 p-20 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-sembold mb-2">Tickets Solved</h3>
              <p className="text-9xl ">1500+</p>
            </div>
            <div className="bg-blue-200 p-20 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-semibokld mb-2">Happy Clients</h3>
              <p className="text-9xl ">300+</p>
            </div>
            <div className="bg-blue-200 p-20 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-semibokld mb-2">Support Hours</h3>
              <p className="text-9xl ">24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full min-h-screen bg-blue-800 py-20 text-white flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Features</h2>
          <p className="text-xl mb-8">
            Explore our range of features designed to cater to all your
            ticketing needs.
          </p>
          <div className="flex justify-center flex-wrap ">
            <div className="bg-white text-blue-900 p-6 w-1/3 m-5 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-semibold mb-2">
                Seamless Two-Way Login
              </h3>
              <p>
                Effortlessly switch between admin and employee roles with
                secure, easy logins.
              </p>
            </div>
            <div className="bg-white text-blue-900 p-6 w-1/3 m-5 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-semibold mb-2">
                Tailored Dashboards
              </h3>
              <p>
                Enjoy personalized dashboards designed specifically for admins
                and employees, providing a focused and intuitive user
                experience.
              </p>
            </div>
            <div className="bg-white text-blue-900 p-6 w-1/3 m-5 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-semibold mb-2">
                Comprehensive Admin Control
              </h3>
              <p>
                Manage everything with ease: view, update, and delete all
                tickets and employee data from one powerful admin panel.
              </p>
            </div>
            <div className="bg-white text-blue-900 p-6 w-1/3 m-5 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-semibold mb-2">
                Efficient Ticket Resolution
              </h3>
              <p>
                Admins can quickly close individual tickets, ensuring swift
                issue resolution.
              </p>
            </div>
            <div className="bg-white text-blue-900 p-6 w-1/3 m-5 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-semibold mb-2">
                Empowered Employee Access
              </h3>
              <p>
                Employees can manage their profiles, view tickets they’ve raised
                or are assigned to, and close them with ease.
              </p>
            </div>
            <div className="bg-white text-blue-900 p-6 w-1/3 m-5 rounded-lg shadow-md transition-transform transform hover:scale-110 duration-300">
              <h3 className="text-xl font-semibold mb-2">
                Instant Real-Time Updates
              </h3>
              <p>
                Stay up-to-date with automatic real-time data synchronization,
                ensuring everyone has the latest information at their
                fingertips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* More Info Section */}
      <section className="w-full min-h-screen bg-white py-20 flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          <h2 className="text-4xl font-bold mb-4">More Information</h2>
          <p className="text-xl mb-8">
            Get in touch with us to know more about our services and how we can
            help you.
          </p>
        </div>
        <FaAnglesDown
          className="text-9xl mt-5 text-blue-500 animate-bounce"
          style={{
            background: "linear-gradient(to right, #3b82f6, #6366f1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        />
      </section>
    </div>
  );
};

export default Home;
