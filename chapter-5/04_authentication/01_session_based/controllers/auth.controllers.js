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

    verify: async (email, password, done) => {
        try {
            let user = await prisma.user.findFirst({ where: { email } });
            if (!user) {
                return done(null, false, { message: 'invalid email or password' });
            }

            let isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return done(null, false, { message: 'invalid email or password' });
            }
            return done(null, user);
        } catch (error) {
            done(null, false, { message: error.message });
        }
    },

    whoami: async (req, res, next) => {
        try {

        } catch (error) {
            next(error);
        }
    }
};