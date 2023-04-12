'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pokemons', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING(150),
        unique: true
      },
      height: {
        allowNull: false,
        type: Sequelize.NUMERIC(4,2)
      },
      weight: {
        allowNull: false,
        type: Sequelize.NUMERIC(5,2)
      },
      evolves: {
        allowNull: false,
        type: Sequelize.BOOLEAN
      },
      rarenessId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Rarities'
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
    options.tableName = 'Pokemons'
    await queryInterface.dropTable(options);
  }
};