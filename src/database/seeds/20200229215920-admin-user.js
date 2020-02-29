const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'users',
      [
        {
          name: 'Fast Feet Administrator',
          email: 'admin@fastfeet.com.br',
          password_hash: bcrypt.hashSync('fast2359admin', 8),
          created_at: new Date(),
          updated_at: new Date(),
          admin: true,
        },
      ],
      {}
    );
  },

  down: () => {},
};
