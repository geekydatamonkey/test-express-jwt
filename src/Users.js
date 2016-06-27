import bcrypt from 'bcryptjs';
import Promise from 'bluebird';

Promise.promisifyAll(bcrypt);

// fake DB
const usersRaw = [
  {
    username: 'admin',
    password: '54321',
  }, {
    username: 'james',
    password: '12345',
  },
];

const usersHashed = Promise.map(usersRaw, (user) => {
  return bcrypt.hashAsync(user.password, 10)
    .then((hashedPass) => {
      return {
        username: user.username,
        password: hashedPass,
      };
    });
});

function findOne(username) {
  return usersHashed
    .then((users) => {
      return users.find(u => {
        return u.username === username;
      });
    })
    .catch((err) => {
      console.error(err);
    });
}

function auth({ username, password }) {
  return findOne(username)
    .then((user) => {
      return bcrypt.compareAsync(password, user.password);
    });
}

const Users = {
  findOne,
  auth,
};

export default Users;
