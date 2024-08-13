/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import useAdminService from "../../services/adminService/AdminService";
import useToastNotifications from "../../services/toastify/ToasterService";
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
  const [initialFormData, setInitialFormData] = useState({});
  const [loading, setLoading] = useState(false);

  const { updateEmployee } = useAdminService();
  const { notifyError } = useToastNotifications();

  useEffect(() => {
    if (selectedRow) {
      const initialData = {
        email: selectedRow.Email || "",
        password: "",
        empName: selectedRow.Name || "",
        empPosition: selectedRow.Designation || "",
        empDateOfBirth: selectedRow.Date_Of_Birth || "",
        empDepartment: selectedRow.Department || "",
        empGender: selectedRow.Gender || "",
      };
      setFormData(initialData);
      setInitialFormData(initialData);
    }
  }, [selectedRow]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const getUpdatedFields = () => {
    const updatedFields = {};
    for (const key in formData) {
      if (formData[key] !== initialFormData[key]) {
        updatedFields[key] = formData[key];
      }
    }
    return updatedFields;
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const updatedFields = getUpdatedFields();
      if (Object.keys(updatedFields).length > 0) {
        const updateResp = await updateEmployee(updatedFields, selectedRow.id);
        closeModal();
        window.location.reload();
      } else {
        notifyError("No changes detected.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      notifyError("Error updating employee.");
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-gray-900 opacity-75"></div>
        <div className="relative bg-gray-950 text-gray-50 rounded-lg p-10 glow-login lg:hidden md:block">
          {" "}
          <button
            className="absolute top-0 right-0 p-2"
            onClick={closeModal}
          >
            <IoCloseOutline className="h-6 w-6 text-gray-300 transition-transform transform hover:scale-150 hover:rotate-180 hover:cursor-pointer duration-1000 hover:text-gray-50  rounded-full " />
          </button>
          Open in Desktop View
        </div>
        <div className="relative bg-gray-950 glow-login-blue rounded-lg p-10 lg:block hidden md:hidden ">
          <button className="absolute top-0 right-0 p-2" onClick={closeModal}>
            <IoCloseOutline className="h-6 w-6 text-gray-400 transition-transform transform hover:scale-150 hover:rotate-180 hover:cursor-pointer duration-1000 hover:text-gray-50   rounded-full" />
          </button>
          <h2 className="text-xl font-bold mb-4 text-gray-50">
            Update Employee
          </h2>
          {loading ? (
            <Loader />
          ) : (
            <form onSubmit={submitForm} className="text-gray-50">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block mb-2">
                    Email:
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full border rounded px-3 py-2 glow-input-blue"
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
                    className="w-full border rounded px-3 py-2 glow-input-blue"
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
                    className="w-full border rounded px-3 py-2 glow-input-blue"
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
                    className="w-full border rounded px-3 py-2 glow-input-blue"
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
                    className="w-full border rounded px-3 py-2 glow-input-blue"
                    value={formData.empDateOfBirth}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="empDepartment" className="block mb-2">
                    Department:
                  </label>
                  <select
                    id="empDepartment"
                    name="empDepartment"
                    className="w-full border rounded px-3 py-2 glow-input-blue"
                    value={formData.empDepartment}
                    onChange={handleInputChange}
                    required 
                >
                  <option value="admin">Admin</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="it">IT</option>
                </select>
                  
                </div>
                <div>
                  <label htmlFor="empGender" className="block mb-2">
                    Gender:
                  </label>
                  <select
                    id="empGender"
                    name="empGender"
                    value={formData.empGender}
                    onChange={handleInputChange}
                    required
                    className=" border rounded w-full py-2 px-3  focus:outline-none focus:none glow-input-blue"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select> 
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-7  glow-button py-2 px-4 rounded hover:bg-blue-600 transition-transform transform hover:scale-110 duration-1000"
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
