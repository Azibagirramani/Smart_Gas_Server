// include external libraries
const router = require('express').Router()
const passport = require('passport')


const productControllers = require('../controllers/product')


// routes

// add 
router.post('/', passport.authenticate('retailer-jwt', { session: false }), productControllers.add)

// list of all products 
router.get('/', productControllers.all)


// delete
router.delete('/:id', passport.authenticate('retailer-jwt', { session: false }), productControllers.delete)


// edit
router.put('/:id', passport.authenticate('retailer-jwt', { session: false }), productControllers.edit)


// det details
router.get('/:id', productControllers.getDetails)


// export our routes
module.exports = router 
