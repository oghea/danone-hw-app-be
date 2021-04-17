'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const roleDisplay = ['Danone Admin', 'Customer']

  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasMany(models.hydration_history, {
        foreignKey: 'userId'
      });
      user.hasMany(models.profile, {
        foreignKey: 'userId'
      });
    }
  };
  user.init({
    name: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    mobile: DataTypes.STRING,
    address: DataTypes.STRING,
    role: DataTypes.INTEGER,
    roleDisplay: {
      type: DataTypes.VIRTUAL,
      get() {
        return roleDisplay[this.role];
      },
    }
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};