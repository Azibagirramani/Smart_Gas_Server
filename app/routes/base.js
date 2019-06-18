// include external libraries
const router = require('express').Router()
const path = require('path')


// serve the base Vue UI file 
router.get('/', (req, res) => {
    res.sendFile( path.join(__dirname + './assets/index.html' ) )
})



