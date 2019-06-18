// include external libraries
const bcrypt = require('bcrypt')
const Jwt = require('jsonwebtoken')


// include internal libraries
const db = require('../config/database')
const AppVars = require('../config/vars')
const utils = require('./utils')

// add user
exports.add = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    const { email, password, phone } = req.body

    // hash
    let password_hash = bcrypt.hashSync(password, 10)

    let query = 'insert into users (email, password, phone) values (?, ?, ?)'
    let verificatnQuery = 'insert into verifications ( user_id, code ) values( ?, ? )'
    let verification_code = utils.generate_code()

    // add to db
    let [ result ] = await db.execute(query, [ email, password_hash, phone ])

    if( result.affectedRows == 1 ) {

        
        // add a verification code for the user
        /*
        let [ verifyResult ] = await db.execute(verificatnQuery, [ result.insertId, verification_code ])
        
        if( verifyResult.affectedRows != 1 ) {
            throw 'Verification Error'
        } else {
            // send welcome mail with the verification link here
            utils.send_mail(email, verification_code)
        }
        */
        
        response.saved = true 
        response.id = result.insertId
    }

    // return success
    res.json(response)
}


// delete a user profile
exports.delete = async function(req, res) {
    let response = { deleted: false }
    let { id } = req.params   // replace with req.user

    let query = 'delete from users where id = ?'
  
    // delete from db
    let [ result ] = await db.execute(query, [ id ])

    if( result.affectedRows == 1 ) {
        response.deleted = true 
    }
  
   // return 
   res.json(response)
}




// edit a user profile
exports.edit = async function(req, res) {
    let response = { updated: false, errors: [] }

    const { id } = req.params          // replace with req.user
    const { email, phone } = req.body

    let query = 'update users set email = ?, phone = ? where id = ?'

    // update the db
    let [ result ] = await db.execute(query, [ email, phone, id ])

    if( result.affectedRows == 1 ) {
        response.updated = true 
    }

    // return success
    res.json(response)
}

  


// reset a user profile password
exports.resetPassword = async function(req, res) {
    let response = { updated: false, errors: [] }

    const { id } = req.params        // replace with req.user
    const { password, old_password } = req.body

    let uquery = 'select * from users where id = ?'
    let query = 'update users set password = ? where id = ?'
    let password_hash = await bcrypt.hashSync(password, 10)

    let [ user_result ] = await db.execute(uquery, [ id ])

    if ( user_result && user_result[0] ) {

        let passwords_match = await bcrypt.compareSync(old_password, user_result[0]['password'])

        if( passwords_match ) {

            // update in the db
            let [ result ] = await db.execute(query, [ password_hash, id ])
           
            if( result.affectedRows == 1 ) {
                response.updated = true 
            }

        }

    }


    // return success
    res.json(response)
}

  


// return a user profile
exports.getProfile = async function(req, res) {
    let response = { profile: {} }
    let { id } = req.params        // replace with req.user

    let query = 'select * from users where id = ?'

    // get details from db
    let [ result ] = await db.execute(query, [ id ])
    
    if( result && result[0] ) {
        let { password, ...uprofile} = result[0]
        response.profile = uprofile
    }
  
    // return 
    res.json(response)
}


// log a user in
exports.login = async (req, res) => {
    let response = { token: null, profile: {} }
    
    if( req.user && req.user.id ) {
        let token_data = { id: req.user.id, timestamp: Date.now(), type: req.user.role, expired: false }
        const token = Jwt.sign({ data: token_data }, AppVars.jwt.secret)

        response = { token, user: req.user }
    }

    res.json(response)
}


// log a user out
exports.logout = async (req, res) => {
    let response = { logged_out }
    
    if( req.user && req.user.id ) {
        let token_data = { id: req.user.id, timestamp: Date.now(), type: req.user.role, expired: true }
        const token = Jwt.sign({ data: token_data }, AppVars.jwt.secret)

        response = { token }
    }

    res.json(response)
}


// return all users
exports.all = async function(req, res) {
    let response = { users: {} }

    let query = 'select * from users'

    // get details from db
    let [ result ] = await db.execute(query, [ ])
    
    if( result && result[0] ) {
        response.users = result.map((user)=> {
            let { password, ...uprofile} = user
            return user
        })
    }
  
    // return 
    res.json(response)
}

// return all users who are retailers 
exports.all_retailers = async function(req, res) {
    let response = { users: {} }

    let query = 'select * from users where role = ?'

    // get details from db
    let [ result ] = await db.execute(query, [ 'RETAILER' ])
    
    if( result && result[0] ) {
        response.users = result.map((user)=> {
            let { password, ...uprofile} = user
            return user
        })
    }
  
    // return 
    res.json(response)
}

// return all users who are admins
exports.all_admins = async function(req, res) {
    let response = { users: {} }

    let query = 'select * from users where role = ?'

    // get details from db
    let [ result ] = await db.execute(query, [ 'ADMIN' ])
    
    if( result && result[0] ) {
        response.users = result.map((user)=> {
            let { password, ...uprofile} = user
            return user
        })
    }
  
    // return 
    res.json(response)
}