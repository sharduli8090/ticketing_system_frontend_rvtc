const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 opacity-75 flex justify-center items-center z-50">
      <div className="w-16 h-16 rounded-full border-4 border-dashed border-blue-500 animate-spin"></div>
    </div>
  );
};

export default Loader;
