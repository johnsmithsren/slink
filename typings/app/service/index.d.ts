// This file is created by egg-ts-helper@1.29.1
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportAuth from '../../../app/service/Auth';
import ExportBase from '../../../app/service/Base';
import ExportV1User from '../../../app/service/v1/User';

declare module 'egg' {
  interface IService {
    auth: AutoInstanceType<typeof ExportAuth>;
    base: AutoInstanceType<typeof ExportBase>;
    v1: {
      user: AutoInstanceType<typeof ExportV1User>;
    }
  }
}
