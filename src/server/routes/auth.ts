import Router, {} from 'koa-router';
import passport from 'koa-passport';
import fs from 'fs';
import * as queries from '../db/queries/users';
import { DefaultState, Context } from 'koa';

const router = new Router<DefaultState, Context>();

router.get('/auth/register', async (ctx) => {
   ctx.type = 'html';
   ctx.body = fs.createReadStream('./src/server/views/register.html') 
})

router.post('/auth/register', async (ctx,next) => {
    await queries.addUser(ctx.request.body);

    return passport.authenticate('local',(_,user) => {
        if (user) {
            ctx.login(user);
            ctx.redirect('/auth/status');
        } else {
            ctx.status = 400;
            ctx.body = {status: 'error'}
        }
    })(ctx,next)
})

router.get('/auth/status', (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./src/server/views/status.html');
    } else {
        ctx.redirect('/auth/login')
    }
})

export default router;