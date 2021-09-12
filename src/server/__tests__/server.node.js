import {app} from '..';
import request from 'supertest';


test('/ returns json', async () => {
   const res = await (request(app.callback()).get('/'));
   expect(res.status).toBe(200);
   expect(res.text).toEqual('Hello World!')
})