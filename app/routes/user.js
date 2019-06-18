// include external libraries
const router = require('express').Router()
const passport = require('passport')

// include controllers
const userControllers = require('../controllers/user')



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

router.post('/', userControllers.add)


// return current user
router.get('/user', passport.authenticate('user-jwt', {session: false}), (req, res)=>{
    res.json({ user: req.user })
})



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
router.delete('/:id', passport.authenticate('user-jwt', { session: false }), userControllers.delete)




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
*    "phone": 077771771
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
router.put('/:id', passport.authenticate('user-jwt', { session: false }), userControllers.edit)


 
/**
* @api {put} /:id/reset-password Edit a user Account Password
* @apiVersion 1.0.0
* @apiName Reset Password
* @apiGroup User
* @apiDescription  Edit a user Account Password
*  
* @apiParam {Number} id  The user identifier
*
* @apiExample {js} Example usage:
* const data = {
*    "password": "xx1xx2xx4",
*    "old_password": "xx0xx1xx2"
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
router.put('/:id/reset-password', passport.authenticate('user-jwt', { session: false }), userControllers.resetPassword)


router.get('/', passport.authenticate('admin-jwt', { session: false }), userControllers.all)
 
router.get('/retailers', passport.authenticate('admin-jwt', { session: false }), userControllers.all_retailers)

router.get('/admins', passport.authenticate('admin-jwt', { session: false }), userControllers.all_admins)


/**
* @api {get} /:id  Get a user Account Details
* @apiVersion 1.0.0
* @apiName Get Details
* @apiGroup User
* @apiDescription  Get a user Account Details
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
* @apiSuccess (Success 201) {Object} profile  an object with the user details
* 
* @apiSuccessExample {json} Success response
*     HTTPS 201 OK
*     {
*      "profile": { name: "", email: "", role: "",... }
*    }
*
* @apiUse UnauthorizedError
*/
router.get('/:id', passport.authenticate('user-jwt', { session: false }), userControllers.getProfile)



 
/**
* @api {post} /login  Log a user in
* @apiVersion 1.0.0
* @apiName Login
* @apiGroup User
* @apiDescription  log a user in given their email and password
*  
* @apiParam {Number} id  The user identifier
*
* @apiExample {js} Example usage:
* const data = {
*    "email": "xx14@gmail.com",
*    "password": "xx0xx1xx2"
* }
*
* $http.defaults.headers.common["Authorization"] = token;
* $http.post(url, data)
*   .success((res, status) => doSomethingHere())
*   .error((err, status) => doSomethingHere());
*
* @apiSuccess (Success 201) {String} token a Jwt token that a user should use to access privileged resources
* @apiSuccess (Success 201) {Object} user  the user that logged in
* 
* @apiSuccessExample {json} Success response
*     HTTPS 201 OK
*     {
*      "token": true,
*      "user": { name: "", email: "", role: "",... }
*    }
*
* @apiUse UnauthorizedError
*/
router.post('/login', passport.authenticate('user-local', { session: false }), userControllers.login)


/**
* @api {post} /logout  Log a user out
* @apiVersion 1.0.0
* @apiName Logout
* @apiGroup User
* @apiDescription  log a user out given their Jwt token
*  
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
* @apiSuccess (Success 201) {String} token a Jwt token that's invalidated
* 
* @apiSuccessExample {json} Success response
*     HTTPS 201 OK
*     {
*      "token": "$5e6yesaa4525af"
*    }
*
* @apiUse UnauthorizedError
*/
router.post('/logout', passport.authenticate('user-jwt', { session: false }), userControllers.logout)




// export our routes
module.exports = router 
