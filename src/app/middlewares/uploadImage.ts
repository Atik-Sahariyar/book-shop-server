import path from "path";
import multer, { Multer } from "multer";
import { Request } from "express";
import fs from "fs";

// Set up local storage engine to save images on the server (cPanel)
const storage = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    // Dynamically set the path based on a parameter in the request (e.g., locationFolder)
    const locationFolder = req.query.locationFolder || "general"; // Default to 'general' if no folder is specified
     
    const uploadPath = path.join(__dirname, `../../../uploads/${locationFolder}`);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    // Save images to the dynamically created folder
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Use original file name or create a unique name using the current date and time
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// Initialize multer middleware with local storage
const upload: Multer = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|jfif|webp/; // Allowed image types
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed") as unknown as null, false);
    }
  },
});

export default upload;
