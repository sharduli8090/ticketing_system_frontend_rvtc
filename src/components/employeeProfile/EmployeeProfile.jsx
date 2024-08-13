import { useEffect, useState } from "react";
import { FaFemale, FaMale } from "react-icons/fa";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "tailwindcss/tailwind.css";
import useEmployeeService from "../../services/employeeService/EmployeeService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";

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
    <div className="min-h-screen flex flex-col items-center justify-center  p-8 mb-56">
      <BackButton />
      {isFemale ? (
        <FaFemale className="  glow-icon  transition-all transform hover:scale-110  duration-1000" />
      ) : (
        <FaMale className=" glow-icon   transition-all transform hover:scale-110 duration-1000" />
      )}

      <h2 className="mt-8 lg:text-6xl md:text-4xl text-3xl text-center font-bold  capitalize text-gray-200">
        {empName}
      </h2>
      <p className="lg:text-2xl md:text-xl text-lg   mt-2 capitalize text-gray-300">
        {empPosition}
      </p>

      <button
        className=" glow-button-purple text-gray-50 text-sm lg:text-lg md:text-sm font-bold lg:py-2 md:py-2 lg:px-4 md:px-4 py-1 px-2 rounded-md mt-10  transition-all transform hover:scale-110 duration-1000"
        onClick={handleNavigate}
      >
        <MdOutlineModeEditOutline className="inline-block lg:text-2xl md:text-xl text-lg mr-1 lg:mr-2 md:mr-2" />{" "}
        Edit Profile
      </button>
      <div className="mt-10 w-full max-w-4xl text-xl text-gray-50  glow-login p-10 ">
        <div className="flex justify-between py-4 border-b border-gray-300 text-sm lg:text-xl md:text-xl ">
          <span className="font-semibold capitalize">Gender:</span>
          <span className="capitalize">{empGender}</span>
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
          <span className="capitalize">{empDepartment}</span>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
