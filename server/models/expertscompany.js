'use strict';
module.exports = (sequelize, DataTypes) => {
  const ExpertsCompany = sequelize.define('ExpertsCompany', {
    companyId: DataTypes.INTEGER,
    expertId: DataTypes.INTEGER
  }, {});
  ExpertsCompany.associate = function(models) {
    // associations can be defined here
    ExpertsCompany.belongsTo(models.Expert, { foreignKey: 'expertId' })
    ExpertsCompany.belongsTo(models.Company, { foreignKey: 'companyId' })
  };
  return ExpertsCompany;
};
