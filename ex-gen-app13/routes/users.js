var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', (req, res, next) => {
    const id = +req.query.id;
    if (!id) {
        prisma.User.findMany().then(users => {
            const data = {
                title: 'Users/Index',
                content: users
            }
            res.render('users/index', data);
        });
    } else {
        prisma.user.findMany({
            where: { id: { lte: id } }
        }).then(usrs => {
            var data = {
                title: 'Users/Index',
                content: usrs
            }
            res.render('users/index', data);
        })
    }
});

router.get('/find', (req, res, next) => {
    const min = +req.query.min;
    const max = +req.query.max;
    prisma.user.findMany({
        where: {
            AND: [
                { age: { gte: min } },
                { age: { lte: max } }
            ]
        }
    }).then(usrs => {
        var data = {
            title: 'Users/Find',
            content: usrs
        }
        res.render('users/index', data);
    });
});

module.exports = router;