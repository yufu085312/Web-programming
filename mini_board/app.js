const http = require('http');
const fs = require('fs');
const ejs = require('ejs');
const url = require('url');
const qs = require('querystring');

const index_page = fs.readFileSync('./index.ejs', 'UTF-8');
const login_page = fs.readFileSync('./login.ejs', 'UTF-8');

const max_num = 10; // 最大保管数
const filename = 'mydata.txt'; // データファイル名
var message_data; // データ
readFromFile(filename);

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!!');

/************************************************/
// createServerの処理
function getFromClient(request, response) {

    var url_parts = url.parse(request.url, true);

    switch (url_parts.pathname) {

        case '/': // トップページ
            response_index(request, response);
            break;
        case '/login': // ログインページ
            response_login(request, response);
            break;    

        default: 
            response.writeHead(200, { 'Content-Type': 'text/plain' });
            response.end('no page...');
            break;  

    }
}

// loginのアクセス処理
function response_login(request, response) {
    var content = ejs.render(login_page, {});
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

// indexのアクセス処理
function response_index(request, response) {
    // POSTアクセス時の処理
    if (request.method == 'POST') {
        var body = '';

        // データ受信のイベント処理
        request.on('data', function(data) {
            body += data;
        });
            
        // データ受信終了のイベント処理
        request.on('end', function() {
            data = qs.parse(body);
            addToData(data.id, data.msg, filename, request); // 全データを取得したらaddToDataメソッドを呼び出す
            write_index(request, response);
        });
    } else {
        write_index(request, response);
    }
}

// indexのページ作成
function write_index(request, response) {
    var msg = "※何かメッセージを書いてください。"
    var content = ejs.render(index_page, {
        title: 'メッセージボード',
        data: message_data,
        filename: 'data_item', //【必須】テンプレート側でパーシャルを実行する
    });
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}

// テキストファイルをロード
function readFromFile(fname) {
    fs.readFile(fname, 'UTF-8', (err, data) => {
        message_data = data.split('\n');
    });
}

// データを更新
function addToData(id, msg, fname, request) {
    var obj = {'id': id, 'msg': msg};
    var obj_str = JSON.stringify(obj); // オブジェクトをJSON形式に変換
    console.log('add_data: ', + obj_str);
    message_data.unshift(obj_str); // 配列の先頭に値を格納（最後に追加されたものが最初に来る）
    if (message_data.length > max_num) {
        message_data.pop(); // データを削除
    }
    saveToFile(fname); // データを保存
}

// データを保存
function saveToFile(fname) {
    var data_str = message_data.join('\n'); // 1つの配列を改行して保存
    fs.writeFile(fname, data_str, (err) => { //fsオブジェクトのwriteFileメソッドを使用してファイルを書き込む
        if (err) {
            throw err;
        }
    });
}