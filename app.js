var express = require('express')
var app = express()
 
var mysql = require('mysql')
 
/**
 * This middleware provides a consistent API 
 * for MySQL connections during request/response life cycle
 */ 
var myConnection  = require('express-myconnection')
/**
 * Store database credentials in a separate config.js file
 * Load the file/module and its values
 */ 
var config = require('./config')
var dbOptions = {
    host:      config.database.host,
    user:       config.database.user,
    password: config.database.password,
    port:       config.database.port, 
    database: config.database.db
}
/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 
app.use(myConnection(mysql, dbOptions, 'pool'))
 
/**
 * setting up the templating view engine
 */ 
app.set('view engine', 'ejs')
 
/**
 * import routes/index.js
 * import routes/users.js
 */ 
var index = require('./routes/index')
var users_equipment = require('./routes/users_equipment')
var aircraftTypes = require('./routes/aircraftTypes')
var aircraftModels = require('./routes/aircraftModels')
var alertTypes = require('./routes/alertTypes')
var products = require('./routes/products')
var productSlabs = require('./routes/productSlabs')
var regulators = require('./routes/regulators')
var states = require('./routes/states')
var trainingVendors = require('./routes/trainingVendors')
var specTypes = require('./routes/specTypes')
var documentTypes = require('./routes/documentTypes')
var insurers = require('./routes/insurers')
var manufacturers = require('./routes/manufacturers')
var amenities = require('./routes/amenities')
var aircraftCategories = require('./routes/aircraftCategories')
var airports = require('./routes/airports')
var waivers = require('./routes/waivers')
var countries = require('./routes/countries')
var timezones = require('./routes/timezones')
var cities = require('./routes/cities')
var regions = require('./routes/regions')
var standardAircraftReq = require('./routes/standardAircraftReq')
var standardOperatorReq = require('./routes/standardOperatorReq')
 
 
/**
 * Express Validator Middleware for Form Validation
 */ 
var expressValidator = require('express-validator')
app.use(expressValidator())
 
 
/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input 
 * and store it as javascript object
 */ 
var bodyParser = require('body-parser')
/**
 * bodyParser.urlencoded() parses the text as URL encoded data 
 * (which is how browsers tend to send form data from regular forms set to POST) 
 * and exposes the resulting object (containing the keys and values) on req.body.
 */ 
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
 
 
/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
var methodOverride = require('method-override')
 
/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))
 
/**
 * This module shows flash messages
 * generally used to show success or error messages
 * 
 * Flash messages are stored in session
 * So, we also have to install and use 
 * cookie-parser & session modules
 */ 
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');
 
app.use(cookieParser('keyboard cat'))
app.use(session({ 
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))
app.use(flash())
 
 
app.use('/', index)
app.use('/users_equipment', users_equipment)
/*app.get('/users_equipment/edit/:cod_equipment',users_equipment.edit)
app.post('/users_equipment/edit/:cod_equipment',users_equipment.save_edit)*/
app.use('/aircraftTypes', aircraftTypes)
app.use('/aircraftModels', aircraftModels)
app.use('/alertTypes', alertTypes)
app.use('/products', products)
app.use('/productSlabs', productSlabs)
app.use('/regulators', regulators)
app.use('/states', states)
app.use('/trainingVendors', trainingVendors)
app.use('/specTypes', specTypes)
app.use('/documentTypes', documentTypes)
app.use('/insurers', insurers)
app.use('/manufacturers', manufacturers)
app.use('/amenities', amenities)
app.use('/aircraftCategories', aircraftCategories)
app.use('/airports', airports)
app.use('/waivers', waivers)
app.use('/countries', countries)
app.use('/timezones', timezones)
app.use('/cities', cities)
app.use('/regions', regions)
app.use('/standardAircraftReq', standardAircraftReq)
app.use('/standardOperatorReq', standardOperatorReq)

 
app.listen(3000, function(){
    console.log('Server running at port 3000: https://127.0.0.1:3000')
})

