/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAdminService from "../../services/adminService/AdminService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";
import Table from "../table/Table";

const AllEmployee = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [noData, setNoData] = useState(false);

  const { getAllEmployee, getEmployeeDeptWise, deleteAllEmployee } =
    useAdminService();
  const { notifyError } = useToastNotifications();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllEmployee();
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
    } catch (error) {
      notifyError("An error occurred while fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterByDepartment = async () => {
    setLoading(true);
    try {
      if (selectedDepartment === "all") {
        fetchData();
      } else {
        const response = await getEmployeeDeptWise({
          dept: selectedDepartment,
        });
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
      }
    } catch (error) {
      notifyError(
        `An error occurred while fetching data for department: ${selectedDepartment}`
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setLoading(true);
      const delResp = await deleteAllEmployee();
      setData([]);
    } catch (error) {
      notifyError("An error occurred while deleting all employees");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data.length === 0) {
      setNoData(true);
    } else {
      setNoData(false);
    }
  }, [data]);
  return (
    <div className="flex flex-col justify-between items-center mt-32 mb-64 w-auto mx-28">
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={`flex justify-center items-center flex-row w-full mb-10    ${
              noData ? "hidden" : "block"
            }`}
          >
            <div className="flex justify-start items-center border-gray-600 border-2 rounded-md px-4 py-2 mr-4">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none font-semibold focus:none glow-input text-gray-50  hover:cursor-pointer"
              >
                <option value="all">All</option>
                <option value="hr">HR</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
              </select>
              <button
                onClick={filterByDepartment}
                className="text-sm text-gray-50 font-semibold  px-3 py-1 rounded-md glow-button-purple focus:outline-none ml-2  transition-all transform hover:scale-110 duration-1000"
              >
                Filter
              </button>
            </div>
            <div className="flex justify-end items-center border-gray-600 border-2 rounded-md px-4 py-2">
              <button
                onClick={handleDeleteAll}
                className="text-sm text-gray-50  px-3 py-1 rounded-md font-semibold focus:outline-none transition-all transform hover:scale-110 duration-1000 glow-button-logout"
              >
                Delete All
              </button>
            </div>
          </div>
          <Table
            data={data}
            update={true}
            delete={true}
            tableType={"employee"}
          />
        </>
      )}
    </div>
  );
};

export default AllEmployee;
