# Canvas框架测试

## mocha测试框架简介
mocha诞生于2011年，是现在最流行的JavaScript测试框架之一，在浏览器和Node环境都可以使用。
javascript是一门单线程语言，最显著的特点就是有很多异步执行。同步代码的测试比较简单，直接判断函数的返回值是否符合预期就行了，而异步的函数，就需要测试框架支持回调、promise或其他的方式来判断测试结果的正确性了。mocha可以良好的支持javascript异步的单元测试。mocha会串行地执行我们编写的测试用例，可以在将未捕获异常指向对应用例的同时，保证输出灵活准确的测试结果报告。
mocha拥有以下特点：
1. 同时支持node测试和浏览器测试。
2. mocha支持任何可以抛出一个错误的断言模块。例如：should.js、better-assert、expect.js、unexpected、chai等。这些断言库各有各的特点，大家可以了解一下它们的特点，根据使用场景来选择断言库。
3. 支持异步代码，Promise测试。
4. 对BDD和TDD等测试模式都有非常好的支持。

## 测试环境搭建
### node测试环境
为了使用mocha测试框架对项目进行测试，首先使用npm将mocha框架引入到我们的项目当中。
``` javascript
    npm install --save-dev mocha
    npm install --save-dev chai
```
由于项目时使用es6编写的，所以运行测试用例之前，需要使用babel进行转码：
``` javascript
    npm install --save-dev babel-core babel-preset-es2015 
```
然后，在项目目录下面，新建一个.babelrc配置文件。
``` javascript
{
  "presets": [ "es2015" ]
}
```
之后，需要在package.json中配置测试的执行脚本
``` javascript
"scripts": {
    "test": "mocha --compilers js:babel-core/register"
  }
```
配置完成之后，可以通过 npm run test 或者 npm test 这个脚本执行所有的测试用例。

### 浏览器测试环境
在Vanjs的实现中，很多地方都用到的DOM或者BOM的api，这部分的代码无法再Node环境下进行测试，需要在浏览器环境中进行测试。所以需要搭建在浏览器中的测试环境，我们这里采用的是mocha浏览器端的测试方案。
首先需要使用mocha在test目录下初始化浏览器测试环境的目录：
``` javascript
mocha init browser
```
mocha工具会自动在test目录下创建browser文件夹， 并自动在该文件夹下创建以下文件：
index.html
mocha.css
mocha.js
tests.js

要对项目进行测试，我们首先要在index.html中引入van打包后的js文件
``` html
<script src="../../../dist/bundle.js"></script>
```
同时引入断言库chai.js
``` html
<script src="http://chaijs.com/chai.js"></script>
```
此时我们只要在将测试用例写tests.js中，以下为测试用例的示范：
``` javascript
var assert = chai.assert;
describe('创建canvas节点：el,设置canvas样式：canvas', function() {
    it('canvas节点创建成功', function() {
        var canvas = document.querySelector('#stage').querySelector('.main-canvas');
        assert.equal(canvas instanceof Element, true);
    });
    it('canvas属性设置成功', function() {
        var stage = document.querySelector('#stage');
        var canvas = stage.querySelector('.main-canvas');
        assert.equal(canvas.getAttribute('height'), "800");
        assert.equal(canvas.getAttribute('width'), "1000");
        assert.equal(stage.style.background, 'rgb(255, 255, 255)');
    });
});
```
然后在浏览器中打开index.html就可以进行测试了,测试结果将直接显示在页面中：
(图)