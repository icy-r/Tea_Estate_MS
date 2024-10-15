import {
  create,
  index,
  show,
  update,
  destroy,
  search,
} from "../../controllers/repair-management/request-maintenance-controller";
import { MaintenanceRequest } from "../../models/repair-management/request-maintenance";

jest.mock("../../models/repair-management/request-maintenance");

describe("Request Maintenance Controller", () => {
  let mockReq, mockRes;

  beforeEach(() => {
    mockReq = {
      body: {},
      params: {},
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("create function creates a new maintenance request", async () => {
    const mockSave = jest.fn();
    MaintenanceRequest.mockImplementation(() => ({
      save: mockSave,
    }));

    mockReq.body = { description: "Test request" };
    await create(mockReq, mockRes);

    expect(MaintenanceRequest).toHaveBeenCalledWith(mockReq.body);
    expect(mockSave).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalled();
  });

  test("index function returns all maintenance requests", async () => {
    const mockFind = jest
      .fn()
      .mockResolvedValue([{ _id: "1", description: "Test request" }]);
    MaintenanceRequest.find = mockFind;

    await index(mockReq, mockRes);

    expect(mockFind).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));
  });

  test("show function returns a single maintenance request", async () => {
    const mockFindById = jest
      .fn()
      .mockResolvedValue({ _id: "1", description: "Test request" });
    MaintenanceRequest.findById = mockFindById;

    mockReq.params.id = "1";
    await show(mockReq, mockRes);

    expect(mockFindById).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Object));
  });

  test("update function updates a maintenance request", async () => {
    const mockFindByIdAndUpdate = jest
      .fn()
      .mockResolvedValue({ _id: "1", description: "Updated request" });
    MaintenanceRequest.findByIdAndUpdate = mockFindByIdAndUpdate;

    mockReq.params.id = "1";
    mockReq.body = { description: "Updated request" };
    await update(mockReq, mockRes);

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith("1", mockReq.body, {
      new: true,
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Object));
  });

  test("destroy function deletes a maintenance request", async () => {
    const mockFindByIdAndDelete = jest
      .fn()
      .mockResolvedValue({ _id: "1", description: "Deleted request" });
    MaintenanceRequest.findByIdAndDelete = mockFindByIdAndDelete;

    mockReq.params.id = "1";
    await destroy(mockReq, mockRes);

    expect(mockFindByIdAndDelete).toHaveBeenCalledWith("1");
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.any(String) })
    );
  });

  test("search function finds maintenance requests by assetId", async () => {
    const mockFind = jest
      .fn()
      .mockResolvedValue([
        { _id: "1", assetId: "A001", description: "Test request" },
      ]);
    MaintenanceRequest.find = mockFind;

    mockReq.params.id = "A001";
    await search(mockReq, mockRes);

    expect(mockFind).toHaveBeenCalledWith({ assetId: "A001" });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.any(Array));
  });
});
