import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import EditMaintenanceRequest from "../EditMaintenanceRequest";

test("renders edit maintenance request form", () => {
  render(<EditMaintenanceRequest />);
  expect(screen.getByText(/Edit Maintenance Request/i)).toBeInTheDocument();
});

// Add more tests...
