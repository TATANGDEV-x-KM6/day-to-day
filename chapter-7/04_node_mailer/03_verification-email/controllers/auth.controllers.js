const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { JWT_SECRET } = process.env;
const { getHTML, sendMail } = require('../libs/nodemailer');

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password, role } = req.body;
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
            let userData = {
                name,
                email,
                password: encryptedPassword
            };
            if (role) userData.role = role;
            let user = await prisma.user.create({ data: userData });
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
            console.log(user);
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
    },

    verifyEmail: async (req, res, next) => {
        try {
            // check token didalam query
            const { token } = req.query;
            // verify token -> ambil user_id
            jwt.verify(token, JWT_SECRET, async (err, data) => {
                if (err) {
                    return res.send('<h1>Failed to Verify</h1>');
                }
                // update is_verified=true where id=user_id
                await prisma.user.update({
                    data: { is_verified: true },
                    where: { id: data.id }
                });
                // render html (success)
                res.send('<h1>Verify Success</h1>');
            });
        } catch (error) {
            next(error);
        }
    },

    requestVerifyEmail: async (req, res, next) => {
        try {
            let token = jwt.sign({ id: req.user.id }, JWT_SECRET);
            let url = `http://localhost:3000/api/v1/verify?token=${token}`;
            let html = await getHTML('verification-code.ejs', { name: 'Joko', verification_url: url });

            await sendMail(req.user.email, 'Verification Email', html);

            return res.json({
                status: true,
                message: 'success',
                data: null
            });
        } catch (error) {
            next(error);
        }
    }
};