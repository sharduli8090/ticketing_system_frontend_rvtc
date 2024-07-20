// import React from 'react';
import CardsComponent from "../cards/Card";

import { adminCards } from "../../constant/Constant";

const AdminDashboard = () => {
  return (
    <div>
      <CardsComponent cards={adminCards} />
    </div>
  );
};

export default AdminDashboard;
