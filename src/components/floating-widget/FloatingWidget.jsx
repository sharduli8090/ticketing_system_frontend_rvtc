import { useState } from "react";
import { FaUserTie } from "react-icons/fa";

const FloatingWidget = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-3 right-1 lg:bottom-4 lg:right-4 md:bottom-4 md:right-4 z-2000">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white text-2xl border-4 border-blue-900 transform transition-transform hover:scale-125 duration-1000 hover:cursor-pointer hover:rotate-90  glow-button-floating">
          <FaUserTie className="" />
        </div>
        {isHovered && (
          <div className="absolute bottom-14 right-0 bg-gray-950 text-gray-100 border border-gray-300 rounded-md p-4 shadow-2xl shadow-blue-900">
            <b>Welcome to SmartTask!</b>
            <div>email: shardulipandey@smartask.com</div>
            <div>password: test123</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingWidget;
