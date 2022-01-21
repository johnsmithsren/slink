
import BaseController from '../base'
export default class UserController extends BaseController {
  public async login() {
    const { ctx } = this;
    let { username, password } = ctx.request.body
    username = '土豆'
    password = 'qwe'
    let userId = await ctx.service.v1.user.create({ username, password })
    const token = await ctx.service.auth.createToken(userId)
    this.serverSuccess(token)
  }

  public async create() {
    const { ctx } = this;
    let info = ctx.request.body
    let userId = await ctx.service.v1.user.create(info)
    const token = await ctx.service.auth.createToken(userId)
    this.serverSuccess(token)
  }

  public async show() {
    const { ctx } = this;
    let info = ctx.request.body
    let userId = await ctx.service.v1.user.create(info)
    const token = await ctx.service.auth.createToken(userId)
    this.serverSuccess(token)
  }


}
