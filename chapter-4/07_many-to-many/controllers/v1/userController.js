const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    store: async (req, res, next) => {
        try {
            let { name, email, password } = req.body;
            let exist = await prisma.user.findFirst({ where: { email } });
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used!'
                });
            }

            let user = await prisma.user.create({ data: { name, email, password } });

            res.status(201).json({
                status: true,
                message: 'OK',
                data: user
            });
        } catch (error) {
            next(error);
        }
    },

    show: async (req, res, next) => {
        try {
            let { id } = req.params;

            let user = await prisma.user.findUnique({
                where: { id: Number(id) },
                include: {
                    followers: true,
                    following: true
                }
            });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'user id is not registered!',
                    data: null
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                data: user
            });
        } catch (err) {
            next(err);
        }
    },

    follow: async (req, res, next) => {
        try {
            let userId = Number(req.headers.user_id);
            let followedUserId = Number(req.params.id);

            // validasi
            if (userId == followedUserId) {
                return res.status(400).json({
                    status: false,
                    message: 'invalid user and followed user id',
                    data: null
                });
            }

            let exist = await prisma.follow.findFirst({
                where: {
                    user_id: userId,
                    followed_user_id: followedUserId
                }
            });
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'already followed',
                    data: null
                });
            }

            let follow = await prisma.follow.create({
                data: {
                    user_id: userId,
                    followed_user_id: followedUserId
                }
            });

            res.status(201).json({
                status: true,
                message: null,
                data: follow
            });
        } catch (err) {
            next(err);
        }
    }
};