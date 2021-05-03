'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      profile.belongsTo(models.user, {
        foreignKey: 'userId'
      });
    }
  };
  profile.init({
    dewasaL: DataTypes.INTEGER,
    dewasaP: DataTypes.INTEGER,
    anakL: DataTypes.INTEGER,
    anakP: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profile',
  });
  return profile;
};