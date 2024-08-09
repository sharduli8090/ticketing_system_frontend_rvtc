import "./Loader.css";
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-900 opacity-90 flex justify-center items-center z-800">
      <div className="containerload z-799">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
    </div>
  );
};

export default Loader;
