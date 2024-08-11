export const Constants = {
  API_ADMIN_ENDPOINT: {
    ADMIN_LOGIN: "login",
    CREATE_EMPLOYEE: "createemployee",
    GET_ALL_EMPLOYEE: "getallemployee",
    GET_ALL_TICKET: "getallticket",
    DELETE_ALL_TICKET: "deleteallticket",
    DELETE_TICKET: "deleteticket/",
    DELETE_EMPLOYEE: "deleteemployee/",
    DELETE_ALL_EMPLOYEE: "deleteallemployee",
    GET_EMPLOYEE_DEPT_WISE: "getdeptwiseemployee",
    GET_TICKET_DEPT_WISE: "getdeptwiseticket",
    UPDATE_EMPLOYEE: "updateemployee/",
    APPROVE_DENY_TICKET: "approvedenyticket/",
    GET_QUERY: "getquery",
  },
  API_EMPLOYEE_ENDPOINT: {
    EMPLOYEE_LOGIN: "login",
    CREATE_TICKET: "createticket",
    CLOSE_TICKET: "closeticket/",
    GET_EMPLOYEE: "getemployee/",
    GET_TICKETS_RAISED_BY_ME: "getticketraisedbyme",
    GET_TICKETS_IN_MY_NAME: "getticketinmyname",
    APPROVE_DENY_TICKET: "approvedenyticket/",
  },
  API_GENERAL_ENDPOINT: {
    SEND_QUERY: "sendqueryfeedback",
  },
  VALIDATION_MESSAGE: {
    REQUIRED: "This field is required",
  },
};
export const adminCards = [
  {
    name: "Create Employee",
    buttonText: "Add New",
    endpoint: "/createemployee",
    description: "Quickly add new employees to the system.",
  },
  {
    name: "Get All Employees",
    buttonText: "See All",
    endpoint: "/getallemployee",
    description: "Manage existing employee information.",
  },
  {
    name: "Get All Tickets",
    buttonText: "View Tickets",
    endpoint: "/getallticket",
    description: "Track and address support requests.",
  },
  {
    name: "Review problems",
    buttonText: "View Queries",
    endpoint: "/getquery",
    description: "Track and address support queries",
  },
];
export const employeeCards = [
  {
    name: "Explore Your Profile",
    buttonText: "Explore",
    endpoint: "/employeeprofile",
    description:
      "Explore your personal profile to view and manage your information.",
  },
  {
    name: "Create New Ticket",
    buttonText: "Create",
    endpoint: "/createticket",
    description: "Initiate the creation process for a new support ticket.",
  },
  {
    name: "View Tickets Raised by You",
    buttonText: "View Your Tickets",
    endpoint: "/getticketraisedbyme",
    description:
      "View all support tickets that you have raised for assistance.",
  },
  {
    name: "Manage Tickets Raised for You",
    buttonText: "Manage Tickets",
    endpoint: "/getticketinmyname",
    description:
      "Access and manage support tickets that have been raised on your behalf.",
  },
  // send query
  {
    name: "Get your query resolved",
    buttonText: "Send Query",
    endpoint: "/sendquery",
    description: "Send a query to the admin for resolution",
  }
];

export const featCards = [
  {
    head: "Seamless Two-Way Login",
    desc: "Effortlessly switch between admin and employee roles with secure, easy logins.",
  },
  {
    head: "Tailored Dashboards",
    desc: "Enjoy personalized dashboards designed specifically for admins and employees, providing a focused and intuitive user experience.",
  },
  {
    head: "Comprehensive Admin Control",
    desc: "Manage everything with ease: view, update, and delete all tickets and employee data from one powerful admin panel.",
  },
  {
    head: "Efficient Ticket Resolution",
    desc: "Admins can quickly close individual tickets, ensuring swift issue resolution.",
  },
  {
    head: "Empowered Employee Access",
    desc: "Employees can manage their profiles, view tickets they’ve raised or are assigned to, and close them with ease.",
  },
  {
    head: "Instant Real-Time Updates",
    desc: "Stay up-to-date with automatic real-time data synchronization, ensuring everyone has the latest information at their fingertips.",
  },
];


export const statsCards = [
  {
    head: "Tickets Solved",
    desc: "1500+",
  },
  {
    head: "Happy Clients",
    desc: "300+",
  },
  {
    head: "Support Hours",
    desc: "24/7",
  },
];
