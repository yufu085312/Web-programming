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
        prisma.user.findUnique({
            where: { id: id }
        }).then(usr => {
            var data = {
                title: 'Users/Index',
                content: [usr]
            }
            res.render('users/index', data);
        })
    }
});

module.exports = router;