var express = require('express')
var app = express()
 
// SHOW LIST OF USERS
app.get('/', function(req, res, next) {
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_product_slabs WHERE cod_rec_status='A' ORDER BY cod_product ASC",function(err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listProductSlab', {
                    title: 'Product Slabs', 
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listProductSlab', {
                    title: 'Product Slabs', 
                    data: rows
                })
            }
        })
    })
})
 
// SHOW ADD USER FORM
app.get('/addProductSlab', function(req, res, next){    
    // render to views/user/add.ejs
    res.render('user/addProductSlab', {
        
        title: 'Add Product Slab',
        cod_product: '', 
        num_slab: '',
        num_slab_min_units: '', 
        num_slab_max_units: '',
        amt_unit_price_standard: '', 
        amt_unit_price_incremental: '',
        
    })
})
 
// ADD NEW USER POST ACTION
app.post('/addProductSlab', function(req, res, next){    
 
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
            
            cod_product: req.sanitize('cod_product').escape().trim(),
            num_slab: req.sanitize('num_slab').escape().trim(),
            num_slab_min_units: req.sanitize('num_slab_min_units').escape().trim(),
            num_slab_max_units: req.sanitize('num_slab_max_units').escape().trim(),
            amt_unit_price_standard: req.sanitize('amt_unit_price_standard').escape().trim(),
            amt_unit_price_incremental: req.sanitize('amt_unit_price_incremental').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query('INSERT INTO mst_product_slabs SET ?', user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/addProductSlab', {

                        title: 'Add Product Slab',
                        cod_product: user.cod_product,    
                        num_slab: user.num_slab,
                        num_slab_min_units: user.num_slab_min_units,    
                        num_slab_max_units: user.num_slab_max_units,
                        amt_unit_price_standard: user.amt_unit_price_standard,    
                        amt_unit_price_incremental: user.amt_unit_price_incremental,
              
                    })
                } else {                
                    req.flash('success', 'Data added successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/addProductSlab', {
                        title: 'Add Product Slab',
                        cod_product: '', 
                        num_slab: '',
                        num_slab_min_units: '', 
                        num_slab_max_units: '',
                        amt_unit_price_standard: '', 
                        amt_unit_price_incremental: '',
        
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
        res.render('user/addProductSlab', { 
            title: 'Add Product Slab',
                cod_product: req.params.cod_product,  
                num_slab: req.body.num_slab,
                num_slab_min_units: req.params.num_slab_min_units,  
                num_slab_max_units: req.params.num_slab_max_units,  
                amt_unit_price_standard: req.body.amt_unit_price_standard,
                amt_unit_price_incremental: req.params.amt_unit_price_incremental,  
        
        })
    }
})
 
// SHOW EDIT USER FORM
app.get('/editProductSlab/(:cod_product)', function(req, res, next){
    req.getConnection(function(error, conn) {
        conn.query("SELECT * FROM mst_product_slabs WHERE cod_product = '"+ req.params.cod_product+"' ", function(err, rows, fields) {
            if(err) throw err
            
            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_product = ' + req.params.id)
                res.redirect('/productSlabs')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editProductSlab', {
                    title: 'Edit Product Slab', 
                    //data: rows[0],
                    cod_product: rows[0].cod_product,
                    num_slab: rows[0].num_slab,
                    num_slab_min_units: rows[0].num_slab_min_units,
                    num_slab_max_units: rows[0].num_slab_max_units,
                    amt_unit_price_standard: rows[0].amt_unit_price_standard,
                    amt_unit_price_incremental: rows[0].amt_unit_price_incremental,
                    
                })
            }            
        })
    })
})
 
// EDIT USER POST ACTION
app.put('/editProductSlab/(:cod_product)', function(req, res, next) {
  
    var errors = req.validationErrors()
    
    if( !errors ) {   
        var user = {
           
            cod_product: req.sanitize('cod_product').escape().trim(),
            num_slab: req.sanitize('num_slab').escape().trim(),
            num_slab_min_units: req.sanitize('num_slab_min_units').escape().trim(),
            num_slab_max_units: req.sanitize('num_slab_max_units').escape().trim(),
            amt_unit_price_standard: req.sanitize('amt_unit_price_standard').escape().trim(),
            amt_unit_price_incremental: req.sanitize('amt_unit_price_incremental').escape().trim(),
            
        }
        
        req.getConnection(function(error, conn) {
            conn.query("UPDATE mst_product_slabs SET ? WHERE cod_product = '"+ req.params.cod_product+"' ", user, function(err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)
                    
                    // render to views/user/add.ejs
                    res.render('user/editProductSlab', {
                        title: 'Edit Product Slab',
                       
                        cod_product: req.params.cod_product,  
                        num_slab: req.body.num_slab,
                        num_slab_min_units: req.params.num_slab_min_units,  
                        num_slab_max_units: req.params.num_slab_max_units,  
                        amt_unit_price_standard: req.body.amt_unit_price_standard,
                        amt_unit_price_incremental: req.params.amt_unit_price_incremental,  
               
                    })
                } else {
                    req.flash('success', 'Data updated successfully!')
                    
                    // render to views/user/add.ejs
                    res.render('user/editProductSlab', {
                        title: 'Edit Product Slab',
                       
                        cod_product: req.params.cod_product,  
                        num_slab: req.body.num_slab,
                        num_slab_min_units: req.params.num_slab_min_units,  
                        num_slab_max_units: req.params.num_slab_max_units,  
                        amt_unit_price_standard: req.body.amt_unit_price_standard,
                        amt_unit_price_incremental: req.params.amt_unit_price_incremental,  
               
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
        res.render('user/editProductSlab', { 
            title: 'Edit Product Slab',            
            
                cod_product: req.params.cod_product,  
                num_slab: req.body.num_slab,
                num_slab_min_units: req.params.num_slab_min_units,  
                num_slab_max_units: req.params.num_slab_max_units,  
                amt_unit_price_standard: req.body.amt_unit_price_standard,
                amt_unit_price_incremental: req.params.amt_unit_price_incremental,  
            
        })
    }
})
 
// DELETE USER
app.delete('/delete/(:cod_product)', function(req, res, next) {
    var user = req.params.cod_product;
    
    req.getConnection(function(error, conn) {
        conn.query("update mst_product_slabs set cod_rec_status='C' WHERE cod_product = '"+user+"' ", function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/productSlabs')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/productSlabs')
            }
        })
    })
})
 
module.exports = app