'use strict';

/** web applications */
import Koa from 'koa';
import Router from 'koa-router';
import views from 'koa-views';

const app = new Koa();
const router = new Router();

/**
 * access log
 */
app.use(async (ctx, next) => {
    const start = new Date;
    await next();

    const ms = new Date - start;
    console.log(`${ctx.method} ${ctx.url} ${ms}ms`);
});


/**
 * error handling
 */
app.use(async (ctx, next) => {
    try {
        await next();
    } catch(err) {
        ctx.body = { message: err.message };
        ctx.status = err.status || 500;
        console.log(err);
    }
});


/**
 * view engine setting
 */
app.use(views(`${__dirname}/view`, {
    extension: 'ejs',
}));


/**
 * touter
 */
router.get('/', async (ctx) => {
    await ctx.render('index', {title: 'Hello koa v2'});
});
app.use(router.routes());



app.listen(3000);
