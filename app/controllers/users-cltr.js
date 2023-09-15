const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
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
                    res.json(user) 
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

// usersCltr.register = function(req, res){
//     const body = req.body 
//     const user = new User(body)
//     user.save()
//         .then((user) => {
//             res.json(user)
//         })
//         .catch((err) => {
//             res.json(err)
//         })
// }

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
useEffect(() => {
    axios.get()
}, [])


useEffect(() => {

}, [state])


axios.post(url, formData, optionsObj)

*/ 