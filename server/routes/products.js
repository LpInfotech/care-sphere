const express = require('express');
const router = express.Router();
const { createProduct } = require('../controller/products.controller');

router.post('/products', createProduct);

module.exports = router;