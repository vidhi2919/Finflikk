# Digital Wallet API(FinFlikk)

A secure and scalable Digital Wallet API with features including wallet management, transaction handling, fraud detection, and admin reporting.

---

## Features

- **Wallet Management:** Create and fetch wallets by currency per user.
- **Transaction Processing:** Transfer funds between wallets with validation.
- **Fraud Detection:** Automatic flagging of suspicious transactions.
- **Soft Delete:** Non-destructive deletion of transactions and wallets.
- **Admin Reports:** View flagged transactions, total balances, and top users.
- **Email Alerts:** Mock email notifications for suspicious or large transactions.
- **Scheduled Jobs:** Daily fraud scans via cron job.

---

## Technologies Used

- Node.js & Express.js for API backend  
- MongoDB & Mongoose for database  
- JWT for authentication  
- node-cron for scheduling tasks  
- Nodemailer (mocked) for email alerts  

---

## Getting Started

### Prerequisites

- Node.js (v16+)  
- MongoDB (local or Atlas)  

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/digital-wallet.git
   cd digital-wallet
2.Install dependencies:
  npm install
3.Configure environment variables in .env (create this file):
  PORT=3000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  EMAIL_USER=your_email@example.com
  EMAIL_PASS=your_email_password
4.Run the development server:
  npm run dev

## API Endpoints
Refer to the expanded API Documentation PDF for full details.

## Folder Structure
├── controllers/          # Request handlers for routes

├── models/               # Mongoose schemas

├── routes/               # Express routes

├── cron/                 # Scheduled jobs (fraud scans)

├── utils/                # Utility functions (email alerts, etc.)

├── server.js             # App entry point

├── package.json          

└── README.md             

Notes
Wallet deletion endpoint is intentionally excluded due to stability concerns.
Admin routes should be protected with role-based middleware (not included here).
Email alerts are mocked for development and testing.




