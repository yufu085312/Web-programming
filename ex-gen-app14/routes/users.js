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
    const name = req.query.name;
    const mail = req.query.mail;

    let whereClause = {};
    if (name) {
        whereClause.name = { contains: name };
    }
    if (mail) {
        whereClause.mail = { contains: mail };
    }

    prisma.user.findMany({
        where: {
            OR: [whereClause]
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