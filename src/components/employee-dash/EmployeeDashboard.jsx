import CardsComponent from "../cards/Card";

import { useEffect } from "react";
import { employeeCards } from "../../constant/Constant";
import useToastNotifications from "../../services/toastify/ToasterService";
const EmployeeDashboard = () => {
  const { notifyDefault } = useToastNotifications();
  useEffect(() => {
    notifyDefault("Welcome to Employee Dashboard");
  }, [notifyDefault]);

  return (
    <div>
      <CardsComponent cards={employeeCards} />
    </div>
  );
};

export default EmployeeDashboard;
