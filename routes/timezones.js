var express = require('express')
var app = express()

// SHOW LIST OF USERS
app.get('/', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_timezones WHERE cod_rec_status='A' ORDER BY cod_timezone ASC", function (err, rows, fields) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                res.render('user/listTimezone', {
                    title: 'Time Zones',
                    data: ''
                })
            } else {
                // render to views/user/list.ejs template file
                res.render('user/listTimezone', {
                    title: 'Time Zones',
                    data: rows
                })
            }
        })
    })
})

// SHOW ADD USER FORM
app.get('/addTimezone', function (req, res, next) {
    // render to views/user/add.ejs
    res.render('user/addTimezone', {

        title: 'Add Time Zone',
        cod_timezone: '',
        txt_timezone_name: '',
        num_hours_gmt_offset: '',
        dat_daylight_savings_start: '',
        dat_daylight_savings_end: ''
        /* cod_rec_status: '',   
        txt_last_maker_id: '',
        dat_last_maker: '' */
    })
})

// ADD NEW USER POST ACTION
app.post('/addTimezone', function (req, res, next) {

    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            
            cod_timezone: req.sanitize('cod_timezone').escape().trim(),
            txt_timezone_name: req.sanitize('txt_timezone_name').escape().trim(),
            num_hours_gmt_offset: req.sanitize('num_hours_gmt_offset').escape().trim(),
            dat_daylight_savings_start: req.sanitize('dat_daylight_savings_start').escape().trim(),
            dat_daylight_savings_end: req.sanitize('dat_daylight_savings_end').escape().trim(),

        }

        req.getConnection(function (error, conn) {
            conn.query('INSERT INTO mst_timezones SET ?', user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/addTimezone', {

                        title: 'Add Time Zone',
                        cod_timezone: user.cod_timezone,
                        txt_timezone_name: user.txt_timezone_name,
                        num_hours_gmt_offset: user.num_hours_gmt_offset,
                        dat_daylight_savings_start: user.dat_daylight_savings_start,
                        dat_daylight_savings_end: user.dat_daylight_savings_end

                    })
                } else {
                    req.flash('success', 'Data added successfully!')

                    // render to views/user/add.ejs
                    res.render('user/addTimezone', {
                        title: 'Add Time Zone',
                        cod_timezone: '',
                        txt_timezone_name: '',
                        num_hours_gmt_offset: '',
                        dat_daylight_savings_start: '',
                        dat_daylight_savings_end: ''
                        
                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */
        res.render('user/addTimezone', {
            title: 'Add Time Zone',
            cod_timezone: req.body.cod_timezone,
            txt_timezone_name: req.body.txt_timezone_name,
            num_hours_gmt_offset: req.body.num_hours_gmt_offset,
            dat_daylight_savings_start: req.body.dat_daylight_savings_start,
            dat_daylight_savings_end: req.body.dat_daylight_savings_end
            
        })
    }
})

// SHOW EDIT USER FORM
app.get('/editTimezone/(:cod_timezone)', function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM mst_timezones WHERE cod_timezone = '"+req.params.cod_timezone+"'", function (err, rows, fields) {
            if (err) throw err

            // if user not found
            if (rows.length <= 0) {
                req.flash('error', 'User not found with cod_timezone = ' + req.params.id)
                res.redirect('/timezones')
            }
            else { // if user found
                // render to views/user/edit.ejs template file
                res.render('user/editTimezone', {
                    title: 'Edit Time Zone',
                    
                    cod_timezone: rows[0].cod_timezone,
                    txt_timezone_name: rows[0].txt_timezone_name,
                    num_hours_gmt_offset: rows[0].num_hours_gmt_offset,
                    dat_daylight_savings_start: rows[0].dat_daylight_savings_start,
                    dat_daylight_savings_end: rows[0].dat_daylight_savings_end
                    
                })
            }
        })
    })
})

// EDIT USER POST ACTION
app.put('/editTimezone/(:cod_timezone)', function (req, res, next) {

    var errors = req.validationErrors()

    if (!errors) {   //No errors were found.  Passed Validation!

        var user = {
            
            cod_timezone: req.sanitize('cod_timezone').escape().trim(),
            txt_timezone_name: req.sanitize('txt_timezone_name').escape().trim(),
            num_hours_gmt_offset: req.sanitize('num_hours_gmt_offset').escape().trim(),
            dat_daylight_savings_start: req.sanitize('dat_daylight_savings_start').escape().trim(),
            dat_daylight_savings_end: req.sanitize('dat_daylight_savings_end').escape().trim()

        }

        req.getConnection(function (error, conn) {
            conn.query("UPDATE mst_timezones SET ? WHERE cod_timezone = '"+req.params.cod_timezone+"'", user, function (err, result) {
                //if(err) throw err
                if (err) {
                    req.flash('error', err)

                    // render to views/user/add.ejs
                    res.render('user/editTimezone', {
                        title: 'Edit Time Zone',
                       
                        cod_timezone: req.params.cod_timezone,
                        txt_timezone_name: req.body.txt_timezone_name,
                        num_hours_gmt_offset: req.body.num_hours_gmt_offset,
                        dat_daylight_savings_start: req.body.dat_daylight_savings_start,
                        dat_daylight_savings_end: req.body.dat_daylight_savings_end

                    })
                } else {
                    req.flash('success', 'Data updated successfully!')

                    // render to views/user/add.ejs
                    res.render('user/editTimezone', {
                        title: 'Edit Time Zone',
                        
                        cod_timezone: req.params.cod_timezone,
                        txt_timezone_name: req.body.txt_timezone_name,
                        num_hours_gmt_offset: req.body.num_hours_gmt_offset,
                        dat_daylight_savings_start: req.body.dat_daylight_savings_start,
                        dat_daylight_savings_end: req.body.dat_daylight_savings_end

                    })
                }
            })
        })
    }
    else {   //Display errors to user
        var error_msg = ''
        errors.forEach(function (error) {
            error_msg += error.msg + '<br>'
        })
        req.flash('error', error_msg)

        /**
         * Using req.body.name 
         * because req.param('name') is deprecated
         */
        res.render('user/editTimezone', {
            title: 'Edit Time Zone',
            
            cod_timezone: req.params.cod_timezone,
            txt_timezone_name: req.body.txt_timezone_name,
            num_hours_gmt_offset: req.body.num_hours_gmt_offset,
            dat_daylight_savings_start: req.body.dat_daylight_savings_start,
            dat_daylight_savings_end: req.body.dat_daylight_savings_end

        })
    }
})

// DELETE USER
app.delete('/delete/(:cod_timezone)', function (req, res, next) {
    var user = req.params.cod_timezone;

    req.getConnection(function (error, conn) {
        conn.query("update mst_timezones set cod_rec_status='C' WHERE cod_timezone = '" + user+"'", function (err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                // redirect to airport list page
                res.redirect('/timezones')
            } else {
                req.flash('success', 'Data deleted successfully!')
                // redirect to airports list page
                res.redirect('/timezones')
            }
        })
    })
})

module.exports = app