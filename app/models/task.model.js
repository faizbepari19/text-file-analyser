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
        }
    });


    /**
     * 
     * @param {*} task_id
     * @returns details of the requested task
     */
    Task.getDetails = async (task_id) => {

    }

    return Task;
};
