// include external libraries


// include internal libraries
const db = require('../config/database')
const Utils = require('./utils')



// add product
exports.add = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }
    
    let query = 'insert into products ( brand, quantity, price, size, retailer_id ) values ( ?, ?, ?, ?, ? )'
    
    const { brand, quantity, price, size, retailer_id } = req.body
    
    // add to db
    if ( Utils.is_retail_admin(req, retailer_id) ) {
        let [result] = await db.execute(query, [ brand, quantity, price, size, retailer_id ])
    
        if ( result && result.affectedRows == 1 ) {
            response.saved = true
            response.id = result.insertId
        }
    
    }

    // return success
    res.json(response)
}


// delete a product 
exports.delete = async function(req, res) {
    let response = { deleted: false }

    let { id } = req.params
    let { retailer_id } = req.body 

    let query = 'delete from products where id = ? and retailer_id = ?'

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



// edit a product details
exports.edit = async function(req, res) {
    let response = { updated: false, errors: [] }
    
    let query = 'update products set brand = ?, quantity = ?, price = ?, size = ? where id = ? and retailer_id = ?'
    
    // get data from user request
    const { brand, quantity, price, size, retailer_id } = req.body

    // update to db
    if ( Utils.is_retail_admin(req, retailer_id) ) {
        let [ result ] = await db.execute(query, [ brand, quantity, price, size, req.params.id, retailer_id ])
    
        if ( result.affectedRows == 1 ) {
            response.updated = true
        }
    
    }

    // return success
    res.json(response)
}


// return a product details 
exports.getDetails = async function(req, res) {
    let response = { details: {} }

    let { id } = req.params

    
    let query = 'select * from products where id = ?'

    // get details from db
    let [ result ] = await db.execute(query, [ id ])

    if( result ){
        response.details = result
    }
  
    // return 
    res.json(response)
}



// return all products 
exports.all = async function(req, res) {
    let response = { products: [] }

    let query = 'select * from products'

    // get details from db
    let [ result ] = await db.execute(query, [  ])

    if( result && result.length ){
       
        for (const product of result) {
            let q = 'select * from retailers where id = ?'
            let [ retailer_result ] = await db.execute(q, [ product.retailer_id ])

            if( retailer_result ) {
                response.products.push({ ...product, ...{ retailer: retailer_result[0] } })
            }

        }

    }
  
    // return 
    res.json(response)
}


