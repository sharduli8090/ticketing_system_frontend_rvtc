import React, { useState } from 'react';
import QueryService from '../../services/queryservice/QueryService';
import Loader from '../loader/Loader';

const Footer = () => {
  const [formData, setFormData] = useState({ name: '', query: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await QueryService.sendQuery(formData);
      alert(response.message || 'Query sent successfully!');
      setFormData({ name: '', query: '' }); // Clear input boxes after successful submission
    } catch (error) {
      alert('Error sending query.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="flex justify-between items-center pb-3 bg-gradient-to-r from-blue-700 to-blue-500 text-white shadow-md flex-col">
      {isLoading && <Loader />}
      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row mt-5 md:mt-0 mb-7 md:mb-20 md:flex-wrap lg:flex-nowrap justify-center lg:py-7 md:py-10 lg:mx-0 md:w-full md:bg-blue-800">
        <input
          type="text"
          name="name"
          placeholder="Your Name or Type Anonymous"
          value={formData.name}
          onChange={handleInputChange}
          className="md:px-3 md:py-2 px-2 py-2 md:mr-2 md:mb-0 mb-2 text-center md:text-left lg:text-left rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 text-md"
          autoComplete="off"
        />
        <input
          type="text"
          name="query"
          placeholder="Your Query"
          value={formData.query}
          onChange={handleInputChange}
          className="md:px-3 md:py-2 px-2 py-2 md:mb-0 md:mr-2 mb-2 text-center md:text-left lg:text-left rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800 text-md"
          autoComplete="off"
        />
        <button
          type="submit"
          className="btn btn-sm bg-blue-300 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded-md md:mt-5 md:w-full md:mx-28 lg:mx-0 lg:w-auto lg:mt-0"
        >
          Send Query
        </button>
      </form>
      <p className="text-xs">&copy; 2024 Created by Creativstan</p>
    </footer>
  );
};

export default Footer;
