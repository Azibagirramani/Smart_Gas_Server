
// add logic that other files share
var nodemailer = require('nodemailer');
const AppVars = require('../config/vars')

// generate a random alphanumeric string
module.exports.generate_code = () => {
    return Math.random().toString(36).replace('0.', '') 
}

// send an email
module.exports.send_mail = (receiver, code) => {

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: AppVars.mailer.mail,
          pass: AppVars.mailer.pass
        }
      });
      
      var mailOptions = {
        from: AppVars.mailer.mail,
        to: receiver,
        subject: 'Welcome to GreenWave',
        html: `<div>
                  <h1> Welcome To SMARTGAS </h1>
                  <p> Click the link below to verify your account </p>
                  <a href="http://localhost:4444/api/user/verify/${code}> Verify My Account </a>
               </div>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

} 

/*

  check if the request user is an admin in the retail shop they want to 
  make an operation in

**/
module.exports.is_retail_admin = (req, retailer_id) => {
    let is_admin = true

    if( req.user && req.user.role !=='RETAILER' ){
        let staff_record = req.user.retails.filter( rec=> rec.retailer_id == retailer_id && rec.user_id == id && rec.role == 'ADMIN' )
        
        if( staff_record && staff_record.length > 0 && staff_record[0] ) {
            is_admin = true
        }

    }

    return is_admin
} 