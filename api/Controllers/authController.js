const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "dvvbkknsv6d51vdf3b13sv1s3bdfbsv";

function getUserDataFromReq(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            resolve(userData);
            
        });
    });
}

async function register(req, res) {
    const { name, email, password } = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(userDoc);
    } catch (err) {
        res.status(422).json(err);
    }
}

async function login(req, res) {
    const { email, password } = req.body;
    try {
        const userDoc = await User.findOne({ email });
        if (userDoc) {
            const passOk = bcrypt.compareSync(password, userDoc.password);
            if (passOk) {
                jwt.sign({
                    email: userDoc.email,
                    id: userDoc._id,
                }, jwtSecret, {}, (err, token) => {
                    if (err) throw err;
                    res.cookie('token', token).json(userDoc);
                });
            } else {
                res.status(422).json("Password is incorrect");
            }
        } else {
            res.status(422).json("User Not Found");
        }
    } catch (e) {
        res.status(500).json("Server Error");
    }
}


function profile(req, res) {
    const { token } = req.cookies;
    //console.log("token:", token);
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if (err) throw err;
            const { email, name, id } = await User.findById(userData.id);
            //const newToken = jwt.sign({ id: id }, jwtSecret, { expiresIn: '10m' }); 
            res.json({ email, name, id, token: token });
        });
    } else {
        res.status(401).json("Unauthorized");
    }
}

function logout(req, res) {
    res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'none' }).json("Logged Out Successfully");
}

module.exports = {
    register,
    login,
    profile,
    logout,
    getUserDataFromReq,
};
