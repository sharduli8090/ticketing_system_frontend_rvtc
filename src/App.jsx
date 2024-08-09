import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./components/admin-dash/AdminDashboard";
import AdminLogin from "./components/admin-login/AdminLogin";
import AllEmployee from "./components/all-employee/AllEmployee";
import AllTicket from "./components/all-ticket/AllTicket";
import AllQuery from "./components/allquery/AllQuery";
import CreateEmployee from "./components/create-employee/CreateEmployee";
import CreateTicket from "./components/create-ticket/CreateTicket";
import EmployeeDashboard from "./components/employee-dash/EmployeeDashboard";
import EmployeeLogin from "./components/employee-login/EmployeeLogin";
import EmployeeProfile from "./components/employeeProfile/EmployeeProfile";
import FloatingWidget from "./components/floating-widget/FloatingWidget";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header2";
import Home from "./components/home/Home2";
import SendQuery from "./components/sendQuery/SendQuery";
import TicketsRaisedByMe from "./components/ticketsbyme/TicketsRaisedByMe";
import TicketsInMyName from "./components/ticketsinmyname/TicketsInMyName";
import Unauthorized from "./components/unauth/Unauthorized";
import useAuthService from "./services/authService/AuthService";
const App = () => {
  const authService = useAuthService();

  return (
    <Router>
      <Header />
      <ToastContainer />
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
          path="/getquery"
          element={<GuardedRoute component={AllQuery} roles={["admin"]} />}
        />
        <Route
          path="/employeedash"
          element={
            <GuardedRoute component={EmployeeDashboard} roles={["employee"]} />
          }
        />
        <Route
          path="/createticket"
          element={
            <GuardedRoute component={CreateTicket} roles={["employee"]} />
          }
        />
        <Route
          path="/employeeprofile"
          element={
            <GuardedRoute component={EmployeeProfile} roles={["employee"]} />
          }
        />
        <Route
          path="/getticketraisedbyme"
          element={
            <GuardedRoute component={TicketsRaisedByMe} roles={["employee"]} />
          }
        />
        <Route
          path="/getticketinmyname"
          element={
            <GuardedRoute component={TicketsInMyName} roles={["employee"]} />
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
      </Routes>
      <Footer />
      <FloatingWidget />
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
