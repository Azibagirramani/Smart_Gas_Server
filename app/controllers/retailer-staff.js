// include external libs

// include internal modules
const db = require('../config/database')
const Utils = require('./utils')


// add user
exports.add = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }

    let { retailer_id, staff_id, role } = req.body
    let query = 'insert into retailer_staff ( user_id, retailer_id, role ) values( ?, ?, ? )'
    const user_query = 'update users set role = ? where id = ?'


    // add to db
    if( Utils.is_retail_admin(req, retailer_id) ) {

        let transactn = await db.getConnection()
        await transactn.beginTransaction()

        try {

            let [ result ] = await db.execute(query, [ staff_id, retailer_id, role ])

            if( result.affectedRows == 1 ) {
                let [ user_result ] = await db.execute(user_query, [ 'RETAILER', staff_id ])

                if( user_result.affectedRows == 1 ) {
                    response.saved = true 
                    response.id = result.insertId
                }
            }


            transactn.commit()
        } catch ( e ) { 

        } finally {
            transactn.release()
        }

    }

    // return success
    res.json(response)
}


// delete a user profile
exports.delete = async function(req, res) {
    let response = { deleted: false }

    let { id } = req.params
    let { retailer_id } = req.body
    
    let query = 'delete from retailer_staff where user_id = ? and retailer_id = ?'
    let staff_query = 'select * from retailer_staff where user_id = ?'
    let user_query = 'update users set role = ? where id = ?'

    // delete from db
    if ( Utils.is_retail_admin(req, retailer_id) ) {
        let [ result ] = await db.execute(query, [ id, retailer_id ])

        if( result.affectedRows == 1 ) {

            let [ to_delete_staff_records ] = await db.execute(staff_query, [ id ])

            if( to_delete_staff_records && to_delete_staff_records.length == 0 ) {
                await db.execute(user_query, [ 'CUSTOMER', id ])
            }

            response.deleted = true 
        }
    }
  

    // return 
    res.json(response)
}



// edit a user profile
exports.edit = async function(req, res) {
    let response = { updated: false }

    let staff_id = req.params.id

    // get data from request body 
    let { retailer_id, role } = req.body 
    let query = 'update retailer_staff set role = ? where user_id = ? and retailer_id = ?'

    
    // update on db
    if ( Utils.is_retail_admin(req, retailer_id) ) {
        let [ result ] = await db.execute(query, [ role, staff_id, retailer_id ])
        if ( result.affectedRows == 1 ) {
            response.updated = true 
        }
    }
    
    // return 
    res.json(response)
}



// return a user profile
exports.getProfile = async function(req, res) {
    let response = { profile: {} }
    let { id } = req.params        // replace with req.user

    let query = 'select * from users where id = ?'
    let staff_query = 'select * from retailer_staff where user_id = ?'

    if ( req.user.id != id && req.user.role !== 'ADMIN' ) {
        return res.json(response)
    } 

    // get details from db
    let [ result ] = await db.execute(query, [ id ])
    let [ staff_result ] = await db.execute(staff_query, [ id ])
    console.log('user', result)
    if( result && result[0] ) {
        let { password, ...uprofile} = result[0]
        response.profile = { uprofile, ...{ staff_result } }
    }
  
    // return 
    res.json(response)
}
  
