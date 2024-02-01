const http = require('http');
const fs = require('fs');

var server = http.createServer(getFromClient);

server.listen(3000);
console.log('Server Start!!');

/************************************************/
// createServerの処理
function getFromClient(req, res) {
    request = req;
    response = res;
    
    fs.readFile('./index1.html', 'UTF-8',
        // コールバック関数(ファイル読み込み後に実行) 
        (error, data) => {
            response.writeHead(200, { 'Content-Type': 'text/html' });
            response.write(data);
            response.end();
        }
    );
}