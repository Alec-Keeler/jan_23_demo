'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // FROM Trainers
      // JOIN PokemonTrainers ON (Trainers.id = PokemonTrainers.trainerId)
      // JOIN Pokemons ON (Pokemons.id = PokemonTrainers.pokemonId)
      Trainer.belongsToMany(models.Pokemon, {
        through: models.PokemonTrainer,
        // foreignKey: 'trainerId',
        // otherKey: 'pokemonId'
      })
    }
  }
  Trainer.init({
    name: DataTypes.STRING,
    gymBadges: DataTypes.INTEGER,
    bike: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Trainer',
  });
  return Trainer;
};