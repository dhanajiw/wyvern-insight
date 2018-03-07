var express = require('express')
var app = express()

// SHOW LIST OF Aircraft Models
app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_aircraft_models WHERE cod_rec_status='A' ORDER BY cod_aircraft_model ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAircraftModel', {
                    title: 'Aircraft Models',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listAircraftModel', {
                    title: 'Aircraft Models',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/addAircraftModel', function (req, res, next) {

    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_aircraft_categories WHERE cod_rec_status='A' ORDER BY cod_category ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAircraftModel', {
                    title: 'Aircraft Models',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/addAircraftModel', {

                    title: 'Add Aircraft Model',
                    cod_aircraft_model: '',
                    txt_model_name: '',
                    cod_manufacturer: '',
                    dat_model_rollout: '',
                    cod_category: '',
                    num_runway_feet_reqd: '',
                    data: rows

                })
            }
        })
    })

})

// ADD NEW USER POST ACTION
app.post('/addAircraftModel', function (req, res, next) {

    var errors = req.validationErrors()

    if (!errors) {  

        var user = {
            
            cod_aircraft_model: req.sanitize('cod_aircraft_model').escape().trim(),
            txt_model_name: req.sanitize('txt_model_name').escape().trim(),
            cod_manufacturer: req.sanitize('cod_manufacturer').escape().trim(),
            dat_model_rollout: req.sanitize('dat_model_rollout').escape().trim(),
            cod_category: req.sanitize('cod_category').escape().trim(),
            num_runway_feet_reqd: req.sanitize('num_runway_feet_reqd').escape().trim()
            
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO mst_aircraft_models SET ?', user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    res.render('user/addAircraftModel', {

                        title: 'Add Aircraft Model',
                        cod_aircraft_model: '',
                        txt_model_name: '',
                        cod_manufacturer: '',
                        dat_model_rollout: '',
                        cod_category: '',
                        num_runway_feet_reqd: '',
                        

                    })

                } else {

                    req.flash('success', 'Data added successfully!')

                    // render to views/user/add.ejs

                        conn.query("SELECT * FROM mst_aircraft_categories WHERE cod_rec_status='A' ORDER BY cod_category ASC ", function (err, rows, fields) {
                            //if(err) throw err
                            if (err) {
                                req.flash('error', err)
                                res.render('user/listAircraftModel', {
                                    title: 'Aircraft Categories',
                                    data: ''
                                })
                            } else {
                                // render to views/user/list.ejs template file
                                res.render('user/addAircraftModel', {
                
                                    title: 'Add Aircraft Model',
                                    cod_aircraft_model: '',
                                    txt_model_name: '',
                                    cod_manufacturer: '',
                                    dat_model_rollout: '',
                                    cod_category: '',
                                    num_runway_feet_reqd: '',
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
        res.render('user/addAircraftModel', {
            title: 'Add Aircraft Model',
            cod_aircraft_model: req.body.cod_aircraft_model,
            txt_model_name: req.body.txt_model_name,
            cod_manufacturer: req.body.cod_manufacturer,
            dat_model_rollout: req.body.dat_model_rollout,
            cod_category: req.body.cod_category,
            num_runway_feet_reqd: req.body.num_runway_feet_reqd

        })
    }
})

// SHOW EDIT USER FORM
app.get('/editAircraftModel/(:cod_aircraft_model)', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_aircraft_models WHERE cod_aircraft_model = '"+req.params.cod_aircraft_model+"'", function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_aircraft_model = ' + req.params.id)
                res.redirect('/aircraftModels')
            }
            else { // if user found
                // render to views/user/edit.ejs template file

                    conn.query("SELECT * FROM mst_aircraft_categories WHERE cod_rec_status='A' ORDER BY cod_category ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listAircraftModel', {
                                title: 'Aircraft Models',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/editAircraftModel', {
                                title: 'Edit Aircraft Model',
                                
                                cod_aircraft_model: rows[0].cod_aircraft_model,
                                txt_model_name: rows[0].txt_model_name,
                                cod_manufacturer: rows[0].cod_manufacturer,
                                dat_model_rollout: rows[0].dat_model_rollout,
                                cod_category: rows[0].cod_category,
                                num_runway_feet_reqd: rows[0].num_runway_feet_reqd,
                                data1: rows1
            
                            })
                        }
                    })
            }
        })
    })
})

// EDIT USER POST ACTION
app.put('/editAircraftModel/(:cod_aircraft_model)', function (req, res, next) {

    var errors = req.validationErrors()

    if (!errors) {   

        var user = {
           
            cod_aircraft_model: req.sanitize('cod_aircraft_model').escape().trim(),
            txt_model_name: req.sanitize('txt_model_name').escape().trim(),
            cod_manufacturer: req.sanitize('cod_manufacturer').escape().trim(),
            dat_model_rollout: req.sanitize('dat_model_rollout').escape().trim(),
            cod_category: req.sanitize('cod_category').escape().trim(),
            num_runway_feet_reqd: req.sanitize('num_runway_feet_reqd').escape().trim()

        }

        req.getConnection(function (error, conn) {
            conn.query("UPDATE mst_aircraft_models SET ? WHERE cod_aircraft_model = '"+req.params.cod_aircraft_model+"'", user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    
                } else {
                    req.flash('success', 'Data updated successfully!')

                    conn.query("SELECT * FROM mst_aircraft_categories WHERE cod_rec_status='A' ORDER BY cod_category ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listAircraftModel', {
                                title: 'Aircraft Models',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/editAircraftModel', {
                                title: 'Edit Aircraft Model',
                                
                                cod_aircraft_model: req.params.cod_aircraft_model,
                                txt_model_name: req.body.txt_model_name,
                                cod_manufacturer: req.body.cod_manufacturer,
                                dat_model_rollout: req.body.dat_model_rollout,
                                cod_category: req.body.cod_category,
                                num_runway_feet_reqd: req.body.num_runway_feet_reqd,
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
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */
        res.render('user/editAircraftModel', {
            title: 'Edit Aircraft Model',
            
            cod_aircraft_model: req.params.cod_aircraft_model,
            txt_model_name: req.body.txt_model_name,
            cod_manufacturer: req.body.cod_manufacturer,
            dat_model_rollout: req.body.dat_model_rollout,
            cod_category: req.body.cod_category,
            num_runway_feet_reqd: req.body.num_runway_feet_reqd

        })
    }
})

// DELETE USER
app.delete('/delete/(:cod_aircraft_model)', function (req, res, next) {
    var user = req.params.cod_aircraft_model;

    req.getConnection(function (error, conn) {
        conn.query("update mst_aircraft_models set cod_rec_status='C' WHERE cod_aircraft_model = '"+user+"'", function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/aircraftModels')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/aircraftModels')
            }
        })
    })
})

module.exports = app