import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";

const ScanQRforAsset = () => {
  const [scannedAssetId, setScannedAssetId] = useState(null);
  const [scanError, setScanError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initialize QR code scanner
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: 250,
      formatsToSupport: ["QR_CODE"],
    });

    // Success and error callback functions
    const success = (result) => {
      setScannedAssetId(result);
      setScanError(null);
      scanner
        .clear()
        .then(() => navigate(`/admin/repair/assetDetails/${result}`))
        .catch((err) => console.error("Failed to clear scanner: ", err));
    };

    const error = (err) => {
      console.error(err);
      if (err === "QR code parse error, skipped") {
        return; // Ignore frame-level errors
      }
      setScanError("No QR code detected. Please try again.");
    };

    // Render the QR scanner
    scanner.render(success, error);

    // Cleanup on component unmount
    return () => {
      scanner
        .clear()
        .catch((err) =>
          console.error("Failed to clear scanner on unmount: ", err)
        );
    };
  }, [navigate]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code for Asset</h1>
      <div id="reader" className="w-full max-w-lg mx-auto"></div>
      {scannedAssetId && (
        <p className="mt-4 text-center">Scanned Asset ID: {scannedAssetId}</p>
      )}
      {scanError && (
        <p className="mt-4 text-center text-red-500">{scanError}</p>
      )}
    </div>
  );
};

export default ScanQRforAsset;
