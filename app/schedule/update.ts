'use strict';

exports.schedule = {
    interval: '1000m',
    type: 'all',
    disbale: true
};

exports.task = async function (ctx) {
    await ctx.service.source.update();
    ctx.app.lastUpdateBy = 'force';
};