import { Context } from "egg";
// import { ErrorStatus } from "./errorStatus";
module.exports = () => {
    return async function checkLogin(ctx: Context, next) {
        // if (!ctx.request.header.cookie) {
        //     throw new ErrorStatus('需要先登录！', ErrorStatus.ERROR_STATUS.PERMISSION_ERROR);
        // }
        // const cookieToken = ctx.helper.cookieToJson(ctx.request.header.cookie);
        // const token = cookieToken.token;
        // if (!token || !ctx.user) {
        //     throw new ErrorStatus('需要先登录！', ErrorStatus.ERROR_STATUS.PERMISSION_ERROR);
        // }

        ctx.service.auth.verifyToken('');
        // const id = ctx.service.auth.getUserIdFromToken(token);

        // const user = await ctx.service.user.findOne(id);

        await next();
    };
}