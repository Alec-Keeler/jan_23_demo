const express = require('express')
const app = express()
require('dotenv').config()

const data_source = process.env.DATA_SOURCE
const sqlite = require('sqlite3');
const db = new sqlite.Database(data_source, sqlite.OPEN_READWRITE)

app.get('/pokemon/:id', (req, res) => {
    const sql = 'SELECT * FROM pokemon WHERE id = ?;'
    const params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            return res.json(err)
        }
        res.json(row)
    })
})

const port = process.env.PORT
app.listen(port, () => console.log(`Listening on port ${port}...`))