var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_airports WHERE cod_rec_status='A' ORDER BY id_airport ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAirport', {
                    title: 'Airports', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listAirport', {
                    title: 'Airports', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addAirport', function(req, res, next){  

    req.getConnection(function (error, conn) {

        conn.query("SELECT * FROM mst_operation_regions WHERE cod_rec_status='A' ORDER BY cod_operation_region ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAirport', {
                    title: 'Airports',
                    data: ''
                })
            } else {

                conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC ", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listAirport', {
                            title: 'Airports',
                            data: ''
                        })
                    } else {
                        conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows2, fields) {
                            //if(err) throw err
                            if (err) {
                                req.flash('error', err)
                                res.render('user/listAirport', {
                                    title: 'Airports',
                                    data: ''
                                })
                            } else {

                                conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows3, fields) {
                                    //if(err) throw err
                                    if (err) {
                                        req.flash('error', err)
                                        res.render('user/listAirport', {
                                            title: 'Airports',
                                            data: ''
                                        })
                                    } else {
                                        // render to views/user/list.ejs template file
                                        conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC ", function (err, rows4, fields) {
                                            //if(err) throw err
                                            if (err) {
                                                req.flash('error', err)
                                                res.render('user/listAirport', {
                                                    title: 'Airports',
                                                    data: ''
                                                })
                                            } else {
                                                // render to views/user/add.ejs
                                                res.render('user/addAirport', {
                                                    
                                                    title: 'Add Airport',
                                                    id_airport: '', 
                                                    cod_icao: '',
                                            		cod_logicalICAO: '',
                                            		cod_iata: '',
                                            		cod_faa: '',
                                            		txt_name: '',
                                            		flg_active: '',
                                            		cod_operation_region: '',
                                                    cod_nearest_city: '',
                                                    cod_state: '',
                                            		cod_country: '',
                                            		cod_timezone: '',
                                            		num_longitude: '',
                                            		num_latitude: '',
                                            		num_elevation_feet: '',
                                            		num_runways: '',
                                            		num_shortest_runway_feet: '',
                                            		num_longest_runway_feet: '',
                                                    data: rows,
                                                    data1: rows1,
                                                    data2: rows2,
                                                    data3: rows3,
                                                    data4: rows4

                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addAirport', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   

        var user = {
            
            id_airport: req.sanitize('id_airport').escape().trim(),
            cod_icao: req.sanitize('cod_icao').escape().trim(),
			cod_logicalICAO: req.sanitize('cod_logicalICAO').escape().trim(),
			cod_iata: req.sanitize('cod_iata').escape().trim(),
			cod_faa: req.sanitize('cod_faa').escape().trim(),
			txt_name: req.sanitize('txt_name').escape().trim(),
			flg_active: req.sanitize('flg_active').escape().trim(),
			cod_operation_region: req.sanitize('cod_operation_region').escape().trim(),
			cod_nearest_city: req.sanitize('cod_city').escape().trim(),
            cod_state: req.sanitize('cod_state').escape().trim(),
            cod_country: req.sanitize('cod_country').escape().trim(),
			cod_timezone: req.sanitize('cod_timezone').escape().trim(),
			num_longitude: req.sanitize('num_longitude').escape().trim(),
			num_latitude: req.sanitize('num_latitude').escape().trim(),
			num_elevation_feet: req.sanitize('num_elevation_feet').escape().trim(),
			num_runways: req.sanitize('num_runways').escape().trim(),
			num_shortest_runway_feet: req.sanitize('num_shortest_runway_feet').escape().trim(),
			num_longest_runway_feet: req.sanitize('num_longest_runway_feet').escape().trim()
			
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_airports SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addAirport', { 

                        title: 'Add Airport',
                        id_airport: user.id_airport, 
                		cod_icao: user.cod_icao,
                        cod_logicalICAO: user.cod_logicalICAO,
                        cod_iata: user.cod_iata,
                        cod_faa: user.cod_faa,
                        txt_name: user.txt_name,
                        flg_active: user.flg_active,
                        cod_operation_region: user.cod_operation_region,
                        cod_nearest_city: user.cod_city,
                        cod_state: user.cod_state,
                        cod_country: user.cod_country,
                        cod_timezone: user.cod_timezone,
                        num_longitude: user.num_longitude,
                        num_latitude: user.num_latitude,
                        num_elevation_feet: user.num_elevation_feet,
                        num_runways: user.num_runways,
                        num_shortest_runway_feet: user.num_shortest_runway_feet,
                        num_longest_runway_feet: user.num_longest_runway_feet		
         
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    conn.query("SELECT * FROM mst_operation_regions WHERE cod_rec_status='A' ORDER BY cod_operation_region ASC ", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listAirport', {
                                title: 'Airports',
                                data: ''
                            })
                        } else {

                            conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC ", function (err, rows1, fields) {
                                //if(err) throw err
                                if (err) {
                                    req.flash('error', err)
                                    res.render('user/listAirport', {
                                        title: 'Airports',
                                        data: ''
                                    })
                                } else {
                                    conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows2, fields) {
                                        //if(err) throw err
                                        if (err) {
                                            req.flash('error', err)
                                            res.render('user/listAirport', {
                                                title: 'Airports',
                                                data: ''
                                            })
                                        } else {

                                            conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows3, fields) {
                                                //if(err) throw err
                                                if (err) {
                                                    req.flash('error', err)
                                                    res.render('user/listAirport', {
                                                        title: 'Airports',
                                                        data: ''
                                                    })
                                                } else {
                                                    // render to views/user/list.ejs template file
                                                    conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC ", function (err, rows4, fields) {
                                                        //if(err) throw err
                                                        if (err) {
                                                            req.flash('error', err)
                                                            res.render('user/listAirport', {
                                                                title: 'Airports',
                                                                data: ''
                                                            })
                                                        } else {

                                                            // render to views/user/add.ejs
                                                            res.render('user/addAirport', {
                                                                title: 'Add Airport',
                                                                id_airport: '', 
                                                                cod_icao: '',
                                                        		cod_logicalICAO: '',
                                                        		cod_iata: '',
                                                        		cod_faa: '',
                                                        		txt_name: '',
                                                        		flg_active: '',
                                                        		cod_operation_region: '',
                                                        		cod_nearest_city: '',
                                                                cod_state: '',
                                                                cod_country: '',
                                                        		cod_timezone: '',
                                                        		num_longitude: '',
                                                        		num_latitude: '',
                                                        		num_elevation_feet: '',
                                                        		num_runways: '',
                                                        		num_shortest_runway_feet: '',
                                                        		num_longest_runway_feet: '',
                                                                data: rows,
                                                                data1: rows1,
                                                                data2: rows2,
                                                                data3: rows3,
                                                                data4: rows4

                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
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
        res.render('user/addAirport', { 
            title: 'Add New User',
            id_airport: req.body.id_airport,
            cod_icao: req.body.cod_icao,
    		cod_logicalICAO: req.body.cod_logicalICAO,
    		cod_iata: req.body.cod_iata,
    		cod_faa: req.body.cod_faa,
    		txt_name: req.body.txt_name,
    		flg_active: req.body.flg_active,
    		cod_operation_region: req.body.cod_operation_region,
    		cod_nearest_city: req.body.cod_city,
            cod_state: req.body.cod_state,
            cod_country: req.body.cod_country,
    		cod_timezone: req.body.cod_timezone,
    		num_longitude: req.body.num_longitude,
    		num_latitude: req.body.num_latitude,
    		num_elevation_feet: req.body.num_elevation_feet,
    		num_runways: req.body.num_runways,
    		num_shortest_runway_feet: req.body.num_shortest_runway_feet,
    		num_longest_runway_feet: req.body.num_longest_runway_feet
            
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editAirport/(:id_airport)', function(req, res, next){

    req.getConnection(function(error, conn) {

        conn.query("SELECT * FROM mst_airports WHERE id_airport = '"+ req.params.id_airport+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with id_airport = ' + req.params.id_airport)
                res.redirect('/airports')
            }
            else { // if user found

                conn.query("SELECT * FROM mst_operation_regions WHERE cod_rec_status='A' ORDER BY cod_operation_region ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listAirport', {
                                title: 'Airports',
                                data: ''
                            })
                        } else {

                            conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC ", function (err, rows2, fields) {
                                //if(err) throw err
                                if (err) {
                                    req.flash('error', err)
                                    res.render('user/listAirport', {
                                        title: 'Airports',
                                        data: ''
                                    })
                                } else {
                                    conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows3, fields) {
                                        //if(err) throw err
                                        if (err) {
                                            req.flash('error', err)
                                            res.render('user/listAirport', {
                                                title: 'Airports',
                                                data: ''
                                            })
                                        } else {

                                            conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows4, fields) {
                                                //if(err) throw err
                                                if (err) {
                                                    req.flash('error', err)
                                                    res.render('user/listAirport', {
                                                        title: 'Airports',
                                                        data: ''
                                                    })
                                                } else {
                                                    // render to views/user/list.ejs template file
                                                    conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC ", function (err, rows5, fields) {
                                                        //if(err) throw err
                                                        if (err) {
                                                            req.flash('error', err)
                                                            res.render('user/listAirport', {
                                                                title: 'Airports',
                                                                data: ''
                                                            })
                                                        } else {
                                                            // render to views/user/edit.ejs template file
                                                            res.render('user/editAirport', {
                                                                title: 'Edit Airport', 
                                                                
                                                                id_airport: rows[0].id_airport,
                                            					cod_icao: rows[0].cod_icao,
                                                        		cod_logicalICAO: rows[0].cod_logicalICAO,
                                                        		cod_iata: rows[0].cod_iata,
                                                        		cod_faa: rows[0].cod_faa,
                                                        		txt_name: rows[0].txt_name,
                                                        		flg_active: rows[0].flg_active,
                                                        		cod_operation_region: rows[0].cod_operation_region,
                                                        		cod_nearest_city: rows[0].cod_city,
                                                                cod_state: rows[0].cod_state,
                                                                cod_country: rows[0].cod_country,
                                                        		cod_timezone: rows[0].cod_timezone,
                                                        		num_longitude: rows[0].num_longitude,
                                                        		num_latitude: rows[0].num_latitude,
                                                        		num_elevation_feet: rows[0].num_elevation_feet,
                                                        		num_runways: rows[0].num_runways,
                                                        		num_shortest_runway_feet: rows[0].num_shortest_runway_feet,
                                                        		num_longest_runway_feet: rows[0].num_longest_runway_feet,
                                                                data1: rows1,
                                                                data2: rows2,
                                                                data3: rows3,
                                                                data4: rows4,
                                                                data5: rows5

                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })
    })
 
// EDIT USER POST ACTION
app.put('/editAirport/(:id_airport)', function(req, res, next) {
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
			
			id_airport: req.sanitize('id_airport').escape().trim(),
            cod_icao: req.sanitize('cod_icao').escape().trim(),
			cod_logicalICAO: req.sanitize('cod_logicalICAO').escape().trim(),
			cod_iata: req.sanitize('cod_iata').escape().trim(),
			cod_faa: req.sanitize('cod_faa').escape().trim(),
			txt_name: req.sanitize('txt_name').escape().trim(),
			flg_active: req.sanitize('flg_active').escape().trim(),
			cod_operation_region: req.sanitize('cod_operation_region').escape().trim(),
			cod_nearest_city: req.sanitize('cod_city').escape().trim(),
            cod_state: req.sanitize('cod_state').escape().trim(),
            cod_country: req.sanitize('cod_country').escape().trim(),
			cod_timezone: req.sanitize('cod_timezone').escape().trim(),
			num_longitude: req.sanitize('num_longitude').escape().trim(),
			num_latitude: req.sanitize('num_latitude').escape().trim(),
			num_elevation_feet: req.sanitize('num_elevation_feet').escape().trim(),
			num_runways: req.sanitize('num_runways').escape().trim(),
			num_shortest_runway_feet: req.sanitize('num_shortest_runway_feet').escape().trim(),
			num_longest_runway_feet: req.sanitize('num_longest_runway_feet').escape().trim()
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_airports SET ? WHERE id_airport = '"+ req.params.id_airport+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editAirport', {
                        title: 'Edit Airport',
                       
                        id_airport: req.params.id_airport,  
                        cod_icao: req.body.cod_icao,
                		cod_logicalICAO: req.body.cod_logicalICAO,
                		cod_iata: req.body.cod_iata,
                		cod_faa: req.body.cod_faa,
                		txt_name: req.body.txt_name,
                		flg_active: req.body.flg_active,
                		cod_operation_region: req.body.cod_operation_region,
                		cod_nearest_city: req.body.cod_city,
                        cod_state: req.body.cod_state,
                        cod_country: req.body.cod_country,
                		cod_timezone: req.body.cod_timezone,
                		num_longitude: req.body.num_longitude,
                		num_latitude: req.body.num_latitude,
                		num_elevation_feet: req.body.num_elevation_feet,
                		num_runways: req.body.num_runways,
                		num_shortest_runway_feet: req.body.num_shortest_runway_feet,
                		num_longest_runway_feet: req.body.num_longest_runway_feet
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                        conn.query("SELECT * FROM mst_operation_regions WHERE cod_rec_status='A' ORDER BY cod_operation_region ASC ", function (err, rows1, fields) {
                            //if(err) throw err
                            if (err) {
                                req.flash('error', err)
                                res.render('user/listAirport', {
                                    title: 'Airports',
                                    data: ''
                                })
                            } else {

                                conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC ", function (err, rows2, fields) {
                                    //if(err) throw err
                                    if (err) {
                                        req.flash('error', err)
                                        res.render('user/listAirport', {
                                            title: 'Airports',
                                            data: ''
                                        })
                                    } else {
                                        conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows3, fields) {
                                            //if(err) throw err
                                            if (err) {
                                                req.flash('error', err)
                                                res.render('user/listAirport', {
                                                    title: 'Airports',
                                                    data: ''
                                                })
                                            } else {

                                                conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows4, fields) {
                                                    //if(err) throw err
                                                    if (err) {
                                                        req.flash('error', err)
                                                        res.render('user/listAirport', {
                                                            title: 'Airports',
                                                            data: ''
                                                        })
                                                    } else {
                                                        // render to views/user/list.ejs template file
                                                        conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC ", function (err, rows5, fields) {
                                                            //if(err) throw err
                                                            if (err) {
                                                                req.flash('error', err)
                                                                res.render('user/listAirport', {
                                                                    title: 'Airports',
                                                                    data: ''
                                                                })
                                                            } else {
                                                                // render to views/user/add.ejs
                                                                res.render('user/editAirport', {
                                                                    title: 'Edit Airport',
                                                                    
                                                                    id_airport: req.params.id_airport,  
                                                                    cod_icao: req.body.cod_icao,
                                                            		cod_logicalICAO: req.body.cod_logicalICAO,
                                                            		cod_iata: req.body.cod_iata,
                                                            		cod_faa: req.body.cod_faa,
                                                            		txt_name: req.body.txt_name,
                                                            		flg_active: req.body.flg_active,
                                                            		cod_operation_region: req.body.cod_operation_region,
                                                            		cod_nearest_city: req.body.cod_city,
                                                                    cod_state: req.body.cod_state,
                                                                    cod_country: req.body.cod_country,
                                                            		cod_timezone: req.body.cod_timezone,
                                                            		num_longitude: req.body.num_longitude,
                                                            		num_latitude: req.body.num_latitude,
                                                            		num_elevation_feet: req.body.num_elevation_feet,
                                                            		num_runways: req.body.num_runways,
                                                            		num_shortest_runway_feet: req.body.num_shortest_runway_feet,
                                                            		num_longest_runway_feet: req.body.num_longest_runway_feet,
                                                                    data1: rows1,
                                                                    data2: rows2,
                                                                    data3: rows3,
                                                                    data4: rows4,
                                                                    data5: rows5

                                                                })
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
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
        res.render('user/editAirport', { 
            title: 'Edit Airport',            
            
            id_airport: req.params.id_airport,  
            cod_icao: req.body.cod_icao,
    		cod_logicalICAO: req.body.cod_logicalICAO,
    		cod_iata: req.body.cod_iata,
    		cod_faa: req.body.cod_faa,
    		txt_name: req.body.txt_name,
    		flg_active: req.body.flg_active,
    		cod_operation_region: req.body.cod_operation_region,
    		cod_nearest_city: req.body.cod_city,
            cod_state: req.body.cod_state,
            cod_country: req.body.cod_country,
    		cod_timezone: req.body.cod_timezone,
    		num_longitude: req.body.num_longitude,
    		num_latitude: req.body.num_latitude,
    		num_elevation_feet: req.body.num_elevation_feet,
    		num_runways: req.body.num_runways,
    		num_shortest_runway_feet: req.body.num_shortest_runway_feet,
    		num_longest_runway_feet: req.body.num_longest_runway_feet
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:id_airport)', function(req, res, next) {
    var user = req.params.id_airport;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_airports set cod_rec_status='C' WHERE id_airport = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/airports')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/airports')
            }
        })
    })
})

module.exports = app