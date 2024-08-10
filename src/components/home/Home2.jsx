import { useEffect, useRef, useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Img1 from "../../asset/images/about.jpg";
import Img from "../../asset/images/sec1Large.png";
import Bg2 from "../../asset/images/sec2page.png";
import Bg3 from "../../asset/images/sec3.png";
import { featCards, statsCards } from "../../constant/Constant";
import useToastNotifications from "../../services/toastify/ToasterService";

const Home = () => {
  const navigate = useNavigate();

  const qualities = [
    "Quality",
    "Precision",
    "Efficiency",
    "Speed",
    "Reliability",
    "Simplicity",
  ];
  const [displayQuality, setDisplayQuality] = useState("");

  const [qualityIndex, setQualityIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const { notifyDefault } = useToastNotifications();
  const hasNotified = useRef(false);
  useEffect(() => {
    let typingInterval;

    const handleTyping = () => {
      const currentName = qualities[qualityIndex];

      if (charIndex < currentName.length) {
        setDisplayQuality((prevName) => prevName + currentName[charIndex]);
        setCharIndex((prevIndex) => prevIndex + 1);
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setDisplayQuality("");
          setQualityIndex((prevIndex) => (prevIndex + 1) % qualities.length);
          setCharIndex(0);
        }, 1500);
      }
    };

    typingInterval = setInterval(handleTyping, 200);

    return () => clearInterval(typingInterval);
  }, [charIndex, qualityIndex]);
  // const handleEmployeeLogin = () => {
  //   navigate("/employee-login");
  // };

  const handleSendQuery = () => {
    navigate("/sendquery");
  };

  const showNotifications = () => {
    notifyDefault("Welcome to SmartTask!");
    notifyDefault("Use dummy data for login as employee ");
    notifyDefault(
      "Click on the icon below right corner of the page for dummy credentials"
    );
  };
  useEffect(() => {
    if (!hasNotified.current) {
      showNotifications();
      hasNotified.current = true;
    }
  }, []);
  return (
    <div className="flex flex-col items-center">
      {/* Login Buttons Section */}
      <section
        className={`w-full min-h-screen bg-gray-900 flex flex-row justify-center lg:justify-start md:justify-start items-start lg:items-center md:items-center relative bg-cover bg-center ${
          window.innerWidth < 768 ? "no-bg-sm" : ""
        }`}
        style={{ backgroundImage: `url(${Img})` }}
      >
        <div className="lg:mx-14 md:mx-14 mx-3 rounded-lg p-0 md:bg-gray-900 md:bg-opacity-60 md:p-5 lg:bg-opacity-0 mt-44 lg:mt-0 md:mt-0 ">
          <div className="text-6xl lg:text-4xl md:text-4xl lg:mb-6 mb-2 font-semibold lg:font-normal  lg:text-left md:text-left text-center  text-white">
            Enhancing Operations with Superior
          </div>
          <div className="text-7xl lg:text-9xl md:text-7xl font-bold lg:font-semibold bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 bg-clip-text text-transparent lg:text-left md:text-left text-center lg:h-40 h-24 md:h-20">
            {displayQuality}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        className="w-full min-h-screen bg-white py-20 text-gray-200 flex justify-center items-center transition-all duration-500 ease-in-out relative bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg2})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center text-center md:text-left ">
          <div className="md:w-1/2 p-4">
            <h2 className="lg:text-4xl md:text-4xl text-2xl font-bold mb-4">
              About Us
            </h2>
            <p className="lg:text-xl md:text-xl text-sm mb-8 text-justify">
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
              className="w-full max-w-md rounded-lg shadow-lg transform transition-transform hover:scale-110 duration-1000 glow-button-image"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        className="w-full min-h-screen bg-gray-900 py-20 flex flex-col justify-center items-center transition-all duration-500 ease-in-out relative bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg3})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="lg:text-4xl md:text-4xl text-2xl  font-semibold mb-20 text-white">
            Our Stats
          </h2>
          <div className="flex justify-center flex-wrap  lg:space-x-8 ">
            {
              // Stats Cards
              statsCards.map((card, index) => (
                <div
                  className=" bg-gradient-to-bl from-blue-400 via-blue-800 to-blue-900 w-full lg:w-1/3 md:w-3/4 p-10 lg:p-14 md:p-20 rounded-lg shadow-lg transition-all transform hover:scale-105 duration-1000 mb-10   hover:cursor-default glow-stat-card text-gray-200 border-2 border-blue-700 flex flex-col justify-center items-center"
                  key={index}
                >
                  <h3 className="text-xl font-semibold mb-2">{card.head}</h3>
                  <p className="lg:text-9xl md:text-9xl text-7xl ">
                    {card.desc}
                  </p>
                </div>
              ))
            }
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section
        className="w-full min-h-screen bg-white py-20  flex flex-col justify-center items-center transition-all duration-500 ease-in-out relative bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg3})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="lg:text-4xl md:text-4xl text-2xl font-bold mb-4 text-gray-100">
            Our Features
          </h2>
          <p className="lg:text-xl md:text-xl text-md mb-8 text-gray-100">
            Explore our range of features designed to cater to all your
            ticketing needs.
          </p>
          <div className="flex justify-center flex-wrap text-gray-100  ">
            {featCards.map((card, index) => (
              <div
                className="bg-white   p-6 lg:w-1/3 md:w-1/3 w-full m-5 rounded-lg shadow-md  transform hover:scale-110 duration-1000 transition-all bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 border-2 border-purple-500   hover:cursor-default glow-feat-card"
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
      <section
        className="w-full min-h-screen   py-20 flex flex-col justify-center items-center transition-all duration-500 ease-in-out  relative bg-cover bg-center"
        style={{ backgroundImage: `url(${Bg3})` }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-100">
          <h2 className="lg:text-4xl md:text-4xl text-2xl font-bold mb-4 ">
            More Information
          </h2>
          <p className="lg:text-xl md:text-xl text-md mb-8">
            Get in touch with us to know more about our services and how we can
            help you.
          </p>
        </div>
        <div
          className="bg-gradient-to-b from-blue-800 via-blue-900 to-purple-800 p-20 rounded-full animate-bounce shadow-2xl mt-20 hover:cursor-pointer glow-button-more border-2 border-blue-700"
          onClick={handleSendQuery}
        >
          <FaAnglesDown
            className="lg:text-9xl md:text-9xl text-7xl text-white   "
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
