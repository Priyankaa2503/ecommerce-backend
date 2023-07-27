const router = require('express').Router();
const User = require('../models/User.js');
const cryptojs = require('crypto-js')
const jwt = require('jsonwebtoken')

// REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: cryptojs.AES.encrypt(req.body.password,process.env.SECRET_KEY).toString()
    });

    try {
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error(error);
        // Check for specific error types and respond accordingly
        if (error.code === 11000) { // MongoDB duplicate key error (unique constraint)
            res.status(400).json({ error: "Username or email already exists." });
        } else {
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username})
        if(!user)
        {
            res.status(401).json({ error: "Wrong Credentials" });
        }
        const hashPass = cryptojs.AES.decrypt(user.password,process.env.SECRET_KEY).toString(cryptojs.enc.Utf8)
        if(hashPass!== req.body.password)
        {
            res.status(401).json({ error: "Incorrect Password" });
        }
        //create a jwt token after successful login 
        const accessToken = jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SECRET_KEY,
        {expiresIn:"3d"});
        // remove password from response 
        //_.doc is used to only return required doc and not the other data mongodb stores in a collection 
        const {password,...data}= user._doc;
        res.status(200).json({...data,accessToken});
    } catch (error) {
        console.error(error);
            res.status(500).json({ error: "Internal server error." });
    }
});
module.exports = router;
