/* モジュールのロード */
const express = require('express');
const router = express.Router();
const https = require('https');
const parseString = require('xml2js').parseString;

/* GETメソッドでクエリパラメーラを取得する */
router.get("/", (req, res, next) => {
    var opt = {
        host: 'news.google.com',                              // ポスト（ドメイン）
        port: 443,                                            // ポート番号
        path: '/rss?hl=ja&ie=UTF-8&oe=UTF-8&gl=JP&ceid=JP:ja' // パス（ドメイン以降の部分）
    };
    https.get(opt, (res2) => {
        var body = '';
        res2.on('data', data => {
            body += data;
        });
        res2.on('end', () => {
            parseString(body.trim(), (err, result) => {
                console.log(result);
                var data = {
                    title: 'Google News',
                    content: result.rss.channel[0].item  // データを配列形式で取得し、0番目で初期化する
                };
                res.render('hello', data);
            });
        });
    });
});

module.exports = router;