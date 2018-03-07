var express = require('express')
var app = express()
 
// SHOW LIST OF Aircraft Categories
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_aircraft_categories WHERE cod_rec_status='A' ORDER BY cod_category ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAircraftCategory', {
                    title: 'Aircraft Categories', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listAircraftCategory', {
                    title: 'Aircraft Categories', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addAircraftCategory', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addAircraftCategory', {
        
        title: 'Add Aircraft Category',
        cod_category: '', 
        txt_category_name: '' 
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addAircraftCategory', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        var user = {
            
            cod_category: req.sanitize('cod_category').escape().trim(),
            txt_category_name: req.sanitize('txt_category_name').escape().trim()
           
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_aircraft_categories SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addAircraftCategory', { 

                    title: 'Add Aircraft Category',
                    cod_category: user.cod_category,    
                    txt_category_name: user.txt_category_name
        
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addAircraftCategory', {
                        title: 'Add Aircraft Category',
                        cod_category: '', 
                        txt_category_name: '',
      
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
        res.render('user/addAircraftCategory', { 
            title: 'Add Aircraft Category',
            cod_category: req.body.cod_category,
            txt_category_name: req.body.txt_category_name,
            
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editAircraftCategory/(:cod_category)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_aircraft_categories WHERE cod_category = '"+ req.params.cod_category+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_category = ' + req.params.id)
                res.redirect('/aircraftCategories')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editAircraftCategory', {
                    title: 'Edit Aircraft Category', 
                    
                    cod_category: rows[0].cod_category,
                    txt_category_name: rows[0].txt_category_name
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editAircraftCategory/(:cod_category)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        var user = {
           
            cod_category: req.sanitize('cod_category').escape().trim(),
            txt_category_name: req.sanitize('txt_category_name').escape().trim()
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_aircraft_categories SET ? WHERE cod_category = '"+ req.params.cod_category+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editAircraftCategory', {
                        title: 'Edit Aircraft Category',
                        
                        cod_category: req.params.cod_category,  
                        txt_category_name: req.body.txt_category_name,
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editAircraftCategory', {
                        title: 'Edit Aircraft Category',
                       
                        cod_category: req.params.cod_category,  
                        txt_category_name: req.body.txt_category_name
               
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
        res.render('user/editAircraftCategory', { 
            title: 'Edit Aircraft Category',            
            
            cod_category: req.params.cod_category,  
            txt_category_name: req.body.txt_category_name
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_category)', function(req, res, next) {
    var user = req.params.cod_category;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_aircraft_categories set cod_rec_status='C' WHERE cod_category = '"+user+"'", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/aircraftCategories')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/aircraftCategories')
            }
        })
    })
})
 
module.exports = app