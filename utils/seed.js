const db = require('../config/connection');
const User = require('../models/User');

db.once('open', async () => {
  User.deleteMany({});

  const users = [
    {
      username: 'smith',
      email: 'smith@gmail.com'
    },
    {
      username: 'davey',
      email: 'dave@gmail.com'
    },
    {
      username: 'abbs',
      email: 'abbs@gmail.com'
    }
  ];

  await User.collection.insertMany(users);

  console.log('Seeded')
  process.exit(0);
});
