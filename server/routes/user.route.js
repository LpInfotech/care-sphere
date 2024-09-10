const express = require('express');
const router = express.Router();
const { createUser,deleteAllUsers } = require('../controller/user.controller');

router.post('/user', createUser);
router.delete("/deleteAllUsers", deleteAllUsers);

module.exports = router;
