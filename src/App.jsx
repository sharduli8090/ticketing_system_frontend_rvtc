// import React from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import AdminDashboard from "./components/admin-dash/AdminDashboard";
import AdminLogin from "./components/admin-login/AdminLogin";
import AllEmployee from "./components/all-employee/AllEmployee";
import AllTicket from "./components/all-ticket/AllTicket";
import CreateEmployee from "./components/create-employee/CreateEmployee";
import EmployeeDashboard from "./components/employee-dash/EmployeeDashboard";
import EmployeeLogin from "./components/employee-login/EmployeeLogin";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Unauthorized from "./components/unauth/Unauthorized";
import useAuthService from "./services/authService/AuthService";
import SendQuery from "./components/sendQuery/SendQuery";

const App = () => {
  const authService = useAuthService();

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/sendquery" element={<SendQuery />} />
        <Route path="/employee-login" element={<EmployeeLogin />} />
        <Route path="/unauth" element={<Unauthorized />} />
        <Route
          path="/admindash"
          element={
            <GuardedRoute component={AdminDashboard} roles={["admin"]} />
          }
        />
        <Route
          path="/getallemployee"
          element={<GuardedRoute component={AllEmployee} roles={["admin"]} />}
        />
        <Route
          path="/getallticket"
          element={<GuardedRoute component={AllTicket} roles={["admin"]} />}
        />
        <Route
          path="/createemployee"
          element={
            <GuardedRoute component={CreateEmployee} roles={["admin"]} />
          }
        />
        <Route
          path="/employeedash"
          element={
            <GuardedRoute component={EmployeeDashboard} roles={["employee"]} />
          }
        />
        <Route
          path="/"
          element={
            authService.isLoggedIn() ? (
              authService.getUserType() === "admin" ? (
                <Navigate to="/admindash" />
              ) : (
                <Navigate to="/employeedash" />
              )
            ) : (
              <Navigate to="/home" />
            )
          }
        />
        {/* <Navigate to="/admindash" />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
};

// eslint-disable-next-line react/prop-types
const GuardedRoute = ({ component: Component, roles }) => {
  const authService = useAuthService();
  return authService.isAuthorized(roles) ? (
    <Component />
  ) : (
    <Navigate to="/unauth" />
  );
};

export default App;
