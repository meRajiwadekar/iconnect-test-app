require('dotenv').config();

const express = require('express');
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.post('/signup', async(req, res) => {

    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC)
    });
    try {
        const savedUser = await newUser.save();
        return res.status(200).json(savedUser);

    } catch (err) {
        return res.status(500).json(err)
    }

})

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        });
        !user && res.status(401).json({ message: "Wrong Credentials!" });

        const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        originalPassword !== req.body.password && res.status(401).json({ message: "Wrong Credentials!" });

        const accessToken = jwt.sign({
                user: user._id,
                // isAdmin: user.isAdmin
            },
            process.env.JWT_SEC, { expiresIn: "3d" }
        );

        // const { password, ...others } = user._doc
        res.status(200).json({ token: accessToken });

    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;