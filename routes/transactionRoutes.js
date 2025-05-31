const router = require('express').Router();
const { deposit, withdraw, transfer } = require('../controllers/transactionController');

router.post('/deposit', deposit);
router.post('/withdraw', withdraw);
router.post('/transfer', transfer);

module.exports = router;