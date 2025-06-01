const express = require('express');
const router = require('express').Router();
const { scanTransaction } = require('../controllers/fraudScanController');
const { authenticate } = require('../middleware/auth');

router.post('/scan', authenticate, scanTransaction);

router.get('/test', authenticate, (req, res) => {
  res.json({ message: 'Token is valid', user: req.user });
});


module.exports = router;
