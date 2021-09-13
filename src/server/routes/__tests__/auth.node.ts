import {app} from '../../server';
import request, {SuperTest} from 'supertest';
import knex from '../../db/connection';



describe('auth routes', () => {

    beforeEach(async () => {
        await knex.migrate.rollback();
        await knex.migrate.latest();
        await knex.seed.run();
    })

    afterEach(async () => {
        await knex.migrate.rollback();
    })

    test('GET /auth/register', async () => {
        const res = await request(app.callback()).get('/auth/register');
        expect(res.status).toEqual(200);
        return;
    })

    test('POST /auth/register', async () => {
        const res = await request(app.callback())
        .post('/auth/register')
        .send({
            username: 'grant',
            password: 'phelps'
        })
        
        expect(res.status).toEqual(302);
        return;
    })
})
