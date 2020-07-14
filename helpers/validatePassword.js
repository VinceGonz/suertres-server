const bcrypt = require('bcrypt')

const validatePassword = async(password, hashedPassword) => {
    try {
        const passwordMatched = await bcrypt.compare(password, hashedPassword);
        return passwordMatched
        console.log(passwordMatched)
    } catch (error) {
        console.log('Error - Invalid password')
    }
}

module.exports = validatePassword