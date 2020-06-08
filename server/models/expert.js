'use strict';
module.exports = (sequelize, DataTypes) => {
  const Expert = sequelize.define('Expert', {
    name: DataTypes.STRING,
    address: DataTypes.STRING
  }, {});
  Expert.associate = function (models) {
    // associations can be defined here
    models.Expert.hasMany(models.Project);
    models.Expert.belongsToMany(models.Company, { through: 'ExpertsCompanies', foreignKey: 'expertId', as: 'companies' })

    // models.Expert.belongsToMany(models.Company, {
    //   through: 'ExpertsCompanies',
    //   as: 'Companies',
    //   foreignKey: 'companyId'
    // });

    // models.Expert.belongsTo(models.Company, {
    //   onDelete: "CASCADE",
    //   foreignKey: {
    //     allowNull: false
    //   }
    // });
  };
  return Expert;
};
