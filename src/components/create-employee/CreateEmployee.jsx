/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Loader from '../loader/Loader';
import AdminService from '../../services/adminService/AdminService';

const CreateEmployee = () => {
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage('');
    try {
      const resp = await AdminService.createEmployee(data);
      alert(resp.message);
      if(resp.statuscode === 200) {
        reset();  // Reset the form fields
      } else {
        setErrorMessage('Error creating employee');
        return;
      }
    } catch (error) {
      setErrorMessage('Error creating employee');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const password = watch('password', '');

  return (
    <div className={`min-h-screen flex justify-center items-center ${loading ? 'bg-transparent' : 'bg-gradient-to-r from-blue-50 to-blue-100'}`}>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-screen-md bg-white rounded-lg px-8 py-12 shadow-lg flex flex-col items-center">
          <h1 className="text-center text-2xl font-medium mb-8">Employee Registration</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                  Email: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="youremail@example.com"
                  {...register('email', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="empName" className="block text-gray-700 text-sm font-bold mb-2">
                  Name: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="empName"
                  placeholder="Your Name"
                  {...register('empName', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.empName && <span className="text-red-600 text-sm">Name is required</span>}
              </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                  Password: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register('password', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.password && <span className="text-red-600 text-sm">Password is required</span>}
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">
                  Confirm Password: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', {
                    required: true,
                    validate: (value) => value === password || 'Passwords do not match',
                  })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.confirmPassword && <span className="text-red-600 text-sm">{errors.confirmPassword.message}</span>}
              </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="empGender" className="block text-gray-700 text-sm font-bold mb-2">
                  Gender: <span className="text-sm text-red-600">*</span>
                </label>
                <select
                  id="empGender"
                  {...register('empGender', { required: true })}
                  className="shadow bg-white border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.empGender && <span className="text-red-600 text-sm">Gender is required</span>}
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="empDateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">
                  Date of Birth: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="empDateOfBirth"
                  {...register('empDateOfBirth', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.empDateOfBirth && <span className="text-red-600 text-sm">Date of Birth is required</span>}
              </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label htmlFor="empDepartment" className="block text-gray-700 text-sm font-bold mb-2">
                  Department: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="empDepartment"
                  placeholder="Employee Department"
                  {...register('empDepartment', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.empDepartment && <span className="text-red-600 text-sm">Department is required</span>}
              </div>
              <div className="w-full md:w-1/2">
                <label htmlFor="empPosition" className="block text-gray-700 text-sm font-bold mb-2">
                  Position: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="empPosition"
                  placeholder="Employee Position"
                  {...register('empPosition', { required: true })}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-blue-500 focus:ring-opacity-50"
                />
                {errors.empPosition && <span className="text-red-600 text-sm">Position is required</span>}
              </div>
            </div>

            {errorMessage && <div className="text-red-500 text-sm mt-1">{errorMessage}</div>}

            <div className="flex items-center mb-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateEmployee;
