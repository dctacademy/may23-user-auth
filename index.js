require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')

const configureDB = require('./config/db')
const routes = require('./config/routes')
const usersCltr = require('./app/controllers/users-cltr')
const greetCltr = require('./app/controllers/greet-cltr')
const { userRegistrationSchema, userLoginSchema } = require('./app/helpers/userValidationSchema')
const authenticateUser = require('./app/middlewares/authenticateUser')
const app = express() 
const port = process.env.PORT || 3030

configureDB()
app.use(express.json())
app.use(cors()) 

// application middleware 

// app.httpMethod(url, callback)
// routing level middleware

app.post('/api/users/register', checkSchema(userRegistrationSchema), usersCltr.register)
app.post('/api/users/login', checkSchema(userLoginSchema), usersCltr.login)
app.get('/api/users/account', authenticateUser, usersCltr.account)


app.get('/api/greet/welcome', greetCltr.welcome)
app.get('/api/greet/goodbye', greetCltr.goodbye)

app.use('/',routes)


app.listen(port, () => {
    console.log('server running on port', port)
})


/*
git clonse url user-authentication
cd user-authentication
npm install
node index.js
*/