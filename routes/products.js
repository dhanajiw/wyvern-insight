var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_products WHERE cod_rec_status='A' ORDER BY cod_product ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listProduct', {
                    title: 'Products', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listProduct', {
                    title: 'Products', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addProduct', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addProduct', {
        
        title: 'Add Product',
        cod_product: '', 
        txt_product_name: '',
        cod_base_unit_type: '', 
        num_base_units_multiples: '',
        
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addProduct', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_product: req.sanitize('cod_product').escape().trim(),
            txt_product_name: req.sanitize('txt_product_name').escape().trim(),
            cod_base_unit_type: req.sanitize('cod_base_unit_type').escape().trim(),
            num_base_units_multiples: req.sanitize('num_base_units_multiples').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_products SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addProduct', {

                    title: 'Add Product',
                    cod_product: user.cod_product,    
                    txt_product_name: user.txt_product_name,
                    cod_base_unit_type: user.cod_base_unit_type,    
                    num_base_units_multiples: user.num_base_units_multiples,
              
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addProduct', {
                        title: 'Add Product',
                        cod_product: '', 
                        txt_product_name: '',
                        cod_base_unit_type: '', 
                        num_base_units_multiples: '',
        
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
        res.render('user/addProduct', { 
            title: 'Add Product',
                cod_product: req.params.cod_product,  
                txt_product_name: req.body.txt_product_name,
                cod_base_unit_type: req.params.cod_base_unit_type,  
                num_base_units_multiples: req.params.num_base_units_multiples,    
        
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editProduct/(:cod_product)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_products WHERE cod_product = '"+ req.params.cod_product+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_product = ' + req.params.id)
                res.redirect('/products')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editProduct', {
                    title: 'Edit Product', 
                    
                    cod_product: rows[0].cod_product,
                    txt_product_name: rows[0].txt_product_name,
                    cod_base_unit_type: rows[0].cod_base_unit_type,
                    num_base_units_multiples: rows[0].num_base_units_multiples,
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editProduct/(:cod_product)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_product: req.sanitize('cod_product').escape().trim(),
            txt_product_name: req.sanitize('txt_product_name').escape().trim(),
            cod_base_unit_type: req.sanitize('cod_base_unit_type').escape().trim(),
            num_base_units_multiples: req.sanitize('num_base_units_multiples').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_products SET ? WHERE cod_product = '"+ req.params.cod_product+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editProduct', {
                        title: 'Edit Product',
                       
                        cod_product: req.params.cod_product,  
                        txt_product_name: req.body.txt_product_name,
                        cod_base_unit_type: req.params.cod_base_unit_type,  
                        num_base_units_multiples: req.params.num_base_units_multiples,    
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editProduct', {
                        title: 'Edit Product',
                       
                        cod_product: req.params.cod_product,  
                        txt_product_name: req.body.txt_product_name,
                        cod_base_unit_type: req.params.cod_base_unit_type,  
                        num_base_units_multiples: req.params.num_base_units_multiples, 
               
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
        res.render('user/editProduct', { 
            title: 'Edit Product',            
            
                cod_product: req.params.cod_product,  
                txt_product_name: req.body.txt_product_name,
                cod_base_unit_type: req.params.cod_base_unit_type,  
                num_base_units_multiples: req.params.num_base_units_multiples,    
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_product)', function(req, res, next) {
    var user = req.params.cod_product;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_products set cod_rec_status='C' WHERE cod_product = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/products')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/products')
            }
        })
    })
})
 
module.exports = app