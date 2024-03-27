const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    // index -> menampilkan semua data
    index: async (req, res, next) => {
        try {
            let users = await prisma.user.findMany();

            res.status(200).json({
                status: true,
                message: 'OK',
                data: users
            });
        } catch (error) {
            next(error);
        }
    },
    // show -> menampilkan 1 data by id
    show: async (req, res, next) => {
        try {
            let id = Number(req.params.id);

            let user = await prisma.user.findUnique({ where: { id } });

            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'can\'t find user with id ' + id,
                    data: null
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                data: user
            });
        } catch (error) {
            next(error);
        }
    },
    // store -> membuat data baru
    store: async (req, res, next) => {
        try {
            if (!req.body.name) {
                return res.status(400).json({
                    status: false,
                    message: 'name is required!',
                    data: null
                });
            }

            let newUser = await prisma.user.create({ data: { name: req.body.name } });

            res.status(201).json({
                status: 'true',
                message: 'OK',
                data: newUser
            });
        } catch (error) {
            next(err);
        }
    }
    // update -> mengupdate data
    // destroy -> menghapuskan
};