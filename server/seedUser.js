require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user');

const [username, password, role] = process.argv.slice(2);

if (!username || !password || !['admin', 'viewer'].includes(role)) {
  console.log('Usage: node seedUser.js <username> <password> <admin|viewer>');
  process.exit(1);
}

(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const hash = await bcrypt.hash(password, 10);
  await User.findOneAndUpdate(
    { username: username.toLowerCase() },
    { username: username.toLowerCase(), password: hash, role },
    { upsert: true }
  );
  console.log(`${role} "${username}" saved`);
  process.exit(0);
})();