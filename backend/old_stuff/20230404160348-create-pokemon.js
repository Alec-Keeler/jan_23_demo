'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('Pokemon', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      name: Sequelize.STRING(150)
    })
  },
  // CREATE TABLE Pokemon (
    // id INTEGER PRIMARY KEY AUTOINCREMENT,
    // name VARCHAR
  // )

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Pokemon')
    //DROP TABLE (IF EXISTS) Pokemon;
  }
};
