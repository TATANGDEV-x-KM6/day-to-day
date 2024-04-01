const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    register: async (req, res, next) => {
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
    }
};