var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM standard_aircraft_req WHERE flg_aircraft_registration='Y' ORDER BY cod_standard ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listStandardAircraft', {
                    title: 'Aircraft Requirements', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listStandardAircraft', {
                    title: 'Aircraft Requirements', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addStandardAircraft', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addStandardAircraft', {
        
        title: 'Add Aircraft Requirement',
        cod_standard: '', 
        flg_aircraft_registration: '',
        txt_aircraft_type: '', 
        num_min_seats: '',
        standard_aircraft_reqcol: '', 
        
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addStandardAircraft', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_standard: req.sanitize('cod_standard').escape().trim(),
            flg_aircraft_registration: req.sanitize('flg_aircraft_registration').escape().trim(),
            txt_aircraft_type: req.sanitize('txt_aircraft_type').escape().trim(),
            num_min_seats: req.sanitize('num_min_seats').escape().trim(),
            standard_aircraft_reqcol: req.sanitize('standard_aircraft_reqcol').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO standard_aircraft_req SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addStandardAircraft', {

        title: 'Add Aircraft Requirement',
        cod_standard: user.cod_standard,    
        flg_aircraft_registration: user.flg_aircraft_registration,
        txt_aircraft_type: user.txt_aircraft_type,    
        num_min_seats: user.num_min_seats,
        standard_aircraft_reqcol: user.standard_aircraft_reqcol,    
        
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addStandardAircraft', {
                        title: 'Add Aircraft Requirement',
        cod_standard: '', 
        flg_aircraft_registration: '',
        txt_aircraft_type: '', 
        num_min_seats: '',
        standard_aircraft_reqcol: '', 
        
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('user/addStandardAircraft', { 
            title: 'Add Aircraft Requirement',
                cod_standard: req.params.cod_standard,  
                flg_aircraft_registration: req.body.flg_aircraft_registration,
                txt_aircraft_type: req.params.txt_aircraft_type,  
                num_min_seats: req.params.num_min_seats,  
                standard_aircraft_reqcol: req.body.standard_aircraft_reqcol,
                
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editStandardAircraft/(:cod_standard)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM standard_aircraft_req WHERE cod_standard = ' + req.params.cod_standard, function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_standard = ' + req.params.id)
                res.redirect('/standardAircraftReq')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editStandardAircraft', {
                    title: 'Edit Aircraft Requirement', 
                    //data: rows[0],
                    cod_standard: rows[0].cod_standard,
                    flg_aircraft_registration: rows[0].flg_aircraft_registration,
                    txt_aircraft_type: rows[0].txt_aircraft_type,
                    num_min_seats: rows[0].num_min_seats,
                    standard_aircraft_reqcol: rows[0].standard_aircraft_reqcol,
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editStandardAircraft/(:cod_standard)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_standard: req.sanitize('cod_standard').escape().trim(),
            flg_aircraft_registration: req.sanitize('flg_aircraft_registration').escape().trim(),
            txt_aircraft_type: req.sanitize('txt_aircraft_type').escape().trim(),
            num_min_seats: req.sanitize('num_min_seats').escape().trim(),
            standard_aircraft_reqcol: req.sanitize('standard_aircraft_reqcol').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE standard_aircraft_req SET ? WHERE cod_standard = ' + req.params.cod_standard, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editStandardAircraft', {
                        title: 'Edit Aircraft Requirement',
                       
                cod_standard: req.params.cod_standard,  
                flg_aircraft_registration: req.body.flg_aircraft_registration,
                txt_aircraft_type: req.params.txt_aircraft_type,  
                num_min_seats: req.params.num_min_seats,  
                standard_aircraft_reqcol: req.body.standard_aircraft_reqcol,
                
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editStandardAircraft', {
                        title: 'Edit Aircraft Requirement',
                       
                cod_standard: req.params.cod_standard,  
                flg_aircraft_registration: req.body.flg_aircraft_registration,
                txt_aircraft_type: req.params.txt_aircraft_type,  
                num_min_seats: req.params.num_min_seats,  
                standard_aircraft_reqcol: req.body.standard_aircraft_reqcol, 
               
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('user/editStandardAircraft', { 
            title: 'Edit Aircraft Requirement',            
            
                cod_standard: req.params.cod_standard,  
                flg_aircraft_registration: req.body.flg_aircraft_registration,
                txt_aircraft_type: req.params.txt_aircraft_type,  
                num_min_seats: req.params.num_min_seats,  
                standard_aircraft_reqcol: req.body.standard_aircraft_reqcol,  
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_standard)', function(req, res, next) {
    var user = req.params.cod_standard;
    
    req.getConnection(function(error, conn) {
        conn.query("update standard_aircraft_req set flg_aircraft_registration='N' WHERE cod_standard = "+user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/standardAircraftReq')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/standardAircraftReq')
            }
        })
    })
})
 
module.exports = app