const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
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