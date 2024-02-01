/* モジュールのロード */
const express = require('express');
const router = express.Router();

/* GETメソッドでクエリパラメーラを取得する */
router.get('/', (req, res, next) => {
    var msg = '※何かメッセージを書いてください。';
    if (req.session.message != undefined) {
        msg = "Last Message: " + req.session.message
    }
    var data = {
        title: 'Hello!', 
        content: msg
    };
    res.render('hello', data);
});

/* POSTメソッドでクエリパラメーラを取得する */
router.post('/post', (req, res, next) => {

    // セッションに値を保存
    var msg = req.body['message'];
    req.session.message = msg;
    
    var data = {
        title: 'Hello!',
        content: "Last Message: " + req.session.message
    }
    res.render('hello', data);  
});

module.exports = router;
