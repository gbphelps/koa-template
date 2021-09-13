import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import {configurePassport} from './auth';
import passport from 'koa-passport';
import authRoutes from './routes/auth';

const app = new Koa();
const router = new Router();

app.keys = ['placeholder-key'];
app.use(session(app));
app.use(bodyParser());

configurePassport();
app.use(passport.initialize());
app.use(passport.session());


router.get('/', async (ctx) => {
    ctx.body = {
        status: 'success',
        message: 'hello, world!'
    }
});

app.use(router.routes());
app.use(authRoutes.routes());

export {app}