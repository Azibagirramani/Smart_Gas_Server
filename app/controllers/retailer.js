// include external libraries


// include internal libraries
const db = require('../config/database')


// add retailer
exports.add = async function(req, res) {
    let response = { added: false, id: null, errors: [] }

    let query = 'insert into retailers ( name, longitude, latitude, user_id) values ( ?, ?, ?, ? )'
    let staff_query = 'insert into retailer_staff ( user_id, retailer_id, role ) values ( ?, ?, ? )'
    let user_query = 'update users set role = ? where id = ?'
           
    // validate 

    // get the retailer data
    let { name, longitude, latitude } = req.body

    // start a transaction to add the retail and the retail staff
    const transactn = await db.getConnection() 
    await transactn.beginTransaction()

    try {  
    
        // add to db
        let [ result ] = await db.execute(query, [ name, longitude, latitude, req.user.id ])
        
        if ( result.affectedRows == 1 ) {
    
            let [ staff_result ] = await db.execute(staff_query, [ req.user.id, result.insertId, 'ADMIN' ])
            
            if( staff_result.affectedRows == 1 ) {
                
                let [ user_result ] = await db.execute(user_query, [ 'RETAILER', req.user.id ])

                if( user_result.affectedRows == 1 ) {
                    response.added = true
                    response.id = result.insertId 
                }
            }
    
        }

        await transactn.commit()
    } catch( e ) {

    } finally {
        transactn.release()
    }

    // return success
    res.json(response)
}



// delete a retailer 
// @todo update said retailer staff to customer
exports.delete = async function(req, res) {
    let response = { deleted: false }
    let can_delete = false

    let query = 'delete from retailers where id = ?'

    // validate 
    if( req.user && req.user.role == 'RETAILER' ) {
        let retails = req.user.retails  
        let staff_record = retails.filter( r=> r.id == req.params.id )
        
        if( staff_record && staff_record[0] ) {
            if( staff_record[0]['role'] == 'ADMIN' ) {
                can_delete = true
            }
        }

    }
    if( req.user.role == 'ADMIN' ) {
        can_delete = true
    }

    // delete from db
    if( can_delete ) {

        let [ result ] = await db.execute(query, [ req.params.id ])

        if( result.affectedRows == 1 ) {
            response.deleted = true 
        }

    }
  

  // return 
  res.json(response)
}



// edit a retailer details
exports.edit = async function(req, res) {
    let response = { updated: false }
    let can_update = false

    let query = 'update retailers set name = ?, latitude = ?, longitude = ? where id = ?'

    // get the retailer data
    let { name, longitude, latitude } = req.body

    // validate 
    if( req.user && req.user.role == 'RETAILER' ) {
        let retails = req.user.retails  
        let staff_record = retails.filter( r=> r.id == req.params.id )
        
        if( staff_record && staff_record[0] ) {
            if( staff_record[0]['role'] == 'ADMIN' ) {
                can_update = true
            }
        }

    }
    
    
    // update on db
    if( can_update ) {
        let [ result ] = await db.execute(query, [ name, latitude, longitude, req.params.id ])
         
        if( result.affectedRows == 1 ) {
            response.updated = true
        }
      
    }
    
  
    // return 
    res.json(response)
}



// return a retailer details 
// todo -- include the staff and their details
exports.getProfile = async function(req, res) {
    let response = { profile: {} }

    let query = 'select * from retailers where id = ?'
    let staff_query = `select 
                           users.email as email, users.phone as phone, users.role as user_role, 
                           retailer_staff.role as retail_role 
                           from users join retailer_staff on 
                           users.id = retailer_staff.user_id and retailer_id = ?`

    // get details from db
    let [ result ] = await db.execute(query, [ req.params.id ])

    if( result && result[0] ) {
        let [ staff ] = await db.execute(staff_query, [ req.params.id ])
        // response.profile = result[0]
        response = { profile: result[0], ...{ staff } }
    }
  
    // return 
    res.json(response)
}

// get products of a retailer
module.exports.getProducts = async (req, res) => {
    let response = { products: {} }

    let { id } = req.params

    
    let query = 'select * from products where retailer_id = ?'

    // get details from db
    let [ result ] = await db.execute(query, [ id ])

    if( result && result.length ){
        response.products = result
    }
  
    // return 
    res.json(response)
}


// rate a retailer 
exports.rate = (req, res) => {
    let response = { saved: false, id: null, errors: [] }

    let retailer_id = req.params.id
    let { rating } = rq.body 
    let user_id = req.user.id 

    let query = 'insert into ratings ( rating, user_id, retailer_id ) values ( ?, ?, ? )'

    let [ result ] = db.execute(query, [ rating, user_id, retailer_id ])

    if ( result && result.affectedRows == 1 ) {
       response.saved = true 
       response.id = result.insertId
    }
    res.json(response)
}

// get rating of a retailer
exports.get_ratings = (req, res) => {
    let response = { ratings: [] }

    let retailer_id = req.params.id

    let query = 'select * from ratings where retailer_id = ? '

    let [ result ] = db.execute(query, [ retailer_id ])

    if ( result && result.length ) {
       response.ratings = result 
    }

    res.json(response)
}