# webpack技术
## webpack简介
webpack是一款非常流行的模块化打包工具，可以将各种资源如Javascript，CoffeScript,样式、图片等等内容都作为模块来处理，如下图所示：
（图）
现在的很多网页都包含非常复杂的逻辑和功能，拥有大量的Javascript代码和非常多的依赖包。为此，前端社区提供了非常的解决方案：
1. 模块化，将单独的功能放在单独的文件中，使用export和import导出和导入
2. 使用基于Javascript的开发语言，如TypeScript、CoffeScript，利用新语言的特性解决项目复杂度问题，然后将其代码编译成为主流浏览器上可以运行的Javascript，在浏览器上运行。
3. CSS预处理器，如Less,Sass。
这些改进在一定程度上提升了开发的效率，CSS预处理器和模块化的开发方式使得中大型项目团队合作更加方便，项目的可维护性也更加好。然而这些第三方的解决方案都需要进行预先的处理才能在浏览器中运行，而手动进行处理又非常的繁琐。webpack的出现正是为了解决这个问题。
## webpack的安装与使用
### 安装
webpack通常使用npm进行全局的安装：
npm install webpack -g
### 配置
在webpack中，每个项目都需要提供一个webpack的配置文件，我们通常将其命名为webpack.config.js,在配置文件中，通常需要配置以下几个配置项：
entry: 页面入口文件配置
output: 输出文件配置
module: 模块加载器配置
resolve: 其他解决方案配置
plugins: webpack引入的插件

我们主要介绍entry,output,以及module的配置
1. entry和output:
entry 为页面的入口文件，output是输出文件配置：
{
    entry: {
        page1: "./page1",
        //支持数组形式，将加载数组中的所有模块，但以最后一个模块作为输出
        page2: ["./entry1", "./entry2"]
    },
    output: {
        path: "dist/js/page",
        filename: "[name].bundle.js"
    }
}

2. module
在module中通过loaders配置加载器
module: {
    //配置加载器
    loaders: [
        //.css 文件使用 style-loader 和 css-loader 来处理
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        //.js 文件使用 jsx-loader 来编译处理
        { test: /\.js$/, loader: 'jsx-loader?harmony' },
        //.scss 文件使用 style-loader、css-loader 和 sass-loader 来编译处理
        { test: /\.scss$/, loader: 'style!css!sass?sourceMap'},
        //图片文件使用 url-loader 来处理，小于8kb的直接转为base64
        { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
}

### 运行
webpack可以在终端中使用，其最基础的命令是

webpack

除此之外，我们可以在运行时提供一些配置参数：
webpack --config
webpack --watch
wabpack -p
webpack -d
