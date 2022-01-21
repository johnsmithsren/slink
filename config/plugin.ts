import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  mongoose: {
    enable: true,
    package: 'egg-mongoose'
  },
  redis: {
    enable: true,
    package: 'egg-redis'
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  validate: {
    enable: true,
    package: 'egg-validate'
  }
};

export default plugin;
