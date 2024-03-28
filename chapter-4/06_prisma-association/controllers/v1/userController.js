const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, age, email, password } = req.body;
            let exist = await prisma.user.findFirst({ where: { email } });
            if (exist) {
                return res.status(400).json({
                    status: false,
                    message: 'email already used!'
                });
            }

            let user = await prisma.user.create({
                data: {
                    email,
                    password,
                    profile: {
                        create: { name, age }
                    }
                },
                include: {
                    profile: true
                }
            });

            res.status(201).json({
                status: true,
                message: 'OK',
                data: user
            });
        } catch (error) {
            next(error);
        }
    }
};