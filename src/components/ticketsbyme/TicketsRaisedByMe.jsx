import { useEffect, useState } from "react";
import useEmployeeService from "../../services/employeeService/EmployeeService";
import Loader from "../loader/Loader";
import Table from "../table/Table";

const TicketsRaisedByMe = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { getTicketsRaisedByMe } = useEmployeeService();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const empid = localStorage.getItem("empid");
      if (empid === null) {
        alert("Please login to view tickets");
        return;
      }
      console.log("empid", empid);
      const obj = {empId: empid};
      const response = await getTicketsRaisedByMe(obj);
      console.log("responseiiiiiii", response);
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
      alert("An error occurred while fetching data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between items-center mt-32 mb-64 w-auto mx-28">
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            data={data}
            update={false}
            del={true}
            approve={false}
            deny={false}
            close={true}
            tableType={"ticket"}
          />
        </>
      )}
    </div>
  );
};

export default TicketsRaisedByMe;
