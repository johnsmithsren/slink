import { Application } from 'egg';
// 尽量使用export default来导出
export default (app: Application) => {
  const { controller, router } = app;
  router.post('/api/v1/login', controller.v1.auths.login);
  router.resources('users', "/api/v1/users", app.middleware.checkLogin(app), controller.v1.users);

};
