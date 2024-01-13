
module.exports = (sequelize, Sequelize) => {
  const FileRecord = sequelize.define("file_record", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    file_name: {
      type: Sequelize.STRING(32),
      allowNull: false
    }
  });

  FileRecord.saveFile = (file_name) => {
    return FileRecord.create({file_name});
  }

  return FileRecord;
};
