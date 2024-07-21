import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import EmployeeService from '../../services/employeeService/EmployeeService';
import Loader from '../loader/Loader';

const CreateTicket = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const empId = localStorage.getItem('empid');
      if (!empId) {
        setErrorMessage("Employee ID not found in local storage");
        setLoading(false);
        return;
      }

      const ticketData = {
        ...data,
        empId
      };

      const resp = await EmployeeService.createTicket(ticketData);
      alert(resp.message);
      if (resp.statuscode === 200) {
        reset();
      } else {
        setErrorMessage("Error creating ticket");
        return;
      }
    } catch (error) {
      setErrorMessage("Error creating ticket");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen flex justify-center items-center ${loading ? "bg-transparent" : "bg-gradient-to-r from-blue-50 to-blue-100"}`}>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-screen-md bg-white rounded-lg px-8 py-12 shadow-lg flex flex-col items-center">
          <h1 className="text-center text-2xl font-medium mb-8">Create Ticket</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-6">
              <label htmlFor="ticketName" className="block text-gray-700 text-sm font-bold mb-2">
                Ticket Name: <span className="text-sm text-red-600">*</span>
              </label>
              <input
                type="text"
                id="ticketName"
                placeholder="Ticket Name"
                {...register("ticketName", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
              />
              {errors.ticketName && <span className="text-red-600 text-sm">Ticket name is required</span>}
            </div>
            <div className="mb-6">
              <label htmlFor="ticketDescription" className="block text-gray-700 text-sm font-bold mb-2">
                Ticket Description: <span className="text-sm text-red-600">*</span>
              </label>
              <textarea
                id="ticketDescription"
                placeholder="Ticket Description"
                {...register("ticketDescription", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
              />
              {errors.ticketDescription && <span className="text-red-600 text-sm">Ticket description is required</span>}
            </div>
            <div className="mb-6">
              <label htmlFor="ticketDepartment" className="block text-gray-700 text-sm font-bold mb-2">
                Ticket Department: <span className="text-sm text-red-600">*</span>
              </label>
              <select
                id="ticketDepartment"
                defaultValue="admin"
                {...register("ticketDepartment", { required: true })}
                className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
                <option value="it">IT</option>
              </select>
              {errors.ticketDepartment && <span className="text-red-600 text-sm">Ticket department is required</span>}
            </div>
            {errorMessage && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}
            <div className="flex items-center mb-4">
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700">
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTicket;
