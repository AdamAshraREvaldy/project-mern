const mongoose = require('mongoose');
const { urlDb } = require('../config');

mongoose.connect(urlDb)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

const db = mongoose.connection;

db.on('error', (err) => console.error('MongoDB error event:', err));
db.once('open', () => console.log('MongoDB open event: connection established'));

module.exports = db;
