const express = require('express')
const { Op } = require("sequelize");
const app = express();
require('dotenv').config()
app.use(express.json())

const {Pokemon, Rarity, Trainer} = require('./db/models')

app.get('/pokemon', async(req, res) => {
    // const pokemon = await Pokemon.findAll() // SELECT * FROM Pokemons;

    // const pokemon = await Pokemon.findAll({
    //     attributes: ['name', 'weight', 'height']
    // }) // SELECT name, weight, height FROM Pokemons;

    // const pokemon = await Pokemon.findAll({
    //     order: [['name'], ['height', 'DESC']]
    // })
    
    // const pokemon = await Pokemon.findAll({
    //     where: {
    //         name: ['Squirtle']
    //     }
    // })
    // SELECT * FROM Pokemons WHERE name = 'Squirtle';

    try {
        const pokemon = await Pokemon.findAll({
            order: [['weight', 'ASC']],
            where: {
                weight: {
                    [Op.between]: [5, 100]
                }
            },
            limit: 2
        })
        res.json({pokemon})
    } catch (e) {
        console.log(e)
    }

})

app.get('/pokemon/:id', async(req, res) => {
    // const pokemon = await Pokemon.findOne({
    //     where: {
    //         // id: req.params.id
    //         height: 1.6
    //     }
    // })

    const pokemon = await Pokemon.findByPk(req.params.id, {
        attributes: ['name']
    })
    res.json(pokemon)
})

app.post('/pokemon', async(req, res) => {
    const {name, height, weight, evolves, rarity} = req.body
    const pokemon = Pokemon.build({
        name,
        height,
        weight,
        evolves,
        rarity
    })
    pokemon.validate()
    await pokemon.save()
    // const pokemon = await Pokemon.create({
    //     name,
    //     height,
    //     weight,
    //     evolves,
    //     rarity
    // })
    res.json(pokemon)
})

app.delete('/pokemon/:id', async(req, res) => {
    // const poke = await Pokemon.destroy({
    //     where: {
    //         id: req.params.id
    //     }
    // }) //DELETE FROM Pokemon WHERE id = ?
    const pokemon = await Pokemon.findByPk(req.params.id)
    await pokemon.destroy()
    res.json('pokemon destroyed')
})

app.put('/pokemon/:id', async(req, res) => {
    const {name, weight, height, evolves, rarity} = req.body
    const pokemon = await Pokemon.findByPk(req.params.id)
    if (name) {
        pokemon.name = name
    }
    // ...other similar checks
    await pokemon.save()
    res.json({
        message: "Successfully updated a pokemon!",
        pokemon
    })
})

app.get('/rarity/:value', async(req, res) => {
    try {
        const rarity = await Rarity.findOne({
            where: {
                value: req.params.value
            },
            include: Pokemon
        })
        res.json({rarity})
    } catch (e) {
        console.log(e)
    }

    // const pokemon = await Pokemon.findAll({
    //     include: Rarity
    // })

})

app.get('/joins', async(req, res) => {
    // const pokemon = await Pokemon.findAll({
    //     include: [Rarity, Trainer]
    // })

    // const pokemon = await Pokemon.findAll({
    //     include: [{
    //         model: Rarity
    //     },
    //     {
    //         model: Trainer
    //     }
    // ]
    // })

    const pokemon = await Trainer.findOne({
        attributes: ['name'],
        where: {
            name: "Franco"
        },
        include: {
            model: Pokemon,
            include: {model: Rarity, attributes: ['value']},
            attributes: ['name', 'height', 'weight'],
            through: { //Targets join table
                attributes: [] //Include no attributes from join table
            }
        }
    })
    res.json(pokemon)
})

app.get('/associations', async(req, res) => {
    // const pokemon = await rarity.getPokemons()
    // const rarity = await Rarity.findByPk(5)
    // const pokemon = await rarity.createPokemon({
    //     name: 'Geodude',
    //     height: 10,
    //     weight: 50,
    //     evolves: true
    // })
    const trainer = await Trainer.findOne({where: {name: 'Dan'}})
    const pokemonIds = [1, 10]
    await trainer.addPokemons(pokemonIds)
    const trainerPokemons = await Trainer.findOne({
        where: { name: 'Dan' },
        include: Pokemon
    })
    res.json(trainerPokemons)
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))