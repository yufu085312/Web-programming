/* モジュールのロード */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

/* ルート用モジュール(.js)のダウンロード */
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var hello = require('./routes/hello');

/* Expressオブジェクトの作成と基本設定（テンプレート関係の設定） */
var app = express();
app.set('views', path.join(__dirname, 'views')); // views内のテンプレートファイルの保管場所およびテンプレートエンジンの種類を表す
app.set('view engine', 'ejs');                   // views内のテンプレートファイルの保管場所およびテンプレートエンジンの種類を表す

/* app.useによる関数組み込み */
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* アクセスのためのapp.useを作成 */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/hello', hello);

/* その他のアクセス処理 */
app.use(function(req, res, next) {
  next(createError(404)); // 404エラーをキャッチしてエラーハンドラに転送する
});

app.use(function(err, req, res, next) {

  res.locals.message = err.message; // エラーハンドラ
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500); // エラーページを生成
  res.render('error');
});

/* module.expressの設定 */
module.exports = app; // 設定したオブジェクトに外部からアクセスする
