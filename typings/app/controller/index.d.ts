// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportBase from '../../../app/controller/base';
import ExportV1Users from '../../../app/controller/v1/users';

declare module 'egg' {
  interface IController {
    base: ExportBase;
    v1: {
      users: ExportV1Users;
    }
  }
}
