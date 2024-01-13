const multer = require('multer');
const files = require("../controllers/file_record.controller.js");
const router = require("express").Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = app => {

  router.post("/upload",  upload.single('file'), files.uploadFile);

  app.use('/api/file', router);
};
