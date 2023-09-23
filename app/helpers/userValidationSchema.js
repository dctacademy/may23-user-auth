const User = require('../models/user-model')
// userSchema - username, email, password

const loginEmailSchema = {
    notEmpty: {
        errorMessage: 'email is required'
    },
    isEmail: {
        errorMessage: 'email format is invalid'
    }
}

const registerEmailSchema = {
    notEmpty: {
        errorMessage: 'email is required'
    },
    isEmail: {
        errorMessage: 'email format is invalid'
    },
    custom: {
        options: async (value) => {
            const user = await User.findOne({ email: value })
            if(!user) {
                return true 
            } else {
                throw new Error('user record exists')
            }
        }
    }
}

const passwordSchema = {
    notEmpty: {
        errorMessage: 'password is required'
    },
    isLength: {
        options: { min: 8, max: 128 },
        errorMessage: 'password should be between 8 - 128 characters long'
    }
}

const usernameSchema = {
    notEmpty: {
        errorMessage: 'username is required'
    },
    isLength: {
        options: { min: 3 },
        errorMessage: 'username should be minimum 3 characters'
    }
}

const userRegistrationSchema = {
    username: usernameSchema,
    email: registerEmailSchema,
    password: passwordSchema 
}

const userLoginSchema = {
    email: loginEmailSchema,
    password: passwordSchema 
}

module.exports = {
    userRegistrationSchema,
    userLoginSchema
} 