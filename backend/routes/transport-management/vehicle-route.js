import { Router } from "express";
import * as vehicleController from "../../controllers/transport-management/vehicle-controller.js";
import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";

import multer from 'multer';
import path from 'path';
import express from 'express';
import fs from 'fs';

const app = express();

// Create the uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);import { Router } from "express";
  import * as vehicleController from "../../controllers/transport-management/vehicle-controller.js";
  import { checkAuth, decodeUserFromToken } from "../../middleware/auth-mid.js";
  import multer from 'multer';
  import path from 'path';
  import express from 'express';
  import fs from 'fs';
  import { fileURLToPath } from 'url';
  
  // Get the current directory
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  
  // Create the uploads directory if it doesn't exist
  const uploadDir = path.join(__dirname, 'uploads'); // Use __dirname to set the uploads path
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }
  
  // Set up Multer storage
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir);  // Save files to 'uploads' directory
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp for unique file names
    },
  });
  
  const upload = multer({ storage: storage });
  
  const router = Router();
  router.use(decodeUserFromToken);
  
  // Define your routes
  router.get("/", checkAuth, vehicleController.index);
  router.get("/:id", checkAuth, vehicleController.show);
  
  router.post("/", upload.single('imageUrl'), (req, res) => {
    try {
      if (!req.file) { // Change req.files to req.file for single file uploads
        return res.status(450).send('No file uploaded.');
      }
  
      console.log(req.file);  // For debugging
  
      // Handle additional logic if needed
  
      res.status(200).json({
        fileName: req.file.filename,
        filePath: `./uploads/${req.file.filename}`,
      });
    } catch (error) {
      console.error("Error processing file upload:", error);
      res.status(530).send('Internal Server Error');
    }
  });
  
  router.put("/:id", checkAuth, vehicleController.update);
  router.delete("/:id", checkAuth, vehicleController.destroy);
  
  export { router };
  
  // Start the server (if needed)
  const app = express();
  app.listen(5000, () => {
    console.log('Server started on http://localhost:5000');
  });
  
}

// Set up Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);  // Save files to 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp for unique file names
  },
});

const upload = multer({ storage: storage });

const router = Router();
router.use(decodeUserFromToken);

// Define your routes
router.get("/", checkAuth, vehicleController.index);
router.get("/:id", checkAuth, vehicleController.show);

router.post("/", upload.single('imageUrl'), (req, res) => {
  try {
    if (!req.file) { // Change from req.files to req.file
      console.log(req);
      return res.status(450).send('No file uploaded.');
    }

    // For debugging
    console.log(req.file); // Updated to req.file

    // Handle additional logic if needed

    res.status(200).json({
      fileName: req.file.filename,
      filePath: `./uploads/${req.file.filename}`,
    });
  } catch (error) {
    console.error("Error processing file upload:", error);
    res.status(530).send('Internal Server Error');
  }
});

router.put("/:id", checkAuth, vehicleController.update);
router.delete("/:id", checkAuth, vehicleController.destroy);

export { router };

// Start the server
app.listen(5000, () => {
  console.log('Server started on http://localhost:5000');
});
