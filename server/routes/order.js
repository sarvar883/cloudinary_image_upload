const express = require('express');
const router = express.Router();

const orderControlller = require('../controllers/order');

router.post('/new', orderControlller.createOrder);

router.post('/delete', orderControlller.removeOrder);

router.post('/get-all', orderControlller.getAllOrders);

module.exports = router;