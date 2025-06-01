const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  console.log("AUTH HEADER:", req.headers.authorization);

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    console.log("Decoded:", decoded);
    console.log("User:", req.user);
    if (!req.user) return res.status(401).json({ error: 'User not found' });
    next();
  } catch (err) {
    console.error("JWT Error:", err.message);
    return res.status(401).json({ error: 'Invalid token' });
  }
};
