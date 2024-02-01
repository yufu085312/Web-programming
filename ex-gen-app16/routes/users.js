var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/* GET users listing. */
router.get('/', (req, res, next) => {
    prisma.user.findMany({
        orderBy: [{ name: 'asc' }]
    }).then(users => {
        const data = {
            title: 'Users/Index',
            content: users
        }
        res.render('users/index', data);
    });
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

router.get('/add', (req, res, next) => {
    const data = {
        title: 'Users/Add'
    }
    res.render('users/Add', data);
});

router.post('/add', (req, res, next) => {
    prisma.User.create({
            data: {
                name: req.body.name,
                pass: req.body.pass,
                mail: req.body.mail,
                age: +req.body.age
            }
        })
        .then(() => {
            res.redirect('/users');
        });
});

router.get('/edit/:id', (req, res, next) => {
    const id = req.params.id;
    prisma.user.findUnique({ where: { id: +id } }).then(usr => {
        const data = {
            title: 'Users/Edit',
            user: usr
        };
        res.render('users/edit', data);
    });
});

router.post('/edit', (req, res, next) => {
    const { id, name, pass, mail, age } = req.body;
    prisma.user.update({
        where: { id: +id },
        data: {
            name: name,
            mail: mail,
            pass: pass,
            age: +age
        }
    }).then(() => {
        res.redirect('/users');
    });
});

/*** Delete ***/
router.get('/delete/:id', (req, res, next) => {
    const id = req.params.id;
    prisma.user.findUnique({ where: { id: +id } }).then(user => {
        if (user) {
            const data = {
                title: 'Users/Delete',
                user: user
            };
            res.render('users/delete', data);
        } else {
            // Handle the case where no user is found
            res.status(404).send("User not found");
        }
    });
});


router.post('/delete', (req, res, next) => {
    prisma.User.delete({
        where: { id: +req.body.id }
    }).then(() => {
        res.redirect('/users');
    });
});


module.exports = router;