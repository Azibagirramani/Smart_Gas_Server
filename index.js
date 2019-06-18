// include external libraries
const express = require("express")
const bodyParser = require('body-parser')

const passport = require('passport')
const cors = require('cors')


// include internal modules

const userRoutes = require('./app/routes/user')
const adminRoutes = require('./app/routes/admin')
const rStaffRoutes = require('./app/routes/retailer-staff')
const retailerRoutes = require('./app/routes/retailer')
const productRoutes = require('./app/routes/product')
const orderRoutes = require('./app/routes/order')
const cylinderRoutes = require('./app/routes/cylinder')


const app = express()


// setup body parser middleware

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
 


// setup passport
app.use(passport.initialize())
app.use(passport.session())

require('./app/config/passport')


// allow cross origin requests
app.use(cors())

// setup our routes
app.use('/user', userRoutes)
app.use('/admin', adminRoutes)
app.use('/retailer-staff', rStaffRoutes)
app.use('/retailer', retailerRoutes)
app.use('/product', productRoutes)
app.use('/order', orderRoutes)
app.use('/cylinder', cylinderRoutes)


// start the server
app.listen(4444, () => {
   console.log(`server started at port 4444`)
})
