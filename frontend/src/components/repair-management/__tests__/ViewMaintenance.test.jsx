import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ViewMaintenance from "../pages/ViewMaintenance";

jest.mock("axios", () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
}));

describe("ViewMaintenance Component", () => {
  const mockMaintenanceTasks = [
    {
      _id: "1",
      scheduledDate: "2023-01-01",
      maintenanceType: "Repair",
      description: "Fix engine",
      status: "Pending",
      assetId: "1",
    },
    {
      _id: "2",
      scheduledDate: "2023-01-02",
      maintenanceType: "Maintenance",
      description: "Oil change",
      status: "Completed",
      assetId: "2",
    },
  ];

  const mockAssetDetails = {
    1: { assetNumber: "A001", assetName: "Tractor" },
    2: { assetNumber: "A002", assetName: "Harvester" },
  };

  beforeEach(() => {
    const { get } = require("axios");
    get.mockResolvedValueOnce({ data: mockMaintenanceTasks });
    get.mockImplementation((url) => {
      if (url.startsWith("/assets/")) {
        const assetId = url.split("/").pop();
        return Promise.resolve({ data: mockAssetDetails[assetId] });
      }
    });
  });

  it("renders ViewMaintenance component", async () => {
    render(<ViewMaintenance />);
    await waitFor(() => {
      expect(screen.getByText("Maintenance Report")).toBeInTheDocument();
    });
  });

  it("displays maintenance tasks", async () => {
    render(<ViewMaintenance />);
    await waitFor(() => {
      expect(screen.getByText("Fix engine")).toBeInTheDocument();
      expect(screen.getByText("Oil change")).toBeInTheDocument();
    });
  });

  it("filters tasks based on search term", async () => {
    render(<ViewMaintenance />);
    await waitFor(() => {
      fireEvent.change(screen.getByPlaceholderText("Search..."), {
        target: { value: "engine" },
      });
    });
    expect(screen.getByText("Fix engine")).toBeInTheDocument();
    expect(screen.queryByText("Oil change")).not.toBeInTheDocument();
  });

  it("generates PDF report", async () => {
    const mockJsPDF = {
      text: jest.fn(),
      autoTable: jest.fn(),
      save: jest.fn(),
    };
    jest.mock("jspdf", () => jest.fn(() => mockJsPDF));
    jest.mock("jspdf-autotable");

    render(<ViewMaintenance />);
    await waitFor(() => {
      fireEvent.click(screen.getByText("Generate Report"));
    });

    expect(mockJsPDF.save).toHaveBeenCalled();
  });
});
