var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listCity', {
                    title: 'Cities',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listCity', {
                    title: 'Cities',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/addCity', function (req, res, next) {
    // render to views/user/add.ejs
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listCity', {
                    title: 'City',
                    data: ''
                })
            } else {

                conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listCity', {
                            title: 'City',
                            data: ''
                        })
                    } else {
                        // render to views/user/list.ejs template file
                        conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC ", function (err, rows2, fields) {
                            //if(err) throw err
                            if (err) {
                                req.flash('error', err)
                                res.render('user/listCity', {
                                    title: 'City',
                                    data: ''
                                })
                            } else {
                                // render to views/user/list.ejs template file
                                res.render('user/addCity', {

                                    title: 'Add City',
                                    cod_city: '',
                                    txt_city_name: '',
                                    cod_state: '',
                                    cod_country: '',
                                    num_latitude: '',
                                    num_longitude: '',
                                    cod_timezone: '',
                                    data: rows,
                                    data1: rows1,
                                    data2: rows2
                                    
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
app.post('/addCity', function (req, res, next) {
    
    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            /* txt_name: req.sanitize('name').escape().trim(),
            num_age: req.sanitize('age').escape().trim(),
            txt_email: req.sanitize('email').escape().trim() */
            cod_city: req.sanitize('cod_city').escape().trim(),
            txt_city_name: req.sanitize('txt_city_name').escape().trim(),
            cod_state: req.sanitize('cod_state').escape().trim(),
            cod_country: req.sanitize('cod_country').escape().trim(),
            num_latitude: req.sanitize('num_latitude').escape().trim(),
            num_longitude: req.sanitize('num_longitude').escape().trim(),
            cod_timezone: req.sanitize('cod_timezone').escape().trim()

        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO mst_cities SET ?', user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/addCity', {

                        title: 'Add City',
                        cod_city: user.cod_city,
                        txt_city_name: user.txt_city_name,
                        cod_state: user.cod_state,
                        cod_country: user.cod_country,
                        num_latitude: user.num_latitude,
                        num_longitude: user.num_longitude,
                        cod_timezone: user.cod_timezone
                        
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listCity', {
                                title: 'City',
                                data: ''
                            })
                        } else {

                            conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows1, fields) {
                                //if(err) throw err
                                if (err) {
                                    req.flash('error', err)
                                    res.render('user/listCity', {
                                        title: 'City',
                                        data: ''
                                    })
                                } else {
                                    // render to views/user/list.ejs template file
                                    conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC ", function (err, rows2, fields) {
                                        //if(err) throw err
                                        if (err) {
                                            req.flash('error', err)
                                            res.render('user/listCity', {
                                                title: 'City',
                                                data: ''
                                            })
                                        } else {
                                            // render to views/user/list.ejs template file
                                            res.render('user/addCity', {
                                                title: 'Add City',
                                                cod_city: '',
                                                txt_city_name: '',
                                                cod_state: '',
                                                cod_country: '',
                                                num_latitude: '',
                                                num_longitude: '',
                                                cod_timezone: '',
                                                data: rows,
                                                data1: rows1,
                                                data2: rows2
                                                
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
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */
        res.render('user/addCity', {
            title: 'Add City',
            cod_city: req.body.cod_city,
            txt_city_name: req.body.txt_city_name,
            cod_state: req.body.cod_state,
            cod_country: req.body.cod_country,
            num_latitude: req.body.num_latitude,
            num_longitude: req.body.num_longitude,
            cod_timezone: req.body.cod_timezone

            /*email: req.body.email*/
        })
    }
})

// SHOW EDIT USER FORM
app.get('/editCity/(:cod_city)', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_cities WHERE cod_city = '" + req.params.cod_city+"'", function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_city = ' + req.params.id)
                res.redirect('/cities')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows3, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listCity', {
                            title: 'City',
                            data: ''
                        })
                    } else {

                        conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows1, fields) {
                            //if(err) throw err
                            if (err) {
                                req.flash('error', err)
                                res.render('user/listCity', {
                                    title: 'City',
                                    data: ''
                                })
                            } else {
                                // render to views/user/list.ejs template file
                                conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC ", function (err, rows2, fields) {
                                    //if(err) throw err
                                    if (err) {
                                        req.flash('error', err)
                                        res.render('user/listCity', {
                                            title: 'City',
                                            data: ''
                                        })
                                    } else {
                                        // render to views/user/list.ejs template file
                                        res.render('user/editCity', {
                                            title: 'Edit City',
                                            //data: rows[0],
                                            cod_city: rows[0].cod_city,
                                            txt_city_name: rows[0].txt_city_name,
                                            cod_state: rows[0].cod_state,
                                            cod_country: rows[0].cod_country,
                                            num_latitude: rows[0].num_latitude,
                                            num_longitude: rows[0].num_longitude,
                                            cod_timezone: rows[0].cod_timezone,
                                            data3:rows3,
                                            data2:rows2,
                                            data1:rows1
                                           
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
app.put('/editCity/(:cod_city)', function (req, res, next) {

    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
           
            cod_city: req.sanitize('cod_city').escape().trim(),
            txt_city_name: req.sanitize('txt_city_name').escape().trim(),
            cod_state: req.sanitize('cod_state').escape().trim(),
            cod_country: req.sanitize('cod_country').escape().trim(),
            num_latitude: req.sanitize('num_latitude').escape().trim(),
            num_longitude: req.sanitize('num_longitude').escape().trim(),
            cod_timezone: req.sanitize('cod_timezone').escape().trim()
            
        }

        req.getConnection(function (error, conn) {
            conn.query("UPDATE mst_cities SET ? WHERE cod_city = '" + req.params.cod_city+"'", user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/editCity', {
                        title: 'Edit City',
                        
                        cod_city: req.params.cod_city,
                        txt_city_name: req.body.txt_city_name,
                        cod_state: req.body.cod_state,
                        cod_country: req.body.cod_country,
                        num_latitude: req.body.num_latitude,
                        num_longitude: req.body.num_longitude,
                        cod_timezone: req.body.cod_timezone
                        
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows3, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listCity', {
                                title: 'City',
                                data: ''
                            })
                        } else {
    
                            conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows1, fields) {
                                //if(err) throw err
                                if (err) {
                                    req.flash('error', err)
                                    res.render('user/listCity', {
                                        title: 'City',
                                        data: ''
                                    })
                                } else {
                                    // render to views/user/list.ejs template file
                                    conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC ", function (err, rows2, fields) {
                                        //if(err) throw err
                                        if (err) {
                                            req.flash('error', err)
                                            res.render('user/listCity', {
                                                title: 'City',
                                                data: ''
                                            })
                                        } else {
                                            // render to views/user/list.ejs template file
                                            res.render('user/editCity', {
                                                title: 'Edit City',
                                                
                                                cod_city: req.params.cod_city,
                                                txt_city_name: req.body.txt_city_name,
                                                cod_state: req.body.cod_state,
                                                cod_country: req.body.cod_country,
                                                num_latitude: req.body.num_latitude,
                                                num_longitude: req.body.num_longitude,
                                                cod_timezone: req.body.cod_timezone,
                                                data3:rows3,
                                                data2:rows2,
                                                data1:rows1
                                                
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
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */
        res.render('user/editCity', {
            title: 'Edit City',
            
            cod_city: req.params.cod_city,
            txt_city_name: req.body.txt_city_name,
            cod_state: req.body.cod_state,
            cod_country: req.body.cod_country,
            num_latitude: req.body.num_latitude,
            num_longitude: req.body.num_longitude,
            cod_timezone: req.body.cod_timezone
            
        })
    }
})

// DELETE USER
app.delete('/delete/(:cod_city)', function (req, res, next) {
    var user = req.params.cod_city;

    req.getConnection(function (error, conn) {
        conn.query("update mst_cities set cod_rec_status='C' WHERE cod_city = '" + user+"'", function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/cities')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/cities')
            }
        })
    })
})

module.exports = app