const Wallet = require('../models/Wallet');

exports.createOrGetWallet = async (req, res) => {
  const { currency } = req.body;
  try {
    console.log("Inside createOrGetWallet. req.user:", req.user);
    let wallet = await Wallet.findOne({ user: req.user._id, currency });
    if (!wallet) {
      wallet = new Wallet({ user: req.user._id, currency });
      await wallet.save();
    }
    res.json(wallet);
  } catch (error) {
    console.error('Error in createOrGetWallet:', error);
    res.status(500).json({ error: 'Failed to get or create wallet' });
  }
};

exports.getAllWallets = async (req, res) => {
  try {
    const wallets = await Wallet.find({ user: req.user._id, isDeleted: false });
    res.json(wallets);
  } catch (error) {
    console.error('Error in getAllWallets:', error);
    res.status(500).json({ error: 'Failed to fetch wallets' });
  }
};
