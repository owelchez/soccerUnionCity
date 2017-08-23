'use strict';
module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    routeName: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    pitchPosition: DataTypes.STRING,
    dob: DataTypes.DATEONLY,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    emergencyPhoneNumber: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    currentTeam: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Player;
};