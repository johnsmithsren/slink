
'use strict';

import { Service } from 'egg';
import { ErrorStatus } from "../middleware/errorStatus";
class BaseService extends Service {
    /**
     * @description 子类要重写为当前的model，否则直接报错
     * @example
     * ``` js
     * get document () {
     *  return this.ctx.model.Blog;
     * }
     * ```
     */
    get document() {
        return Promise.reject(new ErrorStatus('BaseService 需要重写 document 属性！', 500));
    }

    /**
     * @description 分页返回数据
     * @param {{
     *  dto?: {[key: String]: String}
     *  searchMap?: {[key: String]: { opt: 'LIKE' | 'IN' | 'NOT_IN', value: String }}
     *  betweenMap?: {[key: String]: String[]}
     *  current?: Number
     *  pageSize?: Number
     *  sort?: {[key: String]: 1 | -1}
     *  filter?: {[key: String]: 1 | 0}
     * }} defaultParams 非前端的，接口默认参数，
     * dto: 精确查找
     * searchMap: 精确查找，LIKE 模糊查询，IN 查询多个，NOT_IN 排除多个，多个用逗号分隔
     * betweenMap: 查询日期 YYYY-MM-DD HH:mm:ss
     * current: 第几页
     * pageSize: 一页多少条
     * sort: 排序 1升序 -1降序
     * filter: 过滤，为空返回全部字段，1显示，0不显示
     * @param {list => list} cb 回调函数
     */
    async queryPage(defaultParams: any = {}, cb) {
        const { body = {} } = this.ctx.request;
        const dto = { ...defaultParams.dto, ...body.dto };
        const searchMap = { ...defaultParams.searchMap, ...body.searchMap };
        const betweenMap = { ...defaultParams.betweenMap, ...body.betweenMap };
        const current = body.current || defaultParams.current || 1;
        const pageSize = body.pageSize || defaultParams.pageSize || 10;
        const sort = { ...defaultParams.sort, ...body.sort };
        const filter = { ...defaultParams.filter, ...body.filter, _id: 0 };

        for (const key in searchMap) {
            if (Object.hasOwnProperty.call(searchMap, key)) {
                const str = searchMap[key];
                if (str.opt && str.opt.toUpperCase() === 'LIKE') {
                    dto[key] = new RegExp(str.value);
                }

                if (str.opt && str.opt.toUpperCase() === 'IN') {
                    const strArr = str.value.split(',');
                    const regStr = strArr.reduce(
                        (pre, next) => (pre ? `${pre}|${next}` : `${next}`),
                        ''
                    );
                    dto[key] = new RegExp(`^(${regStr})$`);
                }

                if (str.opt && str.opt.toUpperCase() === 'NOT_IN') {
                    const strArr = str.value.split(',');
                    const regStr = strArr.reduce((pre, next) => {
                        return pre ? `${pre}${next ? `|(^${next}$)` : ''}` : `(^${next}$)`;
                    }, '');

                    dto[key] = new RegExp(`^$|^((?!${regStr}).)+$`);
                }
            }
        }

        for (const key in betweenMap) {
            if (Object.hasOwnProperty.call(betweenMap, key)) {
                const dateArr = betweenMap[key];
                if (Array.isArray(dateArr) && dateArr.length > 0) {
                    dto[key] = {
                        $gte: dateArr[0] ? new Date(dateArr[0]).getTime() : Date.now(),
                        $lte: dateArr[1] ? new Date(dateArr[1]).getTime() : Date.now(),
                    };
                }
            }
        }

        // 总数
        // @ts-ignore
        const total = await this.document.find(dto, filter).count();
        // @ts-ignore
        let list = await this.document.find(dto, filter).sort(sort).skip((current - 1) * pageSize)
            .limit(pageSize);

        if (cb) {
            list = cb(list);
        }

        return {
            list,
            current,
            pageSize,
            total,
        };
    }

}

export default BaseService;