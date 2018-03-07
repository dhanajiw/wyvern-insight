var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_alert_types WHERE cod_rec_status='A' ORDER BY cod_alert ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listAlertTypes', {
                    title: 'Alert Types', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listAlertTypes', {
                    title: 'Alert Types', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addAlertTypes', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addAlertTypes', {
        
        title: 'Add Alert Types',
        cod_alert: '', 
        txt_alert_name: '',
        flg_alert_for_corporate_departments: '', 
        flg_alert_for_brokers: '',
        flg_alert_for_charter_operators: '', 
        flg_alert_for_support: '',
        
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addAlertTypes', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_alert: req.sanitize('cod_alert').escape().trim(),
            txt_alert_name: req.sanitize('txt_alert_name').escape().trim(),
            flg_alert_for_corporate_departments: req.sanitize('flg_alert_for_corporate_departments').escape().trim(),
            flg_alert_for_brokers: req.sanitize('flg_alert_for_brokers').escape().trim(),
            flg_alert_for_charter_operators: req.sanitize('flg_alert_for_charter_operators').escape().trim(),
            flg_alert_for_support: req.sanitize('flg_alert_for_support').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_alert_types SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addAlertTypes', {

                        title: 'Add Alert Type',
                        cod_alert: user.cod_alert,    
                        txt_alert_name: user.txt_alert_name,
                        flg_alert_for_corporate_departments: user.flg_alert_for_corporate_departments,    
                        flg_alert_for_brokers: user.flg_alert_for_brokers,
                        flg_alert_for_charter_operators: user.flg_alert_for_charter_operators,    
                        flg_alert_for_support: user.flg_alert_for_support,
              
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addAlertTypes', {
                        title: 'Add Alert Type',
                        cod_alert: '', 
                        txt_alert_name: '',
                        flg_alert_for_corporate_departments: '', 
                        flg_alert_for_brokers: '',
                        flg_alert_for_charter_operators: '', 
                        flg_alert_for_support: '',
        
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
        res.render('user/addAlertTypes', { 
            title: 'Add Alert Type',
                cod_alert: req.params.cod_alert,  
                txt_alert_name: req.body.txt_alert_name,
                flg_alert_for_corporate_departments: req.params.flg_alert_for_corporate_departments,  
                flg_alert_for_brokers: req.params.flg_alert_for_brokers,  
                flg_alert_for_charter_operators: req.body.flg_alert_for_charter_operators,
                flg_alert_for_support: req.params.flg_alert_for_support,  
        
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editAlertTypes/(:cod_alert)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_alert_types WHERE cod_alert = '"+ req.params.cod_alert+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_alert = ' + req.params.id)
                res.redirect('/alertTypes')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editAlertTypes', {
                    title: 'Edit Alert Type', 
                    //data: rows[0],
                    cod_alert: rows[0].cod_alert,
                    txt_alert_name: rows[0].txt_alert_name,
                    flg_alert_for_corporate_departments: rows[0].flg_alert_for_corporate_departments,
                    flg_alert_for_brokers: rows[0].flg_alert_for_brokers,
                    flg_alert_for_charter_operators: rows[0].flg_alert_for_charter_operators,
                    flg_alert_for_support: rows[0].flg_alert_for_support,
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editAlertTypes/(:cod_alert)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_alert: req.sanitize('cod_alert').escape().trim(),
            txt_alert_name: req.sanitize('txt_alert_name').escape().trim(),
            flg_alert_for_corporate_departments: req.sanitize('flg_alert_for_corporate_departments').escape().trim(),
            flg_alert_for_brokers: req.sanitize('flg_alert_for_brokers').escape().trim(),
            flg_alert_for_charter_operators: req.sanitize('flg_alert_for_charter_operators').escape().trim(),
            flg_alert_for_support: req.sanitize('flg_alert_for_support').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_alert_types SET ? WHERE cod_alert = '"+ req.params.cod_alert+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editAlertTypes', {
                        title: 'Edit Alert Type',
                       
                            cod_alert: req.params.cod_alert,  
                            txt_alert_name: req.body.txt_alert_name,
                            flg_alert_for_corporate_departments: req.params.flg_alert_for_corporate_departments,  
                            flg_alert_for_brokers: req.params.flg_alert_for_brokers,  
                            flg_alert_for_charter_operators: req.body.flg_alert_for_charter_operators,
                            flg_alert_for_support: req.params.flg_alert_for_support,  
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editAlertTypes', {
                        title: 'Edit Alert Type',
                       
                        cod_alert: req.params.cod_alert,  
                        txt_alert_name: req.body.txt_alert_name,
                        flg_alert_for_corporate_departments: req.params.flg_alert_for_corporate_departments,  
                        flg_alert_for_brokers: req.params.flg_alert_for_brokers,  
                        flg_alert_for_charter_operators: req.body.flg_alert_for_charter_operators,
                        flg_alert_for_support: req.params.flg_alert_for_support,  
               
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
        res.render('user/editAlertTypes', { 
            title: 'Edit Alert Type',            
            
                cod_alert: req.params.cod_alert,  
                txt_alert_name: req.body.txt_alert_name,
                flg_alert_for_corporate_departments: req.params.flg_alert_for_corporate_departments,  
                flg_alert_for_brokers: req.params.flg_alert_for_brokers,  
                flg_alert_for_charter_operators: req.body.flg_alert_for_charter_operators,
                flg_alert_for_support: req.params.flg_alert_for_support,  
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_alert)', function(req, res, next) {
    var user = req.params.cod_alert;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_alert_types set cod_rec_status='C' WHERE cod_alert = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/alertTypes')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/alertTypes')
            }
        })
    })
})
 
module.exports = app