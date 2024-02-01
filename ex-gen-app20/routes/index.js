/* モジュールのロード */
var express = require('express');
var router = express.Router();

/* ルーティングを設定 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* module.expressの設定 */
module.exports = router;
