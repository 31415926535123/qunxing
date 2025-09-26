 /*!!!!!不要修改文件，仅启动服务器作用不要修改文件，仅启动服务器作用
 不要修改文件，仅启动服务器作用不要修改文件，仅启动服务器作用不要修改文件，仅启动服务器作用不要修改文件，仅启动服务器作用*/
const http = require('http');


const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
res.sendFile('index.html');
});

server.listen(port, hostname, () => {
  console.log(`服务器运行在 http://${hostname}:${port}/`);
});