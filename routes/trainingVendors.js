var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_training_vendors WHERE cod_rec_status='A' ORDER BY cod_vendor ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listTrainingVendor', {
                    title: 'Training Vendors', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listTrainingVendor', {
                    title: 'Training Vendors', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addTrainingVendor', function(req, res, next){  

    req.getConnection(function (error, conn) {

         conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC ", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listTrainingVendor', {
                    title: 'Training Vendors',
                    data: ''
                })
            } else {

                conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows1, fields) {
                    //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listTrainingVendor', {
                            title: 'Training Vendors',
                            data: ''
                        })
                    } else {
                        conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows2, fields) {
                            //if(err) throw err
                            if (err) {
                                req.flash('error', err)
                                res.render('user/listTrainingVendor', {
                                    title: 'Training Vendors',
                                    data: ''
                                })
                            } else {  
                                // render to views/user/add.ejs
                                res.render('user/addTrainingVendor', {
                                    
                                    title: 'Add Training Vendor',
                                    cod_vendor: '', 
                                    txt_name: '',
                                    txt_primary_street_addr_ln1: '',
                                    txt_primary_street_addr_ln2: '',
                                    txt_primary_street_addr_ln3: '', 
                                    cod_city: '',
                                    cod_state: '',
                                    cod_country: '',
                                    cod_postal: '',
                                    txt_vendor_training_type: '',
                                    txt_vendor_certificate_name: '',
                                    txt_port_number: '',
                                    txt_login_username: '',  
                                    txt_login_password: '',
                                    txt_our_identifier: '', 
                                    txt_vendor_url: '',
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
app.post('/addTrainingVendor', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_vendor: req.sanitize('cod_vendor').escape().trim(),
            txt_name: req.sanitize('txt_name').escape().trim(),
            txt_primary_street_addr_ln1: req.sanitize('txt_primary_street_addr_ln1').escape().trim(),
            txt_primary_street_addr_ln2: req.sanitize('txt_primary_street_addr_ln1').escape().trim(),
            txt_primary_street_addr_ln3: req.sanitize('txt_primary_street_addr_ln1').escape().trim(),
            cod_city: req.sanitize('cod_city').escape().trim(),
            cod_state: req.sanitize('cod_state').escape().trim(),
            cod_country: req.sanitize('cod_country').escape().trim(),
            cod_postal: req.sanitize('cod_postal').escape().trim(),
            txt_vendor_training_type: req.sanitize('txt_vendor_training_type').escape().trim(),
            txt_vendor_certificate_name: req.sanitize('txt_vendor_certificate_name').escape().trim(),
            txt_port_number: req.sanitize('txt_port_number').escape().trim(),
            txt_login_username: req.sanitize('txt_login_username').escape().trim(),
            txt_login_password: req.sanitize('txt_login_password').escape().trim(),
            txt_our_identifier: req.sanitize('txt_our_identifier').escape().trim(),
            txt_vendor_url: req.sanitize('txt_vendor_url').escape().trim(),

        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_training_vendors SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addTrainingVendor', {

                        title: 'Add Training Vendor',
                        cod_vendor: user.cod_vendor,    
                        txt_name: user.txt_name,
                        txt_primary_street_addr_ln1: user.txt_primary_street_addr_ln1,
                        txt_primary_street_addr_ln2: user.txt_primary_street_addr_ln1,
                        txt_primary_street_addr_ln3: user.txt_primary_street_addr_ln1,    
                        cod_city: user.cod_city,
                        cod_state: user.cod_state,
                        cod_country: user.cod_country,
                        cod_postal: user.cod_postal,
                        txt_vendor_training_type: user.txt_vendor_training_type,
                        txt_vendor_certificate_name: user.txt_vendor_certificate_name,
                        txt_port_number: user.txt_port_number,
                        txt_login_username: user.txt_login_username,    
                        txt_login_password: user.txt_login_password,
                        txt_our_identifier: user.txt_our_identifier,    
                        txt_vendor_url: user.txt_vendor_url,
              
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC ", function (err, rows, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listTrainingVendor', {
                                title: 'Training Vendors',
                                data: ''
                            })
                        } else {

                            conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows1, fields) {
                                //if(err) throw err
                                if (err) {
                                    req.flash('error', err)
                                    res.render('user/listTrainingVendor', {
                                        title: 'Training Vendors',
                                        data: ''
                                    })
                                } else {

                                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows2, fields) {
                                        //if(err) throw err
                                        if (err) {
                                            req.flash('error', err)
                                            res.render('user/listTrainingVendor', {
                                                title: 'Training Vendors',
                                                data: ''
                                            })
                                        } else {
                                            // render to views/user/add.ejs
                                            res.render('user/addTrainingVendor', {
                                                title: 'Add Training Vendor',
                                                cod_vendor: '', 
                                                txt_name: '',
                                                txt_primary_street_addr_ln1: '',
                                                txt_primary_street_addr_ln2: '',
                                                txt_primary_street_addr_ln3: '', 
                                                cod_city: '',
                                                cod_state: '',
                                                cod_country: '',
                                                cod_postal: '',
                                                txt_vendor_training_type: '',
                                                txt_vendor_certificate_name: '',
                                                txt_port_number: '',
                                                txt_login_username: '', 
                                                txt_login_password: '',
                                                txt_our_identifier: '', 
                                                txt_vendor_url: '',
                                                data:rows,
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
        errors.forEach(function(error) {
            error_msg += error.msg + '<br>'
        })                
        req.flash('error', error_msg)        
        
        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */ 
        res.render('user/addTrainingVendor', { 
            title: 'Add Training Vendor',
                cod_vendor: req.params.cod_vendor,  
                txt_name: req.body.txt_name,
                txt_primary_street_addr_ln1: req.params.txt_primary_street_addr_ln1,
                txt_primary_street_addr_ln2: req.params.txt_primary_street_addr_ln2,
                txt_primary_street_addr_ln3: req.params.txt_primary_street_addr_ln3,  
                cod_city: req.params.cod_city,
                cod_state: req.params.cod_state,
                cod_country: req.params.cod_country,
                cod_postal: req.params.cod_postal,  
                txt_vendor_training_type: req.body.txt_vendor_training_type,
                txt_vendor_certificate_name: req.params.txt_vendor_certificate_name,
                txt_port_number: req.body.txt_port_number,
                txt_login_username: req.body.txt_login_username,
                txt_login_password: req.params.txt_login_password,  
                txt_our_identifier: req.params.txt_our_identifier,
                txt_vendor_url: req.body.txt_vendor_url,
        
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editTrainingVendor/(:cod_vendor)', function(req, res, next){

    req.getConnection(function(error, conn) {

        conn.query("SELECT * FROM mst_training_vendors WHERE cod_vendor = '"+ req.params.cod_vendor+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Training Vendors not found with cod_vendor = ' + req.params.id)
                res.redirect('/trainingVendors')
            }
            else { // if user found

                conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                    if (err) {
                        req.flash('error', err)
                        res.render('user/listTrainingVendor', {
                            title: 'Training Vendors',
                            data: ''
                        })
                        } else {

                            conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows2, fields) {
                                //if(err) throw err
                                if (err) {
                                    req.flash('error', err)
                                    res.render('user/listTrainingVendor', {
                                        title: 'Training Vendors',
                                        data: ''
                                    })
                                } else {

                                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows3, fields) {
                                        //if(err) throw err
                                        if (err) {
                                            req.flash('error', err)
                                            res.render('user/listTrainingVendor', {
                                                title: 'Training Vendors',
                                                data: ''
                                            })
                                        } else {
                                            // render to views/user/edit.ejs template file
                                            res.render('user/editTrainingVendor', {
                                                title: 'Edit Training Vendor', 
                                                //data: rows[0],
                                                cod_vendor: rows[0].cod_vendor,
                                                txt_name: rows[0].txt_name,
                                                txt_primary_street_addr_ln1: rows[0].txt_primary_street_addr_ln1,
                                                txt_primary_street_addr_ln2: rows[0].txt_primary_street_addr_ln2,
                                                txt_primary_street_addr_ln3: rows[0].txt_primary_street_addr_ln3,
                                                cod_city: rows[0].cod_city,
                                                cod_state: rows[0].cod_state,
                                                cod_country: rows[0].cod_country,
                                                cod_postal: rows[0].cod_postal,
                                                txt_vendor_training_type: rows[0].txt_vendor_training_type,
                                                txt_vendor_certificate_name: rows[0].txt_vendor_certificate_name,
                                                txt_port_number: rows[0].txt_port_number,
                                                txt_login_username: rows[0].txt_login_username,
                                                txt_login_password: rows[0].txt_login_password,
                                                txt_our_identifier: rows[0].txt_our_identifier,
                                                txt_vendor_url: rows[0].txt_vendor_url,
                                                data1:rows1,
                                                data2: rows2,
                                                data3: rows3

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
app.put('/editTrainingVendor/(:cod_vendor)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_vendor: req.sanitize('cod_vendor').escape().trim(),
            txt_name: req.sanitize('txt_name').escape().trim(),
            txt_primary_street_addr_ln1: req.sanitize('txt_primary_street_addr_ln1').escape().trim(),
            txt_primary_street_addr_ln2: req.sanitize('txt_primary_street_addr_ln2').escape().trim(),
            txt_primary_street_addr_ln3: req.sanitize('txt_primary_street_addr_ln3').escape().trim(),
            cod_city: req.sanitize('cod_city').escape().trim(),
            cod_state: req.sanitize('cod_state').escape().trim(),
            cod_country: req.sanitize('cod_country').escape().trim(),
            cod_postal: req.sanitize('cod_postal').escape().trim(),
            txt_vendor_training_type: req.sanitize('txt_vendor_training_type').escape().trim(),
            txt_vendor_certificate_name: req.sanitize('txt_vendor_certificate_name').escape().trim(),
            txt_port_number: req.sanitize('txt_port_number').escape().trim(),
            txt_login_username: req.sanitize('txt_login_username').escape().trim(),
            txt_login_password: req.sanitize('txt_login_password').escape().trim(),
            txt_our_identifier: req.sanitize('txt_our_identifier').escape().trim(),
            txt_vendor_url: req.sanitize('txt_vendor_url').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_training_vendors SET ? WHERE cod_vendor = '"+ req.params.cod_vendor+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editTrainingVendor', {
                        title: 'Edit Training Vendor',
                       
                        cod_vendor: req.params.cod_vendor,  
                        txt_name: req.body.txt_name,
                        txt_primary_street_addr_ln1: req.params.txt_primary_street_addr_ln1, 
                        txt_primary_street_addr_ln2: req.params.txt_primary_street_addr_ln2,
                        txt_primary_street_addr_ln3: req.params.txt_primary_street_addr_ln3, 
                        cod_city: req.params.cod_city,
                        cod_state: req.params.cod_state,
                        cod_country: req.params.cod_country,
                        cod_postal: req.params.cod_postal,  
                        txt_vendor_training_type: req.body.txt_vendor_training_type,
                        txt_vendor_certificate_name: req.params.txt_vendor_certificate_name,
                        txt_port_number: req.body.txt_port_number,
                        txt_login_username: req.body.txt_login_username,
                        txt_login_password: req.params.txt_login_password,  
                        txt_our_identifier: req.params.txt_our_identifier,
                        txt_vendor_url: req.body.txt_vendor_url,
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    conn.query("SELECT * FROM mst_cities WHERE cod_rec_status='A' ORDER BY cod_city ASC ", function (err, rows1, fields) {
                        //if(err) throw err
                        if (err) {
                            req.flash('error', err)
                            res.render('user/listTrainingVendor', {
                                title: 'Training Vendors',
                                data: ''
                            })
                        } else {

                            conn.query("SELECT * FROM mst_states WHERE cod_rec_status='A' ORDER BY cod_state ASC ", function (err, rows2, fields) {
                                //if(err) throw err
                                if (err) {
                                    req.flash('error', err)
                                    res.render('user/listTrainingVendor', {
                                        title: 'Training Vendors',
                                        data: ''
                                    })
                                } else {
                    
                                    conn.query("SELECT * FROM mst_countries WHERE cod_rec_status='A' ORDER BY cod_country ASC ", function (err, rows3, fields) {
                                        //if(err) throw err
                                        if (err) {
                                            req.flash('error', err)
                                            res.render('user/listTrainingVendor', {
                                                title: 'Training Vendors',
                                                data: ''
                                            })
                                        } else {
                                            // render to views/user/add.ejs
                                            res.render('user/editTrainingVendor', {
                                                title: 'Edit Training Vendor',
                                               
                                                cod_vendor: req.params.cod_vendor,  
                                                txt_name: req.body.txt_name,
                                                txt_primary_street_addr_ln1: req.params.txt_primary_street_addr_ln1,
                                                txt_primary_street_addr_ln2: req.params.txt_primary_street_addr_ln2,
                                                txt_primary_street_addr_ln3: req.params.txt_primary_street_addr_ln3,  
                                                cod_city: req.params.cod_city,
                                                cod_state: req.params.cod_state,
                                                cod_country: req.params.cod_country,
                                                cod_postal: req.params.cod_postal,  
                                                txt_vendor_training_type: req.body.txt_vendor_training_type,
                                                txt_vendor_certificate_name: req.params.txt_vendor_certificate_name,
                                                txt_port_number: req.body.txt_port_number,
                                                txt_login_username: req.body.txt_login_username,
                                                txt_login_password: req.params.txt_login_password,  
                                                txt_our_identifier: req.params.txt_our_identifier,
                                                txt_vendor_url: req.body.txt_vendor_url,
                                                data1: rows1,
                                                data2: rows2,
                                                data3: rows3

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
        res.render('user/editTrainingVendor', { 
            title: 'Edit Training Vendor',            
            
                cod_vendor: req.params.cod_vendor,  
                txt_name: req.body.txt_name,
                txt_primary_street_addr_ln1: req.params.txt_primary_street_addr_ln1,
                txt_primary_street_addr_ln2: req.params.txt_primary_street_addr_ln2,
                txt_primary_street_addr_ln3: req.params.txt_primary_street_addr_ln3,  
                cod_city: req.params.cod_city,
                cod_state: req.params.cod_state,
                cod_country: req.params.cod_country,
                cod_postal: req.params.cod_postal,  
                txt_vendor_training_type: req.body.txt_vendor_training_type,
                txt_vendor_certificate_name: req.params.txt_vendor_certificate_name,
                txt_port_number: req.body.txt_port_number,
                txt_login_username: req.body.txt_login_username,
                txt_login_password: req.params.txt_login_password,  
                txt_our_identifier: req.params.txt_our_identifier,
                txt_vendor_url: req.body.txt_vendor_url,
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_vendor)', function(req, res, next) {
    var user = req.params.cod_vendor;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_training_vendors set cod_rec_status='C' WHERE cod_vendor = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/trainingVendors')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/trainingVendors')
            }
        })
    })
})
 
module.exports = app