// include external libraries
const router = require('express').Router()
const passport = require('passport')


const cylinderControllers = require('../controllers/cylinder')


// routes

// add 
router.post('/', passport.authenticate('retailer-jwt', { session: false }), cylinderControllers.add)

// list of all cylinder 
router.get('/', cylinderControllers.all)

// get cylinder details 
router.get('/:id', cylinderControllers.get_details)

// report lost cylinder  
router.post('/:id/lost', cylinderControllers.report_lost)

// report lost cylinder as recovered
router.post('/:id/recovered-lost', cylinderControllers.recovered_lost)

// get all lost cylinders as recovere
router.post('/lost', cylinderControllers.all_lost)

// list of all cylinder 
router.get('/retailer/:id', cylinderControllers.all_for_retailer)


// export our routes
module.exports = router 
