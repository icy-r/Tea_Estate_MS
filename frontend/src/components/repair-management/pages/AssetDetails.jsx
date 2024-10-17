import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "../../../services/axios.js";
import { jsPDF } from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import { useNavigate } from "react-router-dom";
import { saveAs } from "file-saver";

const AssetDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asset, setAsset] = useState(null);
  const [showQR, setShowQR] = useState(false);
  const qrRef = useRef(null);

  useEffect(() => {
    axios.get(`/assets/${id}`).then((response) => {
      setAsset(response.data);
    });
  }, [id]);

  if (!asset) return <div>Loading...</div>;

  const printPDF = () => {
    const doc = new jsPDF();
    doc.text(`Asset Details: ${asset.name}`, 10, 10);
    doc.text(`Asset Number: ${asset.assetNumber}`, 10, 20);
    doc.text(`Asset Type: ${asset.assetType}`, 10, 30);
    doc.text(`Model: ${asset.model}`, 10, 40);
    doc.text(`Manufacturer: ${asset.manufacturer}`, 10, 50);
    doc.text(
      `Purchase Date: ${new Date(asset.purchaseDate).toLocaleDateString()}`,
      10,
      60
    );
    doc.text(
      `Last Maintenance Date: ${new Date(
        asset.lastMaintenanceDate
      ).toLocaleDateString()}`,
      10,
      70
    );
    doc.text(
      `Next Scheduled Maintenance: ${new Date(
        asset.nextScheduledMaintenance
      ).toLocaleDateString()}`,
      10,
      80
    );
    doc.text(`Status: ${asset.status}`, 10, 90);
    doc.text(`Location: ${asset.location}`, 10, 100);
    doc.save(`${asset.name}_details.pdf`);
  };

  const toggleQR = () => {
    setShowQR(!showQR);
  };

  const downloadQR = () => {
    if (qrRef.current) {
      const svgElement = qrRef.current.querySelector("svg");
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            saveAs(blob, "qrcode.png");
          });
        };
        img.src = "data:image/svg+xml;base64," + btoa(svgData);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/repair/assets/edit/${id}`);
  };

  const handleDelete = (id) => {
    axios.delete(`/assets/${id}`).then(() => {
      navigate("/admin/repair/viewassets");
    });
  };

  const handleMaintenance = (id) => {
    navigate(`/admin/repair/newmaintenance/${id}`);
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <h1 className="text-2xl font-bold mb-4 text-white">{asset.name}</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-bold">
              Asset Number:{" "}
              <span className="font-normal">{asset.assetNumber}</span>
            </p>
            <p className="font-bold">
              Asset Type: <span className="font-normal">{asset.assetType}</span>
            </p>
            <p className="font-bold">
              Model: <span className="font-normal">{asset.model}</span>
            </p>
            <p className="font-bold">
              Manufacturer:{" "}
              <span className="font-normal">{asset.manufacturer}</span>
            </p>
            <p className="font-bold">
              Purchase Date:{" "}
              <span className="font-normal">
                {new Date(asset.purchaseDate).toLocaleDateString()}
              </span>
            </p>
          </div>
          <div>
            <p className="font-bold">
              Last Maintenance Date:{" "}
              <span className="font-normal">
                {new Date(asset.lastMaintenanceDate).toLocaleDateString()}
              </span>
            </p>
            <p className="font-bold">
              Next Scheduled Maintenance:{" "}
              <span className="font-normal">
                {new Date(asset.nextScheduledMaintenance).toLocaleDateString()}
              </span>
            </p>
            <p className="font-bold">
              Status: <span className="font-normal">{asset.status}</span>
            </p>
            <p className="font-bold">
              Location: <span className="font-normal">{asset.location}</span>
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button
            onClick={printPDF}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Print Details
          </button>
          <button
            onClick={toggleQR}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            {showQR ? "Hide QR Code" : "Show QR Code"}
          </button>
        </div>
        {showQR && (
          <div className="mt-4 flex flex-col items-center">
            <div ref={qrRef}>
              <QRCodeSVG value={asset._id} size={128} />
            </div>
            <button
              onClick={downloadQR}
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
      {/* edit and delete buttons */}
      <div className="mt-6 flex justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleEdit(asset._id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDelete(asset._id)}
        >
          Delete
        </button>
        <button
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleMaintenance(asset._id)}
        >
          Add Maintenance
        </button>
      </div>
    </div>
  );
};

export default AssetDetails;
