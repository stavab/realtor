var express = require('express');
var router = express.Router();
const users_api = require('../db/api/users');

router.post('/', async function(req,res,next) {
    const {email, password} = req.body;
    if(!email || !password) {
        res.send('please fill all fields');
        return;
    } 
    user = await users_api.SearchUser(email, password)
    try {
        if (user.length === 0) {
            res.status(401).jason({status: 401, error:'invalid email or password'})
        } else {
            res.cookie('logged-user', JSON.stringify(user), {maxAge: 1000 *60 *60 *24});
            res.status(200).json('ok');
        } 
    } catch (error) {
        res.status(500).json(error)
    }

});


module.exports = router;