'use strict';
let pokemonTrainers = [
  { name: 1, pokemonIds: [2, 6, 8] },
  { name: 2, pokemonIds: [1, 3, 7] },
  { name: 3, pokemonIds: [9, 12, 6] }
]
const {Trainer, Pokemon} = require('../models')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    // for (let i = 0; i < pokemonTrainers.length; i++) {
    //   const data = pokemonTrainers[i];
    //   const trainer = await Trainer.findByPk(data.trainerId)
    //   await trainer.addPokemons(data.pokemonIds)
    // }

    await queryInterface.bulkInsert('PokemonTrainers', [
      { trainerId: 1, pokemonId: 2 },
      { trainerId: 1, pokemonId: 6 },
      { trainerId: 1, pokemonId: 8 },
      { trainerId: 2, pokemonId: 1 },
      { trainerId: 2, pokemonId: 3 },
      { trainerId: 2, pokemonId: 7 },
      { trainerId: 3, pokemonId: 9 },
      { trainerId: 3, pokemonId: 12 },
      { trainerId: 3, pokemonId: 6 }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('PokemonTrainers')
  }
};
