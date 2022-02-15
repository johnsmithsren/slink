// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportV1Auths from '../../../app/controller/v1/auths';
import ExportV1Users from '../../../app/controller/v1/users';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    v1: {
      auths: ExportV1Auths;
      users: ExportV1Users;
    }
  }
}
