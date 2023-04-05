const express = require('express')
const app = express();
require('dotenv').config()
app.use(express.json())

const {} = require('./db/models')



const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))