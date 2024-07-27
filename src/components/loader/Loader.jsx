import "ldrs/quantum";
const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-100 opacity-90 flex justify-center items-center z-80">
      <l-quantum size="80" speed="1.75" color="blue"></l-quantum>
    </div>
  );
};

export default Loader;
