const fs = require('fs');
const path = require('path')

const db = require("../models");
const { UPLOAD_DIR } = require("../lib/constants");
const { validation } = require('../lib/validator')

const FileRecord = db.file_records;

module.exports = {
  /**
   * Use to upload a text file
   * @param {*} req 
   * @param {*} res 
   */
  uploadFile: async (req, res) => {
    try {

      validation(req, ['file']);

      const file = req.file;
      const filePath = UPLOAD_DIR + file.originalname;

      const writableStream = fs.createWriteStream(filePath);

      writableStream.write(file.buffer);

      writableStream.on('open', () => {
        console.log('Stream open ...  0.00%');
        req.pipe(writableStream);
      });

      writableStream.on('close', async () => {
        console.log('Processing  ...  100%');
        const data = await FileRecord.saveFile(file.originalname);
        res.status(201).send({
          message: "File uploaded successfully.",
          fileId: data.id
        });

      });

      writableStream.on('error', err => {
        console.error(err);
        throw err;
      });


    } catch (err) {
      res.status(err.code || 500).send({
        message:
          err.message || "Something went wrong"
      });
    }
  },

  uploadFileBasic: async (req, res) => {
    try {
      const file = req.file;

      if (!file) {
        throw new Error('No file uploaded.');
      }

      const filePath = __dirname + '/uploads/' + file.originalname;

      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          console.error('Error saving file:', err);
          res.status(500).send('Error saving file.');
        } else {
          console.log('File saved successfully.');
          res.send('File uploaded and saved successfully.');
        }
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      res.status(500).send(error.message || 'Error uploading file.');
    }
  }
}