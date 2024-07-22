/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { GoCheck, GoX } from "react-icons/go";
import { MdDeleteOutline, MdEdit } from "react-icons/md";
import { RiMailCloseLine } from "react-icons/ri";
import useAdminService from "../../services/adminService/AdminService";
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
}) => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [commentModalOpen, setCommentModalOpen] = useState(false);
  const [ticketStatus, setTicketStatus] = useState("");
  const [ticketComments, setTicketComments] = useState("");

  const { deleteEmployee, approveDenyTicket, deleteTicket } = useAdminService();

  useEffect(() => {
    if (data.length > 0) {
      setKeys(Object.keys(data[0]).filter((key) => key !== "id"));
    }
  }, [data]);

  const handleDeleteRow = async (id, tableType) => {
    setLoading(true);
    try {
      if (tableType === "ticket") {
        const delResp = await deleteTicket(id);
        alert(delResp.message);
      } else {
        const delResp = await deleteEmployee(id);
        alert(delResp.message);
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
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

  const handleApproveDenyClose = async () => {
    setLoading(true);
    try {
      const body = {
        ticketStatus: ticketStatus,
        ticketComments: ticketComments,
      };
      const resp = await approveDenyTicket(body, selectedRow.id);
      alert(resp.message);
      closeCommentModal();
    } catch (error) {
      console.error(`Error handling ticket ${ticketStatus}:`, error);
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
      {!loading ? (
        <table className="max-w-full rounded-lg shadow-lg divide-y divide-blue-300 m-0">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-6 py-3 text-center">S.No.</th>
              {keys.map((key, index) => (
                <th key={index} className="px-6 py-3 text-center">
                  {key}
                </th>
              ))}
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {data.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-blue-100" : ""}>
                <td className="px-6 py-4 text-center">{index + 1}</td>
                {keys.map((key, idx) => (
                  <td
                    key={idx}
                    className="px-6 py-4 text-ellipsis overflow-hidden whitespace-nowrap text-center"
                  >
                    {formatData(row, key)}
                  </td>
                ))}
                <td className="px-6 py-4 text-center">
                  {update && (
                    <button
                      onClick={() => openUpdateModal(row)}
                      className="bg-blue-500 hover:bg-blue-700 rounded mr-3 text-white text-sm p-2 relative group"
                    >
                      <MdEdit />
                      <div className="absolute hidden group-hover:block bg-gray-500 text-white text-sm rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                        Update
                      </div>
                    </button>
                  )}
                  {del && (
                    <button
                      onClick={() => handleDeleteRow(row.id, tableType)}
                      className="bg-red-500 hover:bg-red-700 rounded mr-3 text-white text-sm p-2 relative group"
                    >
                      <MdDeleteOutline />
                      <div className="absolute hidden group-hover:block bg-gray-500 text-white text-sm rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                        Delete
                      </div>
                    </button>
                  )}
                  {approve && (
                    <button
                      onClick={() => openCommentModal(row, "approved")}
                      className={`${
                        row.Status !== "open"
                          ? "bg-gray-300"
                          : "bg-green-500 hover:bg-green-700"
                      } rounded mr-3 text-white text-sm p-2 relative group`}
                      disabled={row.Status !== "open"}
                    >
                      <GoCheck />
                      <div className="absolute hidden group-hover:block bg-gray-500 text-white text-sm rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                      {row.Status !== "open" ? "Disabled" : "Approve"}
                      </div>
                    </button>
                  )}
                  {deny && (
                    <button
                      onClick={() => openCommentModal(row, "denied")}
                      className={`${
                        row.Status !== "open"
                          ? "bg-gray-300"
                          : "bg-yellow-500 hover:bg-yellow-700"
                      } rounded mr-3 text-white text-sm p-2 relative group`}
                      disabled={row.Status !== "open"}
                    >
                      <GoX />
                      <div className="absolute hidden group-hover:block bg-gray-500 text-white text-sm rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                      {row.Status !== "open" ? "Disabled" : "Deny"}
                      </div>
                    </button>
                  )}
                  {close && (
                    <button
                      onClick={() => openCommentModal(row, "close")}
                      className={`${
                        row.Status !== "open"
                          ? "bg-gray-300"
                          : "bg-gray-500 hover:bg-gray-700"
                      } rounded mr-3 text-white text-sm p-2 relative group`}
                      disabled={row.Status !== "open"} 
                    >
                      <RiMailCloseLine />
                      <div className="absolute hidden group-hover:block bg-gray-500 text-white text-sm rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2">
                        {row.Status !== "open" ? "Disabled" : "Close"}
                                             </div>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loader />
      )}

      <UpdateEmployeeModal
        isOpen={isOpen}
        closeModal={closeModal}
        selectedRow={selectedRow}
      />

      <ApproveDenyComments
        isOpen={commentModalOpen}
        closeCommentModal={closeCommentModal}
        handleApproveDenyClose={handleApproveDenyClose}
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
      status: PropTypes.string.isRequired, // Added status field
      department: PropTypes.string,
      // Add other properties as needed
    })
  ).isRequired,
  update: PropTypes.bool,
  delete: PropTypes.bool,
  approve: PropTypes.bool,
  deny: PropTypes.bool,
  close: PropTypes.bool,
  tableType: PropTypes.string.isRequired,
};

export default Table;
