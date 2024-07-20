import { useEffect, useState } from "react";
import AdminService from "../../services/adminService/AdminService";
import Loader from "../loader/Loader";
import Table from "../table/Table";

const AllTicket = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState("all");

  const { getAllTicket, getTicketsDeptWise, deleteAllTickets } = AdminService;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllTicket();
      const formattedData = response.data.map((ticket) => ({
        id: ticket.id,
        Title: ticket.title,
        Description: ticket.description,
        Status: ticket.status,
        Created_At: ticket.createdAt,
        Updated_At: ticket.updatedAt,
      }));
      setData(formattedData);
      console.log("Data fetched successfully", formattedData);
    } catch (error) {
      alert("An error occurred while fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterByDept = async () => {
    setLoading(true);
    try {
      if (selectedStatus === "all") {
        fetchData();
      } else {
        const response = await getTicketsDeptWise({ status: selectedStatus });
        const formattedData = response.data.map((ticket) => ({
          id: ticket.id,
          Title: ticket.title,
          Description: ticket.description,
          Status: ticket.status,
          Created_At: ticket.createdAt,
          Updated_At: ticket.updatedAt,
        }));
        setData(formattedData);
        console.log(
          `Data fetched successfully for status: ${selectedStatus}`,
          formattedData
        );
      }
    } catch (error) {
      alert(
        `An error occurred while fetching data for status: ${selectedStatus}`
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await deleteAllTickets();
      alert("All tickets deleted successfully");
      setData([]);
    } catch (error) {
      alert("An error occurred while deleting all tickets");
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
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-sm w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-blue-500 bg-blue-200 hover:bg-blue-100 hover:cursor-pointer"
              >
                <option value="all">All</option>
                <option value="hr">HR</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
              </select>
              <button
                onClick={filterByDept}
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

export default AllTicket;
