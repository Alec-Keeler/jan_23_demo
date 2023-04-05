'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rarity extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here                    // RarityId
      Rarity.hasMany(models.Pokemon, {foreignKey: 'rarenessId', onDelete: 'CASCADE', hooks: true})
      //JOIN Pokemons ON (Pokemons.rarenessId = Rarities.id)
    }
  }
  Rarity.init({
    value: DataTypes.STRING,
    encounterChance: DataTypes.NUMERIC
  }, {
    sequelize,
    modelName: 'Rarity',
  });
  return Rarity;
};