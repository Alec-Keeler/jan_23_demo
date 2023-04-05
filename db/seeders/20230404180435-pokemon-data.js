'use strict';
const {Pokemon, Rarity} = require('../models')

let pokemons = [
  { name: 'Squirtle', height: 0.5, weight: 9.0, rarity: 'rare', evolves: true },
  { name: 'Millie', height: 0.2, weight: 2.2, rarity: 'legendary', evolves: true },
  { name: 'Politoed', height: 1.1, weight: 33.9, rarity: 'rare', evolves: false },
  { name: 'Tandemaus', height: 0.3, weight: 1.8, rarity: 'uncommon', evolves: true },
  { name: 'Machamp', height: 1.6, weight: 130.0, rarity: 'common', evolves: false },
  { name: 'Mudkip', height: 0.4, weight: 7.6, rarity: 'mythic', evolves: true },
  { name: 'Milotic', height: 6.2, weight: 162.0, rarity: 'rare', evolves: false },
  { name: 'Ralts', height: 0.4, weight: 6.6, rarity: 'rare', evolves: true },
  { name: 'Onix', height: 8.8, weight: 210.0, rarity: 'common', evolves: true },
  { name: 'Stakataka', height: 5.5, weight: 820.0, rarity: 'rare', evolves: false },
  { name: 'Piplup', height: 0.4, weight: 5.2, rarity: 'rare', evolves: true },
  { name: 'Altaria', height: 1.1, weight: 20.6, rarity: 'uncommon', evolves: false },
  { name: 'Skitty', height: 0.6, weight: 11.0, rarity: 'common', evolves: true }
]

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    for (let i = 0; i < pokemons.length; i++) {
      const pokeman = pokemons[i];
      const rarity = await Rarity.findOne({
        where: {
          value: pokeman.rarity
        }
      })

      await rarity.createPokemon({
        name: pokeman.name,
        height: pokeman.height,
        weight: pokeman.weight,
        evolves: pokeman.evolves,
      })
      // await Pokemon.create({
      //   name: pokeman.name,
      //   height: pokeman.height,
      //   weight: pokeman.weight,
      //   evolves: pokeman.evolves,
      //   rarenessId: rarity.id
      // })
    }

  //  await queryInterface.bulkInsert('Pokemons', [
  //    { name: 'Squirtle', height: 0.5, weight: 9.0, rarenessId: 3, evolves: true },
  //    { name: 'millie', height: 0.2, weight: 2.2, rarenessId: 5, evolves: true },
  //    { name: 'Politoed', height: 1.1, weight: 33.9, rarenessId: 3, evolves: false },
  //    { name: 'Tandemaus', height: 0.3, weight: 1.8, rarenessId: 2, evolves: true },
  //    { name: 'Machamp', height: 1.6, weight: 130.0, rarenessId: 1, evolves: false },
  //    { name: 'Mudkip', height: 0.4, weight: 7.6, rarenessId: 4, evolves: true },
  //    { name: 'Milotic', height: 6.2, weight: 162.0, rarenessId: 3, evolves: false },
  //    { name: 'Ralts', height: 0.4, weight: 6.6, rarenessId: 3, evolves: true },
  //    { name: 'Onix', height: 8.8, weight: 210.0, rarenessId: 1, evolves: true },
  //    { name: 'Stakataka', height: 5.5, weight: 820.0, rarenessId: 3, evolves: false },
  //    { name: 'Piplup', height: 0.4, weight: 5.2, rarenessId: 3, evolves: true },
  //    { name: 'Altaria', height: 1.1, weight: 20.6, rarenessId: 2, evolves: false },
  //    { name: 'Skitty', height: 0.6, weight: 11.0, rarenessId: 1, evolves: true }
  //  ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Pokemons') // DELETE FROM Pokemons;
    // await queryInterface.bulkDelete('Pokemons', {
    //   name: ['Squirtle'] //...
    // }) // DELETE FROM Pokemons WHERE name IN ('Squirtle');
  }
};
