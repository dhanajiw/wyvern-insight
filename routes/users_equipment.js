var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_equipment WHERE cod_rec_status='A' ORDER BY cod_equipment ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/list_equipment', {
                    title: 'Equipments', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/list_equipment', {
                    title: 'Equipments', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/add_equipment', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/add_equipment', {
        
        title: 'Add Equipment',
        cod_equipment: '', 
        txt_equipment_description: '',
    })
})
 
// ADD NEW USER POST ACTION
app.post('/add_equipment', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_equipment: req.sanitize('cod_equipment').escape().trim(),
            txt_equipment_description: req.sanitize('txt_equipment_description').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_equipment SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/add_equipment', {

                        title: 'Add Equipment',
                        cod_equipment: user.cod_equipment,    
                        txt_equipment_description: user.txt_equipment_description,
                              
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/add_equipment', {
                        title: 'Add Equipment',
                        cod_equipment: '', 
                        txt_equipment_description: ''
        
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
        res.render('user/add_equipment', { 
            title: 'Add Equipment',
                cod_equipment: req.params.cod_equipment,  
                txt_equipment_description: req.body.txt_equipment_description,
        
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/edit_equipment/(:cod_equipment)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_equipment WHERE cod_equipment = '"+ req.params.cod_equipment+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_equipment = ' + req.params.id)
                res.redirect('/users_equipment')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/edit_equipment', {
                    title: 'Edit Equipment', 
                    //data: rows[0],
                    cod_equipment: rows[0].cod_equipment,
                    txt_equipment_description: rows[0].txt_equipment_description,
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/edit_equipment/(:cod_equipment)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_equipment: req.sanitize('cod_equipment').escape().trim(),
            txt_equipment_description: req.sanitize('txt_equipment_description').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_equipment SET ? WHERE cod_equipment = '"+ req.params.cod_equipment+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/edit_equipment', {
                        title: 'Edit Equipment',
                       
                cod_equipment: req.params.cod_equipment,  
                txt_equipment_description: req.body.txt_equipment_description,
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/edit_equipment', {
                        title: 'Edit Equipment',
                       
                cod_equipment: req.params.cod_equipment,  
                txt_equipment_description: req.body.txt_equipment_description,
               
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
        res.render('user/edit_equipment', { 
            title: 'Edit user',            
            
                cod_equipment: req.params.cod_equipment,  
                txt_equipment_description: req.body.txt_equipment_description,
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_equipment)', function(req, res, next) {
    var user = req.params.cod_equipment;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_equipment set cod_rec_status='C' WHERE cod_equipment = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/users_equipment')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/users_equipment')
            }
        })
    })
})
 
module.exports = app