'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // logic for transforming into the new state
    return queryInterface.addColumn(
      'hydration_histories',
      'hydrationStatus',
      Sequelize.STRING
    );

  },

  down: async (queryInterface, Sequelize) => {
    // logic for reverting the changes
    return queryInterface.removeColumn(
      'hydration_histories',
      'hydrationStatus',
    );
  }
}