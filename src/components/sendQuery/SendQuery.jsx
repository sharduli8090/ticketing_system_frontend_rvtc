import React, { useState } from 'react';
import QueryService from '../../services/queryservice/QueryService';
import Loader from '../loader/Loader';

const SendQuery = () => {
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
        if (!formData.name || !formData.query) {
          alert('Please enter your name and query.');
          setIsLoading(false);
          return;
        }   
      const response = await QueryService.sendQuery(formData);
      alert(response.message || 'Query sent successfully!');
      setFormData({ name: '', query: '' });
    } catch (error) {
      alert('Error sending query.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-10 rounded-lg shadow-2xl max-w-md mx-auto m-72">
      {isLoading && <Loader />}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center">
        Got a Query? We&apos;re Here to Help!
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Fill in your details and query below, and we&apos;ll get back to you promptly.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name or Type Anonymous"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
          autoComplete="off"
        />
        <input
          type="text"
          name="query"
          placeholder="Your Query"
          value={formData.query}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 text-gray-800"
          autoComplete="off"
        />
        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition-transform transform hover:scale-105 duration-300"
        >
          Send Query
        </button>
      </form>
    </div>
  );
};

export default SendQuery;
