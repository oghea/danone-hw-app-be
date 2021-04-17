const router = require(`koa-router`)()
const hydrationController = require(`controller/hydration.co.js`);
const {
  parseAuth,
  isAdmin
} = require("middlewares/parseAuth");

router
  .post('/hydration', parseAuth, hydrationController.createHydrationHistory)
  .get('/hydration', parseAuth, hydrationController.getHydrationHistory)
  .get('/admin/hydration', parseAuth, isAdmin, hydrationController.getHydrationHistoryAdmin)

module.exports = router