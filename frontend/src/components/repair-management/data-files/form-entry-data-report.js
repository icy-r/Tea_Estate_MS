import axios from "../../../services/axios.js";

function opt() {
  let options = [];
  axios.get("/machines").then((response) => {
    response.data.map((machine) => {
      options.push({ value: machine.item_id, label: machine.item_id });
    });
  });
  return options;
}

const formdataentry = [
  {
    name: "Request ID",
    required: true,
    placeholder: "request_id",
    type: "number",
  },
  {
    name: "Machine ID",
    required: true,
    placeholder: "item_id",
    type: "select",
    options: opt(),
  },
  {
    name: "Request Date",
    required: true,
    placeholder: "request_date",
    value: new Date().toISOString().split("T")[0],
    type: "date",
  },
  {
    name: "Issue Description",
    required: true,
    placeholder: "issue_description",
    type: "text",
  },
  {
    name: "Priority Level",
    required: true,
    placeholder: "priority_level",
    type: "select",
    options: [
      { value: "Low", label: "Low" },
      { value: "Medium", label: "Medium" },
      { value: "High", label: "High" },
    ],
  },
  {
    name: "Assigned Technician ID",
    required: true,
    placeholder: "assigned_technician_id",
    type: "text",
  },
  {
    name: "Status",
    required: true,
    placeholder: "status",
    type: "select",
    options: [
      { value: "Pending", label: "Pending" },
      { value: "In Progress", label: "In Progress" },
      { value: "Completed", label: "Completed" },
    ],
  },
];

export default formdataentry;
