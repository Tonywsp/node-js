//1. 导入path路径模块
var path = require('path');

//2. 获取文本文件的相对路径
console.log('./01-path模块使用.js');

//3. 获取文件的绝对路径  参数是相对路径
var abPath = path.resolve('..//01-WEB开发路径的问题/04.nodejs服务端相对路径的问题/index.html');

console.log('dirname'+__dirname); // 获取当前文件所处文件夹的绝对路径
console.log('__filename'+__filename); // 获取当前文件夹的绝对路径

//4. 通过文件夹拼接的方式可以获取该文件夹其他文件的真实绝对路径
console.log(__dirname + '/a.txt');

var joinPath = path.join(__dirname,'//a','///b','c.txt');

console.log(joinPath);

console.log('resolve' + abPath);

//5. 路径的解析
var parse = path.parse(joinPath);

console.log(parent);