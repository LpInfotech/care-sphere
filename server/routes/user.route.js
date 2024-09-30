const express = require('express');
const router = express.Router();
const { createUser,deleteAllUsers } = require('../controller/user.controller');

router.post('/users', createUser);
router.delete("/users/deleteAllUsers", deleteAllUsers);

module.exports = router;
