import { useEffect, useState } from "react";
import useEmployeeService from "../../services/employeeService/EmployeeService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";
import Table from "../table/Table";

const TicketsInMyName = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { notifyError } = useToastNotifications();

  const { getTicketsInMyName } = useEmployeeService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (localStorage.getItem("empid") === null) {
        notifyError("Please login to view tickets");
        return;
      }
      const response = await getTicketsInMyName({
        empId: localStorage.getItem("empid"),
      });
      const formattedData = response.data.map((ticket) => ({
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

  return (
    <div className="flex flex-col justify-between items-center mt-32 mb-64 w-auto mx-28">
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            data={data}
            delete={false}
            approve={true}
            deny={true}
            close={false}
            tableType={"ticket"}
            fetchDataTicketsInMyName={fetchData}
          />
        </>
      )}
    </div>
  );
};

export default TicketsInMyName;
