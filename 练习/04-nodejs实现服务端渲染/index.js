//1. 导入http模块
var http = require('http');

//1.2 导入文件模块
var fs = require('fs');

//1.3 导入path模块
var path = require('path');

//1.4 导入模板引擎模块
var art_template = require('art-template');

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
            //(3)响应返回文件数据
            res.end(data);
        })
    }

    //通过判断路径的前缀，返回某一个文件夹下的资源
    if(req.url.indexOf('/node_modules')===0){
        fs.readFile(path.join(__dirname,req.url),function(err,data){
            if(err){
                throw err;
            }
            res.end(data);
        })
    }

    if(req.url === '/last' || req.url === '/next'){

        var jsonName = (req.url==='/last')?'zhangsan.json':'lisi.json';

        //1. 读取html模板
        fs.readFile(path.join(__dirname,'index.html'),'utf-8',function(err,tpldata){
            if(err){
                throw err;
            }
            //2. 读取要渲染的数据
            fs.readFile(path.join(__dirname,jsonName),'utf-8',function(err,jsondata){
                if(err){
                    throw err;
                }
                //3. 引用模板引擎渲染
                //   render参数是一个对象，读取json文件得到是一个字符串，所以这里需要将字符串转成json对象
                var jsonObjc = JSON.parse(jsondata);
                // 简化步骤 写成一句代码
                var htmlStr = art_template.compile(tpldata)(jsonObjc);

                //4. 响应返回给客户端渲染好的html文本
                res.end(htmlStr);
            })
        })
    }

})

//4. 监听窗口号
server.listen(3000,function(){
    console.log('服务器开启成功');
})