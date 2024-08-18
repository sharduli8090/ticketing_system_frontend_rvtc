import { useState } from "react";
import { useForm } from "react-hook-form";
import useAdminService from "../../services/adminService/AdminService";
import useToastNotifications from "../../services/toastify/ToasterService";
import BackButton from "../backButton/BackButton";
import Loader from "../loader/Loader";

const CreateEmployee = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { createEmployee } = useAdminService();
  const { notifyError } = useToastNotifications();

  const onSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");
    try {
      const resp = await createEmployee(data);
      if (resp.statuscode === 200) {
        reset();
      } else {
        notifyError("Error creating employee");
        setErrorMessage("Error creating employee");
        return;
      }
    } catch (error) {
      notifyError("Error creating employee");
      setErrorMessage("Error creating employee");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password", "");

  return (
    <div className={`min-h-screen flex justify-center items-center `}>
      <BackButton />

      {loading ? (
        <Loader />
      ) : (
        <div className="w-full max-w-screen-md rounded-lg px-8 py-12 text-gray-50 flex flex-col items-center glow-login-blue">
          <h1 className="text-center text-2xl font-medium mb-8">
            Employee Registration
          </h1>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full text-gray-50 "
          >
            <div className="mb-6 flex flex-col md:flex-row md:space-x-4 ">
              <div className="w-full md:w-1/2 ">
                <label
                  htmlFor="email"
                  className="block  text-sm font-bold mb-2"
                >
                  Email: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="youremail@example.com"
                  {...register("email", { required: true })}
                  className="rounded w-full py-2 px-3   focus:outline-none focus:none   glow-input-blue"
                />
                {errors.email && (
                  <span className="text-red-300 text-sm">
                    Email is required
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="empName"
                  className="block   text-sm font-bold mb-2"
                >
                  Name: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="empName"
                  placeholder="Your Name"
                  {...register("empName", { required: true })}
                  className="rounded w-full py-2 px-3 focus:outline-none focus:none  glow-input-blue"
                />
                {errors.empName && (
                  <span className="text-red-600 text-sm">Name is required</span>
                )}
              </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="password"
                  className="block   text-sm font-bold mb-2"
                >
                  Password: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                  className="rounded w-full py-2 px-3   focus:outline-none focus:none  glow-input-blue"
                />
                {errors.password && (
                  <span className="text-red-600 text-sm">
                    Password is required
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="confirmPassword"
                  className="block   text-sm font-bold mb-2"
                >
                  Confirm Password:{" "}
                  <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                  className=" rounded w-full py-2 px-3   focus:outline-none focus:none  glow-input-blue"
                />
                {errors.confirmPassword && (
                  <span className="text-red-600 text-sm">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-6 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="empGender"
                  className="block  text-sm font-bold mb-2"
                >
                  Gender: <span className="text-sm text-red-600">*</span>
                </label>
                <select
                  id="empGender"
                  {...register("empGender", { required: true })}
                  className=" rounded w-full py-2 px-3   focus:outline-none focus:none  glow-input-blue"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.empGender && (
                  <span className="text-red-600 text-sm">
                    Gender is required
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="empDateOfBirth"
                  className="block   text-sm font-bold mb-2"
                >
                  Date of Birth: <span className="text-sm text-red-600">*</span>
                </label>
                <input
                  type="date"
                  id="empDateOfBirth"
                  {...register("empDateOfBirth", { required: true })}
                  className=" rounded w-full py-2 px-3  focus:outline-none focus:none  glow-input-blue"
                />
                {errors.empDateOfBirth && (
                  <span className="text-red-600 text-sm">
                    Date of Birth is required
                  </span>
                )}
              </div>
            </div>

            <div className="mb-7 flex flex-col md:flex-row md:space-x-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="empDepartment"
                  className="block  text-sm font-bold mb-2"
                >
                  Department: <span className="text-sm text-red-600">*</span>
                </label>
                <select
                  id="empDepartment"
                  defaultValue="admin"
                  {...register("empDepartment", { required: true })}
                  className="  rounded w-full py-2 px-3  focus:outline-none focus:none  glow-input-blue"
                >
                  <option value="admin">Admin</option>
                  <option value="hr">HR</option>
                  <option value="finance">Finance</option>
                  <option value="it">IT</option>
                </select>
                {errors.empDepartment && (
                  <span className="text-red-600 text-sm">
                    Department is required
                  </span>
                )}
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="empPosition"
                  className="block   text-sm font-bold mb-2"
                >
                  Position: <span className="text-sm text-red-600">*</span>
                </label>
                <select
                  id="empPosition"
                  defaultValue="intern"
                  {...register("empPosition", { required: true })}
                  className="  rounded w-full py-2 px-3  focus:outline-none focus:none  glow-input-blue"
                >
                  <option value="manager">Manager</option>
                  <option value="intern">Intern</option>
                  <option value="associate">Associate</option>
                  <option value="ceo">CEO</option>
                </select>
                {errors.empPosition && (
                  <span className="text-red-600 text-sm">
                    Position is required
                  </span>
                )}
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-md font-medium mt-0 mb-5 text-center">
                {errorMessage}
              </div>
            )}

            <div className="flex items-center mb-2">
              <button
                type="submit"
                className=" text-gray-50 w-full font-bold py-2 px-4 rounded focus:outline-none focus:none transition-all transform hover:scale-105 duration-1000 glow-button"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateEmployee;
