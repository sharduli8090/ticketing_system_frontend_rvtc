/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import AdminService from "../../services/adminService/AdminService";
import Loader from "../loader/Loader";

const Table = ({ data, update, delete: del, approve, deny, close }) => {
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  // Destructure the deleteEmployee method from AdminService
  const { deleteEmployee } = AdminService;

  useEffect(() => {
    if (data.length > 0) {
      setKeys(Object.keys(data[0]).filter((key) => key !== "id"));
    }
  }, [data]);

  const handleDeleteRow = async (id, userType) => {
    setLoading(true);
    try {
      if (userType === "ticket") {
        alert("Ticket delete called " + id);
      } else {
        await deleteEmployee(id);
        alert("Employee deleted successfully");
        // You might need to fetch updated data here
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const openUpdateModal = (row) => {
    // Perform actions with the row data if necessary
    openModal();
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    console.log("Submitted value:", inputValue);
    closeModal();
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
                      className="bg-blue-500 hover:bg-blue-700 rounded mr-3 text-white text-sm p-2"
                    >
                      Update
                    </button>
                  )}
                  {del && (
                    <button
                      onClick={() => handleDeleteRow(row.id, "employee")}
                      className="bg-red-500 hover:bg-red-700 rounded mr-3 text-white text-sm p-2"
                    >
                      Delete
                    </button>
                  )}
                  {approve && (
                    <button
                      onClick={() => alert("Approve action for " + row.id)}
                      className="bg-green-500 hover:bg-green-700 rounded mr-3 text-white text-sm p-2"
                    >
                      Approve
                    </button>
                  )}
                  {deny && (
                    <button
                      onClick={() => alert("Deny action for " + row.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 rounded mr-3 text-white text-sm p-2"
                    >
                      Deny
                    </button>
                  )}
                  {close && (
                    <button
                      onClick={() => alert("Close action for " + row.id)}
                      className="bg-gray-500 hover:bg-gray-700 rounded text-white text-sm p-2"
                    >
                      Close
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

      {isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
            <div className="relative bg-white rounded-lg p-8">
              <button
                className="absolute top-0 right-0 p-2"
                onClick={closeModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h2 className="text-xl font-bold mb-4">Modal Title</h2>
              <form onSubmit={submitForm}>
                <div>
                  <label htmlFor="inputField" className="block mb-2">
                    Input Field:
                  </label>
                  <input
                    id="inputField"
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Table;
