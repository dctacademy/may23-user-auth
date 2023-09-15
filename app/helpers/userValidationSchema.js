// userSchema - username, email, password
const userValidationSchema = {
    username: {
        isLength: {
            options: { min: 3},
            errorMessage: 'username should be minimum 3 characters'
        }
    },
    email: {
        isEmail: {
            errorMessage: 'email format is invalid'
        }
    },
    password: {
        isLength: {
            options: { min: 8, max: 128},
            errorMessage: 'password should be between 8 - 128 characters long'
        }
    }
}

module.exports = userValidationSchema 