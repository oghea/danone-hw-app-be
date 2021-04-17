const fs = require('fs');
const path = require('path');
const Router = require(`koa-router`);
const bodyParser = require(`koa-body`);
const cors = require(`@koa/cors`);
const koaLogger = require(`lib/responseTimeTrack`);
const error = require(`middlewares/error`);

module.exports = ({app}) => {
  const router = new Router();

  app.proxy = true;

  // Middleware to Handle error
  app.use(error());

  // Enable Cross Origin Resource Sharing to all origins by default
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser({ multipart: true }));

  // Middleware for logging response time
  app.use(koaLogger());

  // Load all api router from router folder
  app.useRouter = (router) => {
    fs.readdirSync(`./src/main/app/routes`).filter(file => fs.statSync(path.join(`./src/main/app/routes`, file)).isFile()).forEach((route) => {
        app.use(require(`routes/${route}`).routes());
    });
    app.use(router.allowedMethods());
  };
  app.useRouter(router);

}