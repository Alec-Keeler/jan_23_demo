const express = require('express')
const app = express()

app.use(express.json())
// app.use(express.urlencoded())

let fruits = ['apple', 'orange']

app.use((req, res, next) => {
    console.log('Path: ', req.path)
    console.log('URL: ', req.url)
    console.log('Method: ', req.method)
    // const err = new Error('this is a generic error')
    // err.statusCode = 501
    // err.title = "Something went wrong"
    // next(err)
    next()
})

app.use((req, res, next) => {
    console.log(req.path)
    next()
})

app.use((req, res, next) => {
    req.banana = 'apple'
    next()
})

const fruitChecker = (req, res, next) => {
    if (!req.body.fruitName) {
        const err = new Error('fruitName is required')
        err.statusCode = 404
        err.title = 'Fruit error'
        return next(err)
    }
    if (fruits.includes(req.body.fruitName)) {
        const err = new Error('That fruit is already in our list!')
        err.statusCode = 404
        err.title = 'Fruit error'
        return next(err)
    }
    next()
}

// app.use(fruitChecker)

app.post('/fruit', [fruitChecker], (req, res) => {
    // create a fruit resource
    fruits.push(req.body.fruitName)
    res.json(fruits)
})

app.get('/fruit', (req, res, next) => {
    if (req.banana) {
        res.json(fruits)
    } else {
        res.send('need fruit?')
    }
})

// app.all('*', (req, res, next) => {
// app.use((req, res, next) => {
//     res.status(404)
//     res.send('The requested resource could not be found :(')
// })

app.use((err, req, res, next) => {
    console.log(err)
    const status = err.statusCode || 500
    res.status(status)
    res.json({
        title: err.title || 'There was an error',
        message: err.message,
        statusCode: status
    })
    // if (err === 'error') {
    //     res.send(`first error handler ${err}`)
    // } else {
    //     next()
    // }
})

app.use((err, req, res, next) => {
    res.send(`second error handler ${err}`)
})

app.use((req, res, next) => {
    console.log("after error handler")
    next()
})

const port = 8000
app.listen(port, () => console.log(`Listening on port ${port}...`))