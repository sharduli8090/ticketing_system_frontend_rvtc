/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAdminService from "../../services/adminService/AdminService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import Table from "../table/Table";

const AllEmployee = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedPosition, setSelectedPosition] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("none"); 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [limit, setLimit] = useState(5);

  const {
    getAllEmployee,
    getEmployeeDeptWise,
    deleteAllEmployee,
    getGenderWiseEmployee,
    getPositionWiseEmployee,
  } = useAdminService();
  const { notifyError } = useToastNotifications();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setFilterNone();
    try {
      const response = await getAllEmployee();

      const formattedData = response?.data.map((employee) => ({
        id: employee.id,
        Email: employee.email,
        Name: employee.empName,
        Position: employee.empPosition,
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
    setCurrentPage(1);
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
          Position: employee.empPosition,
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

  const filterByGender = async () => {
    setLoading(true);
    setCurrentPage(1);
    try {
      if (selectedGender === "all") {
        fetchData();
      } else {
        const response = await getGenderWiseEmployee({
          gender: selectedGender,
        });
        const formattedData = response.data.map((employee) => ({
          id: employee.id,
          Email: employee.email,
          Name: employee.empName,
          Position: employee.empPosition,
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

  const filterByPosition = async () => {
    setLoading(true);
    setCurrentPage(1);
    try {
      if (selectedPosition === "all") {
        fetchData();
      } else {
        const response = await getPositionWiseEmployee({
          position: selectedPosition,
        });
        const formattedData = response.data.map((employee) => ({
          id: employee.id,
          Email: employee.email,
          Name: employee.empName,
          Position: employee.empPosition,
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

  const setFilterOption = (option) => {
    switch (option) {
      case "department":
        setSelectedFilter("department");
        break;
      case "position":
        setSelectedFilter("position");
        break;
      case "gender":
        setSelectedFilter("gender");
        break;
      case "none":
        setSelectedFilter("none");
        fetchData();
        break;
      default:
        setSelectedFilter("none");
    }
  };

  const setFilterNone = () => {
    setSelectedFilter("none");
    setSelectedDepartment("all");
    setSelectedGender("all");
    setSelectedPosition("all");
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
 

  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleLimitChange = (e) => {
    if (limit < 1) {
      notifyError("Limit should be greater than 0");
      return;
    }
    setCurrentPage(1);
    setItemsPerPage(limit);
  };
  return (
    <div className="flex flex-col justify-between items-center mt-32 mb-64 w-auto mx-28">
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div
            className={`flex justify-center items-center flex-row w-full mb-10    `}
          >
            <div className="flex justify-start items-center border-gray-600 border-2 rounded-md px-4 py-2 mr-4">
              <select
                value={selectedFilter}
                onChange={(e) => setFilterOption(e.target.value)}
                className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none font-semibold focus:none glow-input text-gray-50  hover:cursor-pointer"
              >
                <option value="none">No Filter</option>
                <option value="department">Department</option>
                <option value="gender">Gender</option>
                <option value="position">Position</option>
              </select>
            </div>
            {selectedFilter === "department" ? (
              <div className="flex justify-start items-center border-gray-600 border-2 rounded-md px-4 py-2 mr-4">
                <select
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none font-semibold focus:none glow-input text-gray-50  hover:cursor-pointer"
                >
                  <option value="all">All Department</option>
                  <option value="hr">HR</option>
                  <option value="it">IT</option>
                  <option value="finance">Finance</option>
                  <option value="admin">Admin</option>
                </select>
                <button
                  onClick={filterByDepartment}
                  className="text-sm text-gray-50 font-semibold  px-3 py-1 rounded-md glow-button-purple focus:outline-none ml-2  transition-all transform hover:scale-110 duration-1000"
                >
                  Apply
                </button>
              </div>
            ) : (
              ""
            )}

            {selectedFilter === "gender" ? (
              <div className="flex justify-start items-center border-gray-600 border-2 rounded-md px-4 py-2 mr-4">
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none font-semibold focus:none glow-input text-gray-50  hover:cursor-pointer"
                >
                  <option value="all">All Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <button
                  onClick={filterByGender}
                  className="text-sm text-gray-50 font-semibold  px-3 py-1 rounded-md glow-button-purple focus:outline-none ml-2  transition-all transform hover:scale-110 duration-1000"
                >
                  Apply
                </button>
              </div>
            ) : (
              ""
            )}

            {selectedFilter === "position" ? (
              <div className="flex justify-start items-center border-gray-600 border-2 rounded-md px-4 py-2 mr-4">
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none font-semibold focus:none glow-input text-gray-50  hover:cursor-pointer"
                >
                  <option value="all">All Positions</option>
                  <option value="ceo">CEO</option>
                  <option value="manager">Manager</option>
                  <option value="associate">Associate</option>
                  <option value="intern">Intern</option>
                </select>
                <button
                  onClick={filterByPosition}
                  className="text-sm text-gray-50 font-semibold  px-3 py-1 rounded-md glow-button-purple focus:outline-none ml-2  transition-all transform hover:scale-110 duration-1000"
                >
                  Apply
                </button>
              </div>
            ) : (
              ""
            )}
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
            data={currentData}
            update={true}
            delete={true}
            tableType={"employee"}
            fetchData={fetchData}
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <div className="hidden lg:flex md:hidden mt-2 w-full justify-end items-center ">
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              className="focus:none outline-none  w-16 p-1 text-center h-7 rounded-lg  glow-button-purple text-gray-50 text-sm duration-1000 transition-colors transform"
            />
            <button
              onClick={handleLimitChange}
              className="glow-button transition-all transform hover:scale-110 rounded-lg text-sm text-gray-50 ml-5 duration-1000 p-1"
            >
              Change Limit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AllEmployee;
