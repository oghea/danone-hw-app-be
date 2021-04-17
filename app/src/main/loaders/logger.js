'use strict'

const { createLogger, format, transports } = require(`winston`);
const colorizer = format.colorize();

const LoggerInstance = createLogger({
  exitOnError: false,
  format: format.combine(
    format.label({ label: 'danone_app' }),
    format.timestamp(),
    format.printf(msg =>
      colorizer.colorize(msg.level, `${msg.timestamp} - ${msg.level}: ${msg.message}`)
    )
  ),
  transports: [
    new transports.Console()
  ]
})

module.exports = LoggerInstance