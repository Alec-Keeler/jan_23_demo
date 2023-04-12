'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pokemon.belongsTo(models.Rarity, {foreignKey: 'rarenessId'})
      // FROM Pokemons JOIN Rarities ON (Rarities.id = Pokemons.rarenessId)
      Pokemon.belongsToMany(models.Trainer, {
        through: models.PokemonTrainer,
        foreignKey: 'pokemonId', // PokemonId
        otherKey: 'trainerId'
      })
    }
  }
  Pokemon.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1,150],
        titleCase(value) {
          if (value.charAt(0) !== value.charAt(0).toUpperCase()) {
            throw new Error('Please title case your pokemon')
          }
        }
      }
    },
    height: DataTypes.NUMERIC,
    weight: DataTypes.NUMERIC,
    evolves: DataTypes.BOOLEAN,
    rarenessId: DataTypes.INTEGER 
  }, {
    sequelize,
    modelName: 'Pokemon',
  });
  return Pokemon;
};