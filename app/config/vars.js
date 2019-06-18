/* 
 this file models config/vars.js file which should be the one to contain the variables
*/

let vars = {}

// set database variables
// replace the variables with your setup variables
vars.database = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'smart-gas' 
}

// set jwt secret
vars.jwt = {
    secret: 'secret'
}

vars.mailer = {
    mail: 'kelvinmansi2@gmail.com',
    pass: 'Azibagiramani2'
}

// export the variables
module.exports = vars