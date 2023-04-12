const express = require('express')
const { Op, where } = require("sequelize");
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

app.get('/pokemon/data', async(req, res) => {
    const count = await Pokemon.count()
    const minHeight = await Pokemon.min('height')
    const maxHeight = await Pokemon.max('height')
    const totalWeight = await Pokemon.sum('weight')

    res.json({
        count,
        minHeight,
        maxHeight,
        totalWeight,
        avgWeight: totalWeight / count
    })
})

app.get('/trainers/:id', async(req, res) => {
    const trainer = await Trainer.findByPk(req.params.id, {
        include: {
            model: Pokemon,
            through: {
                attributes: []
            }
        }
    })

    const count = trainer.Pokemons.length

    let height = 0
    for (let i = 0; i < trainer.Pokemons.length; i++) {
        const pokemon = trainer.Pokemons[i];
        height = height + pokemon.height
    }
    

    res.json({
        enslavedPokeCount: count,
        avgEnslavedPokeHeight: height / count,
        trainer
    })
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

const createPokemonChecker = (req, res, next) => {
    const { name, height, weight, evolves, rarenessId } = req.body
    let errors = []
    if (!name) {
        errors.push('Please provide a name for the new pokemon')
    }
    if (!height) {
        errors.push('Please provide a height value')
    }
    if (!weight) {
        errors.push('Please provide a weight value')
    }
    if (!evolves) {
        errors.push('Please provide an evolves value')
    }
    if (!rarenessId) {
        errors.push('Please provide a rarenessId value')
    }
    
    if (errors.length > 0) {
        const err = {
            message: errors,
            statusCode: 405
        }
        return next(err)
    }
    next()
}

app.post('/pokemon', createPokemonChecker, async(req, res) => {
    const {name, height, weight, evolves, rarenessId} = req.body
    const pokemon = Pokemon.build({
        name,
        height,
        weight,
        evolves,
        rarenessId
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

app.delete('/pokemon/:id', async(req, res, next) => {
    // const poke = await Pokemon.destroy({
    //     where: {
    //         id: req.params.id
    //     }
    // }) //DELETE FROM Pokemon WHERE id = ?
    const pokemon = await Pokemon.findByPk(req.params.id)
    if (pokemon) {
        await pokemon.destroy()
        res.json('pokemon destroyed')
    } else {
        const err = new Error(`There was no pokemon with the given id: ${req.params.id}`)
        err.statusCode = 404
        next(err)
    }
})

app.put('/pokemon/:id', async(req, res, next) => {
    const {name, weight, height, evolves, rarity} = req.body
    const pokemon = await Pokemon.findByPk(req.params.id)
    if (!pokemon) {
        const err = new Error(`There was no pokemon with the given id: ${req.params.id}`)
        err.statusCode = 404
        return next(err)
    }

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

// /search?page=1&size=5
app.get('/search', async(req, res) => {
    let {page, size, name, maxHeight, rarity, trainerName} = req.query

    //pagination
    let queryObj = {
        where: {},
        include: []
    }
    // let limit = size;
    // let offset;
    if (page <= 1) page = 1
    if (size <= 1) size = 5
    if (page || size) {
        queryObj.limit = size ? size : 5
        queryObj.offset = page ? size * (page - 1) : 0
    }

    if (name) {
        queryObj.where.name = name
    }

    if (maxHeight) {
        // queryObj.where = {height: {
        //     [Op.lte]: maxHeight
        // }}
        queryObj.where.height = {
            [Op.lte]: maxHeight
        }
    }

    if (rarity) {
        queryObj.include.push({
            model: Rarity,
            where: {
                value: rarity
            }
        })
    }

    if (trainerName) {
        queryObj.include.push({
            model: Trainer,
            where: {
                name: {
                    [Op.substring]: trainerName
                }
            }
        })
    }


    try {
        const results = await Pokemon.findAll({
            ...queryObj
        })
    
        res.json(results)
    } catch (e) {
        console.log(e)
        res.json(e)
    }

})

app.use((err, req, res, next) => {
    const status = err.statusCode || 500
    res.status(status)
    res.json({
        message: err.message || 'Something went wrong :(',
        statusCode: status
    })
})

const port = process.env.PORT
// app.listen(port, () => console.log(`Listening on port ${port}...`))
module.exports = app;