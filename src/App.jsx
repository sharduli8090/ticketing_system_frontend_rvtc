// import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import AdminDashboard from './components/admin-dash/AdminDashboard';
import EmployeeDashboard from './components/employee-dash/EmployeeDashboard';
import AdminLogin from './components/admin-login/AdminLogin';
import EmployeeLogin from './components/employee-login/EmployeeLogin';
import useAuthService from './services/authService/AuthService';
import Unauthorized from './components/unauth/Unauthorized';
import AllEmployee from './components/all-employee/AllEmployee';
import AllTicket from './components/all-ticket/AllTicket';
import CreateEmployee from './components/create-employee/CreateEmployee';

const App = () => {
  const authService = useAuthService();

  return (
    <Router>
      <Header />
      <Routes>
        
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/unauth" element={<Unauthorized/>} />
        <Route path="/admindash" element={<GuardedRoute component={AdminDashboard} roles={['admin']} />} />
        <Route path="/getallemployee" element={<GuardedRoute component={AllEmployee} roles={['admin']} />} />
        <Route path="/getallticket" element={<GuardedRoute component={AllTicket} roles={['admin']} />} />
        <Route path="/createemployee" element={<GuardedRoute component={CreateEmployee} roles={['admin']} />} />
        <Route path="/employeedash" element={<GuardedRoute component={EmployeeDashboard} roles={['employee']} />} />
        <Route path="/" element={authService.isLoggedIn() ? authService.getUserType() === 'admin' ? <Navigate to="/admindash" /> : <Navigate to="/employeedash" /> : <Navigate to="/employee-login" />} />
          {/* <Navigate to="/admindash" />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

// eslint-disable-next-line react/prop-types
const GuardedRoute = ({ component: Component, roles }) => {
  const authService = useAuthService();
  return (
    authService.isAuthorized(roles) ? (
      <Component />
    ) : (
      <Navigate to="/unauth" />
    )
  );
};

export default App;
