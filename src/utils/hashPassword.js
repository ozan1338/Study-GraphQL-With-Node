const bcrypt = require('bcrypt')

const hashPassword = async(password) => {
    if(password.length < 4) {
        throw new Error('Password must be 4 character or longer')
    }

    let pass = await bcrypt.hash(password, 10)

    return pass
}

module.exports = {hashPassword}