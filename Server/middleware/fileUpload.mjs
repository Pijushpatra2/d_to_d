import multer from "multer";
import multerS3 from "multer-s3";
import s3 from "../utils/s3.js";
import dotenv from "dotenv";

dotenv.config();

export const uploadToS3 = (folder) => {
  return multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_S3_BUCKET,
      // acl: "public-read", // ✅ make files publicly accessible
      key: function (req, file, cb) {
        const sanitizedFilename = file.originalname.replace(/\s|\+/g, "_");
        const uniqueName = `${Date.now()}-${sanitizedFilename}`;
        cb(null, `${folder}/${uniqueName}`);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      if (
        ["image/jpeg", "image/png", "image/webp", "image/jpg"].includes(file.mimetype)
      ) {
        cb(null, true);
      } else {
        cb(new Error("Invalid file type. Only JPEG, PNG, and WEBP are allowed."));
      }
    },
  });
};
