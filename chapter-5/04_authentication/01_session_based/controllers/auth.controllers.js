const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password } = req.body;

            let exist = await prisma.user.findFirst({ where: { email } });
            if (exist) {
                req.flash('error', 'email has already been used!');
                return res.redirect('/register');
            }

            let encryptedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({ data: { name, email, password: encryptedPassword } });
            return res.redirect('/login');
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    },

    whoami: async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    }
};