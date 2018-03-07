var config = {
    database: {
        host:      'production.crnljw6zax7p.us-east-1.rds.amazonaws.com',     // database host
        user:       'vijay',         // your database username
        password: 'nexus',         // your database password
        port:       3306,         // default MySQL port
        db:       'productiondb'         // your database name
    },
    server: {
        host: '127.0.0.1',
        port: '3000'
    }
}
 
module.exports = config