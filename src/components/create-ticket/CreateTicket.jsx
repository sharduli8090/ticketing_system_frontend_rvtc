import { useState } from "react";
import { useForm } from "react-hook-form";
import useEmployeeService from "../../services/employeeService/EmployeeService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";
const CreateTicket = () => {
  const { createTicket } = useEmployeeService();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { notifyError } = useToastNotifications();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const empId = localStorage.getItem("empid");
      if (!empId) {
        notifyError("Employee ID not found in local storage");
        setErrorMessage("Employee ID not found in local storage");
        setLoading(false);
        return;
      }

      const ticketData = {
        ...data,
        empId,
      };

      const resp = await createTicket(ticketData);
      if (resp.statuscode === 200) {
        reset();
      } else {
        notifyError("Error creating ticket");
        setErrorMessage("Error creating ticket");
        return;
      }
    } catch (error) {
      notifyError("Error creating ticket");
      setErrorMessage("Error creating ticket");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex justify-center items-center  bg-transparent`}
    >
      <BackButton />
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-screen-md bg-gray-950 glow-login rounded-lg px-8 py-12 shadow-lg flex flex-col items-center h-full lg:h-auto md:h-auto">
          <h1 className="text-center text-2xl font-medium mb-8 text-gray-50">
            Create Ticket
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full ">
            <div className="mb-6">
              <label
                htmlFor="ticketName"
                className="block text-sm font-bold mb-2 text-gray-50"
              >
                Ticket Name: <span className="text-sm text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ticketName"
                placeholder="Ticket Name"
                {...register("ticketName", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-50 focus:outline-none focus:none glow-input"
              />
              {errors.ticketName && (
                <span className="text-red-400 font-medium text-sm">
                  Ticket name is required
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="ticketDescription"
                className="block text-sm font-bold mb-2 text-gray-50"
              >
                Ticket Description:
                <span className="text-sm text-red-500">*</span>
              </label>
              <textarea
                id="ticketDescription"
                placeholder="Ticket Description"
                {...register("ticketDescription", { required: true })}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-50 focus:outline-none focus:none glow-input"
              />
              {errors.ticketDescription && (
                <span className="text-red-400 font-medium text-sm ">
                  Ticket description is required
                </span>
              )}
            </div>
            <div className="mb-6">
              <label
                htmlFor="ticketDepartment"
                className="block text-gray-700 text-sm font-bold mb-2 text-gray-50"
              >
                Ticket Department:
                <span className="text-sm text-red-500">*</span>
              </label>
              <select
                id="ticketDepartment"
                defaultValue="admin"
                {...register("ticketDepartment", { required: true })}
                className="shadow bg-white border rounded w-full py-2 px-3 text-gray-50 focus:outline-none focus:none glow-input"
              >
                <option value="admin">Admin</option>
                <option value="hr">HR</option>
                <option value="finance">Finance</option>
                <option value="it">IT</option>
              </select>
              {errors.ticketDepartment && (
                <span className="text-red-600 text-sm">
                  Ticket department is required
                </span>
              )}
            </div>
            {errorMessage && (
              <div className="text-red-500 font-medium text-sm my-5">
                {errorMessage}
              </div>
            )}
            <div className="flex items-center mb-4">
              <button
                type="submit"
                className="w-full glow-button-purple text-white font-bold py-2 px-4 rounded focus:outline-none focus:none transition-transform transform hover:scale-105 duration-1000"
              >
                Create Ticket
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateTicket;
