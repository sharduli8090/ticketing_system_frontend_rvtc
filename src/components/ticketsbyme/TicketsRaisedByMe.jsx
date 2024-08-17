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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5); // Number of items per page
  const [limit, setLimit] = useState(5);

  const { getTicketsRaisedByMe } = useEmployeeService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
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
    setItemsPerPage(limit);
  };
  return (
    <div className="flex flex-col justify-between items-center mt-32 mb-64 w-auto mx-28">
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <>
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
