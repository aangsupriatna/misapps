'use strict';
module.exports = (sequelize, DataTypes) => {
  const Company = sequelize.define('Company', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Company.associate = function(models) {
    // associations can be defined here
    models.Company.hasMany(models.Project);
    models.Company.belongsToMany(models.Expert, { through: 'ExpertsCompanies', foreignKey: 'companyId', as: 'experts' })

    // models.Company.belongsToMany(models.Expert, {
    //   through: 'ExpertCompanies',
    //   as: 'Experts',
    //   foreignKey: 'expertId'
    // });
  };
  return Company;
};
