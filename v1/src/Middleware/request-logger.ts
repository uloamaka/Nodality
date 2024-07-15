import { NextFunction } from 'express';
import Logger from '../Services/logger';
import * as logfmt from 'logfmt';

const logger = new Logger('request-logger');
export default function requestLogger(request: any, response: any, next: any) {
  return (function (req: any, res: any, next: NextFunction) {
    var end = res.end;
    var startTime = new Date().getTime();
    res.end = function (chunk: any, encoding: any) {
      var data = logfmt.requestLogger.commonFormatter(req, res);
      const logData: any = {
        when: new Date(data.time)
          ?.toISOString()
          .replace('T', ' ')
          .replace('Z', ''),
        method: data.method,
        status: data.status,
        path: data.path,
      };

      res.end = end;
      res.end(chunk, encoding);
      const duration = new Date().getTime() - startTime;
      logData.duration = duration / 1000;

      logger.log('', logData);
    };

    next();
  })(request, response, next);
}
