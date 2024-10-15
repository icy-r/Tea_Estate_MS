import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import ReqMaintenance from "../pages/ReqMaintenance";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
}));

describe("ReqMaintenance Component", () => {
  beforeEach(() => {
    axios.get.mockResolvedValueOnce({
      data: [
        { _id: "1", firstName: "John", lastName: "Doe", designation: "Labour" },
      ],
    });
    axios.get.mockResolvedValueOnce({
      data: [{ _id: "1", name: "Asset 1", assetType: "Type 1" }],
    });
  });

  it("renders ReqMaintenance form", async () => {
    render(<ReqMaintenance />);
    await waitFor(() => {
      expect(screen.getByText("Request Maintenance")).toBeInTheDocument();
    });
  });

  it("submits form with correct data", async () => {
    axios.post.mockResolvedValueOnce({ data: {} });
    render(<ReqMaintenance />);

    await waitFor(() => {
      fireEvent.change(screen.getByLabelText(/Request Type/i), {
        target: { value: "repair" },
      });
      fireEvent.change(screen.getByLabelText(/Priority/i), {
        target: { value: "high" },
      });
      fireEvent.change(screen.getByLabelText(/Description/i), {
        target: { value: "Test description" },
      });
      fireEvent.change(screen.getByLabelText(/Assigned Technician/i), {
        target: { value: "1" },
      });
      fireEvent.change(screen.getByLabelText(/Asset/i), {
        target: { value: "1" },
      });
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "/requestmaintenance",
        expect.any(Object)
      );
    });
  });

  it("displays error message on submission failure", async () => {
    axios.post.mockRejectedValueOnce(new Error("Submission failed"));
    render(<ReqMaintenance />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Submit"));
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "Failed to submit maintenance request. Please try again."
        )
      ).toBeInTheDocument();
    });
  });
});
