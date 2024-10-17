import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { useParams, useNavigate } from "react-router-dom";

const EditAsset = () => {
  const { id } = useParams();
  const [asset, setAsset] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/assets/${id}`).then((res) => {
      const formattedAsset = {
        ...res.data,
        purchaseDate: formatDate(res.data.purchaseDate),
        lastMaintenanceDate: formatDate(res.data.lastMaintenanceDate),
        nextScheduledMaintenance: formatDate(res.data.nextScheduledMaintenance),
      };
      setAsset(formattedAsset);
    });
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/assets/${id}`, asset).then(() => {
      navigate("/admin/repair/viewassets");
    });
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h1 className="text-2xl font-bold mb-4 text-white">Edit Asset</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-white  text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-light focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={asset.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="model">
            Model
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-light focus:outline-none focus:shadow-outline"
            id="model"
            type="text"
            name="model"
            value={asset.model}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block  text-sm font-bold mb-2"
            htmlFor="manufacturer"
          >
            Manufacturer
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-light focus:outline-none focus:shadow-outline"
            id="manufacturer"
            type="text"
            name="manufacturer"
            value={asset.manufacturer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block  text-sm font-bold mb-2"
            htmlFor="purchaseDate"
          >
            Purchase Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-light focus:outline-none focus:shadow-outline"
            id="purchaseDate"
            type="date"
            name="purchaseDate"
            value={asset.purchaseDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block  text-sm font-bold mb-2"
            htmlFor="lastMaintenanceDate"
          >
            Last Maintenance Date
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-light focus:outline-none focus:shadow-outline"
            id="lastMaintenanceDate"
            type="date"
            name="lastMaintenanceDate"
            value={asset.lastMaintenanceDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block  text-sm font-bold mb-2"
            htmlFor="nextScheduledMaintenance"
          >
            Next Scheduled Maintenance
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-light focus:outline-none focus:shadow-outline"
            id="nextScheduledMaintenance"
            type="date"
            name="nextScheduledMaintenance"
            value={asset.nextScheduledMaintenance}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="status">
            Status
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-light focus:outline-none focus:shadow-outline"
            id="status"
            name="status"
            value={asset.status}
            onChange={handleChange}
            required
          >
            <option value="operational">Operational</option>
            <option value="underMaintenance">Under Maintenance</option>
            <option value="outOfService">Out of Service</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block  text-sm font-bold mb-2" htmlFor="location">
            Location
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3  leading-light focus:outline-none focus:shadow-outline"
            id="location"
            type="text"
            name="location"
            value={asset.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditAsset;
