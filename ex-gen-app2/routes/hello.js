/* モジュールのロード */
const express = require('express');
const router = express.Router();

/* GETメソッドでクエリパラメーラを取得する */
router.get('/', (req, res, next) => {
    var data = {
        title: 'Hello!', 
        content: '※何かメッセージを書いてください。'
    };
    res.render('hello', data);
});

/* POSTメソッドでクエリパラメーラを取得する */
router.post('/post', (req, res, next) => {
    var msg = req.body['message'];
    var data = {
        title: 'Hello!',
        content: 'あなたは、「' + msg + '」と送信しました。'
    }
    res.render('hello', data);
});

module.exports = router;
