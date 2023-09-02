const jwt = require('jsonwebtoken');
const User = require('../model/userSchema');
const dotenv = require('dotenv');
dotenv.config({ path: "../config.env" });

const Authenticate = async (req, res, next)=>{
    console.log('Middleware =============');
    try{
        console.log(req.cookies);
        const token = req.cookies.jwtToken;
        const verifyToken = jwt.verify(token, process.env.SECURITY_KEY);

        const rootUser = await User.findOne({_id: verifyToken._id, "tokens.token":token});
        if(!rootUser){
            throw new Error('User not found');
        }
        req.token = token;
        rew.rootUser = rootUser;
        req.userId = rootUser._id;

        next();

    }catch(err){
        res.status(401).send('Unathorized: No token provided');
        console.log(err);
    }
}

module.exports = Authenticate;