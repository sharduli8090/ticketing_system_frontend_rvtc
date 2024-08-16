import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Img1 from "../../asset/images/favicon.ico";
import useAuthService from "../../services/authService/AuthService";import { FaGithub ,FaLinkedin} from "react-icons/fa";

import { admin, employee, general1, general2, nologin } from "../../constant/Constant";
const Footer = () => {
  const navigate = useNavigate();
  const { isLoggedIn, getUserType } = useAuthService();
  // useEffect(() => {
    const loggedIn = isLoggedIn();
    const userType = getUserType();
  // }, []);


  return (
    <footer className="flex  items-center pb-3 bg-gradient-to-t from-gray-900  to-gray-950 text-gray-50 flex-col">

      <div className="w-full h-24 bg-gray-950 ">&nbsp;</div>


        <div className={`flex lg:flex-row flex-col items-center  justify-evenly w-full py-16 px-10 
        ${
          innerWidth < 330 ? "hidden" : "block"
        }
        `}>


          <div className="flex flex-row items-center justify-center animate-pulse w-1/4">
            <img src={Img1} alt="Logo" className="w-16 h-16  " />
            <span className="text-2xl ml-2 font-medium">SmartTask</span>
          </div>
          
          <div className="lg:w-[2px] lg:h-44 md:w-full md:h-[2px] w-full h-[2px] bg-gray-800 lg:mx-5 md:my-10 my-7 ">
&nbsp;
</div>    

 <div className="w-full lg:w-3/4 flex justify-evenly text-gray-300">
  
<div className="flex flex-col items-start bg-whitwe w-1/6">
  {general1.map((item, index) => (
    <div key={index} className="text-lg hover:cursor-pointer hover:text-blue-500
    hover:underline">
      <a href
      onClick={() => navigate(item.link)}
      >
        {item.name}
      </a>
    </div>
  ))}
</div>
<div className="flex flex-col items-start bg-whitwe w-1/6">
  {general2.map((item, index) => (
    <div key={index} className="text-lg hover:cursor-pointer hover:text-blue-500
    hover:underline">
      <a href
      onClick={() => navigate(item.link)}
      >
        {item.name}
      </a>
    </div>
  ))}
</div>





<div className="flex flex-col items-start w-1/6 ">
{loggedIn && userType === "employee" && employee.map((item, index) => (
  <div key={index} className="text-lg hover:cursor-pointer hover:text-blue-500
  hover:underline">
      <a href
      onClick={() => navigate(item.link)}
      >
        {item.name}
      </a>

      </div>
  ))}
  {loggedIn && userType === "admin" && admin.map((item, index) => (
    <div key={index} className="text-lg hover:cursor-pointer hover:text-blue-500
    hover:underline">
        <a href
        onClick={() => navigate(item.link)}
        >
          {item.name}
        </a>
  
        </div>
    ))}
    {!loggedIn  && nologin.map((item, index) => (
        <div key={index} className="text-lg hover:cursor-pointer hover:text-blue-500
        hover:underline">
          <a href
          onClick={() => navigate(item.link)}
          >
            {item.name}
          </a>
    
          </div>
      ))}
  </div>
  


        </div>
            </div>



      <div className="bg-gray-800 h-[1px] w-full  mb-10"></div>

      <div className="flex mb-5">
      <a href="https://github.com/sharduli8090/" target="_blank" rel="noopener noreferrer">

      <FaGithub className="lg:text-4xl md:text-3xl text-xl transition-all transform duration-1000 hover:scale-150  hover:cursor-pointer lg:mx-2 mx-1  "  />
        </a>
        <a href="https://www.linkedin.com/in/shardulipandey/" target="_blank" rel="noopener noreferrer">
      <FaLinkedin className="lg:text-4xl md:text-3xl text-xl  transition-all transform duration-1000 hover:scale-150  hover:cursor-pointer lg:mx-2 mx-1 " />
     </a>
      </div>
      <div className="text-xs   hover:cursor-default mb-10">
        &copy; 2024 Created by Creativstan
      </div> 
    </footer>
  );
};

export default Footer;
