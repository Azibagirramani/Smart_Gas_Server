// include external libraries


// include internal libraries
const db = require('../config/database')
const Utils = require('./utils')



// add new admin
exports.add = function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    const { email, password, phone } = req.body

    // if user is not an admin return
    if( req.user && req.user.role == 'ADMIN' ) {
        return res.json(response)
    }

    // hash
    let password_hash = bcrypt.hashSync(password, 10)

    let query = 'insert into users ( email, password, phone, role ) values ( ?, ?, ?, ? )'

    // add to db
    let [ result ] = await db.execute(query, [ email, password_hash, phone, 'ADMIN' ])

    if( result.affectedRows == 1 ) {
        response.saved = true 
        response.id = result.insertId
    }

    // return success
    res.json(response)
}


// delete a admin profile
exports.delete = function(req, res) {
    let response = { deleted: false }
    let { id } = req.params   // replace with req.user

    // if user is not an admin return
    if( req.user && req.user.role == 'ADMIN' ) {
        return res.json(response)
    }

    let query = 'delete from users where id = ?'
  
    // delete from db
    let [ result ] = await db.execute(query, [ id ])

    if( result.affectedRows == 1 ) {
        response.deleted = true 
    }
  
   // return 
   res.json(response)
}



// edit a admin profile
exports.edit = function(req, res) {
    let response = { updated: false, errors: [] }

    // if user is not an admin return
    if( req.user && req.user.role == 'ADMIN' ) {
        return res.json(response)
    }
    
    const { id } = req.params          // replace with req.user
    const { email, phone, role } = req.body

    let query = 'update users set email = ?, phone = ?, role = ? where id = ?'

    // update the db
    let [ result ] = await db.execute(query, [ email, phone, role, id ])

    if( result.affectedRows == 1 ) {
        response.updated = true 
    }

    // return success
    res.json(response)
}
