import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import useAdminService from "../../services/adminService/AdminService";
import Loader from "../loader/Loader";

const UpdateEmployeeModal = ({ isOpen, closeModal, selectedRow }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    empName: "",
    empPosition: "",
    empDateOfBirth: "",
    empDepartment: "",
    empGender: "",
  });
  const [loading, setLoading] = useState(false);

  const { updateEmployee } = useAdminService();

  useEffect(() => {
    if (selectedRow) {
      setFormData({
        email: selectedRow.Email || "",
        password: "", // Assuming passwords are not prefilled
        empName: selectedRow.Name || "",
        empPosition: selectedRow.Designation || "",
        empDateOfBirth: selectedRow.Date_Of_Birth || "",
        empDepartment: selectedRow.Department || "",
        empGender: selectedRow.Gender || "",
      });
    }
  }, [selectedRow]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const updateResp = await updateEmployee(formData, selectedRow.id);
      alert(updateResp.message);
      closeModal();
    } catch (error) {
      console.error("Error updating employee:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
        <div className="relative bg-white rounded-lg p-8">
          <button className="absolute top-0 right-0 p-2" onClick={closeModal}>
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
          <h2 className="text-xl font-bold mb-4">Update Employee</h2>
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={submitForm}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block mb-2">
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full border rounded px-3 py-2"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2">
                    Password:
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full border rounded px-3 py-2"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label htmlFor="empName" className="block mb-2">
                    Name:
                  </label>
                  <input
                    id="empName"
                    name="empName"
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.empName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="empPosition" className="block mb-2">
                    Position:
                  </label>
                  <input
                    id="empPosition"
                    name="empPosition"
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.empPosition}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="empDateOfBirth" className="block mb-2">
                    Date of Birth:
                  </label>
                  <input
                    id="empDateOfBirth"
                    name="empDateOfBirth"
                    type="date"
                    className="w-full border rounded px-3 py-2"
                    value={formData.empDateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="empDepartment" className="block mb-2">
                    Department:
                  </label>
                  <input
                    id="empDepartment"
                    name="empDepartment"
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.empDepartment}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="empGender" className="block mb-2">
                    Gender:
                  </label>
                  <input
                    id="empGender"
                    name="empGender"
                    type="text"
                    className="w-full border rounded px-3 py-2"
                    value={formData.empGender}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

UpdateEmployeeModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  selectedRow: PropTypes.shape({
    id: PropTypes.string,
    Email: PropTypes.string,
    Name: PropTypes.string,
    Designation: PropTypes.string,
    Date_Of_Birth: PropTypes.string,
    Department: PropTypes.string,
    Gender: PropTypes.string,
  }),
};

export default UpdateEmployeeModal;
