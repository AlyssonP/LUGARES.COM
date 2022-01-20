const express = require('express')
const path = require('path')
const routes = require('./routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

//notFound
app.use((req, res, next) => {
    const error = new Error('Not found')
    error.status = 403
    next(error)
})

//catch all
app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ error: error.message })
})


app.listen(3333 , () => console.log('Server is running'))