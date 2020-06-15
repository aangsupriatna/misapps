'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserProfile = sequelize.define('UserProfile', {
    gender: DataTypes.STRING,
    address: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  UserProfile.associate = function (models) {
    // associations can be defined here
    // models.UserProfile.belongsTo(models.User, {
    //   foreignKey: 'userId',
    //   as: 'user',
    //   onDelete: 'cascade'
    // })
    // models.UserProfile.belongsTo(models.User, {as: 'user', onDelete: 'CASCADE'})
  };
  return UserProfile;
};