import BaseService from "../Base";
const rand = require('csprng');
const sha1 = require('sha1');
// import { ErrorStatus } from "../../middleware/errorStatus";
export default class User extends BaseService {
    public async create(info) {
        const salt = rand(160, 36);
        info = Object.assign(info, {
            activated: 1,
            password: sha1(info.password + salt),
            salt,
        });
        return await this.ctx.model.User.insertMany([info])
    }

    public async findOne(condition) {
        return await this.ctx.model.User.findOne(condition, {
            password: 0,
            salt: 0,
            activated: 0,
        });
    }

    public async findDetail(condition) {
        return await this.ctx.model.User.findOne(condition);
    }

    public async findById(_id) {
        return await this.ctx.model.User.findById({ _id }, {
            password: 0,
            salt: 0,
            activated: 0,
        });
    }

    public async find() {
        return await this.ctx.model.User.find({}, {
            password: 0,
            salt: 0,
            activated: 0,
        });
    }

    public async update(_id, data) {
        return await this.ctx.model.User.updateOne({ _id }, { $set: data });
    }
}