import { Context } from "egg";
import { ErrorStatus } from "./errorStatus";
module.exports = () => {
    return async function checkLogin(ctx: Context, next) {
        if (!ctx.request.header.token) {
            throw new ErrorStatus('需要先登录！', ErrorStatus.ERROR_STATUS.PERMISSION_ERROR);
        }
        const id = ctx.service.auth.getUserIdFromToken(ctx.request.header.token);
        const user = await ctx.service.user.findOne(id);
        ctx.user = user
        await next();
    };
}