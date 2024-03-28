const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    store: async (req, res, next) => {
        try {
            let { title, body, author_id, categories } = req.body;

            let mappedCategories = categories.map(categoryName => {
                return {
                    category: {
                        create: {
                            name: categoryName
                        },
                    },
                };
            });

            let post = await prisma.post.create({
                data: {
                    title,
                    body,
                    author_id,
                    categories: {
                        create: mappedCategories,
                    },
                },
            });

            res.status(201).json({
                status: true,
                message: 'OK',
                data: post
            });
        } catch (error) {
            next(error);
        }
    },
    index: async (req, res, next) => {
        try {
            let posts = await prisma.post.findMany({
                include: {
                    categories: true
                }
            });

            res.status(200).json({
                status: true,
                message: 'OK',
                data: posts
            });
        } catch (error) {
            next(error);
        }
    }
};