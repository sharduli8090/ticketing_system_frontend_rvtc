import { useEffect, useState } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import useEmployeeService from "../../services/employeeService/EmployeeService";
import useToastNotifications from "../../services/toastify/ToasterService";
import Loader from "../loader/Loader";
import BackButton from "../backButton/BackButton";

const EmployeeProfile = () => {
  const { getEmployee } = useEmployeeService();
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [empId, setEmpId] = useState(null);
  const { notifyError } = useToastNotifications();
  const navigate = useNavigate();

  useEffect(() => {
    const empIdFromStorage = localStorage.getItem("empid");
    if (empIdFromStorage) {
      setEmpId(empIdFromStorage);
    } else {
      notifyError("Employee ID not found in local storage");
      setError("Employee ID not found in local storage");
      setLoading(false);
    }
  }, [notifyError]);

  useEffect(() => {
    const fetchEmployee = async () => {
      if (empId) {
        try {
          const { data } = await getEmployee(empId);
          setEmployee(data);
        } catch (err) {
          notifyError("Failed to fetch employee data");
          setError("Failed to fetch employee data");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployee();
  }, [empId]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!employee) {
    return <div>No employee data available</div>;
  }

  const handleNavigate = () => {
    navigate("/sendquery");
    notifyError("Contact Admin to edit profile");
  };

  const {
    empName,
    empPosition,
    empGender,
    empDateOfBirth,
    empDateOfJoining,
    empDepartment,
    email,
  } = employee;
  const isFemale = empGender.toLowerCase() === "female";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8 mb-56">
      <BackButton />
      <div className="relative w-40 h-40 mb-6 transition-transform transform hover:scale-110 duration-300">
        <div className="absolute inset-0 rounded-full bg-gray-200 shadow-md  "></div>
        <div className="absolute inset-0 rounded-full flex items-center justify-center  text-blue-500   text-8xl ">
          {isFemale ? <FaFemale /> : <FaMale />}
        </div>
      </div>
      <h2 className="mt-8 lg:text-6xl md:text-4xl text-2xl text-center font-bold text-gray-800 capitalize">
        {empName}
      </h2>
      <p className="lg:text-2xl md:text-xl text-lg text-gray-600 mt-2 capitalize">
        {empPosition}
      </p>

      <button
        className="bg-blue-500 text-white text-sm lg:text-lg md:text-sm font-bold lg:py-2 md:py-2 lg:px-4 md:px-4 py-1 px-2 rounded-md mt-10 hover:bg-blue-600 transition-transform transform hover:scale-110 duration-300"
        onClick={handleNavigate}
      >
        <MdOutlineModeEditOutline className="inline-block lg:text-2xl md:text-xl text-lg mr-1 lg:mr-2 md:mr-2" />{" "}
        Edit Profile
      </button>
      <div className="mt-10 w-full max-w-4xl text-xl text-gray-700">
        <div className="flex justify-between py-4 border-b border-gray-300 text-sm lg:text-xl md:text-xl">
          <span className="font-semibold capitalize">Gender:</span>
          <span>{empGender}</span>
        </div>
        <div className="flex justify-between py-4 border-b border-gray-300 text-sm lg:text-xl md:text-xl">
          <span className="font-semibold capitalize">Email:</span>
          <span>{email}</span>
        </div>
        <div className="flex justify-between py-4 border-b border-gray-300 text-sm lg:text-xl md:text-xl">
          <span className="font-semibold capitalize">Date of Birth:</span>
          <span>{empDateOfBirth}</span>
        </div>
        <div className="flex justify-between py-4 border-b border-gray-300 text-sm lg:text-xl md:text-xl">
          <span className="font-semibold capitalize">Date of Joining:</span>
          <span>{empDateOfJoining}</span>
        </div>
        <div className="flex justify-between py-4 border-b border-gray-300 text-sm lg:text-xl md:text-xl">
          <span className="font-semibold capitalize">Department:</span>
          <span>{empDepartment}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
