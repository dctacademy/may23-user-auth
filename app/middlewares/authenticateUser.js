const jwt = require('jsonwebtoken')
const authenticateUser = (req, res, next) => {
    try {
        const token = req.headers['authorization']
        const tokenData = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = tokenData.id 
        next()
    } catch(e) {
        res.json(e) 
    }
}

module.exports = authenticateUser

// middleware
/*
1. it can execute any code
2. it can modify the req, res object
3. it can end a req, res cycle 
*/ 