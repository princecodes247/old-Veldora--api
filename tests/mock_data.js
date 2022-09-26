const user = {
  email: 'test@test.com',
  password: 'test1234',
  name: 'test',
  role: 'user',
};

const users = () => {
  const usersArray = [];
  for (let i = 0; i < 21; i++) {
    usersArray.push({
      email: `test${i}@test.com`,
      password: 'test1234',
      name: `test${i}`,
      role: 'user',
    });
  }
  return usersArray;
};

const admin = {
  email: 'admin@admin.com',
  password: 'admin1234',
  name: 'admin',
  role: 'admin',
};

const workspace = {
  name: 'test workspace',
  description: 'test workspace description',
  _id: 'test-workspace',
};
const workspace2 = {
  name: 'test workspace 2',
  description: 'test workspace description 2',
  _id: 'test-workspace-2',
  quota: 1200,
};

const form = {
  name: 'test form',
  description: 'test form description',
  _id: 'test-form',
};

const form2 = {
  name: 'test form 2',
  description: 'test form 2 description',
  _id: 'test-form-2',
};

const submission = {
  _id: 'test-submission',
  form: 'test-form',
  data: {
    name: 'test',
    email: 'submission@gmail.com',
  },
};

module.exports = {
  user,
  users,
  admin,
  workspace,
  form,
  form2,
  submission,
};
