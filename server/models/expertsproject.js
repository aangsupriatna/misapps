'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExpertsProject = sequelize.define('ExpertsProject', {
    projectId: DataTypes.INTEGER,
    expertId: DataTypes.INTEGER
  }, {});
  ExpertsProject.associate = function(models) {
    // associations can be defined here
    ExpertsProject.belongsTo(models.Expert, { foreignKey: 'expertId' })
    ExpertsProject.belongsTo(models.Project, { foreignKey: 'projectId' })
  };
  return ExpertsProject;
};
