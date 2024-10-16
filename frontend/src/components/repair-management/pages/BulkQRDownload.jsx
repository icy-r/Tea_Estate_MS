import { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { saveAs } from "file-saver";
import { QRCodeSVG } from "qrcode.react";
import JSZip from "jszip";
import ReactDOMServer from "react-dom/server";

const BulkQRDownload = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("/assets");
      setAssets(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching assets:", error);
      setLoading(false);
    }
  };

  const generateQRCode = (assetId) => {
    return <QRCodeSVG value={assetId} />;
  };

  const downloadQRCode = (assetId) => {
    const qrCodeElement = generateQRCode(assetId);
    const svgString = ReactDOMServer.renderToStaticMarkup(qrCodeElement);
    return new Blob([svgString], { type: "image/svg+xml;charset=utf-8" });
  };

  const downloadAllQRCode = async () => {
    const zip = new JSZip();
    assets.forEach((asset) => {
      const qrCodeBlob = downloadQRCode(asset._id);
      zip.file(`QR-${asset._id}.svg`, qrCodeBlob);
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    saveAs(zipBlob, "assets-qr-codes.zip");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bulk QR Code Download</h1>
      <button
        onClick={downloadAllQRCode}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download All QR Codes
      </button>
    </div>
  );
};

export default BulkQRDownload;
