var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_operation_regions WHERE cod_rec_status='A' ORDER BY cod_operation_region ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listRegion', {
                    title: 'Regions', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listRegion', {
                    title: 'Regions', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addRegion', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addRegion', {
        
        title: 'Add Region',
        cod_operation_region: '', 
        txt_region_name: ''
          
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addRegion', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        var user = {
           
            cod_operation_region: req.sanitize('cod_operation_region').escape().trim(),
            txt_region_name: req.sanitize('txt_region_name').escape().trim()
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_operation_regions SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addRegion', { 

                    title: 'Add State',
                    cod_operation_region: user.cod_operation_region,    
                    txt_region_name: user.txt_region_name
                
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addRegion', {
                        title: 'Add Region',
                        cod_operation_region: '', 
                        txt_region_name: ''
            
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
        res.render('user/addRegion', { 
            title: 'Add Region',
            cod_operation_region: req.body.cod_operation_region,
            txt_region_name: req.body.txt_region_name
            
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editRegion/(:cod_operation_region)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_operation_regions WHERE cod_operation_region = '" + req.params.cod_operation_region+"'", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_operation_region = ' + req.params.id)
                res.redirect('/regions')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editRegion', {
                    title: 'Edit Region', 
                    
                    cod_operation_region: rows[0].cod_operation_region,
                    txt_region_name: rows[0].txt_region_name
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editRegion/(:cod_operation_region)', function(req, res, next) {
   
    var errors = req.validationErrors()
    
    if( !errors ) {   
        
        var user = {
           
            cod_operation_region: req.sanitize('cod_operation_region').escape().trim(),
            txt_region_name: req.sanitize('txt_region_name').escape().trim()
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_operation_regions SET ? WHERE cod_operation_region ='"+req.params.cod_operation_region+"'", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editRegion', {
                        title: 'Edit Region',
                       
                        cod_operation_region: req.params.cod_operation_region,  
                        txt_region_name: req.body.txt_region_name
                
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editRegion', {
                        title: 'Edit Region',
                        
                        cod_operation_region: req.params.cod_operation_region,  
                        txt_region_name: req.body.txt_region_name               

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
        res.render('user/editRegion', { 
            title: 'Edit Region',            
            
            cod_operation_region: req.params.cod_operation_region,  
            txt_region_name: req.body.txt_region_name
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_operation_region)', function(req, res, next) {
    var user = req.params.cod_operation_region;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_operation_regions set cod_rec_status='C' WHERE cod_operation_region = '"+user+"'", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/regions')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/regions')
            }
        })
    })
})
 
module.exports = app