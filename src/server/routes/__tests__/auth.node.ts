import {app} from '../../server';
import request from 'supertest';

test('GET /auth/register', async () => {
    const res = await request(app.callback()).get('/auth/register');
    expect(res.redirects).toHaveLength(0);
})