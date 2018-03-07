var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM standard_operators_req WHERE flg_wyvern_audit_last_two_years='Y' ORDER BY cod_standard ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listStandardOperator', {
                    title: 'Operator Requirements', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listStandardOperator', {
                    title: 'Operator Requirements', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addStandardOperator', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addStandardOperator', {
        
        title: 'Add Operator Requirement',
        cod_standard: '', 
        flg_wyvern_audit_last_two_years: '',
        flg_wyvern_audit_last_one_year: '', 
        
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addStandardOperator', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_standard: req.sanitize('cod_standard').escape().trim(),
            flg_wyvern_audit_last_two_years: req.sanitize('flg_wyvern_audit_last_two_years').escape().trim(),
            flg_wyvern_audit_last_one_year: req.sanitize('flg_wyvern_audit_last_one_year').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO standard_operators_req SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addStandardOperator', {

        title: 'Add Operator Requirement',
        cod_standard: user.cod_standard,    
        flg_wyvern_audit_last_two_years: user.flg_wyvern_audit_last_two_years,
        flg_wyvern_audit_last_one_year: user.flg_wyvern_audit_last_one_year,    
        
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addStandardOperator', {
                        title: 'Add Operator Requirement',
        cod_standard: '', 
        flg_wyvern_audit_last_two_years: '',
        flg_wyvern_audit_last_one_year: '', 
        
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
        res.render('user/addStandardOperator', { 
            title: 'Add Operator Requirement',
                cod_standard: req.params.cod_standard,  
                flg_wyvern_audit_last_two_years: req.body.flg_wyvern_audit_last_two_years,
                flg_wyvern_audit_last_one_year: req.params.flg_wyvern_audit_last_one_year,  
                
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editStandardOperator/(:cod_standard)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query('SELECT * FROM standard_operators_req WHERE cod_standard = ' + req.params.cod_standard, function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'Operator Requirements not found with cod_standard = ' + req.params.id)
                res.redirect('/standardOperatorReq')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editStandardOperator', {
                    title: 'Edit Operator Requirement', 
                    //data: rows[0],
                    cod_standard: rows[0].cod_standard,
                    flg_wyvern_audit_last_two_years: rows[0].flg_wyvern_audit_last_two_years,
                    flg_wyvern_audit_last_one_year: rows[0].flg_wyvern_audit_last_one_year,
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editStandardOperator/(:cod_standard)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_standard: req.sanitize('cod_standard').escape().trim(),
            flg_wyvern_audit_last_two_years: req.sanitize('flg_wyvern_audit_last_two_years').escape().trim(),
            flg_wyvern_audit_last_one_year: req.sanitize('flg_wyvern_audit_last_one_year').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('UPDATE standard_operators_req SET ? WHERE cod_standard = ' + req.params.cod_standard, user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editStandardOperator', {
                        title: 'Edit Operator Requirement',
                       
                cod_standard: req.params.cod_standard,  
                flg_wyvern_audit_last_two_years: req.body.flg_wyvern_audit_last_two_years,
                flg_wyvern_audit_last_one_year: req.params.flg_wyvern_audit_last_one_year,  
                
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editStandardOperator', {
                        title: 'Edit Operator Requirement',
                       
                cod_standard: req.params.cod_standard,  
                flg_wyvern_audit_last_two_years: req.body.flg_wyvern_audit_last_two_years,
                flg_wyvern_audit_last_one_year: req.params.flg_wyvern_audit_last_one_year,  
                
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
        res.render('user/editStandardOperator', { 
            title: 'Edit Operator Requirement',            
            
                cod_standard: req.params.cod_standard,  
                flg_wyvern_audit_last_two_years: req.body.flg_wyvern_audit_last_two_years,
                flg_wyvern_audit_last_one_year: req.params.flg_wyvern_audit_last_one_year,  
                
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_standard)', function(req, res, next) {
    var user = req.params.cod_standard;
    
    req.getConnection(function(error, conn) {
        conn.query("update standard_operators_req set flg_wyvern_audit_last_two_years='N' WHERE cod_standard = "+user, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/standardOperatorReq')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/standardOperatorReq')
            }
        })
    })
})
 
module.exports = app