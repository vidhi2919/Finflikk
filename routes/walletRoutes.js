// const router = require('express').Router();
// const { createOrGetWallet, getAllWallets } = require('../controllers/walletController');
// const { authenticate } = require('../middleware/auth');
// router.post('/', createOrGetWallet);
// router.get('/', getAllWallets);

// module.exports = router;

const router = require('express').Router();
const { createOrGetWallet, getAllWallets} = require('../controllers/walletController');
const { authenticate } = require('../middleware/auth');


router.post('/', authenticate, createOrGetWallet);
router.get('/', authenticate, getAllWallets);

module.exports = router;