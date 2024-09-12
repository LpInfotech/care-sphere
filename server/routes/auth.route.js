const express = require('express');
const { login, createPassword, getUsers } = require('../controller/auth.controller');
const { getVerification,deleteAllVerifications } = require('../controller/verification.controller');

const router = express.Router();

router.post('/login', login);
router.put('/createPassword/:token', createPassword);
router.get('/users', getUsers);
router.get('/verification/:token', getVerification);
router.delete("/deleteAllVerifications", deleteAllVerifications);

module.exports = router;
