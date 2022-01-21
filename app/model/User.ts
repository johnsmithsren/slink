import { Application } from "egg";
const rand = require('csprng');
const sha1 = require('sha1');
module.exports = (app: Application) => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;
    const UserSchema = new Schema({
        username: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female'], // 0存在 1更新，2 删除
            default: 'male',
        },
        email: {
            type: String,
        },
        password: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            default: '',
        },
        role: {
            type: Number,
            default: 1, // 0： 普通用户，1，管理员
        },
        activated: {
            type: String,
            enum: ['0', '1'], // 0待激活 1已激活
            default: '1',
        },
        createAt: {
            type: Number,
            default: Date.now,
        },
        updatedAt: {
            type: Number,
        },
        deletedAt: {
            type: Number,
        },
        status: { // 状态
            type: String,
            enum: ['0', '1', '2'], // 0存在 1更新，2 删除
            default: '0',
        },
    }, { versionKey: false });
    const UserModel = mongoose.model('Users', UserSchema);
    initialize(UserModel);
    return UserModel;
};

function initialize(UserModel) {
    UserModel.find({}, (err, doc) => {
        if (err) {
            console.log(err);
            console.log('initialize failed');
        } else if (!doc.length) {
            const salt = rand(160, 36);
            new UserModel({
                activated: 1,
                email: 'renjm@sjoy.com',
                username: 'renjm',
                password: sha1('admin' + salt),
                salt,
            }).save();
        } else {
            console.log('initialize successfully');
        }
    });
}