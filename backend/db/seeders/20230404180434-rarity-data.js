'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Rarities', [
      { value: 'common', encounterChance: 90.0 },
      { value: 'uncommon', encounterChance: 75.8 },
      { value: 'rare', encounterChance: 40.34 },
      { value: 'legendary', encounterChance: 15.01 },
      { value: 'mythic', encounterChance: 2 }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Rarities')
  }
};
