const koaLoader = require('./koa')
const Logger = require('./logger')

exports.default = async ({koaApp}) => {

  // try {
  //   await require(`db`);
  //   Logger.info('✌️ DB Connected');
  // } catch (err) {
  //   process.emit(`uncaughtException`, err);
  //   process.exit();
  // }

  await require('./events')
  Logger.info('✌️ Default event loaded');

  await require('./global')
  Logger.info('✌️ Global loaded');

  await koaLoader({app: koaApp})
  Logger.info('✌️ Koa loaded');
}