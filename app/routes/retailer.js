// include external libraries
const router = require('express').Router()
const passport = require('passport')


const retailerControllers = require('../controllers/retailer')


// routes

// add 
router.post('/', passport.authenticate('user-jwt', { session: false }),  retailerControllers.add)

// delete
router.delete('/:id', passport.authenticate('retailer-jwt', { session: false }),  retailerControllers.delete)

// edit
router.put('/:id', passport.authenticate('retailer-jwt', { session: false }),  retailerControllers.edit)

// profile
router.get('/:id', passport.authenticate('retailer-jwt', { session: false }),  retailerControllers.getProfile)

// products
router.get('/:id/products', retailerControllers.getProducts)


// rate a retailer
router.post('/:id/rate', passport.authenticate('user-jwt', { session: false }), retailerControllers.rate)

// get retailer ratings
router.get('/:id/ratings', retailerControllers.get_ratings)



// export our routes
module.exports = router 
