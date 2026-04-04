import multer from "multer";

const imageMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req, file, cb) => {
    if (!imageMimeTypes.includes(file.mimetype)) {
      cb(new Error("Only image files are allowed"));
      return;
    }

    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024
  }
});