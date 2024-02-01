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
        // レコードを全て取り出す
        db.all("SELECT * FROM mydata", (err, rows) => {
            console.log(rows);
            // DBアクセス完了時の処理
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