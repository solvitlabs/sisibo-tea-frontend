/*
 *  Request handlers : @users, @tokens, @checks, @ping, @not_found
 *
 */

//  Dependencies
const _db = require('./db')
const { hash, createRandomString } = require('./helpers')

//  Define the handlers
let handlers = {}

//  @Users
handlers.users = (data, callback)=>{
  const acceptableMethods = ['post', 'get', 'put', 'delete']
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._users[data.method](data, callback)
  }else{
    callback(405)
  }
}

//  Container for the users submethods
handlers._users = {}

//  @Users - post
//  Required data: email & password
//  Optional data: none
handlers._users.post = (data, callback)=>{
  //  Check that all required fields are filled out
  const email = typeof data.payload.email == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false
  const password = typeof data.payload.password == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false

  if(email && password){
    //  Make sure that the user doesn't already exist
    _db.run(`SELECT email from users WHERE email="${email}"`, (err, data)=>{
        if(!err){
            if(data.result.length == 0){
                const employee_id = createRandomString(12)
                _db.run(`INSERT INTO users (employee_id, email, password) VALUES ("${employee_id}", "${email}", "${hash(password)}")`, (err, data)=>{
                    if(!err && data.result.affectedRows > 0){
                        callback(200)
                    }else{
                        callback(500, {'Error':'Failed to create the user'})
                    }
                })
            }else{
                callback(400, {'Error':'User with that email already exists'})
            }
        }else{
            callback(500, err)
        }
    })

  }else{
    callback(400, {'Error':'Missing required fields'})
  }

}

//  @Users - get
//  Required data: email
//  Optional data: none
handlers._users.get = (data, callback)=>{
  //  Check that the email number provided is valid
  const email = typeof data.queryStringObject.email == 'string' && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false

  if(email){
    //  Get the token from the headers
    const token = typeof data.headers.token == 'string' ? data.headers.token :false
    //  verify that the given token is valid for the email number
    handlers._tokens.verifyToken(token, email, (tokenIsValid)=>{
      if(tokenIsValid){
        //  Look up the user
        _db.run(`SELECT email FROM users WHERE email = "${email}"`, (err, data)=>{
          if(!err){
            if(data.result.length > 0){
              callback(200, {...data.result[0]})
            }else{
              callback(404)
            }
          }else{
            callback(500, err)
          }
        })

      }else{
        callback(403, {'Error':'Missing required token in header, or token is invalid'})
      }
    })

  }else{
    callback(400, {'Error':'Missing required field'})
  }
}

//  @Users - put
//  Required data : email, password
//  Optional data : none
handlers._users.put = (data, callback)=>{
  //  Check for the required field
  const email = typeof data.payload.email == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false
  const password = typeof data.payload.password == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false

    //  Error if the email is invalid
    if(email && password){
        //  Get the token from the headers
        const token = typeof data.headers.token == 'string' ? data.headers.token :false
        //  verify that the given token is valid for the email
        handlers._tokens.verifyToken(token, email, (tokenIsValid)=>{
          if(tokenIsValid){
            //  Look up the user
            _db.run(`SELECT email FROM users where email = "${email}"`, (err, data)=>{
              if(!err){
                if(data.result.length > 0){
                  //  Update the fields necessary
                  _db.run(`UPDATE users SET password = "${hash(password)}" WHERE email = "${email}"`, (err, data)=>{
                    if(!err && data.result.affectedRows > 0){
                      callback(200)
                    }else{
                      callback(500, {'Error':'Could not update the user'})
                    }
                  })
                }else{
                  callback(400, {'Error':'The specified user does not exist'})
                }
              }else{
                callback(500, err)
              }
            })

          }else{
            callback(403,{'Error':'Missing required token in header, or token is invalid'})
          }
        })

    }else{
      callback(400,{'Error':'Missing required fields'})
    }
}

//  @Users - delete
//  Required field : email
handlers._users.delete = (data, callback)=>{
  //  Check that the email number provided is valid
  const email = typeof data.queryStringObject.email == 'string' && data.queryStringObject.email.trim().length > 0 ? data.queryStringObject.email.trim() : false

  if(email){
    //  Get the token from the headers
    const token = typeof data.headers.token == 'string' ? data.headers.token : false
    //  verify that the given token is valid for the email number
    handlers._tokens.verifyToken(token, email, (tokenIsValid)=>{
      if(tokenIsValid){
        //  Look up the user
        _db.run(`SELECT email FROM users where email = "${email}"`, (err, data)=>{
          if(!err){
            if(data.result.length > 0){
              _db.run(`DELETE from users WHERE email = "${email}"`, (err, data)=>{
                if(!err && data.result.affectedRows > 0){
                  callback(200)
                }else{
                  callback(500, {'Error':'Could not delete the specified user'})
                }
              })
            }else{
              callback(400,{'Error':'Could not find the specified user'})
            }
          }else{
            callback(500, err)
          }
        })
      }else{
        callback(403,{'Error':'Missing required token in header, or token is invalid'})
      }
    })

  }else{
    callback(400, {'Error':'Missing required field'})
  }
}

