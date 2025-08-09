const express = require('express');
const router = express.Router();
const { getStockData } = require('../controllers/stockController');
const auth = require('../middleware/auth');

router.post('/fetch', auth, getStockData);

module.exports = router;
