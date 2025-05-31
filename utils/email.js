exports.sendAlertEmail = async (txn) => {
  console.log(`ALERT: Suspicious transaction flagged: ${txn._id}, Reason: ${txn.reason}`);
};