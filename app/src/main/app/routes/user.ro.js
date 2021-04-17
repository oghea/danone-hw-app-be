const router = require(`koa-router`)()
const userController = require(`controller/user.co.js`);
const {
  parseAuth
} = require("middlewares/parseAuth");

router
  .post('/register/onlyname', userController.createUserWithouPassword)
  .post('/register', userController.createUser)
  .post('/login', userController.login)
  .post('/profile', userController.createProfile)

module.exports = router