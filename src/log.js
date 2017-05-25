import winston from 'winston';
import path from 'path';
import dailyRotate from 'winston-daily-rotate-file';

const logger = new (winston.Logger)({
	transports: [
	  	new (winston.transports.Console)(),
	    new (dailyRotate)({
	      colorize: 'true',
	      maxSize: 4 * 1024 * 1024,
	      filename: path.join(path.join(__dirname, '../'), 'cms')
	    })
	]
});	

export default logger;
