const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { createUser, getUserById } = require('../../services/users');

let user = {};

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
            user = result;

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


describe('test getUserById(:id)', () => {
    test(' test cari user dengan id yang sudah terdaftar -> sukses', async () => {
        try {
            let result = await getUserById(user.id);

            expect(result).toHaveProperty('id');
            expect(result).toHaveProperty('name');
            expect(result).toHaveProperty('email');
            expect(result).toHaveProperty('password');
            expect(result.id).toBe(user.id);
            expect(result.name).toBe(user.name);
            expect(result.email).toBe(user.email);
            expect(result.password).toBe(user.password);
        } catch (err) {
            expect(err).toBe('error');
        }
    });

    test('test cari user dengan invalid id -> error', async () => {
        try {
            await getUserById(user.id * -1);
        } catch (err) {
            expect(err).toBe('id tidak terdaftar');
        }
    });
});