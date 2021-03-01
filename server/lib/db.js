/*
*   writing to, update and retrieval of data
*/
const { createConnection } = require('mysql')
const { database } = require('./config')

//  Container for all db operations
const db = {}

db.run = (sql, callback)=>{
    const con = createConnection({
      host: database.host,
      user: database.user,
      password: database.password,
      database: database.name
    })
    
    con.connect((err) => {
            if (!err) {
                console.log('\x1b[36m%s\x1b[0m', `DB connected`)
                con.query(sql, (err, result)=>{
                    if (!err) {
                        callback(false, {result})
                    } else {
                        callback(err)
                    }
                });
            } else {
                callback('Error connecting to the database')
            }
        })
}

module.exports = db