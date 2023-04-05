'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PokemonTrainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  PokemonTrainer.init({
    pokemonId: DataTypes.INTEGER,
    trainerId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'PokemonTrainer',
  });
  return PokemonTrainer;
};