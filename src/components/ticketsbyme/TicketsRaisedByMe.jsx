import { useEffect, useState } from "react";
import useEmployeeService from "../../services/employeeService/EmployeeService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";
import Table from "../table/Table";

import Pagination from "../pagination/Pagination";
const TicketsRaisedByMe = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notifyError } = useToastNotifications();
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [limit, setLimit] = useState(5); 
  const { getTicketsRaisedByMe, getTicketsRaisedByMeDeptWise, getTicketsRaisedByMeStatusWise } = useEmployeeService();

  useEffect(() => {
    fetchData();
  }, []);
 
  const fetchData = async () => {
    setLoading(true); 
    setCurrentPage(1);  
    setFilterNone();
    try {
      const empid = localStorage.getItem("empid");
      if (empid === null) {
        notifyError("Please login to view tickets");
        return;
      }
      const obj = { empId: empid };
      const response = await getTicketsRaisedByMe(obj);
      const formattedData = response?.data.map((ticket) => ({
        id: ticket.id,
        Title: ticket.ticketName,
        Description: ticket.ticketDescription,
        CreatedAt: ticket.dateOfCreation,
        DateOfCompletion: ticket.dateOfCompletion || "Not Completed",
        RaisedBy: ticket.ticketRaisedByName,
        AssignedTo: ticket.ticketAssignedToName,
        Status: ticket.ticketStatus,
        Comments: ticket.ticketComments,
        Department: ticket.ticketDepartment,
      }));
      setData(formattedData);
    } catch (error) {
      notifyError("An error occurred while fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const filterByDept = async () => {
    setLoading(true);
    setCurrentPage(1);
    try {
      if (selectedDepartment === "all") {
        fetchData();
      } else {
        const response = await getTicketsRaisedByMeDeptWise({ dept: selectedDepartment, empId: localStorage.getItem("empid") }); 
        const formattedData = response?.data.map((ticket) => ({
          id: ticket.id,
          Title: ticket.ticketName,
          Description: ticket.ticketDescription,
          CreatedAt: ticket.dateOfCreation,
          DateOfCompletion: ticket.dateOfCompletion || "Not Completed",
          RaisedBy: ticket.ticketRaisedByName,
          AssignedTo: ticket.ticketAssignedToName,
          Status: ticket.ticketStatus,
          Comments: ticket.ticketComments,
          Department: ticket.ticketDepartment,
        }));
        setData(formattedData);
      }
    } catch (error) {
      notifyError(
        `An error occurred while fetching data for status: ${selectedDepartment}`
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterByStatus = async () => {
    setLoading(true);
    setCurrentPage(1);
    try {
      if (selectedStatus === "all") {
        fetchData();
      } else {
        const response = await getTicketsRaisedByMeStatusWise({ status: selectedStatus, empId: localStorage.getItem("empid") });
        const formattedData = response?.data.map((ticket) => ({
          id: ticket.id,
          Title: ticket.ticketName,
          Description: ticket.ticketDescription,
          CreatedAt: ticket.dateOfCreation,
          DateOfCompletion: ticket.dateOfCompletion || "Not Completed",
          RaisedBy: ticket.ticketRaisedByName,
          AssignedTo: ticket.ticketAssignedToName,
          Status: ticket.ticketStatus,
          Comments: ticket.ticketComments,
          Department: ticket.ticketDepartment,
        }));
        setData(formattedData);
      }
    } catch (error) {
      notifyError(
        `An error occurred while fetching data for status: ${selectedStatus}`
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const setFilterNone = () => {
    setSelectedFilter("none");
    setSelectedDepartment("all");
    setSelectedStatus("all");
  };
  const setFilterOption = (option) => {
    switch (option) {
      case "department":
        setSelectedFilter("department");
        break;
      case "status":
        setSelectedFilter("status");
        break;
      case "none":
        setSelectedFilter("none");
        fetchData();
        break;
      default:
        setSelectedFilter("none");
    }
  };


  // Calculate the current page's data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const handleLimitChange = () => {

    if(limit < 1){
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
          className={`flex justify-center items-center flex-row w-full mb-10   `}
        >
        <div className="flex justify-start items-center border-gray-600 border-2 rounded-md px-4 py-2 mr-4">
              <select
                value={selectedFilter}
                onChange={(e) => setFilterOption(e.target.value)}
                className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none font-semibold focus:none glow-input text-gray-50  hover:cursor-pointer"
              >
                <option value="none">No Filter</option>
                <option value="department">Department</option>
                <option value="status">Status</option>
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
                  onClick={filterByDept}
                  className="text-sm text-gray-50 font-semibold  px-3 py-1 rounded-md glow-button-purple focus:outline-none ml-2  transition-all transform hover:scale-110 duration-1000"
                >
                  Apply
                </button>
              </div>
            ) : null}
            {selectedFilter === "status" ? (
              <div className="flex justify-start items-center border-gray-600 border-2 rounded-md px-4 py-2 mr-4">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none font-semibold focus:none glow-input text-gray-50  hover:cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="open">Open</option>
                  <option value="approved">Approved</option>
                  <option value="denied">Denied</option>
                  <option value="closed">Closed</option>
                </select>
                <button
                  onClick={filterByStatus}
                  className="text-sm text-gray-50 font-semibold  px-3 py-1 rounded-md glow-button-purple focus:outline-none ml-2  transition-all transform hover:scale-110 duration-1000"
                >
                  Apply
                </button>
              </div>
            ) : null}
            </div>
          <Table
            data={currentData}
            update={false}
            del={true}
            approve={false}
            deny={false}
            close={true}
            tableType={"ticket"}
            fetchDataTicketsRaisedByMe={fetchData}
          />
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            paginate={paginate}
            currentPage={currentPage}
          />
          <div className="flex mt-2 w-full justify-end items-center">
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

export default TicketsRaisedByMe;
