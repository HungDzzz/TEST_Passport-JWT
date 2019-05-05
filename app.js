const express = require('express')
const app = express()
var server = require('http').Server(app);
const bodyParser = require('body-parser')

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit: 50000}))

const public = require('./routers/public')

app.use('/public', public)

server.listen(8888, function() {
    console.log("Listening on port %s...", 8888)
})