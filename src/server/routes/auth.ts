import Router from 'koa-router';
import passport from 'koa-passport';
import fs from 'fs';
import * as queries from '../db/queries/users';

const router = new Router();

router.get('/auth/register', async (ctx) => {
   ctx.type = 'html';
   ctx.body = fs.createReadStream('./src/server/views/register.html') 
})

router.post('/auth/register', async (ctx, next) => {
    await queries.addUser(ctx.request.body);
    passport.authenticate('local')
})

router.get('/auth/status', async (ctx) => {
    if (ctx.isAuthenticated()) {
        ctx.type = 'html';
        ctx.body = fs.createReadStream('./src/server/views/status.html');
    } else {
        ctx.redirect('/auth/login')
    }
})

export default router;