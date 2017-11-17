//1. 读取http模快
var http = require('http');

//1.2 读取文件模快
var fs = require('fs');

//1.3 读取path模块
var path = require('path');

//2. 创建服务器
var server = http.createServer();

//3. 服务端接收客户端请求
//   注册一个监听请求事件
server.on('request',function(req,res){
    // 输出客户端的每一次请求
    console.log(req.url);
    //(1)判断客户端请求路径
    if(req.url==='/'){
        //(2)读取静态文件
        fs.readFile('./index.html',function(err,data){
            if(err){
                throw err;
            }
            //(3)返回响应文件的数据
            res.end(data);
        });
    }

    // 通过判断路径的前缀,返回某一个文件夹下的资源
    if(req.url.indexOf('/node_modules')===0){
        fs.readFile(path.join(__dirname,req.url),function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        });
    }

   if(req.url === '/last' || req.url === '/next'){
        // 三目运算
        var jsonName = (req.url==='/last')?'zhangsan.json':'lisi.json';

        fs.readFile(path.join(__dirname,jsonName),function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        })
   }

});

//4. 监听端口号
server.listen(3000,function(){
    console.log('服务器开启成功');
})