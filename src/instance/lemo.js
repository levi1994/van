import arrayUtil from '../util/array.js';
import LNode from '../template/lnode.js';
import { WatcherCache } from '../template/watcher.js';
import { isObject, isArray } from '../util/index.js';


class Lemo {
  constructor(option) {
    this._init(option);
  }
  _init(option) {
    this._watchers = new WatcherCache();
    // 初始化所有数据
    this.$data = this._initData(this, option.data, []);
    // 将$data的数据绑定到vm上
    this._copyLink(this);
    // 解析计算属性
    this._parseComputed(option.computed);
    // 对页面模板进行渲染
    this._el = document.querySelector(option.el);
    // 解析模板
    this._parseTemplate(this._el);

    // 渲染
    this._watchers.exec(this);
  }

  _parseTemplate(el) {
    let childNodes = el.childNodes;
    if (childNodes.length > 0) {
      childNodes.forEach(val => {
        this._parseTemplate(val);
      });
    } else {
      let lnode = new LNode(this, el);
      this._watchers.registeNode(lnode);
    }
  }

  // 解析计算属性
  _parseComputed(vm, computeds) {
    for (let key in computed) {
      // 在_wachers中添加watcher
      vm._watchers.addWatcher([].push(key)]);
      let computed = computed[key];
      let value = computed.apply(vm);
      // 定义getter和setter
      Object.defineProperty(vm, key, {
        configurable: true,
        enumerable: true,
        get: function() {
          return value;
        },
        set: function(val) {
          console.log("正在个计算属性"+key+"设值");
        }
      });
      // 增加在watcher

    }
  }

  /**
   * [_initData 对数据进行处理，返回数据的响应式对象]
   * @param  {object} vm   [view model]
   * @param  {object} data [数据]
   * @param  {array}  invokeStack [当前调用栈]
   * @return {[type]}      [响应式对象]
   */
  _initData(vm, data, invokeStack) {
    // 需要返回的响应式对象
    let responseObj = {};
    if (isObject(data)) {

      // 如果是数组的话要特殊对待
      if (isArray(data)) {
        responseObj = [];
        data.forEach(function(val, key) {
          let invoke = JSON.parse(JSON.stringify(invokeStack));
          invoke.push(key);
          responseObj[key] = vm._initData(vm, val, invoke);
        });
        arrayUtil(vm, responseObj);
        return responseObj;
      }
      for (let key in data) {
        let invoke = JSON.parse(JSON.stringify(invokeStack));
        invoke.push(key);
        // value是对象的真实值，而返回的responseObj只是
        // 拥有setter和getter的响应式对象
        let value = vm._initData(vm, data[key], invoke);
        Object.defineProperty(responseObj, key, {
          configurable: true,
          enumerable: true,
          get: function() {
            // console.log('正要返回'+key);
            return value;
          },
          set: function(val) {
            value = vm._initData(vm, val, invoke);
            vm._watchers.exec(vm, invoke);
          }
        });
      }
    } else {
      responseObj = data;
      // 并且为这个数据添加watcher
      vm._watchers.addWatcher(invokeStack);
    }
    return responseObj;
  }

  _copyLink(vm) {
    for (let key in vm.$data) {
      Object.defineProperty(vm, key, {
        set: function(val) {
          vm.$data[key] = val;
        },
        get: function() {
          return vm.$data[key];
        }

      });
    }
  }

}

export default Lemo;
