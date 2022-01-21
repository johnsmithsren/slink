import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  // const checkLogin = app.middleware.checkLogin(app);
  router.get('/login', controller.v1.users.login);
  router.resources('users', "/api/v1/users", app.middleware.checkLogin(app), controller.v1.users);

};
