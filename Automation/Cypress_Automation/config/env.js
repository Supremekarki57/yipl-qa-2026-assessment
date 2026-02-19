// Environment Constants
const ENV = {
  BASE_URL: "https://practice.expandtesting.com/notes/app",

  TEST_USER: {
    username: "testuser123",
    email: "testuser123@example.com",
    password: "Test@123456",
  },

  VALID_LOGIN: {
    username: "testuser123",
    password: "Test@123456",
  },

  INVALID_LOGIN: {
    username: "invaliduser",
    password: "wrongpassword",
  },
};

module.exports = { ENV };
