// include external libraries
const router = require('express').Router()
const passport = require('passport')


// include internal libraries
const rstaffController = require('../controllers/retailer-staff')


// routes

// add  (passport)
router.post('/', passport.authenticate('retailer-jwt', { session: false }), rstaffController.add)

// delete (passport)
router.delete('/:id', passport.authenticate('retailer-jwt', { session: false }), rstaffController.delete)

// edit  (passport)
router.put('/:id', passport.authenticate('retailer-jwt', { session: false }), rstaffController.edit)

// profile  (passport)
router.get('/:id', passport.authenticate('retailer-jwt', { session: false }), rstaffController.getProfile)


// export our routes
module.exports = router 
