import { useState } from "react";
import { FaUserTie } from "react-icons/fa";

const FloatingWidget = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="w-12 h-12 bg-indigo-500 rounded-full flex items-center justify-center text-white text-2xl border-2 border-indigo-700">
          <FaUserTie />
        </div>
        {isHovered && (
          <div className="absolute bottom-14 right-0 bg-white border border-gray-300 rounded-lg p-4 shadow-2xl shadow-blue-300">
            <b>Welcome to SmartTask!</b>
            <div>email: dummyemail@dummy.com</div>
            <div>password: test123</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FloatingWidget;