//  @tokens
handlers.tokens = (data, callback)=>{
  const acceptableMethods = ['post', 'get', 'put', 'delete']
  if(acceptableMethods.indexOf(data.method) > -1){
    handlers._tokens[data.method](data, callback)
  }else{
    callback(405)
  }
}

//  Container for all the tokens methods
handlers._tokens = {}

//  @tokens - post
//  Required data: email, password
//  Optional data: none
handlers._tokens.post = (data, callback)=>{
    const email = typeof data.payload.email == 'string' && data.payload.email.trim().length > 0 ? data.payload.email.trim() : false
    const password = typeof data.payload.password == 'string' && data.payload.password.trim().length > 0 ? data.payload.password.trim() : false
    if(email && password){
      //  Lookup the user who matches that email
      _db.run(`SELECT email FROM users WHERE email="${email}" AND password="${hash(password)}"`, (err, data)=>{
        if(!err){
          if(data.result.length == 0){
            //  If there is a match, create a new token with a random name. Set expiration data 1 hour in the future
            const tokenId = createRandomString(20)
            const expires = Date.now() + 1000 * 60 *60 //milliseconds
            const tokenObject = {
              email : email,
              id : tokenId,
              expires : expires
            }
            //  Store the token
            _db.run(`INSERT INTO tokens (id, email, expires) VALUES("${tokenObject.id}", "${tokenObject.email}", "${tokenObject.expires}")`, (err, data)=>{
              if(!err && data.result.affectedRows > 0){
                callback(200, tokenObject)
              }else{
                callback(500, {'Error':'Could not create the new token'})
              }
            })
          }else{
            callback(400, {'Error':'User does not exist'})
          }
        }else{
          callback(500, err)
        }
      })

    }else{
      callback(400,{'Error':'Missing required field(s)'})
    }
}
//  @tokens - get
//  Required data : id
//  Optional data : none
handlers._tokens.get = (data, callback)=>{
  //  Check that the id is valid
  const id = typeof data.queryStringObject.id == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false
  if(id){
    //  Look up the token
    _db.run(`SELECT * FROM tokens WHERE id="${id}"`, (err, data)=>{
      if(!err){
        if(data.result.length > 0){
          callback(200, {...data.result[0]})
        }else{
          callback(404)
        }
      }else{
        callback(500, err)
      }
    })
  }else{
    callback(400, {'Error':'Missing required field'})
  }
}

//  @tokens - put
//  Required data : id, extend
//  Optional data : none
handlers._tokens.put = (data, callback)=>{
  const id = typeof data.payload.id == 'string' && data.payload.id.trim().length == 20 ? data.payload.id.trim() : false
  const extend = typeof data.payload.extend == 'boolean' && data.payload.extend == true ? true : false
  if(id && extend){
    //  Look up the token
    _db.run(`SELECT * FROM tokens WHERE id="${id}"`, (err, data)=>{
      if(!err){
        if(data.result.length > 0){
          //  Check to make sure the token isn't already expired
          if(data.result[0].expires > Date.now()){
            //  Set the expiration an hour from now
            const newExpiry = Date.now() +1000 * 60 * 60
            _db.run(`UPDATE tokens SET expires = "${newExpiry}" WHERE id="${id}"`, (err, data)=>{
              if(!err && data.result.affectedRows > 0){
                callback(200)
              }else{
                callback(500, err)
              }
            })
          }else{
            callback(400, {'Error':'The token has already expired, and cannot be extended'})
          }
        }else{
          callback(400,{'Error':'Specified token does not exist'})
        }
      }else{
        callback(500, err)
      }
    })

  }else{
    callback(400,{'Error':'Missing required field(s) or field(s) are invalid'})
  }
}
//  @tokens - delete
//  Required data: id
//  Optional data: none
handlers._tokens.delete = (data, callback)=>{
  //  Check that the id is valid
  const id = typeof data.queryStringObject.id == 'string' && data.queryStringObject.id.trim().length == 20 ? data.queryStringObject.id.trim() : false

  if(id){
    //  Look up the token
    _db.run(`SELECT * FROM tokens WHERE id="${id}"`, (err, data)=>{
      if(!err){
        if(data.result.length > 0){
          _db.run(`DELETE FROM tokens WHERE id="${id}"`, (err, data)=>{
            if(!err && data.result[0].affectedRows > 0){
              callback(200)
            }else{
              callback(500, {'Error':'Could not delete the specified token'})
            }
          })
        }else{
          callback(500, {'Error':'Could not find the specified token'})
        }
      }else{
        callback(500, err)
      }
    })

  }else{
    callback(400, {'Error':'Missing required field'})
  }
}

//  Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = (id, email, callback)=>{
  //  Look up the token
  _db.run(`SELECT * FROM tokens WHERE id="${id}"`, (err, data)=>{
    if(!err && data.result.length > 0){
      if(data.result[0].email == email && data.result[0].expires > Date.now()){
        callback(true)
      }else{
        callback(false)
      }
    }else{
      callback(false)
    }
  })

}

//  @ping handler
handlers.ping = (data, callback)=>{
  callback(200)
}

// @not_found handler
handlers.notFound = (data, callback)=>{
  callback(404)
}

// Export the module
module.exports = handlers
