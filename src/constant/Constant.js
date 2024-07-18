export const Constants = {
  API_ADMIN_ENDPOINT: {
    ADMIN_LOGIN: 'login',
    CREATE_EMPLOYEE: 'createemployee',
    GET_ALL_EMPLOYEE: 'getallemployee',
    GET_ALL_TICKET: 'getallticket',
    DELETE_ALL_TICKET: 'deleteallticket',
    DELETE_TICKET: 'deleteticket/',
    DELETE_EMPLOYEE: 'deleteemployee/',
    DELETE_ALL_EMPLOYEE: 'deleteallemployee',
    APPROVE_DENY_TICKET: 'approvedenyticket/',
    GET_EMPLOYEE_DEPT_WISE: 'getdeptwiseemployee',
    GET_TICKET_DEPT_WISE: 'getdeptwiseticket',
  },
  API_EMPLOYEE_ENDPOINT: {
    EMPLOYEE_LOGIN: 'employee/login',
    CREATE_TICKET: 'employee/createticket',
    CLOSE_TICKET: 'employee/closeticket/',
  },
  API_GENERAL_ENDPOINT: {
    SEND_QUERY: 'sendqueryfeedback',
  },
  VALIDATION_MESSAGE: {
    REQUIRED: 'This field is required',
  },
};
export const adminCards = [
  {
    name: 'Create Employee',
    buttonText: 'Add New',
    endpoint: '/createemployee',
    description: 'Quickly add new employees to the system.',
  },
  {
    name: 'Get All Employees',
    buttonText: 'See All',
    endpoint: '/getallemployee',
    description: 'Manage existing employee information.',
  },
  {
    name: 'Get All Tickets',
    buttonText: 'View Tickets',
    endpoint: '/getallticket',
    description: 'Track and address support requests.',
  },
];
export const employeeCards = [
  {
    name: 'Explore Your Profile',
    buttonText: 'Explore',
    endpoint: '/getemployee/',
    description:
      'Explore your personal profile to view and manage your information.',
  },
  {
    name: 'Create New Ticket',
    buttonText: 'Create',
    endpoint: '/createticket',
    description: 'Initiate the creation process for a new support ticket.',
  },
  {
    name: 'View Tickets Raised by You',
    buttonText: 'View Your Tickets',
    endpoint: '/getticketraisedbyme',
    description:
      'View all support tickets that you have raised for assistance.',
  },
  {
    name: 'Manage Tickets Raised for You',
    buttonText: 'Manage Tickets',
    endpoint: '/getticketinmyname',
    description:
      'Access and manage support tickets that have been raised on your behalf.',
  },
];

// todo: add approve deny based on department on employee
// add department var to employee
// add department to ticket
// update ticket on admin side
// update employee on admin side
// check response constant
