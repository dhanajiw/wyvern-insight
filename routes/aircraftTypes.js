var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_aircraft_types WHERE cod_rec_status='A' ORDER BY cod_aircraft_type ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAircraftTypes', {
                    title: 'Aircraft Types', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listAircraftTypes', {
                    title: 'Aircraft Types', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addAircraftTypes', function(req, res, next){   

    req.getConnection(function (error, conn) {

        conn.query("SELECT * FROM mst_manufacturers WHERE cod_rec_status='A' ORDER BY cod_manufacturer ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAircraftTypes', {
                    title: 'Aircraft Types', 
                    data: ''
                })
            } else { 
                // render to views/user/add.ejs
                res.render('user/addAircraftTypes', {
                    
                    title: 'Add Aircraft Type',
                    cod_aircraft_type: '', 
                    txt_type_description: '',
                    cod_manufacturer: '', 
                    num_seats: '',
                    txt_icao_type_code: '', 
                    flg_helicopter: '',
                    flg_single_pilot_operations: '', 
                    flg_london_city_landings: '',
                    data: rows

                })
            }
        })
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addAircraftTypes', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_aircraft_type: req.sanitize('cod_aircraft_type').escape().trim(),
            txt_type_description: req.sanitize('txt_type_description').escape().trim(),
            cod_manufacturer: req.sanitize('cod_manufacturer').escape().trim(),
            num_seats: req.sanitize('num_seats').escape().trim(),
            txt_icao_type_code: req.sanitize('txt_icao_type_code').escape().trim(),
            flg_helicopter: req.sanitize('flg_helicopter').escape().trim(),
            flg_single_pilot_operations: req.sanitize('flg_single_pilot_operations').escape().trim(),
            flg_london_city_landings: req.sanitize('flg_london_city_landings').escape().trim(),
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_aircraft_types SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addAircraftTypes', {

                        title: 'Add Aircraft Type',
                        cod_aircraft_type: user.cod_aircraft_type,    
                        txt_type_description: user.txt_type_description,
                        cod_manufacturer: user.cod_manufacturer,    
                        num_seats: user.num_seats,
                        txt_icao_type_code: user.txt_icao_type_code,    
                        flg_helicopter: user.flg_helicopter,
                        flg_single_pilot_operations: user.flg_single_pilot_operations,    
                        flg_london_city_landings: user.flg_london_city_landings,
              
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')

                    conn.query("SELECT * FROM mst_manufacturers WHERE cod_rec_status='A' ORDER BY cod_manufacturer ASC ", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listAircraftTypes', {
                                title: 'Aircraft Types', 
                                data: ''
                            })
                        } else { 
                    
                            // render to views/user/add.ejs
                            res.render('user/addAircraftTypes', {
                                title: 'Add Aircraft Type',
                                    cod_aircraft_type: '', 
                                    txt_type_description: '',
                                    cod_manufacturer: '', 
                                    num_seats: '',
                                    txt_icao_type_code: '', 
                                    flg_helicopter: '',
                                    flg_single_pilot_operations: '', 
                                    flg_london_city_landings: '',
                                    data: rows

                                })
                            }
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
            res.render('user/addAircraftTypes', { 
                title: 'Add Aircraft Type',
                    cod_aircraft_type: req.params.cod_aircraft_type,  
                    txt_type_description: req.body.txt_type_description,
                    cod_manufacturer: req.params.cod_manufacturer,  
                    num_seats: req.params.num_seats,  
                    txt_icao_type_code: req.body.txt_icao_type_code,
                    flg_helicopter: req.params.flg_helicopter,  
                    flg_single_pilot_operations: req.params.flg_single_pilot_operations,
                    flg_london_city_landings: req.params.flg_london_city_landings,
            
            })
        }
    })
 
