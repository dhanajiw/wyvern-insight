var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_manufacturers WHERE cod_rec_status='A' ORDER BY cod_manufacturer ASC", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listManufacturer', {
                    title: 'Manufacturers',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listManufacturer', {
                    title: 'Manufacturers',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/addManufacturer', function (req, res, next) {
    // render to views/user/add.ejs
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listManufacturer', {
                    title: 'Manufacturers',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/addManufacturer', {

                    title: 'Add Manufacturer',
                    cod_manufacturer: '',
                    txt_manufacturer_name: '',
                    txt_manufacturer_country: '',
                    dat_operations_start: '',
                    data: rows
     
                })
            }
        })
    })
})

// ADD NEW USER POST ACTION
app.post('/addManufacturer', function (req, res, next) {

    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            
            cod_manufacturer: req.sanitize('cod_manufacturer').escape().trim(),
            txt_manufacturer_name: req.sanitize('txt_manufacturer_name').escape().trim(),
            txt_manufacturer_country: req.sanitize('cod_country').escape().trim(),
            dat_operations_start: req.sanitize('dat_operations_start').escape().trim()
      
        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO mst_manufacturers SET ?', user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/addManufacturer', {
                       

                        title: 'Add Manufacturer',
                        cod_manufacturer: user.cod_manufacturer,
                        txt_manufacturer_name: user.txt_manufacturer_name,
                        txt_manufacturer_country: user.cod_country,
                        dat_operations_start: user.dat_operations_start,
                        data:rows
     
                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listManufacturer', {
                                title: 'Manufacturers',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/addManufacturer', {
                                title: 'Add Manufacturer',
                                cod_manufacturer: '',
                                txt_manufacturer_name: '',
                                txt_manufacturer_country: '',
                                dat_operations_start: '',
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
        res.render('user/addManufacturer', {
            title: 'Add Manufacturer',
            cod_manufacturer: req.body.cod_manufacturer,
            txt_manufacturer_name: req.body.txt_manufacturer_name,
            txt_manufacturer_country: req.body.cod_country,
            dat_operations_start: req.body.dat_operations_start
  
        })
    }
})

// SHOW EDIT USER FORM
app.get('/editManufacturer/(:cod_manufacturer)', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_manufacturers WHERE cod_manufacturer = '"+ req.params.cod_manufacturer+"' ", function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_manufacturer = ' + req.params.id)
                res.redirect('/manufacturers')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listManufacturer', {
                            title: 'Manufacturers',
                            data: ''
                        })
                    } else {
                        // render to views/user/list.ejs template file
                        res.render('user/editManufacturer', {
                            title: 'Edit Manufacturer',
                            
                            cod_manufacturer: rows[0].cod_manufacturer,
                            txt_manufacturer_name: rows[0].txt_manufacturer_name,
                            txt_manufacturer_country: rows[0].cod_country,
                            dat_operations_start: rows[0].dat_operations_start,
                            data1:rows1
                            
                        })
                    }
                })    
            }
        })
    })
})

// EDIT USER POST ACTION
app.put('/editManufacturer/(:cod_manufacturer)', function (req, res, next) {
    
    var errors = req.validationErrors()

    if (!errors) {   

        var user = {
            
            cod_manufacturer: req.sanitize('cod_manufacturer').escape().trim(),
            txt_manufacturer_name: req.sanitize('txt_manufacturer_name').escape().trim(),
            txt_manufacturer_country: req.sanitize('cod_country').escape().trim(),
            dat_operations_start: req.sanitize('dat_operations_start').escape().trim()
            
        }

        req.getConnection(function (error, conn) {
            conn.query("UPDATE mst_manufacturers SET ? WHERE cod_manufacturer = '"+ req.params.cod_manufacturer+"' ", user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/editManufacturer', {
                        title: 'Edit Manufacturer',
                        
                        cod_manufacturer: req.params.cod_manufacturer,
                        txt_manufacturer_name: req.body.txt_manufacturer_name,
                        txt_manufacturer_country: req.body.cod_country,
                        dat_operations_start: req.body.dat_operations_start
                        
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listManufacturer', {
                                title: 'Manufacturers',
                                data: ''
                            })
                        } else {
                            // render to views/user/list.ejs template file
                            res.render('user/editManufacturer', {
                                title: 'Edit Manufacturer',
                                
                                cod_manufacturer: req.params.cod_manufacturer,
                                txt_manufacturer_name: req.body.txt_manufacturer_name,
                                txt_manufacturer_country: req.body.cod_country,
                                dat_operations_start: req.body.dat_operations_start,
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
        res.render('user/editManufacturer', {
            title: 'Edit Manufacturer',
            
            cod_manufacturer: req.params.cod_manufacturer,
            txt_manufacturer_name: req.body.txt_manufacturer_name,
            txt_manufacturer_country: req.body.cod_country,
            dat_operations_start: req.body.dat_operations_start
           
        })
    }
})

// DELETE USER
app.delete('/delete/(:cod_manufacturer)', function (req, res, next) {
    var user = req.params.cod_manufacturer;

    req.getConnection(function (error, conn) {
        conn.query("update mst_manufacturers set cod_rec_status='C' WHERE cod_manufacturer = '"+ user+"' ", function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/manufacturers')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/manufacturers')
            }
        })
    })
})

module.exports = app