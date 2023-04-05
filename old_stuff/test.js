require('dotenv').config()
const {Pokemon} = require('./db/models')

const makePokemon = async() => {
    try {
        const pokemon = Pokemon.build({
            name: 'Anotherrandomname',
            height: 1,
            weight: 1,
            rarity: 'common',
            evolves: true
        })
        pokemon.validate()
        console.log(pokemon)
        await pokemon.save()
    } catch (e) {
        console.log(e)
    }
}
makePokemon();
