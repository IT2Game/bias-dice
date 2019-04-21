import winston = require('winston');
import configLoader = require('./config-loader');
import path = require('path');

export function createLogger(options?: winston.LoggerOptions | undefined): winston.Logger{
    return winston.createLogger(options || {
        level: configLoader.default.getLogLevel(),
        transports: [
            new winston.transports.File({
                dirname: path.join(__dirname, '..'),
                filename: 'log.txt',
                format: winston.format.combine(
                    winston.format.simple()
                ),
                level: configLoader.default.getLogLevel()
            }), 
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.colorize(),
                    winston.format.simple()
                ),
                level: configLoader.default.getLogLevel()
            })
        ]
    })
}
