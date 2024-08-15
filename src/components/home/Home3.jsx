import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { FaAnglesDown } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import Img1 from "../../asset/images/about.jpg";
import Icon from "../../asset/images/icon.png";
import { featCards, statsCards } from "../../constant/Constant";
import useHomeToastNotifications from "../../services/toastify/HomeToasterService";

gsap.registerPlugin(ScrollTrigger);
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
  const { notifyDefault } = useHomeToastNotifications();
  const location = useLocation();
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

  const handleSendQuery = () => {
    navigate("/sendquery");
  };

  const showNotifications = () => {
    notifyDefault("Welcome to SmartTask!");
    notifyDefault("Use dummy data for logging in as employee ");
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

  useEffect(() => {
    // Function to determine distance based on screen size
    const getAnimationDistance = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth < 768) return 10; // Small screens
      if (screenWidth < 500) return 3; // Small screens
      if (screenWidth < 1024) return 100; // Medium screens
      return 50; // Large screens
    };

    const distance = getAnimationDistance();
    // ScrollTrigger for each section
    gsap.utils.toArray("section").forEach((section) => {
      gsap.fromTo(
        section,
        {},
        {
          duration: 1.5,
          scrollTrigger: {
            trigger: section,
            start: "top 90%", // Adjusted for better visibility on small screens
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    });

    // Additional animations
    gsap.fromTo(
      ".glow-button-more",
      { scale: 0.6, opacity: 0.5 },
      {
        scale: 1.3,
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: ".glow-button-more",
          start: "top 80%", // Adjusted for better visibility on small screens
          end: "bottom 60%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".glow-button-image",
      { scale: 0.8, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: ".glow-button-image",
          start: "top 90%", // Adjusted for better visibility on small screens
          end: "bottom 70%",
          scrub: true,
        },
      }
    );
    gsap.fromTo(
      ".glow-stat-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: ".glow-stat-card",
          start: "top 90%", // Adjusted for better visibility on small screens
          end: "bottom 70%",
          scrub: true,
        },
      }
    );

    // Animate feature cards coming from sides with distance based on screen size
    gsap.utils.toArray(".glow-feat-card").forEach((card, index) => {
      gsap.fromTo(
        card,
        { x: index % 2 === 0 ? -distance : distance, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 90%", // Adjusted for better visibility on small screens
            end: "bottom 70%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center bg-black ">
      {/* Login Buttons Section */}
      <section
        id="home"
        className={`bg-gradient-to-b from-black via-gray-950 to-gray-900 w-full min-h-screen   flex flex-row justify-evenly lg:justify-evenly md:justify-evenly items-start lg:items-center md:items-center relative bg-cover bg-center  `}
      >
        <div className="lg:mx-0 md:mx-14 mx-3 rounded-lg p-0 mt-44 lg:mt-0 md:mt-0 zindeximage ">
          <div className="text-6xl lg:text-4xl md:text-4xl lg:mb-6 mb-2 font-semibold lg:font-normal  lg:text-left md:text-left text-center  text-white">
            Enhancing Operations with Superior
          </div>
          <div className="text-7xl lg:text-9xl md:text-7xl font-bold lg:font-semibold bg-gradient-to-r from-blue-600 via-purple-500 to-purple-600 bg-clip-text text-transparent lg:text-left md:text-left text-center lg:h-40 h-24 md:h-20 ">
            {displayQuality}
          </div>
        </div>
        <img
          src={Icon}
          alt="Icon"
          className="w-1/2 h-1/2 md:h-1/3 md:w-1/3 md:mr-20 lg:mr-0 mr-0 mt-32 zindeximage hidden lg:block md:block transition-opacity hover:opacity-50 duration-1000 hover:cursor-pointer"
        />

        <div className="absolute top-0 left- w-full h-full">
          <div className="absolute lg:w-96 md:w-72 w-80 lg:h-96 md:h-72 h-80 bg-blue-500 opacity-20 rounded-full filter blur-2xl lg:bottom-32 lg:right-20 md:bottom-20 md:right-20 bottom-40 right-40 "></div>
          <div className="absolute lg:w-96 md:w-72 w-40 lg:h-72 md:h-96 h-40 bg-blue-500 opacity-20 rounded-full filter blur-2xl lg:bottom-28 lg:right-80 md:bottom-40 md:right-2 bottom-20 right-20 hidden lg:block md:block"></div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="bg-gradient-to-b from-gray-900 via-gray-950 to-black w-full min-h-screen  py-20 text-gray-200 flex justify-center items-center transition-all duration-500 ease-in-out relative bg-cover bg-center"
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
        id="stats"
        className="w-full min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900  py-20 flex flex-col justify-center items-center transition-all duration-500 ease-in-out relative bg-cover bg-center"
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
        id="features"
        className="w-full min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black  py-20  flex flex-col justify-center items-center transition-all duration-500 ease-in-out relative bg-cover bg-center"
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
        id="more-info"
        className="w-full min-h-screen bg-gradient-to-b from-black via-gray-950 to-gray-900  py-20 flex flex-col justify-center items-center transition-all duration-500 ease-in-out  relative bg-cover bg-center"
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
          className="bg-gradient-to-b from-blue-800 via-blue-900 to-purple-800 p-20 rounded-full animate-boudnce  duration-1000 transition-transform transform hover:scale-150  mt-20 hover:cursor-pointer glow-button-more border-2 border-blue-700 "
          onClick={handleSendQuery}
        >
          <FaAnglesDown
            className="lg:text-9xl md:text-9xl text-7xl text-white duration-1000 transition-transform transform hover:scale-150  "
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
