const { TASK_STATUS } = require('../lib/constants')

module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("task", {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        file_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'file_records',
                key: 'id'
            }
        },
        type: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        task_result: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
            comment: '0-pending, 1-completed, 2-error'
        }
    });


    /**
     * 
     * @param {*} task_id
     * @returns details of the requested task
     */
    Task.getDetails = async (task_id) => {
        return Task.findOne({
            where: {
                id: task_id,
            },
            raw: true
        })
    }

    /**
     * 
     * @param {*} task_data
     * @returns saved task or existing task details
     */
    Task.saveTask = async (task_data) => {
        const exists = await Task.findOne({
            where: {
                file_id: task_data.file_id,
                type: task_data.type
            },
            raw: true
        })

        if (exists) {
            await Task.update({
                task_result: null,
                status: TASK_STATUS.PENDING
            }, {
                where: {
                    id: exists.id,
                },
            });
            return exists
        }
        return Task.create(task_data);
    }

    /**
     * 
     * @param {*} update object with update fields
     * @param {*} task_id
     * @returns updates task details
     */
    Task.updateTask = (update, task_id) => {
        return Task.update({
            task_result: update.task_result,
            status: update.status
        }, {
            where: {
                id: task_id,
            },
        });
    }

    return Task;
};
