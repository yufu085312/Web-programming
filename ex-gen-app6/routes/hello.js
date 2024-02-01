/* モジュールのロード */
const express = require('express');
const sqlite3 = require('sqlite3'); // SQLite3モジュールを追加

const router = express.Router();



/* DBオブジェクトの取得 */
const db = new sqlite3.Database('mydb.db');

/* GETアクセスの処理 */
// データベースのシリアライズ
router.get('/', (req, res, next) => {
    db.serialize(() => {
        var rows = "";
        db.each("SELECT * FROM mydata", (err, row) => {
            if (!err) {
                // 1レコードずつ取り出してマージする
                rows += "<tr>" +
                    "<th>" + row.id + "</th>" +
                    "<td>" + row.name + "</td>" +
                    "</tr>"
            }
        }, (err, count) => {
            console.log(rows);
            if (!err) {
                var data = {
                    title: 'Hello!',
                    content: rows // 取得したレコード
                };
                res.render('hello', data);
            }
        });
    });
});


module.exports = router;