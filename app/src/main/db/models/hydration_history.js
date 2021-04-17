'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class hydration_history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      hydration_history.belongsTo(models.user, {
        foreignKey: 'userId'
      });
    }
  };
  hydration_history.init({
    status: DataTypes.STRING,
    time: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'hydration_history',
  });
  return hydration_history;
};