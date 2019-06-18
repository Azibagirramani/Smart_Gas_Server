var Sequelize = require('sequelize');

const Order = require('./order');
const Product = require('./product');

const sequelize = require('../config/database')


var OrderItem = sequelize.define('orderItem',{
    order_id:{
        type: Sequelize.INTEGER,
        references:{
            model: Order,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    product_id:{
        type: Sequelize.INTEGER,
        references:{
            model: Product,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    }
});
//OrderItem.belongsTo(Product);
//OrderItem.belongsTo(Order);

module.exports = OrderItem