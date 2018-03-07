var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_document_types WHERE cod_rec_status='A' ORDER BY cod_doc_type ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listDocumentTypes', {
                    title: 'Document Types', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listDocumentTypes', {
                    title: 'Document Types', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addDocumentTypes', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addDocumentTypes', {
        
        title: 'Add Document Type',
        cod_doc_type: '', 
        txt_doc_type_name: '',
        flg_operator_doc: '', 
        flg_pilot_doc: '',
        flg_aircraft_doc: '', 
        flg_insurance_doc: '',
        flg_event_doc: '', 
        flg_misc_doc: ''
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addDocumentTypes', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_doc_type: req.sanitize('cod_doc_type').escape().trim(),
            txt_doc_type_name: req.sanitize('txt_doc_type_name').escape().trim(),
            flg_operator_doc: req.sanitize('flg_operator_doc').escape().trim(),
            flg_pilot_doc: req.sanitize('flg_pilot_doc').escape().trim(),
            flg_aircraft_doc: req.sanitize('flg_aircraft_doc').escape().trim(),
            flg_insurance_doc: req.sanitize('flg_insurance_doc').escape().trim(),
            flg_event_doc: req.sanitize('flg_event_doc').escape().trim(),
            flg_misc_doc: req.sanitize('flg_misc_doc').escape().trim(),

        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_document_types SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addDocumentTypes', {

                        title: 'Add Document Type',
                        cod_doc_type: user.cod_doc_type,    
                        txt_doc_type_name: user.txt_doc_type_name,
                        flg_operator_doc: user.flg_operator_doc,    
                        flg_pilot_doc: user.flg_pilot_doc,
                        flg_aircraft_doc: user.flg_aircraft_doc,    
                        flg_insurance_doc: user.flg_insurance_doc,
                        flg_event_doc: user.flg_event_doc,    
                        flg_misc_doc: user.flg_misc_doc,
              
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addDocumentTypes', {
                        title: 'Add Document Type',
                        cod_doc_type: '', 
                        txt_doc_type_name: '',
                        flg_operator_doc: '', 
                        flg_pilot_doc: '',
                        flg_aircraft_doc: '', 
                        flg_insurance_doc: '',
                        flg_event_doc: '', 
                        flg_misc_doc: ''
        
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
        res.render('user/addDocumentTypes', { 
            title: 'Add Document Type',
                cod_doc_type: req.params.cod_doc_type,  
                txt_doc_type_name: req.body.txt_doc_type_name,
                flg_operator_doc: req.params.flg_operator_doc,  
                flg_pilot_doc: req.params.flg_pilot_doc,  
                flg_aircraft_doc: req.body.flg_aircraft_doc,
                flg_insurance_doc: req.params.flg_insurance_doc,  
                flg_event_doc: req.params.flg_event_doc,
                flg_misc_doc: req.params.flg_misc_doc,
        
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editDocumentTypes/(:cod_doc_type)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_document_types WHERE cod_doc_type = '"+ req.params.cod_doc_type+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_doc_type = ' + req.params.id)
                res.redirect('/documentTypes')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editDocumentTypes', {
                    title: 'Edit Document Type', 
                    
                    cod_doc_type: rows[0].cod_doc_type,
                    txt_doc_type_name: rows[0].txt_doc_type_name,
                    flg_operator_doc: rows[0].flg_operator_doc,
                    flg_pilot_doc: rows[0].flg_pilot_doc,
                    flg_aircraft_doc: rows[0].flg_aircraft_doc,
                    flg_insurance_doc: rows[0].flg_insurance_doc,
                    flg_event_doc: rows[0].flg_event_doc,
                    flg_misc_doc: rows[0].flg_misc_doc,
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editDocumentTypes/(:cod_doc_type)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_doc_type: req.sanitize('cod_doc_type').escape().trim(),
            txt_doc_type_name: req.sanitize('txt_doc_type_name').escape().trim(),
            flg_operator_doc: req.sanitize('flg_operator_doc').escape().trim(),
            flg_pilot_doc: req.sanitize('flg_pilot_doc').escape().trim(),
            flg_aircraft_doc: req.sanitize('flg_aircraft_doc').escape().trim(),
            flg_insurance_doc: req.sanitize('flg_insurance_doc').escape().trim(),
            flg_event_doc: req.sanitize('flg_event_doc').escape().trim(),
            flg_misc_doc: req.sanitize('flg_misc_doc').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_document_types SET ? WHERE cod_doc_type = '"+ req.params.cod_doc_type+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editDocumentTypes', {
                        title: 'Edit Document Type',
                       
                        cod_doc_type: req.params.cod_doc_type,  
                        txt_doc_type_name: req.body.txt_doc_type_name,
                        flg_operator_doc: req.params.flg_operator_doc,  
                        flg_pilot_doc: req.params.flg_pilot_doc,  
                        flg_aircraft_doc: req.body.flg_aircraft_doc,
                        flg_insurance_doc: req.params.flg_insurance_doc,  
                        flg_event_doc: req.params.flg_event_doc,
                        flg_misc_doc: req.params.flg_misc_doc,
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editDocumentTypes', {
                        title: 'Edit Document Type',
                       
                        cod_doc_type: req.params.cod_doc_type,  
                        txt_doc_type_name: req.body.txt_doc_type_name,
                        flg_operator_doc: req.params.flg_operator_doc,  
                        flg_pilot_doc: req.params.flg_pilot_doc,  
                        flg_aircraft_doc: req.body.flg_aircraft_doc,
                        flg_insurance_doc: req.params.flg_insurance_doc,  
                        flg_event_doc: req.params.flg_event_doc,
                        flg_misc_doc: req.params.flg_misc_doc,
               
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
        res.render('user/editDocumentTypes', { 
            title: 'Edit Document Type',            
            
                cod_doc_type: req.params.cod_doc_type,  
                txt_doc_type_name: req.body.txt_doc_type_name,
                flg_operator_doc: req.params.flg_operator_doc,  
                flg_pilot_doc: req.params.flg_pilot_doc,  
                flg_aircraft_doc: req.body.flg_aircraft_doc,
                flg_insurance_doc: req.params.flg_insurance_doc,  
                flg_event_doc: req.params.flg_event_doc,
                flg_misc_doc: req.params.flg_misc_doc,
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_doc_type)', function(req, res, next) {
    var user = req.params.cod_doc_type;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_document_types set cod_rec_status='C' WHERE cod_doc_type = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/documentTypes')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/documentTypes')
            }
        })
    })
})
 
module.exports = app