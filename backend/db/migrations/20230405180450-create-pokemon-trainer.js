'use strict';
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
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PokemonTrainers');
  }
};