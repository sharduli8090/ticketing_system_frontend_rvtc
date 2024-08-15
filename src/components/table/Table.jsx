/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GoCheck, GoX } from "react-icons/go";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { RiMailCloseLine } from "react-icons/ri";
import useAdminService from "../../services/adminService/AdminService";
import useEmployeeService from "../../services/employeeService/EmployeeService";
import useToastNotifications from "../../services/toastify/ToasterService";
import Loader from "../loader/Loader";
import ApproveDenyComments from "../modal/ApproveDenyComments";
import UpdateEmployeeModal from "../modal/UpdateEmployeeModal";

const Table = ({
  data,
  update,
  delete: del,
  approve,
  deny,
  close,
  tableType,
  fetchData,
  fetchDataTicketsInMyName,
  fetchDataTicketsRaisedByMe,
}) => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [ticketStatus, setTicketStatus] = useState("");
  const [ticketComments, setTicketComments] = useState("");
  const [noData, setNoData] = useState(false);

  const { deleteEmployee, approveDenyTicket, deleteTicket } = useAdminService();
  const { closeTicket, approveDenyTicketEmployee } = useEmployeeService();
  const { notifyError } = useToastNotifications();

  useEffect(() => {
    if (data.length > 0) {
      setKeys(Object.keys(data[0]).filter((key) => key !== "id"));
    } else {
      setKeys([]);
      setNoData(true);
    }
  }, [data]);

  const handleDeleteRow = async (id, tableType) => {
    setLoading(true);
    try {
      if (tableType === "ticket") {
        const delResp = await deleteTicket(id);
        fetchData();
      } else {
        const delResp = await deleteEmployee(id); 
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      notifyError("Error deleting employee", error);
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (row) => {
    setSelectedRow(row);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedRow(null);
  };

  const openCommentModal = (row, status) => {
    setSelectedRow(row);
    setTicketStatus(status);
    setCommentModalOpen(true);
  };

  const closeCommentModal = () => {
    setCommentModalOpen(false);
    setTicketComments("");
    setSelectedRow(null);
  };

  const handleApproveDeny = async () => {
    setLoading(true);
    try {
      if (tableType === "ticket" && localStorage.getItem("adminid")) {
        const body = {
          ticketStatus: ticketStatus,
          ticketComments: ticketComments,
        };
        const resp = await approveDenyTicket(body, selectedRow.id);
        fetchData();
      } else if (tableType === "ticket" && localStorage.getItem("empid")) {
        const body = {
          empId: localStorage.getItem("empid"),
          ticketStatus: ticketStatus,
          ticketComments: ticketComments,
        };
        const resp = await approveDenyTicketEmployee(body, selectedRow.id);
        fetchDataTicketsInMyName();
      }
      closeCommentModal();
    } catch (error) {
      console.error(`Error handling ticket`, error);
      notifyError(`Error handling ticket`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseTicket = async (row) => {
    setLoading(true);
    try {
      await closeTicket({ empId: localStorage.getItem("empid") }, row.id);
      fetchDataTicketsRaisedByMe();
    } catch (error) {
      console.error("Error closing ticket:", error);
      notifyError("Error closing ticket", error);
    } finally {
      setLoading(false);
    }
  };

  const capitalizeFirstLetter = (string) => {
    if (typeof string !== "string") return string;
    if (!string) return "NIL";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const formatData = (row, key) => {
    if (key === "department") {
      return row[key] ? row[key].toUpperCase() : "NIL";
    }
    return capitalizeFirstLetter(row[key]);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : noData ? (
        <div className="text-center text-gray-50 my-60 lg:text-3xl md:text-3xl text-xl ">
          No data found
        </div>
      ) : (
        <>
          <div className="text-center text-gray-50 my-60 lg:text-3xl md:text-3xl text-xl block lg:hidden md:block">
            Open in Desktop mode to view the table
          </div>
          <table className=" rounded-lg shadow-2xl divide-y divide-blue-300 m-0 w-19/20 hidden lg:block md:hidden">
            <thead className="bg-gray-950 text-gray-50">
              <tr>
                <th className="px-6 py-3 text-center hover:cursor-default">
                  S.No.
                </th>
                {keys.map((key, index) => (
                  <th
                    key={index}
                    className="px-6 py-3 text-center hover:cursor-default"
                  >
                    {key}
                  </th>
                ))}
                {(update || del || approve || deny || close) && (
                  <th className="px-6 py-3 text-center hover:cursor-default">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="text-gray-50 ">
              {data.map((row, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "glow-login-blue " : "glow-login"
                  } transition-all transform hover:scale-105  duration-1000 `}
                >
                  <td className="px-6 py-4 text-center hover:cursor-default">
                    {index + 1}
                  </td>
                  {keys.map((key, idx) => (
                    <td
                      key={idx}
                      className="px-6 py-4 text-ellipsis overflow-hidden whitespace-nowrap text-center hover:cursor-default "
                    >
                      {formatData(row, key)}
                    </td>
                  ))}
                  {(update || del || approve || deny || close) && (
                    <td className="px-6 py-4 text-center">
                      {update && (
                        <button
                          onClick={() => openUpdateModal(row)}
                          className="glow-button   rounded mr-3 text-white text-sm p-2 relative group transition-all transform hover:scale-110 duration-1000"
                        >
                          <MdEdit />
                          <div className="info-text">Update</div>
                        </button>
                      )}
                      {del && (
                        <button
                          onClick={() => handleDeleteRow(row.id, tableType)}
                          className="glow-button-logout rounded mr-3 text-white text-sm p-2 relative group transition-all transform hover:scale-110 duration-1000"
                        >
                          <MdDeleteOutline />
                          <div className="info-text">Delete</div>
                        </button>
                      )}
                      {approve && (
                        <button
                          onClick={() => openCommentModal(row, "approved")}
                          className={`${
                            row.Status !== "open"
                              ? "disabled-button"
                              : "glow-green"
                          } rounded mr-3 text-white text-sm p-2 relative group  `}
                          disabled={row.Status !== "open"}
                        >
                          <GoCheck />
                          <div className="info-text">
                            {row.Status !== "open" ? "Disabled" : "Approve"}
                          </div>
                        </button>
                      )}
                      {deny && (
                        <button
                          onClick={() => openCommentModal(row, "denied")}
                          className={`${
                            row.Status !== "open"
                              ? "disabled-button"
                              : "glow-yellow"
                          } rounded mr-3 text-white text-sm p-2 relative group  `}
                          disabled={row.Status !== "open"}
                        >
                          <GoX />
                          <div className="info-text">
                            {row.Status !== "open" ? "Disabled" : "Deny"}
                          </div>
                        </button>
                      )}
                      {close && (
                        <button
                          onClick={() => handleCloseTicket(row)}
                          className={`
                       ${
                         row.Status !== "open" ? "disabled-button" : "glow-gray"
                       } 
                        rounded mr-3 text-gray-50 text-sm p-2 relative group    `}
                          disabled={row.Status !== "open"}
                        >
                          <RiMailCloseLine />
                          <div className="info-text">
                            {row.Status !== "open" ? "Disabled" : "Close"}
                          </div>
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <UpdateEmployeeModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedRow={selectedRow}
      />

      <ApproveDenyComments
        isOpen={commentModalOpen}
        closeCommentModal={closeCommentModal}
        handleApproveDeny={handleApproveDeny}
        ticketStatus={ticketStatus}
        ticketComments={ticketComments}
        setTicketComments={setTicketComments}
      />
    </>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      status: PropTypes.string,
      department: PropTypes.string,
    })
  ).isRequired,
  update: PropTypes.bool,
  delete: PropTypes.bool,
  approve: PropTypes.bool,
  deny: PropTypes.bool,
  close: PropTypes.bool,
  tableType: PropTypes.string.isRequired,
  fetchData: PropTypes.func,
  fetchDataTicketsInMyName: PropTypes.func,
  fetchDataTicketsRaisedByMe: PropTypes.func,
};

export default Table;
