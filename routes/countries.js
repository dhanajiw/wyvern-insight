var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listCountry', {
                    title: 'Countries',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listCountry', {
                    title: 'Countries',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/addCountry', function (req, res, next) {

    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listCountry', {
                    title: 'Countries',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/addCountry', {

                    title: 'Add Country',
                    cod_country: '',
                    cod_country_alternative: '',
                    txt_country_name: '',
                    cod_timezone: '',
                    data: rows
                    
                })
            }
        })
    })
})

// ADD NEW USER POST ACTION
app.post('/addCountry', function (req, res, next) {
    
    var errors = req.validationErrors()

    if (!errors) {   

        var user = {
            
            cod_country: req.sanitize('cod_country').escape().trim(),
            cod_country_alternative: req.sanitize('cod_country_alternative').escape().trim(),
            txt_country_name: req.sanitize('txt_country_name').escape().trim(),
            cod_timezone: req.sanitize('cod_timezone').escape().trim()

        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO mst_countries SET ?', user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/addCountry', {
                        
                        title: 'Add Country',
                        cod_country: user.cod_country,
                        cod_country_alternative: user.cod_country_alternative,
                        txt_country_name: user.txt_country_name,
                        cod_timezone: user.cod_timezone,

                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listCountry', {
                                title: 'Countries',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/addCountry', {
                                title: 'Add Country',
                                cod_country: '',
                                cod_country_alternative: '',
                                txt_country_name: '',
                                cod_timezone: '',
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
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */
        res.render('user/addCountry', {
            title: 'Add New Country',
            cod_country: req.body.cod_country,
            cod_country_alternative: req.body.cod_country_alternative,
            txt_country_name: req.body.txt_country_name,
            cod_timezone: req.body.cod_timezone

        })
    }
})

// SHOW EDIT USER FORM
app.get('/editCountry/(:cod_country)', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_countries WHERE cod_country = '"+ req.params.cod_country+"' ", function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_country = ' + req.params.id)
                res.redirect('/countries')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listCountry', {
                            title: 'Countries',
                            data: ''
                        })
                    } else {
                        // render to views/user/list.ejs template file
                        res.render('user/editCountry', {
                            title: 'Edit Country',
                            
                            cod_country: rows[0].cod_country,
                            cod_country_alternative: rows[0].cod_country_alternative,
                            txt_country_name: rows[0].txt_country_name,
                            cod_timezone: rows[0].cod_timezone,
                            data1:rows1
        
                        })
                    }
                })
            }
        })
    })
})

// EDIT USER POST ACTION
app.put('/editCountry/(:cod_country)', function (req, res, next) {
    
    var errors = req.validationErrors()

    if (!errors) {   

        var user = {
            
            cod_country: req.sanitize('cod_country').escape().trim(),
            cod_country_alternative: req.sanitize('cod_country_alternative').escape().trim(),
            txt_country_name: req.sanitize('txt_country_name').escape().trim(),
            cod_timezone: req.sanitize('cod_timezone').escape().trim()

        }

        req.getConnection(function (error, conn) {
            conn.query("UPDATE mst_countries SET ? WHERE cod_country = '"+ req.params.cod_country+"' ", user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/editCountry', {
                        title: 'Edit Country',
                        
                        cod_country: req.params.cod_country,
                        cod_country_alternative: req.body.cod_country_alternative,
                        txt_country_name: req.body.txt_country_name,
                        cod_timezone: req.body.cod_timezone

                    })
                } else {
                    req.flash('success', 'Data updated successfully!')


                    conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listCountry', {
                                title: 'Countries',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/editCountry', {
                                title: 'Edit Country',
                                
                                cod_country: req.params.cod_country,
                                cod_country_alternative: req.body.cod_country_alternative,
                                txt_country_name: req.body.txt_country_name,
                                cod_timezone: req.body.cod_timezone,
                                data1:rows1
        
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
        res.render('user/editCountry', {
            title: 'Edit Country',
            
            cod_country: req.params.cod_country,
            cod_country_alternative: req.body.cod_country_alternative,
            txt_country_name: req.body.txt_country_name,
            cod_timezone: req.body.cod_timezone

        })
    }
})

// DELETE USER
app.delete('/delete/(:cod_country)', function (req, res, next) {
    var user = req.params.cod_country;

    req.getConnection(function (error, conn) {
        conn.query("update mst_countries set cod_rec_status='C' WHERE cod_country = '"+ user+"' ", function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/countries')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/countries')
            }
        })
    })
})

module.exports = app