import "./Loader.css";
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 opacity-90 flex justify-center items-center z-80">
      <div className="containerload">
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
