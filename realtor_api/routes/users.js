var express = require('express');
var router = express.Router();

const users_api = require('../db/api/users');

router.get('/', function(req, res, next) {
  users_api.getAllUsers(req.query)
  .then(users => res.status(200).json({users}))
  .catch(error => res.status(500).json({error: error.message}));
});


router.put('/',function(req,res,next) {
  users_api.updateUserStatus(req.body)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({error: error.message}));
})


router.get('/:userId', async function(req,res,next) {
  try {
    users_api.UserbyId(req.params.userId)
  } catch (error) {
      res.status(500).json(error)
  }
});


module.exports = router;