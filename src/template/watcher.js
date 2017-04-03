import {isObject, isArray} from '../util/index';

/**
 * 存放所有的watcher
 * 每一个根属性(不为对象的属性)都在watcher池中有一个watcher
 * watcher在data初始化时通过addWatcher方式添加
 * watcher所包含的LNode(封装的节点)在解析模板时通过registeNode
 * 分发给watcher添加
 */
class WatcherCache {
  constructor() {
    this.watchers = {};
    // 为vm的所有非对象属性创建watcher
    // 每个watcher的属性名为 invokeStack
  }

  // 传入的调用栈
  getWatcher(invokeStack) {
    return this.watchers[invokeStack.join('+')];
  }

  addWatcher(invokeStack) {
    let watcher = new Watcher(invokeStack);
    if (!this.watchers[invokeStack.join('+')]) {
      this.watchers[invokeStack.join('+')] = watcher;
    }
  }

  // 获取node里面所有的invokeStack,并据此将其添加至各个watcher
  registeNode(node) {
    var values = node.values;
    values.forEach(val => {
      this.getWatcher(val).registe(node);
    });
  }

  /**
   * [exec 根据传入的调用栈，执行变更]
   * 分析该值是否是对象类型，如果是，则继续调用子级
   * @param  {[type]} invokeStack [调用栈，可通过该值定位到$data中的具体值]
   * @return {[type]}             [description]
   */
  exec(vm, invokeStack) {
    // 使用调用栈获取$data中的值,如果没有传入in
    let value = invokeStack ? this._invokeValue(vm, invokeStack) : vm.$data;
    invokeStack = invokeStack || [];
    // 如果是对象的话，递归执行所有子属性的变更
    if (isObject(value)) {
      if (isArray(value)) {
        value.forEach((val, key) => {
          let invoke = JSON.parse(JSON.stringify(invokeStack));
          invoke.push(key);
          this.exec(vm, invoke);
        });
        return;
      }
      for (let key in value) {
        let invoke = JSON.parse(JSON.stringify(invokeStack));
        invoke.push(key);
        this.exec(vm, invoke);
      }
    } else {
      // 找到该属性的wacher执行变更
      let watcher = this.getWatcher(invokeStack);
      watcher.excute();
    }
  }


  // 使用调用栈从$data中获得值的工具方法
  _invokeValue(vm, invokeStack) {
    let val = vm;
    invokeStack.forEach(v => {
      val = val[v];
    });
    return val;
  }

}

// 每个watcher对应$data
class Watcher {
  constructor(invokeStack) {
    this.invokeStack = invokeStack;
    this.nodeList = [];
  }
  // 重新渲染该watcher下所有的node
  excute() {
    this.nodeList.forEach(val => {
      val.reflush();
    });
  }
  // 将某个node注册至该watcher
  registe(node) {
    this.nodeList.push(node);
  }

}

export {WatcherCache, Watcher};
