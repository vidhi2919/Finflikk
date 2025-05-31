const router = require('express').Router();
const { flaggedTransactions, totalBalances, topUsers } = require('../controllers/adminController');

router.get('/flagged', flaggedTransactions);
router.get('/totals', totalBalances);
router.get('/top-users', topUsers);

module.exports = router;