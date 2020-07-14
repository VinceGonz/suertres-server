
const jwt = require('jsonwebtoken');


const authenticateUser = (user) => {
    try {
        // Remove algorithm to work
        let token = jwt.sign({username: user.username}, 'secretKey');
        return token
    } catch (error) {
        console.log(error)
    }
}


module.exports = {authenticateUser}