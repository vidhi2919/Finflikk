const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const walletRoutes = require('./routes/walletRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { authenticate } = require('./middleware/auth');

dotenv.config();
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/wallet', authenticate, walletRoutes);
app.use('/transaction', authenticate, transactionRoutes);
app.use('/admin', authenticate, adminRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => console.log('Server running'));
});