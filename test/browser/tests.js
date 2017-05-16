var assert = chai.assert;

describe('Van初始化参数', function() {
    var van = new Van({
        el: '#stage',
        canvas: {
            width:1000,
            height:800,
            background: "#fff"
        },
        data: {
            x: 100,
            y: 100
        },
        methods: {
            sayHi: function() {
                return 1;
            },
            callSayHi: function() {
                return this.sayHi();
            }
        },
        // 这里不要再用数组了，使用一个对象
        components: [
        ],
        area: function() {
            return true;
        },
        listener: {
            click: [function() {
                this.$dispatch("clicks",{});
            }],
        }
    });

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

    describe('内置方法：methods', function() {
        it('能找到sayHi这个内置方法', function() {
            assert.typeOf(van.sayHi, 'function');
        });
        it('调用这个内置方法有正确的返回值', function() {
            assert.equal(van.sayHi(), 1);
        });
        it('组件内部通过this.functionName的方式调用内置方法', function() {
            assert.equal(van.callSayHi(), 1);
        });
    });

    describe('生命周期钩子：hooks', function() {
        it('beforeCreate', function() {
            assert.typeOf(van.sayHi, 'function');
        });
        it('afterCreate', function() {
            assert.equal(van.sayHi(), 1);
        });
        it('组件内部通过this.functionName的方式调用内置方法', function() {
            assert.equal(van.callSayHi(), 1);
        });
    });
});