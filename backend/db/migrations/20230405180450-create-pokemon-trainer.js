'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PokemonTrainers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pokemonId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Pokemons'
        },
        onDelete: 'CASCADE'
      },
      trainerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Trainers'
        },
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: new Date()
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = 'PokemonTrainers'
    await queryInterface.dropTable(options);
  }
};