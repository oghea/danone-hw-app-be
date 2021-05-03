'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      dewasaL: {
        type: Sequelize.INTEGER
      },
      dewasaP: {
        type: Sequelize.INTEGER
      },
      anakL: {
        type: Sequelize.INTEGER
      },
      anakP: {
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profiles');
  }
};