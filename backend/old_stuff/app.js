const express = require("express")
const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log('Path: ', req.path)
    console.log('Method: ', req.method)
    next('banana')
})

app.get('/test', (req, res) => {
    console.log(req.path)
    console.log(req.method)
    res.status(404)
    res.send("Hello from your new app")
})

app.post('/message', (req, res) => {
    res.send(req.body)
})

app.get('/users/:banana/fruit/:fruitId', (req, res) => {
    console.log(req.params)
})

app.get('/users', (req, res) => {
    res.send(req.query)
    if (req.query.firstName) {
        //send a query to db using first name
    }
    if (req.query.lastName) {
        //send a query to db using last name
    }
})

app.get('/animals/redpanda', (req, res) => {
    res.send("Red pandas are the best animal, objectively")
})

app.get('/animals/:name(\\d+)', (req, res) => {
    res.send(req.params.name)
})

// app.get('/animals/:species')


app.listen(8000, () => console.log("Listening on port 8000..."))