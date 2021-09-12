import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';


const app = new Koa();
const router = new Router();

app.keys = ['placeholder-key'];
app.use(session(app));
app.use(bodyParser());


router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    }
});

app.use(router.routes());

export {app}