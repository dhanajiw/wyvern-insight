var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_waiver_types WHERE cod_rec_status='A' ORDER BY cod_waiver ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listWaiver', {
                    title: 'Waivers', 
                    data: ''
                })
            } else {
                // render to views/user/listWaiver.ejs template file
                res.render('user/listWaiver', {
                    title: 'Waivers', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addWaiver', function(req, res, next){    
    // render to views/user/addWaiver.ejs
    res.render('user/addWaiver', {
        
        title: 'Add Waiver',
        cod_waiver: '', 
		txt_waiver_name: '', 
		flg_waiver_for_pilot: '', 
		flg_waiver_for_aircraft: '', 
		flg_waiver_for_insurance: '', 
		flg_waiver_for_operator: '', 
		flg_doc_upload_mandatory: '' 
		  
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addWaiver', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   

        var user = {
            
            cod_waiver: req.sanitize('cod_waiver').escape().trim(),
            txt_waiver_name: req.sanitize('txt_waiver_name').escape().trim(),
			flg_waiver_for_pilot: req.param('flg_waiver_for_pilot'),
			flg_waiver_for_aircraft: req.param('flg_waiver_for_aircraft'),
			flg_waiver_for_insurance: req.param('flg_waiver_for_insurance'),
			flg_waiver_for_operator: req.param('flg_waiver_for_operator'),
			flg_doc_upload_mandatory: req.param('flg_doc_upload_mandatory')
			
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_waiver_types SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/addWaiver.ejs
                    res.render('user/addWaiver', {

                        title: 'Add Waiver',
                        cod_waiver: user.cod_waiver,    
                		txt_waiver_name: user.txt_waiver_name, 
                		flg_waiver_for_pilot: user.flg_waiver_for_pilot, 
                		flg_waiver_for_aircraft: user.flg_waiver_for_aircraft, 
                		flg_waiver_for_insurance: user.flg_waiver_for_insurance, 
                		flg_waiver_for_operator: user.flg_waiver_for_operator, 
                		flg_doc_upload_mandatory: user.flg_doc_upload_mandatory
                
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/addWaiver.ejs
                    res.render('user/addWaiver', {
                        title: 'Add Waiver',
                        cod_waiver: '', 
                		txt_waiver_name: '', 
                		flg_waiver_for_pilot: '', 
                		flg_waiver_for_aircraft: '', 
                		flg_waiver_for_insurance: '', 
                		flg_waiver_for_operator: '', 
                		flg_doc_upload_mandatory: '' 
              
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
        res.render('user/addWaiver', { 
            title: 'Add Waiver',
            cod_waiver: req.body.cod_waiver,
            txt_waiver_name: req.body.txt_waiver_name,
			flg_waiver_for_pilot: req.body.flg_waiver_for_pilot,
			flg_waiver_for_aircraft: req.body.flg_waiver_for_aircraft,
			flg_waiver_for_insurance: req.body.flg_waiver_for_insurance,
			flg_waiver_for_operator: req.body.flg_waiver_for_operator,
			flg_doc_upload_mandatory: req.body.flg_doc_upload_mandatory
		
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editWaiver/(:cod_waiver)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_waiver_types WHERE cod_waiver = '"+ req.params.cod_waiver+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_waiver = ' + req.params.id)
                res.redirect('/waivers')
            }
            else { // if user found
                // render to views/user/editWaiver.ejs template file
                res.render('user/editWaiver', {
                    title: 'Edit Waiver', 
                    
                    cod_waiver: rows[0].cod_waiver,
                    txt_waiver_name: rows[0].txt_waiver_name,
					flg_waiver_for_pilot: rows[0].flg_waiver_for_pilot,
					flg_waiver_for_aircraft: rows[0].flg_waiver_for_aircraft,
					flg_waiver_for_insurance: rows[0].flg_waiver_for_insurance,
					flg_waiver_for_operator: rows[0].flg_waiver_for_operator,
					flg_doc_upload_mandatory: rows[0].flg_doc_upload_mandatory
					
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editWaiver/(:cod_waiver)', function(req, res, next) {
   
    var errors = req.validationErrors()
    
    if( !errors ) {   

        var user = {
           
            cod_waiver: req.sanitize('cod_waiver').escape().trim(),
            txt_waiver_name: req.sanitize('txt_waiver_name').escape().trim(),
			flg_waiver_for_pilot: req.sanitize('flg_waiver_for_pilot').escape().trim(),
			flg_waiver_for_aircraft: req.sanitize('flg_waiver_for_aircraft').escape().trim(),
			flg_waiver_for_insurance: req.sanitize('flg_waiver_for_insurance').escape().trim(),
			flg_waiver_for_operator: req.sanitize('flg_waiver_for_operator').escape().trim(),
			flg_doc_upload_mandatory: req.sanitize('flg_doc_upload_mandatory').escape().trim()
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_waiver_types SET ? WHERE cod_waiver = '"+ req.params.cod_waiver+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/addWaiver.ejs
                    res.render('user/editWaiver', {
                        title: 'Edit Waiver',
                        
                        cod_waiver: req.params.cod_waiver,  
                        txt_waiver_name: req.body.txt_waiver_name,
            			flg_waiver_for_pilot: req.body.flg_waiver_for_pilot,
            			flg_waiver_for_aircraft: req.body.flg_waiver_for_aircraft,
            			flg_waiver_for_insurance: req.body.flg_waiver_for_insurance,
            			flg_waiver_for_operator: req.body.flg_waiver_for_operator,
            			flg_doc_upload_mandatory: req.body.flg_doc_upload_mandatory
                
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/addWaiver.ejs
                    res.render('user/editWaiver', {
                        title: 'Edit Waiver',
                        
                        cod_waiver: req.params.cod_waiver,  
                        txt_waiver_name: req.body.txt_waiver_name,
            			flg_waiver_for_pilot: req.body.flg_waiver_for_pilot,
            			flg_waiver_for_aircraft: req.body.flg_waiver_for_aircraft,
            			flg_waiver_for_insurance: req.body.flg_waiver_for_insurance,
            			flg_waiver_for_operator: req.body.flg_waiver_for_operator,
            			flg_doc_upload_mandatory: req.body.flg_doc_upload_mandatory
                
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
        res.render('user/editWaiver', { 
            title: 'Edit user',            
            
            cod_waiver: req.params.cod_waiver,   
            txt_waiver_name: req.body.txt_waiver_name,
			flg_waiver_for_pilot: req.body.flg_waiver_for_pilot,
			flg_waiver_for_aircraft: req.body.flg_waiver_for_aircraft,
			flg_waiver_for_insurance: req.body.flg_waiver_for_insurance,
			flg_waiver_for_operator: req.body.flg_waiver_for_operator,
			flg_doc_upload_mandatory: req.body.flg_doc_upload_mandatory
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_waiver)', function(req, res, next) {
    var user = req.params.cod_waiver;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_waiver_types set cod_rec_status='C' WHERE cod_waiver = '"+user+"'", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/waivers')
            } else {
                req.flash('success', 'equipment data deleted successfully!')
                // redirect to airports list page
                res.redirect('/waivers')
            }
        })
    })
})
 
module.exports = app