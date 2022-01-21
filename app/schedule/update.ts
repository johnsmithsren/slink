'use strict';

exports.schedule = {
    interval: '10m',
    type: 'all',
};

exports.task = async function (ctx) {
    await ctx.service.source.update();
    ctx.app.lastUpdateBy = 'force';
};