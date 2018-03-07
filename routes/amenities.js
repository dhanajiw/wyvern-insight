var express = require('express')
var app = express()
 
// SHOW listAmenities OF amenities
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_amenities WHERE cod_rec_status='A' ORDER BY cod_amenity ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAmenities', {
                    title: 'Amenities', 
                    data: ''
                })
            } else {
                // render to views/user/listAmenities.ejs template file
                res.render('user/listAmenities', {
                    title: 'Amenities', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW addAmenities USER FORM
app.get('/addAmenities', function(req, res, next){    
    // render to views/user/addAmenities.ejs
    res.render('user/addAmenities', {
        
        title: 'Add Amenity',
        cod_amenity: '', 
        txt_amenity_name: ''
           
    })
})
 
// addAmenities NEW USER POST ACTION
app.post('/addAmenities', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        var user = {
            
            cod_amenity: req.sanitize('cod_amenity').escape().trim(),
            txt_amenity_name: req.sanitize('txt_amenity_name').escape().trim(),
           
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_amenities SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/addAmenities.ejs
                    res.render('user/addAmenities', {
                        
                    title: 'Add Amenity',
                    cod_amenity: user.cod_amenity,    
                    txt_amenity_name: user.txt_amenity_name,
               
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/addAmenities.ejs
                    res.render('user/addAmenities', {
                        title: 'Add Amenity',
                        cod_amenity: '', 
                        txt_amenity_name: '',
             
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
        res.render('user/addAmenities', { 
            title: 'Add Amenity',
            cod_amenity: req.body.cod_amenity,
            txt_amenity_name: req.body.txt_amenity_name,
            
        })
    }
})
 
// SHOW editAmenities USER FORM
app.get('/editAmenities/(:cod_amenity)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_amenities WHERE cod_amenity = '"+ req.params.cod_amenity + "' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_amenity = ' + req.params.id)
                res.redirect('/amenities')
            }
            else { // if user found
                // render to views/user/editAmenities.ejs template file
                res.render('user/editAmenities', {
                    title: 'Edit Amenity', 
                    //data: rows[0],
                    cod_amenity: rows[0].cod_amenity,
                    txt_amenity_name: rows[0].txt_amenity_name,
                   
                })
            }            
        })
    })
})
 
// editAmenities USER POST ACTION
app.put('/editAmenities/(:cod_amenity)', function(req, res, next) {
 
    var errors = req.validationErrors()
    
    if( !errors ) {   //No errors were found.  Passed Validation!
        
        var user = {
           
            cod_amenity: req.sanitize('cod_amenity').escape().trim(),
            txt_amenity_name: req.sanitize('txt_amenity_name').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_amenities SET ? WHERE cod_amenity = '"+ req.params.cod_amenity+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/addAmenities.ejs
                    res.render('user/editAmenities', {
                        title: 'Edit Amenity',
                       
                        cod_amenity: req.params.cod_amenity,  
                        txt_amenity_name: req.body.txt_amenity_name,
                
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/addAmenities.ejs
                    res.render('user/editAmenities', {
                        title: 'Edit Amenity',
                       
                        cod_amenity: req.params.cod_amenity,  
                        txt_amenity_name: req.body.txt_amenity_name,
                
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
        res.render('user/editAmenities', { 
            title: 'Edit Amenity',            
            
            cod_amenity: req.params.cod_amenity,  
            txt_amenity_name: req.body.txt_amenity_name,
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_amenity)', function(req, res, next) {
    var user = req.params.cod_amenity;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_amenities set cod_rec_status='C' WHERE cod_amenity = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport listAmenities page
                res.redirect('/amenities')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports listAmenities page
                res.redirect('/amenities')
            }
        })
    })
})

module.exports = app