// import React from 'react';
import CardsComponent from '../cards/Card';

import { employeeCards } from '../../constant/Constant';

const EmployeeDashboard = () => {
  return (
    <div>
      <CardsComponent cards={employeeCards} />
    </div>
  );
};

export default EmployeeDashboard;
