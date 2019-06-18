var Sequelize = require('sequelize');
const Retailer = require('./retailer');
const sequelize = require('../config/database')

var User = sequelize.define('user',{
    
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail: true,
            max: 255,
            min: 6,
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull: false,
    },
    phone_number:{
        type:Sequelize.CHAR,
        allowNull: false
    },
    role:{
        type:Sequelize.ENUM,
        allowNull: false,
        values: ['customer', 'retailer', 'admin']
    }
  });
User.belongsTo(Retailer);
// User.sync({}).then(()=> console.log('created'))

module.exports = User