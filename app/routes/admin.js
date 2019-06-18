// include external libraries
const router = require('express').Router()
const passport = require('passport')

const adminControllers = require('../controllers/user')


// routes

/**
* @api {post} / Create a user Account
* @apiVersion 1.0.0
* @apiName Create Account
* @apiGroup User
* @apiDescription  Create a User Account
*  
* @apiParam (Request body) {String} username The user name
* @apiParam (Request body) {String} password The user password
* @apiParam (Request body) {String} confirmationPassword user confirmationPassword
* @apiParam (Request body) {String} email The Users email
* @apiParam (Request body) {String} phone The user phone number
*
* @apiExample {js} Example usage:
* const data = {
*    "password": "password",
*    "confirmationPassword": "confirmationPassword",
*    "email": "email@email.com",
*    "phone": 077771771
* }
*
* $http.defaults.headers.common["Authorization"] = token;
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
router.post('/', passport.authenticate('user-jwt', { session: false }), adminControllers.add)



/**
* @api {delete} /:id Delete a user Account
* @apiVersion 1.0.0
* @apiName Delete Account
* @apiGroup User
* @apiDescription  Delete a User Account
*  
* @apiParam {Number} id  The user identifier
*
* @apiExample {js} Example usage:
* const data = {
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} updated Boolean to determine if user was deleted successfully
*
* @apiSuccessExample {json} Success response
*     HTTPS 201 OK
*     {
*      "deleted": true
*    }
*
* @apiUse UnauthorizedError
*/
router.delete('/:id', passport.authenticate('user-jwt', { session: false }), adminControllers.delete)



/**
* @api {put} /:id Edit a user Account
* @apiVersion 1.0.0
* @apiName Edit Account
* @apiGroup User
* @apiDescription  Edit a User Account
*  
* @apiParam {Number} id  The user identifier
*
* 
* @apiExample {js} Example usage:
* const data = {
*    "email": "email@email.com",
*    "phone": 077771771,
*    "role": "ADMIN | MID | CUSTOMER"
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {Boolean} updated Boolean to determine if user was updated successfully
* @apiSuccess (Success 201) {List} updated List contains list of errors if any occured
* 
* @apiSuccessExample {json} Success response
*     HTTPS 201 OK
*     {
*      "updated": true,
*      "errors": []
*    }
*
* @apiUse UnauthorizedError
*/
router.put('/:id', passport.authenticate('user-jwt', { session: false }), adminControllers.edit)



// export our routes
module.exports = router 
