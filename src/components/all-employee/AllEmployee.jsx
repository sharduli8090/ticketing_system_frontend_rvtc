/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import Table from '../table/Table';
import AdminService from '../../services/adminService/AdminService';

const AllEmployee = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const {
    getAllEmployee,
    getEmployeeDeptWise,
    deleteAllEmployee,
  } = AdminService; // Use the object methods directly

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllEmployee();
      console.log('Response:', response);
      const formattedData = response.data.map((employee) => ({
        id: employee.id,
        Email: employee.email,
        Name: employee.empName,
        Designation: employee.empPosition,
        Gender: employee.empGender,
        Date_Of_Birth: employee.empDateOfBirth,
        Date_Of_Joining: employee.empDateOfJoining,
        No_Of_Tickets_Raised: employee.empNoOfTicketsRaised,
        Department: employee.empDepartment,
      }));
      setData(formattedData);
      console.log('Data fetched successfully', formattedData);
    } catch (error) {
      alert('An error occurred while fetching data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterByDepartment = async () => {
    setLoading(true);
    try {
      if (selectedDepartment === 'all') {
        fetchData();
      } else {
        const response = await getEmployeeDeptWise({ dept: selectedDepartment });
        const formattedData = response.data.map((employee) => ({
          id: employee.id,
          Email: employee.email,
          Name: employee.empName,
          Designation: employee.empPosition,
          Gender: employee.empGender,
          Date_Of_Birth: employee.empDateOfBirth,
          Date_Of_Joining: employee.empDateOfJoining,
          No_Of_Tickets_Raised: employee.empNoOfTicketsRaised,
          Department: employee.empDepartment,
        }));
        setData(formattedData);
        console.log(`Data fetched successfully for department: ${selectedDepartment}`, formattedData);
      }
    } catch (error) {
      alert(`An error occurred while fetching data for department: ${selectedDepartment}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllEmployee();
      alert('All employees deleted successfully');
      setData([]);
    } catch (error) {
      alert('An error occurred while deleting all employees');
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center mt-32 mb-64 w-auto mx-28">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="flex justify-center items-center flex-row w-full mb-10">
            <div className="flex justify-start items-center border-gray-200 border-2 rounded-md px-4 py-2 mr-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500 bg-blue-200 hover:bg-blue-100 hover:cursor-pointer"
              >
                <option value="all">All</option>
                <option value="hr">HR</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
              </select>
              <button
                onClick={filterByDepartment}
                className="text-sm text-white bg-blue-600 px-3 py-1 rounded-md hover:bg-blue-800 focus:outline-none ml-2"
              >
                Filter
              </button>
            </div>
            <div className="flex justify-end items-center border-gray-200 border-2 rounded-md px-4 py-2">
              <button
                onClick={handleDeleteAll}
                className="text-sm text-white bg-red-500 px-3 py-1 rounded-md hover:bg-red-800 focus:outline-none"
              >
                Delete All
              </button>
            </div>
          </div>
          <Table data={data} />
        </>
      )}
    </div>
  );
};

export default AllEmployee;