// include external libraries
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

const bcrypt = require('bcrypt')


// include internal libraries
const db = require('../config/database')
const AppVars = require('../config/vars')


// authenticated users with db

passport.use('user-local', new LocalStrategy({
           usernameField: 'email', passwordField: 'password'
    },
    async function(username, password, done) {

        let query = 'select * from users where email = ?'
        let [ rows ] = await db.query(query, [ username ])
        
        if( rows && rows[0] ){
            let match = await bcrypt.compare(password, rows[0]['password'])

            if( match ) {
              let { password, ...uzer } = rows[0]
              return done(null, uzer)
            }
        }
        return done(false)

    }    
))


// set jwt options
var jwt_opts = {}
jwt_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwt_opts.secretOrKey = AppVars.jwt.secret

// check if a user has a token
passport.use('user-jwt', new JwtStrategy(jwt_opts, async (jwt_payload, done) => {
 
    let { id, timestamp, expired } = jwt_payload.data 

    // if this timestamp is older than 60 minutes, invalidate it
    if( (Date.now() - timestamp) > 3600000 || expired ) { 
      return done(false)
    }

    let query = 'select * from users where id = ?'
    let admin_query = 'select * from retailer_staff where user_id = ?'
                
    let [ rows ] = await db.query(query, [ id ])

    if( rows && rows[0] ) {
      let { password, ...uzer } = rows[0]
      
      let [ retailer_check ] = await db.execute(admin_query, [ id ])

      if( retailer_check  ) {
         uzer.retails = retailer_check
      }

      return done(null, uzer)
    }
    return done(false)
    
}))


// check if an admin user has a token
passport.use('admin-jwt', new JwtStrategy(jwt_opts, async (jwt_payload, done) => {
 
  let { id, timestamp, expired } = jwt_payload.data 

  // if this timestamp is older than 60 minutes, invalidate it
  if( (Date.now() - timestamp) > 3600000 || expired ) { 
    return done(false)
  }

  let query = 'select * from users where id = ? and role = ?'
  let admin_query = 'select * from retailer_staff where user_id = ?'
              
  let [ rows ] = await db.query(query, [ id, 'ADMIN' ])

  if( rows && rows[0] ) {
    let { password, ...uzer } = rows[0]
    
    let [ retailer_check ] = await db.execute(admin_query, [ id ])

    if( retailer_check  ) {
       uzer.retails = retailer_check
    }

    return done(null, uzer)
  }
  return done(false)
  
}))

// check if a user is a retailer and an admin in the retail
passport.use('retailer-jwt', 
             new JwtStrategy(jwt_opts, async (jwt_payload, done)=> {
                  
                const { id, timestamp, expired } = jwt_payload.data
                console.log('jwt', jwt_payload)
                // if this timestamp is older than 60 minutes, invalidate it
                if( (Date.now() - timestamp) > 3600000 || expired ) { 
                  return done(false)
                }

                let query = 'select * from users where id = ? and role = ?'
                let admin_query = 'select * from retailer_staff where user_id = ?'
                
                let [ rows ] = await db.query(query, [ id, 'RETAILER' ])

                if( rows && rows[0] ) {
                  
                  let [ retailer_check ] = await db.execute(admin_query, [ id ])
                  let { password, ...uzer } = rows[0]

                  if( retailer_check && retailer_check[0] ) {
                     uzer.retails = retailer_check
                  }
                  
                  return done(null, uzer)
                }
                return done(false)
            
             })
            )

            
// check if a user is an admin 
passport.use('admin-jwt', 
new JwtStrategy(jwt_opts, async (jwt_payload, done)=> {
     
   const { id, timestamp, expired } = jwt_payload.data
   
   // if this timestamp is older than 60 minutes, invalidate it
   if( (Date.now() - timestamp) > 3600000 || expired ) { 
     return done(false)
   }

   let query = 'select * from users where id = ? and role = ?'
   
   let [ rows ] = await db.query(query, [ id, 'ADMIN' ])

   if( rows && rows[0] ) {
     let { password, ...uzer } = rows[0]
     return done(null, uzer)
   }
   return done(false)

})
)