const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { createUser } = require('../../services/users');

describe('test createUser()', () => {
    let name = 'usertest1';
    let email = 'usertest1@mail.com';
    let password = 'password123';

    // remove all users
    beforeAll(async () => {
        await prisma.user.deleteMany();
    });

    test('test email belum terdaftar -> sukses', async () => {
        try {
            let result = await createUser(name, email, password);
            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('password');
            expect(result.name).toBe(name);
            expect(result.email).toBe(email);
            expect(result.password).toBe(password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('test email sudah terdaftar -> error', async () => {
        try {
            await createUser(name, email, password);
        } catch (err) {
            expect(err).toBe('email sudah dipakai');
        }
    });
});