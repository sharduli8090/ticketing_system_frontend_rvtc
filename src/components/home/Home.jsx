// import React from 'react';
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
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-300 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <div className="bg-white shadow-2xl p-10 relative z-10 ">
            <h1 className="text-5xl font-medium mb-8 text-gray-800">
              Efficiency Meets Excellence
            </h1>
            <h5 className="font-thin h-24">
              <i>
                Our ticketing system is more than just a tool—it&apos;s a catalyst
                for exceptional customer service. By integrating cutting-edge
                technology with user-friendly features, we provide a platform
                that simplifies ticket management, accelerates issue resolution,
                and supports your team in delivering top-notch service. Discover
                how our solution can help you achieve efficiency and excellence
                in every interaction.
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
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-transform transform hover:scale-105 duration-300"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 flex justify-center items-center z-0">
          <svg
            className="w-2/3 h-2/3 opacity-20 transition-transform transform hover:scale-110 duration-300 "
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
          <h2 className="text-4xl font-bold mb-4">Our Stats</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-blue-400 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2">Tickets Solved</h3>
              <p className="text-2xl font-bold">1500+</p>
            </div>
            <div className="bg-blue-400 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2">Happy Clients</h3>
              <p className="text-2xl font-bold">300+</p>
            </div>
            <div className="bg-blue-400 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2">Support Hours</h3>
              <p className="text-2xl font-bold">24/7</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="w-full min-h-screen bg-blue-800 py-20 text-white flex flex-col justify-center items-center transition-all duration-500 ease-in-out">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">Our Products</h2>
          <p className="text-xl mb-8">
            Explore our range of products designed to cater to all your
            ticketing needs.
          </p>
          <div className="flex justify-center space-x-8">
            <div className="bg-white text-blue-900 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2">Product A</h3>
              <p>Comprehensive ticketing solution for large enterprises.</p>
            </div>
            <div className="bg-white text-blue-900 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105 duration-300">
              <h3 className="text-xl font-semibold mb-2">Product B</h3>
              <p>Efficient ticketing system for small and medium businesses.</p>
            </div>
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
      </section>
    </div>
  );
};

export default Home;
