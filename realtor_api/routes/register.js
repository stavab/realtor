var express = require('express');
var router = express.Router();
const crypto = require('crypto');
const users_api = require('../db/api/users');

router.post('/', async function(req, res, next) {
    const {first_name,last_name,email,password,phone} = req.body;
    if(!email || !password || !first_name || !last_name || !phone) {
        res.send('please fill all fields');
        return;
    } 

    const token = crypto.pbkdf2Sync(password, 'realtorrocks', 100000, 64, 'sha512');
    const passwordHashed = token.toString('base64');

    let new_user = {
        role_id: 2,
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: passwordHashed, 
        phone: phone
    }

    registerd_user = await users_api.RegisterUser(new_user);
    try {
        if (!registerd_user) {
            console.log("something wrong")
        } else {
            res.status(200).json('ok');
        } 
    } catch (error) {
        res.status(500).json(error)
    }
})


module.exports = router;
