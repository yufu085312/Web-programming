var express = require('express');
var router = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const pagesize = 3; // 1ページ当たりのレコード数
var lastCursor = 0;
var cursor = 1;

prisma.$use(async(params, next) => {
    const result = await next(params);
    if (result.length > 0) {
        cursor = result[result.length - 1].id;
        if (cursor == lastCursor) {
            cursor = 1;
        }
        lastCursor = cursor;
    }
    return result;
});


/* GET users listing. */
router.get('/', (req, res, next) => {
    //const page = req.query.page ? +req.query.page : 0;
    prisma.user.findMany({
        orderBy: [{ id: 'asc' }],
        cursor: { id: cursor },
        take: 3,
    }).then(users => {
        //cursor = users[users.length - 1].id;
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

//ログイン
router.get('/login', (req, res, next) => {
    var data = {
        title: 'Users/Login',
        content: '名前とパスワードを入力下さい。'
    }
    res.render('users/login', data);
});

router.post('/login', (req, res, next) => {
    prisma.User.findMany({
        where: {
            name: req.body.name,
            pass: req.body.pass,
        }
    }).then(usr => {
        if (usr != null && usr[0] != null) {
            req.session.login = usr[0];
            let back = req.session.back;
            if (back == null) {
                back = '/';
            }
            res.redirect(back);
        } else {
            var data = {
                title: 'Users/Login',
                content: '名前かパスワードに問題があります。再度入力下さい。'
            }
            res.render('users/login', data);
        }
    })
});

module.exports = router;