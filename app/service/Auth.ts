import { Service } from 'egg';
const dayjs = require("dayjs");
export default class Auth extends Service {

    public async createToken(userId) {
        const now = dayjs().unix();
        const config = this.app.config.jwt;
        return this.app.jwt.sign({
            iat: now,
            nbf: now,
            exp: now + 3600 * 12,
            userId: userId,
        }, config.secret)
    }

    public async verifyToken(token) {
        if (!token) {
            throw new Error('token 不存在');
        }
        const secret = this.app.config.jwt.secret;
        try {
            await this.app.jwt.verify(token, secret);
        } catch (e) {
            if (e.message === 'jwt expired') {
                throw new Error('jwt expired');
            }
            throw new Error('验证失败');
        }
        return true;
    }

    public async getUserIdFromToken(token) {
        await this.verifyToken(token);

        const res = await this.app.jwt.decode(token);
        return res;
    }

}
