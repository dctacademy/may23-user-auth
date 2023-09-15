// const _ = require('lodash')
// const obj = { id: 1, name: 'adam', city: 'bangalore'}
// console.log(_.pick(obj, ['name', 'city']))

// npm install bcryptjs 

const bcrypt = require('bcryptjs')

// register functionality
// const password = 'secret123'
// bcrypt.genSalt()
//     .then((salt) => {
//         console.log(salt, salt.length)
//         bcrypt.hash(password, salt)
//             .then((encryptedPassword) => {
//                 console.log(encryptedPassword, encryptedPassword.length)
//             })
//     })

// login functionlity 

// dictionary attack 
// brute force 
// dos attack ddos attack 

// useEffect(() => { api call setUsers(response.data) })




const passInput = 'apple123'
const encrypt = "$2a$10$fMZY55sMGio/uKAPy6BPBeqFRCfujlOKzy83l17UhTYUQK0S.L29O"

bcrypt.compare(passInput, encrypt)
    .then((result) => {
        console.log(result)
    })