import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
const path = require('path');
const os = require('os');
export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  const whitelist = [
    // images
    '.jpg', '.jpeg', // image/jpeg
    '.png', // image/png, image/x-png
    '.gif', // image/gif
    '.bmp', // image/bmp
    '.wbmp', // image/vnd.wap.wbmp
    '.webp',
    '.tif',
    '.psd',
    // text
    '.svg',
    '.js', '.jsx',
    '.json',
    '.css', '.less',
    '.html', '.htm',
    '.xml',
    // tar
    '.zip',
    '.gz', '.tgz', '.gzip',
    // video
    '.mp3',
    '.mp4',
    '.avi',
  ];
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1642059118599_2563';

  // add your egg config in here
  config.middleware = ['errorHandler'];
  config.multipart = {
    mode: 'stream',
    fileModeMatch: /^\/uploadFile$/,
    tmpdir: path.join(os.tmpdir(), 'egg-multipart-tmp', appInfo.name),
    cleanSchedule: {
      // run tmpdir clean job on every day 04:30 am
      cron: '0 30 4 * * *',
    },
    fileSize: '50mb',
    whitelist,
  };
  config.jwt = {
    secret: "V27uHXLZm64MhbNrfq8a",

  };
  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };
  // mongodb 配置文件
  config.mongoose = {
    url: 'mongodb://platform:C1Q7U1GQLYff4LsHBKfs@10.1.1.209:28017/sjoy-slink',
    options: {
      useUnifiedTopology: true,
      poolSize: 40
    },
  }
  config.security = {
    csrf: { enable: false }
  }
  const redisConfig = {
    client: {
      port: 6380,          // Redis port
      host: '10.1.1.209',   // Redis host
      password: 'sjoy',
      db: 3,
    },
  }

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
    ...redisConfig,

  };
};
