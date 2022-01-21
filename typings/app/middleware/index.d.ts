// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCheckLogin from '../../../app/middleware/checkLogin';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportErrorStatus from '../../../app/middleware/errorStatus';

declare module 'egg' {
  interface IMiddleware {
    checkLogin: typeof ExportCheckLogin;
    errorHandler: typeof ExportErrorHandler;
    errorStatus: typeof ExportErrorStatus;
  }
}
