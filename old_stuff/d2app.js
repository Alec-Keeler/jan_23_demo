const express = require('express')
const app = express()
require('dotenv').config()
const fruitsRouter = require('./routes/fruits')

app.use(express.json())
// app.use(express.urlencoded())

const security = (req, res, next) => {
    if (req.body.user !== 'Alec') {
        const err = new Error('You are not authorized')
        return next(err)
    }
    next()
}

// app.use(express.static('assets'))
// app.use(express.static('assets/css'))
app.use('/style', express.static('assets/css'))
app.use('/dommanip', security, express.static('assets/scripts'))



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


app.use('/fruits', fruitsRouter)



// app.use(fruitChecker)

app.get('/animals', (req, res) => {
    res.send('ANIMAL DATA')
})
// app.all('*', (req, res, next) => {
app.use((req, res, next) => {
    // res.status(404)
    // res.send('The requested resource could not be found :(')
    const err = new Error('The requested resources could not be found')
    err.statusCode = 404
    next(err)
})

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