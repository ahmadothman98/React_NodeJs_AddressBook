const User = require('../../model/User');

async function registerUser(body, hashPassword) {
    const {
        name,
        email,

    } = body;

    const user = new User({
        name,
        email,
        password: hashPassword
    });
    return await user.save();
}

async function getByEmail(email) {
    return await User.findOne({
        email
    });
}
module.exports = {
    registerUser,
    getByEmail,
}