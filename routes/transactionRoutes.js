// const router = require('express').Router();
// const { deposit, withdraw, transfer } = require('../controllers/transactionController');

// router.post('/deposit', deposit);
// router.post('/withdraw', withdraw);
// router.post('/transfer', transfer);

// module.exports = router;

const router = require('express').Router();
const { deposit, withdraw, transfer , softDeleteTransaction} = require('../controllers/transactionController');
const { authenticate } = require('../middleware/auth');

router.post('/deposit', authenticate, deposit);
router.post('/withdraw', authenticate, withdraw);
router.post('/transfer', authenticate, transfer);
router.delete('/transaction/:id', softDeleteTransaction);

module.exports = router;