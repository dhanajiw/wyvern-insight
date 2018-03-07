var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_spec_types WHERE cod_rec_status='A' ORDER BY cod_spec ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listSpecTypes', {
                    title: 'Specification Types', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listSpecTypes', {
                    title: 'Specification Types', 
                    data: rows

                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addSpecTypes', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addSpecTypes', {
        
        title: 'Add Specification Type',
        cod_spec: '', 
        txt_spec_name: '',
        txt_spec_type: '',
        txt_spec_summary: '',
        cod_regulator: '', 
        flg_operator: '',
        flg_aircraft: '',
        flg_pilot: '',
        flg_insurance: ''
        
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addSpecTypes', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_spec: req.sanitize('cod_spec').escape().trim(),
            txt_spec_name: req.sanitize('txt_spec_name').escape().trim(),
            txt_spec_type: req.sanitize('txt_spec_type').escape().trim(),
            txt_spec_summary: req.sanitize('txt_spec_type').escape().trim(),
            cod_regulator: req.sanitize('txt_spec_type').escape().trim(),
            flg_operator: req.sanitize('flg_operator').escape().trim(),
            flg_aircraft: req.sanitize('flg_aircraft').escape().trim(),
            flg_pilot: req.sanitize('flg_pilot').escape().trim(),
            flg_insurance: req.sanitize('flg_insurance').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_spec_types SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addSpecTypes', {

                        title: 'Add Specification Type',
                        cod_spec: user.cod_spec,    
                        txt_spec_name: user.txt_spec_name,
                        txt_spec_type: user.txt_spec_type,
                        txt_spec_summary: user.txt_spec_type,
                        cod_regulator: user.txt_spec_type,    
                        flg_operator: user.flg_operator,
                        flg_aircraft: user.flg_aircraft,
                        flg_pilot: user.flg_pilot,
                        flg_insurance: user.flg_insurance,
        
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addSpecTypes', {
                        title: 'Add Specification Type',
                            cod_spec: '', 
                            txt_spec_name: '',
                            txt_spec_type: '',
                            txt_spec_summary: '',
                            cod_regulator: '', 
                            flg_operator: '',
                            flg_aircraft: '',
                            flg_pilot: '',
                            flg_insurance: '',
        
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
        res.render('user/addSpecTypes', { 
            title: 'Add Specification Type',
                cod_spec: req.params.cod_spec,  
                txt_spec_name: req.body.txt_spec_name,
                txt_spec_type: req.params.txt_spec_type,
                txt_spec_summary: req.params.txt_spec_summary,
                cod_regulator: req.params.cod_regulator,  
                flg_operator: req.params.flg_operator,
                flg_aircraft: req.params.flg_aircraft,
                flg_pilot: req.params.flg_pilot,
                flg_insurance: req.params.flg_insurance,  
                
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editSpecTypes/(:cod_spec)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_spec_types WHERE cod_spec = '"+ req.params.cod_spec+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Specification Types not found with cod_spec = ' + req.params.id)
                res.redirect('/specTypes')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editSpecTypes', {
                    title: 'Edit Specification Type', 
                    
                    cod_spec: rows[0].cod_spec,
                    txt_spec_name: rows[0].txt_spec_name,
                    txt_spec_type: rows[0].txt_spec_type,
                    txt_spec_summary: rows[0].txt_spec_summary,
                    cod_regulator: rows[0].cod_regulator,
                    flg_operator: rows[0].flg_operator,
                    flg_aircraft: rows[0].flg_aircraft,
                    flg_pilot: rows[0].flg_pilot,
                    flg_insurance: rows[0].flg_insurance,
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editSpecTypes/(:cod_spec)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_spec: req.sanitize('cod_spec').escape().trim(),
            txt_spec_name: req.sanitize('txt_spec_name').escape().trim(),
            txt_spec_type: req.sanitize('txt_spec_type').escape().trim(),
            txt_spec_summary: req.sanitize('txt_spec_summary').escape().trim(),
            cod_regulator: req.sanitize('cod_regulator').escape().trim(),
            flg_operator: req.sanitize('flg_operator').escape().trim(),
            flg_aircraft: req.sanitize('flg_aircraft').escape().trim(),
            flg_pilot: req.sanitize('flg_pilot').escape().trim(),
            flg_insurance: req.sanitize('flg_insurance').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_spec_types SET ? WHERE cod_spec = '"+ req.params.cod_spec+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editSpecTypes', {
                        title: 'Edit Specification Type',
                       
                        cod_spec: req.params.cod_spec,  
                        txt_spec_name: req.body.txt_spec_name,
                        txt_spec_type: req.params.txt_spec_type, 
                        txt_spec_summary: req.params.txt_spec_summary,
                        cod_regulator: req.params.cod_regulator, 
                        flg_operator: req.params.flg_operator,
                        flg_aircraft: req.params.flg_aircraft,
                        flg_pilot: req.params.flg_pilot,
                        flg_insurance: req.params.flg_insurance,  
                
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editSpecTypes', {
                        title: 'Edit Specification Type',
                       
                        cod_spec: req.params.cod_spec,  
                        txt_spec_name: req.body.txt_spec_name,
                        txt_spec_type: req.params.txt_spec_type,
                        txt_spec_summary: req.params.txt_spec_summary,
                        cod_regulator: req.params.cod_regulator,  
                        flg_operator: req.params.flg_operator,
                        flg_aircraft: req.params.flg_aircraft,
                        flg_pilot: req.params.flg_pilot,
                        flg_insurance: req.params.flg_insurance,  
                
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
        res.render('user/editSpecTypes', { 
            title: 'Edit Specification Type',            
            
                cod_spec: req.params.cod_spec,  
                txt_spec_name: req.body.txt_spec_name,
                txt_spec_type: req.params.txt_spec_type,
                txt_spec_summary: req.params.txt_spec_summary,
                cod_regulator: req.params.cod_regulator,  
                flg_operator: req.params.flg_operator,
                flg_aircraft: req.params.flg_aircraft,
                flg_pilot: req.params.flg_pilot,
                flg_insurance: req.params.flg_insurance,  
                
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_spec)', function(req, res, next) {
    var user = req.params.cod_spec;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_spec_types set cod_rec_status='C' WHERE cod_spec = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/specTypes')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/specTypes')
            }
        })
    })
})
 
module.exports = app