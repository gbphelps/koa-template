import {app} from '../server';
import request from 'supertest';


test('/ returns json', async () => {
   const res = await (request(app.callback()).get('/'));
   expect(res.status).toBe(200);
   expect(res.type).toEqual('application/json');
   expect(res.body.status).toEqual('success');
   expect(res.body.message).toEqual('hello, world!');
})