const router = require(`koa-router`)()
const contactController = require(`controller/contact.co.js`);
const {
  parseAuth,
  isAdmin
} = require("middlewares/parseAuth");

router
  .post('/contact-us', contactController.contactUs)

module.exports = router