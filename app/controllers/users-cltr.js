const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const User = require('../models/user-model')
const usersCltr = {}

usersCltr.register = async function(req, res){
    try {
        const errors = validationResult(req) 
        if(!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array()})
        } else {
            const body = _.pick(req.body, ['username', 'email', 'password'])
            const user = new User(body)
            const salt = await bcryptjs.genSalt()
            const hashedPassword = await bcryptjs.hash(user.password, salt)
            user.password = hashedPassword
            const userDoc = await user.save()
            res.json(userDoc)
        }
    } catch(e) {
        res.json(e) 
    }
}

usersCltr.login = async (req, res) => {
    try {
        const errors = validationResult(req) 
        if(!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array()})
        } else {
            const body = _.pick(req.body, ['email', 'password'])
            const user = await User.findOne({ email: body.email })
            if(user) {
                const result = await bcryptjs.compare(body.password, user.password)
                if(result) {
                    const tokenData = {
                        id: user._id
                    }
                    const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '7d'})
                    res.json({ token: token })
                } else {
                    res.status(404).json({ error: 'invalid email / password'})
                }
            } else {
                res.status(404).json({ error: 'invalid email / password'})
            }
        }
    } catch(e) {
        res.json(e) 
    }
}

usersCltr.account = async (req,res) => {
    try {
        const user = await User.findById(req.userId)
        const resBody = _.pick(user, ['_id', 'username', 'email'])
        res.json(resBody)
    } catch(e) {
        res.json(e) 
    }
}

module.exports = usersCltr 


/*
    1. create a controller called as greet
    2. inside greet controller 2 routes
        * welcome
        * goodbye
        * 
    
    3. GET /api/greet/welcome -> (res) -> { messag: 'welcome to the website'}
    4. GET /api/greet/goodbye -> (res) -> { message: 'thank you for visiting us' }
*/

/*

GET /api/users/account

axios.get('lh:3050/api/users/acccount', {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})

axios.post('/api/tasks', formData, {
    headers: {
        'Authorization': localStorage.getItem('token')
    }
})
*/ 