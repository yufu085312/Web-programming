const http = require('http');

var server = http.createServer (
    (request, response) => {
        response.setHeader('Content-Type', 'text/html');
        response.write('<!DOCTYPE html><html lang="ja">');
        response.write('<head><meta charset="UTF-8">');
        response.write('<title>Hello</title></head>');
        response.write('<h1>Hello Node.js!</h1>');
        response.write('<p>This is Node.js sample page.</p>');
        response.write('<p>これは、Node.jsのサンプルページです。</p>', 'UTF-8');
        response.write('</body></html>');
        response.end();
    }
);

server.listen(3000);
console.log('Server Start!!');