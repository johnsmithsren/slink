
import BaseController from '../base';
// 主要做参数验证等操作
export default class AuthController extends BaseController {
    public async login() {
        const { ctx } = this;
        const createRule = {
            password: {
                type: 'string',
                require: true,
                desc: '登录密码'
            },
            username: {
                type: 'string',
                require: true,
                desc: '登录名'
            }
        };
        this.requestValidate(createRule);
        let { username, password } = ctx.request.body
        let userId = await ctx.service.v1.user.create({ username, password })
        const token = await ctx.service.auth.createToken(userId)
        this.serverSuccess({ token, username })
    }
}
