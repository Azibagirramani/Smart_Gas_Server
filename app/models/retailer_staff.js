var Sequelize = require('sequelize');
const Retailer = require('./retailer');
const User = require('./user');
const sequelize = require('../config/database')

var Retailer_staff = sequelize.define('retailer_staff',{
    retailer_id:{
        type: Sequelize.INTEGER,
        references:{
            model: Retailer,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }  
    },
    user_id:{
        type: Sequelize.INTEGER,
        references:{
            model: User,
            key: 'id',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
    },
    role:{
        type: Sequelize.STRING,
    }
});
Retailer_staff.belongsTo(Retailer);
//Retailer_staff.belongsTo(User);

module.exports = Retailer_staff