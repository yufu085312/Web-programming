const http = require('http');
const fs = require('fs');
const ejs = require('ejs'); // ejsオブジェクトの読み込み

const index_page = fs.readFileSync('./index1.ejs', 'UTF-8'); // テンプレートファイルの読み込み

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!!');

/************************************************/
// createServerの処理
function getFromClient(request, response) {
    var content = ejs.render(index_page); // レンダリングの実行
    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(content);
    response.end();
}