var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', (req, res, next) => {
    prisma.User.findMany().then(users => {
        const data = {
            title: 'Users/Index',
            content: users
        }
        res.render('users/index', data);
    });
});

module.exports = router;