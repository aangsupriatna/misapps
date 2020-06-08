'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    title: DataTypes.STRING,
    location: DataTypes.STRING,
    companyId: DataTypes.INTEGER,
  }, {});
  Project.associate = function(models) {
    // associations can be defined here

    // models.Project.belongsTo(models.User, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });

    models.Project.belongsTo(models.Company, { foreignKey: 'companyId', as: 'company' });
    models.Project.belongsToMany(models.Expert, { through: 'ExpertsProjects', foreignKey: 'projectId', as: 'experts' });

    // models.Project.belongsTo(models.Expert, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Project;
};
