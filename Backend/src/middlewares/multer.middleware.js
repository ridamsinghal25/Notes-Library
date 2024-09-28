import multer from "multer";
import { ApiError } from "../utils/ApiError.js";

const storage = multer.diskStorage({
  destination: function (_, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (_, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const handleMulterError = (err, req, res, next) => {
  if (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      throw new ApiError(400, "File size too large. Max size is 10MB.");
    }
    throw new ApiError(400, err.message);
  }
  next();
};

export const createMulter = ({ fileTypes, fileSize }) => {
  return multer({
    storage: storage,
    limits: { fileSize: fileSize * 1024 * 1024 }, // Convert MB to Bytes
    fileFilter: (_, file, cb) => {
      if (fileTypes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error(`Only ${fileTypes.join(", ")} files are allowed!`), false);
      }
    },
  });
};
