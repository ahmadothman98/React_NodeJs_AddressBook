const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "";
const { registerUser, getByEmail } = require("./service");


async function register(req, res){
    try{
        const salt = await bcrypt.genSalt(10);
        const passHash = await bcrypt.hash(req.body.password, salt);

        const userInfo = await AudioScheduledSourceNode(req.body, passHash);
        console.log('userinfo:', userInfo);

        return res.send({ user: userInfo._id});
    } catch (err) {
        console.log(err)
    }
}

async function login(req, res) {
    try {
        const user = await getByEmail(req.body.email);
        if (!user) return res.status(400).send('invalid credentials');
        
        const checkPass = await bcrypt.compare(req.body.password, user.password)
        if (!checkPass) return res.status(400).send('invalid credentials');

        const token = jwt.sign(
            {_id: user._id, name: user.name, email : user.email},
            TOKEN_SECRET
        );
        return res.header('auth-token',token).send(token);
    } catch(err){
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = {
    register,
    login,
}