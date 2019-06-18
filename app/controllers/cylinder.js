// include external libraries


// include internal libraries
const db = require('../config/database')
const Utils = require('./utils')



// add cylinder
exports.add = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }

    let query = 'insert into cylinders ( serial_number, manufacture_date, manufacturer_name, capacity, batch_number, tracker_number, price, quantity, retailer_id ) values ( ?, ?, ?, ?, ?, ?, ?, ?, ? )'
    
    const { serial_number, manufacture_date, manufacturer_name, capacity, batch_number, tracker_number, price, quantity } = req.body
    let retailer_id = req.user.id 
    
    // add to db
    if ( Utils.is_retail_admin(req, retailer_id) ) {
        let [result] = await db.execute(query, [ serial_number, manufacture_date, manufacturer_name, capacity, batch_number, tracker_number, price, quantity, retailer_id ])
    
        if ( result && result.affectedRows == 1 ) {
            response.saved = true
            response.id = result.insertId
        }
    
    }

    // return success
    res.json(response)
}


// delete a cylinder 
exports.delete = async function(req, res) {
    let response = { deleted: false }

    let { id } = req.params
    let retailer_id = req.user.id 

    let query = 'delete from cylinders where id = ? and retailer_id = ?'

    // delete from db
    if ( Utils.is_retail_admin(req, retailer_id) ) {
        let [ result ] = await db.execute(query, [ id, retailer_id ])

        if ( result && result.affectedRows == 1 ){
            response.deleted = true
        }
    }

    // return 
    res.json(response)
}



// return a cylinder details 
exports.get_details = async function(req, res) {
    let response = { details: {} }

    let { id } = req.params

    let query = 'select * from cylinders where id = ?'

    // get details from db
    let [ result ] = await db.execute(query, [ id ])

    if( result ){
        response.details = result
    }
  
    // return 
    res.json(response)
}



// return all cylinders 
exports.all = async function(req, res) {
    let response = { cylinders: [] }

    let query = 'select * from cylinders'

    // get details from db
    let [ result ] = await db.execute(query, [  ])

    if( result && result.length ){
       
        for (const cylinders of result) {
            let q = 'select * from retailers where id = ?'
            let [ retailer_result ] = await db.execute(q, [ cylinders.retailer_id ])

            if( retailer_result ) {
                response.cylinders.push({ ...cylinders, ...{ retailer: retailer_result[0] } })
            }

        }

    }
  
    // return 
    res.json(response)
}


// return all cylinders for a retailer 
exports.all_for_retailer = async function(req, res) {
    let response = { cylinders: [] }
    let retailer_id = req.params.id

    let query = 'select * from cylinders where retailer_id = ?'

    // get details from db
    let [ result ] = await db.execute(query, [ retailer_id ])

    if( result && result.length ){
        response.cylinders = result
    }
  
    // return 
    res.json(response)
}



// report lost cylinder
exports.report_lost = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }

    let query = 'insert into lost_cylinders ( user_id, cylinder_id, lat, lng ) values ( ?, ?, ?, ? )'
    
    const { lat, lng } = req.body
    const cylinder_id = req.params.id
    let user_id = req.user.id 
    
    // add to db
    if ( Utils.is_retail_admin(req, retailer_id) ) {
        let [result] = await db.execute(query, [ user_id, cylinder_id, lat, lng ])
    
        if ( result && result.affectedRows == 1 ) {
            response.saved = true
            response.id = result.insertId
        }
    
    }

    // return success
    res.json(response)
}


// report lost cylinder as recovered
exports.recovered_lost = async function(req, res) {
    let response = { updated: false, errors: [] }

    let query = 'update lost_cylinders set recovered = ? where id = ?'
    
    const {id} = req.params
    
    // add to db
    let [result] = await db.execute(query, [ true, id ])

    if ( result && result.affectedRows == 1 ) {
        response.updated = true
    }

    // return success
    res.json(response)
}


// get all lost cylinders
exports.all_lost = async function(req, res) {
    let response = { cylinders: [] }

    let query = 'select * from lost_cylinders'
    
    // add to db
    let [result] = await db.execute(query, [ ])

    if ( result && result.affectedRows == 1 ) {
        response.cylinders = result
    }

    // return success
    res.json(response)
}
