var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listState', {
                    title: 'States',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listState', {
                    title: 'States',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/addState', function (req, res, next) {
    // render to views/user/add.ejs
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listState', {
                    title: 'States',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/addState', {

                    title: 'Add State',
                    cod_state: '',
                    txt_state_name: '',
                    cod_state_alternative: '',
                    cod_country: '',
                    data: rows
     
                })
            }
        })
    })
})

// ADD NEW USER POST ACTION
app.post('/addState', function (req, res, next) {

    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            
            cod_state: req.sanitize('cod_state').escape().trim(),
            txt_state_name: req.sanitize('txt_state_name').escape().trim(),
            cod_state_alternative: req.sanitize('cod_state_alternative').escape().trim(),
            cod_country: req.sanitize('cod_country').escape().trim()
      
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO mst_states SET ?', user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/addState', {
                       

                        title: 'Add State',
                        cod_state: user.cod_state,
                        txt_state_name: user.txt_state_name,
                        cod_state_alternative: user.cod_state_alternative,
                        cod_country: user.cod_country,
                        data:rows
     
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listState', {
                                title: 'States',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/addState', {
                                title: 'Add State',
                                cod_state: '',
                                txt_state_name: '',
                                cod_state_alternative: '',
                                cod_country: '',
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
        res.render('user/addState', {
            title: 'Add State',
            cod_state: req.body.cod_state,
            txt_state_name: req.body.txt_state_name,
            cod_state_alternative: req.body.cod_state_alternative,
            cod_country: req.body.cod_country
  
        })
    }
})

// SHOW EDIT USER FORM
app.get('/editState/(:cod_state)', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_states WHERE cod_state = '"+ req.params.cod_state+"' ", function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_state = ' + req.params.id)
                res.redirect('/states')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listState', {
                            title: 'States',
                            data: ''
                        })
                    } else {
                        // render to views/user/list.ejs template file
                        res.render('user/editState', {
                            title: 'Edit State',
                            
                            cod_state: rows[0].cod_state,
                            txt_state_name: rows[0].txt_state_name,
                            cod_state_alternative: rows[0].cod_state_alternative,
                            cod_country: rows[0].cod_country,
                            data1:rows1
                            
                        })
                    }
                })    
            }
        })
    })
})

// EDIT USER POST ACTION
app.put('/editState/(:cod_state)', function (req, res, next) {
    
    var errors = req.validationErrors()

    if (!errors) {   

        var user = {
            
            cod_state: req.sanitize('cod_state').escape().trim(),
            txt_state_name: req.sanitize('txt_state_name').escape().trim(),
            cod_state_alternative: req.sanitize('cod_state_alternative').escape().trim(),
            cod_country: req.sanitize('cod_country').escape().trim()
            
        }

        req.getConnection(function (error, conn) {
            conn.query("UPDATE mst_states SET ? WHERE cod_state = '"+ req.params.cod_state+"' ", user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/editState', {
                        title: 'Edit State',
                        
                        cod_state: req.params.cod_state,
                        txt_state_name: req.body.txt_state_name,
                        cod_state_alternative: req.body.cod_state_alternative,
                        cod_country: req.body.cod_country
                        
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listState', {
                                title: 'States',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/editState', {
                                title: 'Edit State',
                                
                                cod_state: req.params.cod_state,
                                txt_state_name: req.body.txt_state_name,
                                cod_state_alternative: req.body.cod_state_alternative,
                                cod_country: req.body.cod_country,
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
        res.render('user/editState', {
            title: 'Edit State',
            
            cod_state: req.params.cod_state,
            txt_state_name: req.body.txt_state_name,
            cod_state_alternative: req.body.cod_state_alternative,
            cod_country: req.body.cod_country
           
        })
    }
})

// DELETE USER
app.delete('/delete/(:cod_state)', function (req, res, next) {
    var user = req.params.cod_state;

    req.getConnection(function (error, conn) {
        conn.query("update mst_states set cod_rec_status='C' WHERE cod_state = '"+ user+"' ", function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/states')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/states')
            }
        })
    })
})

module.exports = app