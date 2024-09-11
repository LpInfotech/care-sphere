const express = require('express');
const { login, createPassword, getUsers } = require('../controller/auth.controller');

const router = express.Router();

router.post('/login', login);
router.put('/createPassword/:email', createPassword);
router.get('/users', getUsers);

module.exports = router;