// SHOW EDIT USER FORM
app.get('/editAircraftTypes/(:cod_aircraft_type)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_aircraft_types WHERE cod_aircraft_type = '"+ req.params.cod_aircraft_type+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_aircraft_type = ' + req.params.id)
                res.redirect('/aircraftTypes')
            }
            else { // if user found

                conn.query("SELECT * FROM mst_manufacturers WHERE cod_rec_status='A' ORDER BY cod_manufacturer ASC ", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listAircraftTypes', {
                            title: 'Aircraft Types', 
                            data: ''
                        })
                        } else { 
                            // render to views/user/edit.ejs template file
                            res.render('user/editAircraftTypes', {
                                title: 'Edit Aircraft Type', 
                                
                                cod_aircraft_type: rows[0].cod_aircraft_type,
                                txt_type_description: rows[0].txt_type_description,
                                cod_manufacturer: rows[0].cod_manufacturer,
                                num_seats: rows[0].num_seats,
                                txt_icao_type_code: rows[0].txt_icao_type_code,
                                flg_helicopter: rows[0].flg_helicopter,
                                flg_single_pilot_operations: rows[0].flg_single_pilot_operations,
                                flg_london_city_landings: rows[0].flg_london_city_landings,
                                data1: rows1

                            })
                        }
                    })
                }            
            })
        })
    })
 
// EDIT USER POST ACTION
app.put('/editAircraftTypes/(:cod_aircraft_type)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_aircraft_type: req.sanitize('cod_aircraft_type').escape().trim(),
            txt_type_description: req.sanitize('txt_type_description').escape().trim(),
            cod_manufacturer: req.sanitize('cod_manufacturer').escape().trim(),
            num_seats: req.sanitize('num_seats').escape().trim(),
            txt_icao_type_code: req.sanitize('txt_icao_type_code').escape().trim(),
            flg_helicopter: req.sanitize('flg_helicopter').escape().trim(),
            flg_single_pilot_operations: req.sanitize('flg_single_pilot_operations').escape().trim(),
            flg_london_city_landings: req.sanitize('flg_london_city_landings').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_aircraft_types SET ? WHERE cod_aircraft_type = '"+ req.params.cod_aircraft_type+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editAircraftTypes', {
                        title: 'Edit Aircraft Type',
                       
                        cod_aircraft_type: req.params.cod_aircraft_type,  
                        txt_type_description: req.body.txt_type_description,
                        cod_manufacturer: req.params.cod_manufacturer,  
                        num_seats: req.params.num_seats,  
                        txt_icao_type_code: req.body.txt_icao_type_code,
                        flg_helicopter: req.params.flg_helicopter,  
                        flg_single_pilot_operations: req.params.flg_single_pilot_operations,
                        flg_london_city_landings: req.params.flg_london_city_landings,
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    conn.query("SELECT * FROM mst_manufacturers WHERE cod_rec_status='A' ORDER BY cod_manufacturer ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listAircraftTypes', {
                                title: 'Aircraft Types', 
                                data: ''
                            })
                        } else { 
                    
                            // render to views/user/add.ejs
                            res.render('user/editAircraftTypes', {
                                title: 'Edit Aircraft Type',
                               
                                cod_aircraft_type: req.params.cod_aircraft_type,  
                                txt_type_description: req.body.txt_type_description,
                                cod_manufacturer: req.params.cod_manufacturer,  
                                num_seats: req.params.num_seats,  
                                txt_icao_type_code: req.body.txt_icao_type_code,
                                flg_helicopter: req.params.flg_helicopter,  
                                flg_single_pilot_operations: req.params.flg_single_pilot_operations,
                                flg_london_city_landings: req.params.flg_london_city_landings,
                                data1: rows1

                            })
                        }
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
        res.render('user/editAircraftTypes', { 
            title: 'Edit Aircraft Type',            
            
                cod_aircraft_type: req.params.cod_aircraft_type,  
                txt_type_description: req.body.txt_type_description,
                cod_manufacturer: req.params.cod_manufacturer,  
                num_seats: req.params.num_seats,  
                txt_icao_type_code: req.body.txt_icao_type_code,
                flg_helicopter: req.params.flg_helicopter,  
                flg_single_pilot_operations: req.params.flg_single_pilot_operations,
                flg_london_city_landings: req.params.flg_london_city_landings,
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_aircraft_type)', function(req, res, next) {
    var user = req.params.cod_aircraft_type;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_aircraft_types set cod_rec_status='C' WHERE cod_aircraft_type = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/aircraftTypes')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/aircraftTypes')
            }
        })
    })
})
 
module.exports = app