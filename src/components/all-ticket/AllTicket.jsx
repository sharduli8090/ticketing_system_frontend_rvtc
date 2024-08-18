/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import useAdminService from "../../services/adminService/AdminService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";
import Pagination from "../pagination/Pagination";
import Table from "../table/Table";
const AllTicket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [noData, setNoData] = useState(false);
  const { getAllTicket, getTicketsDeptWise, deleteAllTicket } =
    useAdminService();
  const { notifyError } = useToastNotifications();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [limit, setLimit] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllTicket();
      const formattedData = response?.data.map((ticket) => ({
        id: ticket.id,
        Title: ticket.ticketName,
        Description: ticket.ticketDescription,
        Created_At: ticket.dateOfCreation,
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
      if (selectedStatus === "all") {
        fetchData();
      } else {
        const response = await getTicketsDeptWise({ dept: selectedStatus });
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

  const handleDeleteAll = async () => {
    setLoading(true);
    try {
      const resp = await deleteAllTicket();
      setData([]);
    } catch (error) {
      notifyError("An error occurred while deleting all tickets");
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
            className={`flex justify-center items-center flex-row w-full mb-10     ${
              noData ? "hidden" : "block"
            }`}
          >
            <div className="flex justify-start items-center border-gray-600 border-2 rounded-md px-4 py-2 mr-4">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none font-semibold focus:none glow-input text-gray-50  hover:cursor-pointer"
              >
                <option value="all">All</option>
                <option value="hr">HR</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="admin">Admin</option>
              </select>
              <button
                onClick={filterByDept}
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
            data={currentData}
            delete={true}
            approve={true}
            deny={true}
            tableType={"ticket"}
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

export default AllTicket;
