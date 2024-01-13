const fs = require('fs');

const db = require("../models");

const { UPLOAD_DIR, OPERATION_TYPES, TASK_STATUS } = require('../lib/constants')
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

        try {

            validation(req.body, ['file_id', 'operation_type']);

            const fileId = req.body.file_id;
            const operationType = +req.body.operation_type;

            if (!OPERATION_TYPES[operationType]) {
                throw {
                    message: 'Invalid operation',
                    code: 400
                }
            }

            if (operationType == OPERATION_TYPES['Topmost']) {
                validation(req.body, ['top_k']);
            }

            const topK = req.body.top_k || null;

            const fileData = await FileRecord.getFile(fileId);

            const taskObject = {
                file_id: fileId,
                type: operationType
            }

            const taskDetails = await Task.saveTask(taskObject);

            const filePath = UPLOAD_DIR + fileData.file_name;

            // console.log(fileData, filePath)
            console.log("returning response before analysis")
            res.status(201).send({
                message: "Analysis initiated",
                taskId: taskDetails.id
            });

            let fileContent = null;

            const readableStream = fs.createReadStream(filePath);

            readableStream.on('error', (err) => {
                // console.error('Error reading file:', err);
                Task.updateTask({
                    task_result: null,
                    status: TASK_STATUS.ERROR
                }, taskDetails.id)
            });

            readableStream.on("data", (chunk) => {
                console.log('reading file')
                fileContent += chunk;
            });

            readableStream.on('end', () => {
                console.log('File read complete')
                const analysedData = analyse(fileContent, operationType, topK);
                console.log(analysedData)
                Task.updateTask({
                    task_result: analysedData.result,
                    status: analysedData.status
                }, taskDetails.id)

            })

        } catch (err) {
            res.status(err.code || 500).send({
                message: err.message || "Something went wrong"
            });
        }
    },

    /**
   * Use to get saved analysis details
   * @param {*} req 
   * @param {*} res 
   */
    getAnalysis: async (req, res) => {

        try {
            validation(req.params, ['task_id']);

            const taskId = req.params.task_id;
            const taskDetails = await Task.getDetails(taskId);

            if (!taskDetails) {
                throw {
                    message: 'Task not found',
                    code: 404
                }
            }

            res.status(200).send({
                message: "Task details",
                taskId: taskId,
                operationType: OPERATION_TYPES[taskDetails.type],
                result: taskDetails.task_result,
                status: taskDetails.status
            })
        } catch (err) {
            res.status(err.code || 500).send({
                message: err.message || "Something went wrong"
            });
        }
    }
}