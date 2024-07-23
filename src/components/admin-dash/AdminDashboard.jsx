// import React from 'react';
import CardsComponent from "../cards/Card";

import { adminCards } from "../../constant/Constant";

import { useEffect } from "react";
import useToastNotifications from "../../services/toastify/ToasterService";

const AdminDashboard = () => {
  const { notifyDefault } = useToastNotifications();
  useEffect(() => {
    notifyDefault("Welcome to Admin Dashboard");
  }, [notifyDefault]);

  return (
    <div>
      <CardsComponent cards={adminCards} />
    </div>
  );
};

export default AdminDashboard;
