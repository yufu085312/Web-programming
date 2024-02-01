const http = require('http');
const fs = require('fs');
const ejs = require('ejs'); // ejsオブジェクトの読み込み

const index_page = fs.readFileSync('./index2.ejs', 'UTF-8'); // テンプレートファイルの読み込み

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!!');

/************************************************/
// createServerの処理
function getFromClient(request, response) {
    var content = ejs.render(index_page, {
        title: "Indexページ",
        content: "これはテンプレートを使ったサンプルページです。",
    }); // レンダリングの実行
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}