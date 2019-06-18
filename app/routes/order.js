// include external libraries
const router = require('express').Router()
const passport = require('passport')


const orderControllers = require('../controllers/order')


// routes

/**
* @api {post} / Create a user Account
* @apiVersion 1.0.0
* @apiName Create Account
* @apiGroup Order
* @apiDescription  Create a User Account
*  
* @apiParam (Request body) {String} username The user name
* @apiParam (Request body) {String} password The user password
* @apiParam (Request body) {String} confirmationPassword user confirmationPassword
* @apiParam (Request body) {String} city The Users city
* @apiParam (Request body) {String} user_type The user type 
*
* @apiExample {js} Example usage:
* const data = {
*    "name": "kimmy wesley",
*    "password": "password",
*    "confirmationPassword": "confirmationPassword",
*    "email": "email@email.com",
*    "city": "Cairo",
*    "type": "REGULAR | ADMIN | SUPER_ADMIN"
* }
*
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} saved Boolean to determine if user was saved successfully
* @apiSuccess (Success 201) {String} id The id of the saved user (id they were saved)
* @apiSuccess (Success 201) {List} errors list of errors that were found with the data (if any) 
*
* @apiSuccessExample {json} Success response:
*     HTTPS 201 OK
*     {
*      "saved": true|false,
*      "id": "id",
*       "errors": []
*    }
*
* @apiUse UnauthorizedError
*/
router.post('/', passport.authenticate('user-jwt', { session: false }), orderControllers.add)

// delete
router.delete('/:id', passport.authenticate('user-jwt', { session: false }), orderControllers.delete)

// edit
router.put('/:id', passport.authenticate('user-jwt', { session: false }), orderControllers.edit)

// edit
router.put('/:id/retailer', passport.authenticate('user-jwt', { session: false }), orderControllers.retailer_edit)

// update as delivered 
router.get('/:id/delivered', passport.authenticate('user-jwt', { session: false }), orderControllers.delivered)

// get details
router.get('/:id', passport.authenticate('user-jwt', { session: false }), orderControllers.getDetails)


// get customer orders
router.get('/customer/:id',passport.authenticate('user-jwt', { session: false }),  orderControllers.getCustomerOrders)

// get retailer orders
router.get('/retailer/:id', passport.authenticate('retailer-jwt', { session: false }),  orderControllers.getRetailerOrders)


// export our routes
module.exports = router 
