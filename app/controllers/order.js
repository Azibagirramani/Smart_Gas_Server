// include external libraries


// include internal libraries
const db = require('../config/database')
const Utils = require('./utils')



// add order
exports.add = async function(req, res) {
    let response = { saved: false, id: null, errors: [] }

    let user_id = req.user.id
    let is_scheduled = false 
    let { items, schedule_time, retailer_id } = req.body 
    if( schedule_time ) {
        is_scheduled = true
    }
    
    let query = 'insert into orders ( schedule_time, is_scheduled, user_id, retailer_id ) values ( ?, ?, ?, ? )'
    let items_query = 'insert into order_items ( order_id, item_id, quantity ) values ( ?, ?, ? )'

    // add to db
    let transactn = await db.getConnection()
    await transactn.beginTransaction()

    try {

        let [ result ] = await db.execute(query, [ schedule_time, is_scheduled, user_id, retailer_id ])

        if ( result.affectedRows == 1 ) {

            items.forEach( async item => {

                await db.execute(items_query, [ result.insertId, item.id, item.quantity ])
                
            });

            response.saved = true
            response.id = result.insertId
        }
    

    } catch ( e ) {

    } finally {
        transactn.release()
    }

    
    // return success
    res.json(response)
}


// delete an order 
exports.delete = async function(req, res) {
    let response = { deleted: false }

    let user_id = req.user.id
    let { id } = req.params 

    let query = 'delete from orders where id = ? and user_id = ?'
  
    // delete from db
    let [ result ] = await db.execute(query, [ id, user_id ])

    if ( result.affectedRows == 1 ) {
        response.deleted = true
    }

    // return 
    res.json(response)
}



// edit an order details
exports.delivered = async function(req, res) {
    let response = { updated: false, errors: [] }

    let order_id = req.params.id
    let { retailer_id } = req.body

    let query = 'update orders set status = ? where id = ? and retailer_id = ?'

    if( Utils.is_retail_admin(req, req.user.id) ) {
        if( accepted ) {
            status = 'RECEIVED'
        }

        let [ result ] = await db.execute(query, [ 'DELIVERED', order_id, retailer_id ])

        if ( result.affectedRows == 1 ) {
            response.updated = true
        }
        
    }

    // return success
    res.json(response)
}


// edit an order details
exports.retailer_edit = async function(req, res) {
    let response = { updated: false, errors: [] }

    let order_id = req.params.id
    let status = 'SEND'
    let { retailer_id, accepted } = req.body

    let query = 'update orders set accepted = ?, status = ? where id = ? and retailer_id = ?'

    if( Utils.is_retail_admin(req, req.user.id) ) {
        if( accepted ) {
            status = 'RECEIVED'
        }

        let [ result ] = await db.execute(query, [ accepted, status, order_id, retailer_id ])

        if ( result.affectedRows == 1 ) {
            response.updated = true
        }
        
    }
    
    

    // return success
    res.json(response)
}



// edit an order details
exports.edit = async function(req, res) {
    let response = { updated: false, errors: [] }

    let id = req.params.id
    let user_id = req.user.id

    let is_scheduled = false 
        
    let { schedule_time } = req.body 
    if( schedule_time ) {
        is_scheduled = true
    }

    let query = 'update orders set schedule_time = ?, is_scheduled = ? where id = ? and user_id = ?'
    
    let [ result ] = await db.execute(query, [ schedule_time, is_scheduled, id, user_id ])

    if ( result.affectedRows == 1 ) {
        response.updated = true
    }
 
    // return success
    res.json(response)
}


// return an order details 
exports.getDetails = async function(req, res) {
    let response = { details: {} }

    let { id } = req.params
    
    let query = 'select * from orders where id = ?'

    // get details from db
    let [ result ] = await db.execute(query, [ id ])

    if( result ){
        response.details = result
    }
    
    // return 
    res.json(response)
}


// return a cusstomer orders 
exports.getCustomerOrders = async function(req, res) {
    let response = { orders: [] }
 
    let { id } = req.params
    if( req.user.id != id ) {
        return res.json(response)
    }
    
    let query = `select * from orders where user_id = ?`
    let order_item_q = `select * from order_items where order_id = ?`
    let product_query = 'select * from products where id = ?'

    // get orders from db
    let [ result ] = await db.execute(query, [ req.user.id ])

    if( result && result.length ){

        // get order items
        for (const order of result) {
            let items = []
            let [ item_result ] = await db.execute(order_item_q, [ order.id ])

            if( item_result && item_result.length ) {
                
                // get the item product
                for (const order_item of item_result) {
                    let [ product_result ] = await db.execute(product_query, [ order_item.item_id ])
                    
                    items.push({ order_item, ...{ item: product_result[0] } })
                }

            }
            console.log(items)
            response.orders.push({ order, ...{ items } })
        }

    }    
  
    // return 
    res.json(response)
}


// return a Retailer orders 
exports.getRetailerOrders = async function(req, res) {
    let response = { orders: [] }
 
    let { id } = req.params
    if( !Utils.is_retail_admin(req, id) ) {
        return res.json(response)
    }
    
    let query = `select * from orders where retailer_id = ?`
    let order_item_q = `select * from order_items where order_id = ?`
    let product_query = 'select * from products where id = ?'

    // get orders from db
    let [ result ] = await db.execute(query, [ id ])

    // get orders from db
    if( result && result.length ){

        // get order items
        for (const order of result) {
            let items = []
            let [ item_result ] = await db.execute(order_item_q, [ order.id ])

            if( item_result && item_result.length ) {
                
                // get the item product
                for (const order_item of item_result) {
                    let [ product_result ] = await db.execute(product_query, [ order_item.item_id ])
                    
                    items.push({ order_item, ...{ item: product_result[0] } })
                }

            }
            console.log(items)
            response.orders.push({ order, ...{ items } })
        }

    }    
  
    // return 
    res.json(response)
}
