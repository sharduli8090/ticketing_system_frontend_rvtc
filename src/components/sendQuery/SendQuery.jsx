/* eslint-disable no-unused-vars */
import { useState } from "react";
import useSendQueryService from "../../services/queryservice/QueryService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";

const SendQuery = () => {
  const { sendQuery } = useSendQueryService();
  const [formData, setFormData] = useState({ name: "", query: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { notifyError } = useToastNotifications();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!formData.name || !formData.query) {
        notifyError("Please enter your name and query.");
        setIsLoading(false);
        return;
      }
      const response = await sendQuery(formData);
      setFormData({ name: "", query: "" });
    } catch (error) {
      notifyError("Error sending query.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" p-10 rounded-lg shadow-2xl max-w-md mx-auto lg:my-72 md:my-60 my-48  w-full glow-login-blue ">
      <BackButton />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h2 className="lg:text-3xl md:text-3xl text-2xl font-semibold text-gray-50 mb-4 text-center">
            Got a Query? We&apos;re Here to Help!
          </h2>
          <p className="text-gray-50 text-center mb-6 text-sm lg:text-base md:text-base">
            Fill in your details and query below, and we&apos;ll get back to you
            promptly.
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name or Type Anonymous"
              value={formData.name}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-1 lg:py-2 md:py-2 px-2 lg:px-3 md:px-3  text-gray-50 focus:outline-none focus:none text-sm lg:text-base md:text-base glow-input-blue"
              autoComplete="off"
            />
            <textarea
              type="text"
              name="query"
              id="queryDescription"
              placeholder="Your Query"
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-1 lg:py-2 md:py-2 px-2 lg:px-3 md:px-3  text-gray-50 focus:outline-none focus:none text-sm lg:text-base md:text-base glow-input-blue"
              autoComplete="off"
            />
            {/* <input
              type="text"
              name="query"
              placeholder="Your Query"
              value={formData.query}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-1 lg:py-2 md:py-2 px-2 lg:px-3 md:px-3  text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50 text-sm lg:text-base md:text-base"
              autoComplete="off"
            /> */}
            <button
              type="submit"
              className="w-full py-1 text-base lg:py-2 md:py-2   text-white font-bold rounded-md hover:bg-blue-600 transition-all transform hover:scale-110 duration-1000 glow-button"
            >
              Send Query
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default SendQuery;
