//repairs related menu items

const menuItems = [
  {
    name: "Employee Details",
    subItems: [
      { name: "Employee Details", link: "employee/employeedetails" },
      { name: "Add Employee", link: "employee/employeeadd" },
    ],
  },
  {
    name: "Applicant Details",
    subItems: [
      { name: "Applicant Details", link: "employee/applicantdetails" },
      { name: "Send Email", link: "employee/applicantaccept/" },
    ],
  },
  {
    name: "Leave Application",
    subItems: [
      { name: "Leave Requests", link: "employee/requestleave" },
  
    ],
  },
];

export default menuItems;
