process.on(`uncaughtException`, (error) => {
  console.log(error);
});

{
  const path = require(`path`);
  global.appRoot = path.resolve(__dirname);

  const aliases = {
    lib: path.resolve(__dirname, `lib`),
    app: path.resolve(__dirname, `app`),
    config: path.resolve(__dirname, `config`),
    loaders: path.resolve(__dirname, `loaders`),
    middlewares: path.resolve(__dirname, `app/middlewares`),
    controller: path.resolve(__dirname, `app/controllers`),
    db: path.resolve(__dirname, `db`),
    models: path.resolve(__dirname, `db/models`),
    routes: path.resolve(__dirname, `app/routes`),
    services: path.resolve(__dirname, `app/services`),
  };

  const Module = require(`module`);
  const $require = Module.prototype.require;
  Module.prototype.require = function () {
    const target = path.parse(arguments[0]);
    if (!target.root) {
      if (target.dir) {
        const dirs = target.dir.split(`/`);
        if (dirs[0] !== `.` && dirs[0] !== `..`) {
          const resolved = aliases[dirs[0]];
          if (resolved) {
            target.dir = path.join(resolved, dirs.slice(1).join(path.sep));
            arguments[0] = path.format(target);
          }
        }
      } else {
        const resolved = aliases[target.name];
        if (resolved) {
          arguments[0] = resolved;
        }
      }
    }
    return $require.apply(this, arguments);
  };
};


const Koa = require(`koa`);
const config = require(`config`);
const Logger = require(`loaders/logger`);


async function startServer() {
  const app = new Koa();

  await require(`loaders`).default({
    koaApp: app
  })

  const server = require(`http`).Server(app.callback());

  server.listen(
    config.server.port,
    config.server.host,
    () => {
      Logger.info(`
      ####################### DANONE ##########################
      🛡️  Server listening on port : ${config.server.port} 
      🛡️  Server mode              : ${config.isProduction}
      🛡️  Server host              : ${config.server.host}
      #########################################################
      `);
    }
  );
}

startServer()