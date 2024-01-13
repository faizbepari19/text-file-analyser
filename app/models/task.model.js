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
            type: Sequelize.STRING(32),
            allowNull: false,
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

    Task.saveTask = (task_data) => {
        return Task.create(task_data);
    }

    return Task;
};
