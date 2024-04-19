const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password } = req.body;
            if (!name || !email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'name, email and password are required!',
                    data: null
                });
            }

            let exist = await prisma.user.findFirst({ where: { email } });
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email has already been used!',
                    data: null
                });
            }

            let encryptedPassword = await bcrypt.hash(password, 10);
            let user = await prisma.user.create({ data: { name, email, password: encryptedPassword } });
            delete user.password;

            return res.status(201).json({
                status: true,
                message: 'OK',
                data: user
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            let { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({
                    status: false,
                    message: 'email and password are required!',
                    data: null
                });
            }

            let user = await prisma.user.findFirst({ where: { email } });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid email or password!',
                    data: null
                });
            }

            let isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid email or password!',
                    data: null
                });
            }

            delete user.password;
            let token = jwt.sign(user, JWT_SECRET);

            res.json({
                status: true,
                message: 'OK',
                data: { ...user, token }
            });
        } catch (error) {
            next(error);
        }
    },

    whoami: async (req, res, next) => {
        try {
            res.json({
                status: true,
                message: 'OK',
                data: req.user
            });
        } catch (error) {
            next(error);
        }
    }
};