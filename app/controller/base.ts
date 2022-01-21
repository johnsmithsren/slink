'use strict';
import { Controller } from "egg";
export default class BaseController extends Controller {
    public check(res, text, req, msg) {
        if (res && res.status === 0) {
            this.serverSuccess(res.data);
            this.operationLogger(req, msg, true);
        } else {
            this.serverError(res.msg || text, req, msg);
        }
    }
    public serverSuccess(data) {
        const { ctx } = this;
        ctx.body = { data };
        ctx.status = 200;
    }
    public serverError(msg, req, text) {
        const { ctx } = this;
        ctx.body = { msg };
        ctx.status = 200;
        this.operationLogger(req, text, false);
    }

    public operationLogger(req, operation, isSuccess) {
        const { ctx } = this;
        const ip = ctx.helper.getClientIp(req);
        if (ctx.user && operation) {
            const username = ctx.user.userName;
            ctx.service.operationalLog.addOperationLog({ ip, username, isSuccess, operation });
        }
    }

    public requestValidate(rules) {

    }
}