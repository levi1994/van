# Canvas框架测试

## mocha测试框架简介
mocha诞生于2011年，是现在最流行的JavaScript测试框架之一，在浏览器和Node环境都可以使用。它是一个功能丰富的JavaScript测试框架，运行在node.js和浏览器上，使异步测试变得简单而有趣。摩卡测试连续运行，允许灵活准确的报告，同时将未捕获的异常映射到正确的测试用例。
首先介绍一下几个重要Mocha的接口，
suite：定义一组测试用例。
suiteSetup：此方法会在这个suite所有测试用例执行前执行一次，只一次，这是跟setup的区别。
setup：此方法会在每个测试用例执行前都执行一遍。
test：具体执行的测试用例实现代码。
teardown：此方法会在每个测试用例执行后都执行一遍，与setup相反。
suiteTeardown：此方法会在这个suite所有测试用例执行后执行一次，与suiteSetup相反。

## 