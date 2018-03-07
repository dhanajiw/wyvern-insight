var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_insurers WHERE cod_rec_status='A' ORDER BY cod_underwriter ASC", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listInsurer', {
                    title: 'Insurers',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listInsurer', {
                    title: 'Insurers',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/addInsurer', function (req, res, next) {
    // render to views/user/add.ejs
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listInsurer', {
                    title: 'Insurers',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/addInsurer', {

                    title: 'Add Insurer',
                    cod_underwriter: '',
                    txt_underwriter_name: '',
                    cod_home_country: '',
                    cod_home_currency: '',
                    data: rows
  
                })
            }
        })
    })
})

// ADD NEW USER POST ACTION
app.post('/addInsurer', function (req, res, next) {


    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            
            cod_underwriter: req.sanitize('cod_underwriter').escape().trim(),
            txt_underwriter_name: req.sanitize('txt_underwriter_name').escape().trim(),
            cod_home_country: req.sanitize('cod_country').escape().trim(),
            cod_home_currency: req.sanitize('cod_home_currency').escape().trim(),
            
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO mst_insurers SET ?', user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/addInsurer', {
                       

                        title: 'Add Insurer',
                        cod_underwriter: user.cod_underwriter,
                        txt_underwriter_name: user.txt_underwriter_name,
                        cod_home_country: user.cod_country,
                        cod_home_currency: user.cod_home_currency,
     
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listInsurer', {
                                title: 'Insurers',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/addInsurer', {
                                title: 'Add Insurer',
                                cod_underwriter: '',
                                txt_underwriter_name: '',
                                cod_home_country: '',
                                cod_home_currency: '',
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
        res.render('user/addInsurer', {
            title: 'Add Insurer',
            cod_underwriter: req.body.cod_underwriter,
            txt_underwriter_name: req.body.txt_underwriter_name,
            cod_home_country: req.body.cod_country,
            cod_home_currency: req.params.cod_home_currency,
      
        })
    }
})

// SHOW EDIT USER FORM
app.get('/editInsurer/(:cod_underwriter)', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_insurers WHERE cod_underwriter = '"+ req.params.cod_underwriter+"' ", function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_underwriter = ' + req.params.id)
                res.redirect('/insurers')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listInsurer', {
                            title: 'Insurers',
                            data: ''
                        })
                    } else {
                        // render to views/user/list.ejs template file
                        res.render('user/editInsurer', {
                            title: 'Edit Insurer',
                            
                            cod_underwriter: rows[0].cod_underwriter,
                            txt_underwriter_name: rows[0].txt_underwriter_name,
                            cod_home_country: rows[0].cod_country,
                            cod_home_currency: rows[0].cod_home_currency,
                            data1:rows1
                            
                        })
                    }
                })       
            }
        })
    })
})

// EDIT USER POST ACTION
app.put('/editInsurer/(:cod_underwriter)', function (req, res, next) {
    

    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            
            cod_underwriter: req.sanitize('cod_underwriter').escape().trim(),
            txt_underwriter_name: req.sanitize('txt_underwriter_name').escape().trim(),
            cod_home_country: req.sanitize('cod_country').escape().trim(),
            cod_home_currency: req.sanitize('cod_home_currency').escape().trim(),
            
        }

        req.getConnection(function (error, conn) {
            conn.query("UPDATE mst_insurers SET ? WHERE cod_underwriter = '"+ req.params.cod_underwriter+"' ", user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/editInsurer', {
                        title: 'Edit Insurer',
                        
                        cod_underwriter: req.params.cod_underwriter,
                        txt_underwriter_name: req.body.txt_underwriter_name,
                        cod_home_country: req.body.cod_country,
                        cod_home_currency: req.params.cod_home_currency,
                        
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listInsurer', {
                                title: 'Insurers',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/editInsurer', {
                                title: 'Edit Insurer',
                                
                                cod_underwriter: req.params.cod_underwriter,
                                txt_underwriter_name: req.body.txt_underwriter_name,
                                cod_home_country: req.body.cod_country,
                                cod_home_currency: req.params.cod_home_currency,
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
        res.render('user/editInsurer', {
            title: 'Edit Insurer',
            
            cod_underwriter: req.params.cod_underwriter,
            txt_underwriter_name: req.body.txt_underwriter_name,
            cod_home_country: req.body.cod_country,
            cod_home_currency: req.params.cod_home_currency,
           
        })
    }
})

// DELETE USER
app.delete('/delete/(:cod_underwriter)', function (req, res, next) {
    var user = req.params.cod_underwriter;

    req.getConnection(function (error, conn) {
        conn.query("update mst_insurers set cod_rec_status='C' WHERE cod_underwriter = '" + user+"' ", function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/insurers')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/insurers')
            }
        })
    })
})




module.exports = app