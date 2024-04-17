const app = require('../../app');
const request = require('supertest');

describe('test POST /api/v1/users endpoint', () => {
    let name = 'usertest2';
    let email = 'usertest2@mail.com';
    let password = 'password123';

    test('test email belum terdaftar -> succes', async () => {
        try {
            let { statusCode, body } = await request(app)
                .post('/api/v1/users')
                .send({ name, email, password });

            expect(statusCode).toBe(201);
            expect(body).toHaveProperty('status');
            expect(body).toHaveProperty('message');
            expect(body).toHaveProperty('data');
            expect(body.data).toHaveProperty('id');
            expect(body.data).toHaveProperty('name');
            expect(body.data).toHaveProperty('email');
            expect(body.data).toHaveProperty('password');
            expect(body.data.name).toBe(name);
            expect(body.data.email).toBe(email);
            expect(body.data.password).toBe(password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('test email sudah terdaftar -> error', async () => {
        try {
            let { statusCode, body } = await request(app)
                .post('/api/v1/users')
                .send({ name, email, password });

            expect(statusCode).toBe(400);
        } catch (err) {
            expect(err).toBe('email sudah dipakai');
        }
    });
});