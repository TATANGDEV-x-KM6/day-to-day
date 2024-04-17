const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createUser: async (name, email, password) => {
        try {
            let exist = await prisma.user.findUnique({ where: { email } });
            if (exist) throw 'email sudah dipakai';

            let user = await prisma.user.create({ data: { name, email, password } });
            return user;
        } catch (err) {
            throw err;
        }
    },
    getUserById: async (id) => {
        try {
            let result = await prisma.user.findUnique({ where: { id } });
            if (!result) throw 'id tidak terdaftar';

            return result;
        } catch (error) {
            throw (error);
        }
    }
};