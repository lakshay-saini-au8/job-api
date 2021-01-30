const multer = require("multer");
// specify the storage engine

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpb" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    // prevent upload
    cb({ message: "Unsuported file format" }, false);
  }
};

const imgUpload = multer({
  storage,
  limits: { fileSize: 0.5 * 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = imgUpload;
