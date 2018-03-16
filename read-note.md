# npm install express -g

# npm install express-generator -g

# ./node_modules/express-generator/bin/express-cli.js -h

# npm install 安装依赖

# ./node_modules/express-generator/bin/express-cli.js -e [初始化项目]

# __dirname 当前文件夹根目录

# app.use(express.static(path.join(__dirname, 'public'))); 静态路径设置
- path.join(__dirnam）当前文件所在目录

# MVC  Vies视图【视图展示】  Model模型【获取数据】  control控制器【控制流向】

> var app = express();

// 没有挂载路径的中间件，应用的每个请求都会执行该中间件
app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

// 挂载至 /user/:id 的中间件，任何指向 /user/:id 的请求都会执行它
app.use('/user/:id', function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

// 路由和句柄函数(中间件系统)，处理指向 /user/:id 的 GET 请求
app.get('/user/:id', function (req, res, next) {
  res.send('USER');
});


# 应用中间件 app.use()中间件的使用  app.get()处理get请求的数据
~~~

中间件的概念-请求到来后按序经过中间件，经过加工，后next（）不往下传的话调用res.send()且不用next()
~~~

# var router = express.Router(); 路由中间件

> router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method);
  next();
});

# PORT=8080 ./bin/www [自定义设置启动端口]

# nrm npm 快速切换源库

# onchange wath库

# node-inspector  nodejs调试工具  【node --debug xxxxx.js】



