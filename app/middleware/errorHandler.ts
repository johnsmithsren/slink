import { Context } from 'egg'
module.exports = () => {
    return async function errorHandler(ctx: Context, next: () => Promise<any>) {
        const method = ctx.request.method;
        if (method === 'OPTIONS') {
            ctx.status = 204;
            return;
        }
        try {
            await next();
        } catch (err) {
            ctx.status = 400;
            ctx.logger.error(err.message);
            // 一般限制报错在长度，过长的报错，也许是内部崩溃导致，这个时候不适合直接暴露出去，
            ctx.body = {
                code: 500,
                msg: err.message.length > 30 ? '服务器异常' : err.message,
                data: null,
            };
        }
    }
};


