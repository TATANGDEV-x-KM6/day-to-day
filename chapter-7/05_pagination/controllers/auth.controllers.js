const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

function getPagination(req, page, limit, count) {
    let link = {};
    let path = `${req.protocol}://${req.get('host')}` + req.baseUrl + req.path;

    if (count - page * limit <= 0) {
        link.next = '';
        if (page - 1 <= 0) {
            link.prev = '';
        } else {
            link.prev = `${path}?page=${page - 1}&limit=${limit}`;;
        }
    } else {
        link.next = `${path}?page=${page + 1}&limit=${limit}`;
        if (page - 1 <= 0) {
            link.prev = '';
        } else {
            link.prev = `${path}?page=${page - 1}&limit=${limit}`;
        }
    }

    return {
        link,
        total: count
    };
}

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

    getUsers: async (req, res, next) => {
        try {
            let { page = 1, limit = 10, search } = req.query;
            limit = Number(limit);
            page = Number(page);

            let whereQuery = {};
            if (search) {
                whereQuery.name = {
                    contains: search
                };
            }

            let users = await prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
                where: whereQuery
            });
            let count = await prisma.user.count({ where: whereQuery });

            let pagination = getPagination(req, page, limit, count);

            return res.json({
                status: true,
                message: 'OK',
                data: {
                    users,
                    pagination
                }
            });
        } catch (error) {
            next(error);
        }
    }
};