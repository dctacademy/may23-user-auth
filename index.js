require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { checkSchema } = require('express-validator')

const configureDB = require('./config/db')
const routes = require('./config/routes')
const usersCltr = require('./app/controllers/users-cltr')
const greetCltr = require('./app/controllers/greet-cltr')
const notesCltr = require('./app/controllers/notes-cltr')
const { userRegistrationSchema, userLoginSchema } = require('./app/helpers/userValidationSchema')
const noteValidationSchema = require('./app/helpers/noteValidationSchema')
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

app.get('/api/notes', authenticateUser, notesCltr.list)
app.post('/api/notes', authenticateUser, checkSchema(noteValidationSchema), notesCltr.create)
app.get('/api/notes/:id', authenticateUser, notesCltr.show )
app.put('/api/notes/:id', authenticateUser, checkSchema(noteValidationSchema), notesCltr.show)
app.delete('/api/notes/:id', authenticateUser, notesCltr.destroy )

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