const router = require(`koa-router`)()
const userController = require(`controller/user.co.js`);
const {
  parseAuth
} = require("middlewares/parseAuth");

router
  .post('/register/onlyname', userController.createUserWithouPassword)
  .post('/register', userController.createUser)
  .post('/login', userController.login)
  .post('/profile', parseAuth, userController.createProfile)
  .get('/profile', parseAuth, userController.getProfile)
  .patch('/profile', parseAuth, userController.editProfile)
  .patch('/user/edit', parseAuth, userController.editUser)
  .patch('/user/edit-password', parseAuth, userController.editPassword)

module.exports = router