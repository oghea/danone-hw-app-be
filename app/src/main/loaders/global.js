(async () => {
  global.Promise = require(`bluebird`);
  global.print = console.log;
  global.println = function() { print(...arguments); print(); };
  global.delay = setTimeout;
  global.later = setImmediate;
  global.repeat = setInterval;
})();