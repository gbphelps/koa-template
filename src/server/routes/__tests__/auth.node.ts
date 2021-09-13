import {app} from '../../app';
import request from 'supertest';
import knex from '../../db/connection';
import * as userQueries from '../../db/queries/users';



function processRedirects(redirects: string[]){
    return redirects.map((r: string) => {
        const path = /https?:\/\/[^\/]*\/(.*)/.exec(r);
        if (!path) return null;
        return path[1];
    })
}

describe('auth routes', () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    })

    afterEach(async () => {
        await knex.migrate.rollback();
    })

    afterAll(() => {
        knex.destroy();
    })

    test('GET /auth/register', async () => {
        const res = await request(app.callback()).get('/auth/register');
        expect(res.status).toEqual(200);
    })

    test('POST /auth/register', async () => {
        const res = await request(app.callback())
        .post('/auth/register')
        .send({
            username: 'grant',
            password: 'phelps'
        }).redirects(5);
        
        expect(res.status).toEqual(200);
        expect(processRedirects(res.redirects)).toContain('auth/status')
    })

    test('POST /auth/login bad credentials', async () => {
        await userQueries.addUser({username: 'gbp', password: '123'});

        const res = await request(app.callback())
            .post('/auth/login')
            .send({
                username: 'grant',
                password: 'phelps'
            }).redirects(5)
        
        expect(res.status).toEqual(200);
        expect(processRedirects(res.redirects)).toEqual(['auth/login'])
    })

    test('POST /auth/login good credentials', async () => {
        await userQueries.addUser({username: 'gbp', password: '123'});

        const res = await request(app.callback())
            .post('/auth/login')
            .send({
                username: 'gbp',
                password: '123'
            }).redirects(5)
        
        expect(res.status).toEqual(200);
        expect(processRedirects(res.redirects)).toEqual([''])
    })

})
