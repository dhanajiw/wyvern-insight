var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_regulators WHERE cod_rec_status='A' ORDER BY cod_regulator ASC", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listRegulator', {
                    title: 'Regulators',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listRegulator', {
                    title: 'Regulators',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/addRegulator', function (req, res, next) {
    // render to views/user/add.ejs
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listRegulator', {
                    title: 'Regulators',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/addRegulator', {

                    title: 'Add Regulator',
                    cod_regulator: '',
                    txt_regulator_name: '',
                    cod_home_country: '',
                    data: rows
  
                })
            }
        })
    })
})

// ADD NEW USER POST ACTION
app.post('/addRegulator', function (req, res, next) {


    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            
            cod_regulator: req.sanitize('cod_regulator').escape().trim(),
            txt_regulator_name: req.sanitize('txt_regulator_name').escape().trim(),
            cod_home_country: req.sanitize('cod_country').escape().trim()
            
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO mst_regulators SET ?', user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/addRegulator', {
                       

                        title: 'Add Regulator',
                        cod_regulator: user.cod_regulator,
                        txt_regulator_name: user.txt_regulator_name,
                        cod_home_country: user.cod_country,
                        data:rows
     
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listRegulator', {
                                title: 'Regulators',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/addRegulator', {
                                title: 'Add Regulator',
                                cod_regulator: '',
                                txt_regulator_name: '',
                                cod_home_country: '',
                                data:rows
                                
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
        res.render('user/addRegulator', {
            title: 'Add Regulator',
            cod_regulator: req.body.cod_regulator,
            txt_regulator_name: req.body.txt_regulator_name,
            cod_home_country: req.body.cod_country
      
        })
    }
})

// SHOW EDIT USER FORM
app.get('/editRegulator/(:cod_regulator)', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_regulators WHERE cod_regulator = '"+ req.params.cod_regulator+"' ", function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_regulator = ' + req.params.id)
                res.redirect('/regulators')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listRegulator', {
                            title: 'Regulators',
                            data: ''
                        })
                    } else {
                        // render to views/user/list.ejs template file
                        res.render('user/editRegulator', {
                            title: 'Edit Regulator',
                            
                            cod_regulator: rows[0].cod_regulator,
                            txt_regulator_name: rows[0].txt_regulator_name,
                            cod_home_country: rows[0].cod_country,
                            data1:rows1
                            
                        })
                    }
                })       
            }
        })
    })
})

// EDIT USER POST ACTION
app.put('/editRegulator/(:cod_regulator)', function (req, res, next) {
    

    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            
            cod_regulator: req.sanitize('cod_regulator').escape().trim(),
            txt_regulator_name: req.sanitize('txt_regulator_name').escape().trim(),
            cod_home_country: req.sanitize('cod_country').escape().trim()
            
        }

        req.getConnection(function (error, conn) {
            conn.query("UPDATE mst_regulators SET ? WHERE cod_regulator = '"+ req.params.cod_regulator+"' ", user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/editRegulator', {
                        title: 'Edit Regulator',
                        
                        cod_regulator: req.params.cod_regulator,
                        txt_regulator_name: req.body.txt_regulator_name,
                        cod_home_country: req.body.cod_country
                        
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listRegulator', {
                                title: 'Regulators',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/editRegulator', {
                                title: 'Edit Regulator',
                                
                                cod_regulator: req.params.cod_regulator,
                                txt_regulator_name: req.body.txt_regulator_name,
                                cod_home_country: req.body.cod_country,
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
        res.render('user/editRegulator', {
            title: 'Edit Regulator',
            
            cod_regulator: req.params.cod_regulator,
            txt_regulator_name: req.body.txt_regulator_name,
            cod_home_country: req.body.cod_country
           
        })
    }
})

// DELETE USER
app.delete('/delete/(:cod_regulator)', function (req, res, next) {
    var user = req.params.cod_regulator;

    req.getConnection(function (error, conn) {
        conn.query("update mst_regulators set cod_rec_status='C' WHERE cod_regulator = '"+ user+"' ", function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/regulators')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/regulators')
            }
        })
    })
})

module.exports = app