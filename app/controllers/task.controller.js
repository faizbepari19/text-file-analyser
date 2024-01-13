const fs = require('fs');

const db = require("../models");

const { UPLOAD_DIR, OPERATION_TYPES } = require('../lib/constants')
const { analyse } = require('../lib/analyser')
const { validation } = require('../lib/validator')

const Task = db.tasks;
const FileRecord = db.file_records;

module.exports = {
    /**
   * Use to start an analysis
   * @param {*} req 
   * @param {*} res 
   */
    startAnalysis: async (req, res) => {

        validation(req.body, ['file_id', 'operation_type']);

        const fileId = req.body.file_id;
        const operationType = req.body.operation_type;

        if (operationType == OPERATION_TYPES['Topmost']) {
            validation(req.body, ['top_k']);
        }

        const topK = req.body.top_k || null;

        const fileData = await FileRecord.getFile(fileId);

        const filePath = UPLOAD_DIR + fileData.file_name;

        // console.log(fileData, filePath)

        const readableStream = fs.createReadStream(filePath);

        // Event handler for when the stream is finished or encounters an error
        readableStream.on('end', () => {
            console.log('File read successfully.');
        });

        readableStream.on('error', (err) => {
            console.error('Error reading file:', err);
            res.status(500).send('Error reading file.');
        });

        readableStream.on("data", async  (data) => {
            const chunk = data.toString();
            const opResult = analyse(chunk, operationType, topK);
            const taskObject = {
                file_id: fileId,
                type: operationType,
                task_result: opResult
            }
            const taskDetails = await Task.saveTask(taskObject);

            res.status(201).send({
                message: "Analysis completed",
                taskId: taskDetails.id
            })
        });
    },

    /**
   * Use to get saved analysis details
   * @param {*} req 
   * @param {*} res 
   */
    getAnalysis: async (req, res) => {

        validation(req.body, ['task_id']);

        const taskId = req.params.task_id;
        const taskDetails = await Task.getDetails(taskId);

        res.status(200).send({
            message: "Task details",
            taskId: taskId,
            operationType: OPERATION_TYPES[taskDetails.type],
            result: taskDetails.task_result
        })
    }
}