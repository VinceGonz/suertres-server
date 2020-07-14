const bcrypt = require('bcrypt');


const hashUserPassword = (password) => {
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt)

    return hash
}


module.exports = hashUserPassword


