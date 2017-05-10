import {tip} from '../../util/index';

export default function(Van) {

  /**
   * 触发事件，事件不断向上级组件冒泡
   * @param {string} handlerName : 事件名称
   * @param {object|string|boolean} data : 传输数据
   */
  Van.prototype.$emit = function(handlerName, data) {

    // 如果为根组件，则直接退出
    if (this.$isRoot) {
      return;
    }
    // 直接调用父级组件的_handleEmit
    this.$parent._handleEmit(handlerName, data);
  };

  /**
   * 广播事件，事件不断向下级广播
   * @param {string} handlerName : 事件名称
   * @param {object|string|boolean} data : 传输数据
   */
  Van.prototype.$dispatch = function(handlerName, data) {
    let components = this.$components;
    for (let key in components) {
      let component = components[key];
      component._handleDispatch(handlerName, data);
    }
  };

  /**
   * 内部广播事件，事件不断向下级广播
   * @param {string} handlerName : 事件名称
   * @param {object|string|boolean} func : 传输数据
   */
  Van.prototype._handleDispatch = function(handlerName, data) {
    let func = this._handler[handlerName];

    // 判断自身是否有处理该事件的函数
    if (!func) {

      // 直接向子组件派发
      for (let key in this.$components) {
        this.$components[key]._handleDispatch(handlerName, data);
      }

    } else {
      let flag = func.call(this, data);

      // 如果返回值为true,则继续派发
      if (flag) {
        for (let key in this.$components) {
          this.$components[key]._handleDispatch(handlerName, data);
        }
      }
    }
  };

  /**
   * 注册事件
   * 事件执行后，如果返回值为true，则继续冒泡
   * @param {string} handlerName : 需处理的事件名称
   * @param {object|string|boolean} func : 事件处理函数
   */
  Van.prototype.$registHandler = function(handlerName, func) {

    // 检测是否已包含该事件名称
    if (this._handler.hasOwnProperty(handlerName)) {
      tip('handler注册失败:该handler名称已存在', 'error');
      return false;
    }

    // 检测func类型
    if (typeof func !== 'function') {
      tip('handler注册失败:handler处理需为function', 'error');
      return false;
    }

    // 注册事件
    this._handler[handlerName] = func;
    return true;
  };

  /**
   * 取消已注册事件
   * @param {string} handlerName : 需处理的事件名称
   */
  Van.prototype.$unregistHandler = function(handlerName) {

    // 判断是否已注册该事件
    if (!this._handler.hasOwnProperty(handlerName)) {
      tip('事件取消注册失败:未找到名为' + handlerName + '的事件', 'warn');
      return false;
    }

    delete this._handler[handlerName];
    return true;
  };

  /**
   * 解析事件
   * 事件执行后，如果返回值为true，则继续冒泡
   * @param {string} handlerName : 需处理的事件名称
   * @param {object|string|boolean} data : 传递的数据对象
   */
  Van.prototype._handleEmit = function(handlerName, data) {
    let func = this._handler[handlerName];

    // 判断自身是否有处理该事件的函数
    if (!func) {

      // 如果为根组件，则不会有父级组件，故直接退出
      if (this.$isRoot) {
        return;
      }
      return this.$parent._handleEmit(handlerName, data);
    } else {
      let flag = func.call(this, data);

      // 如果返回值为true,则继续冒泡
      if (flag) {

        // 如果为根组件，则不会有父级组件，故直接退出
        if (this.$isRoot) {
          return;
        }
        this.$parent._handleEmit(handlerName, data);
      } else {
        return false;
      }
    }
  };

}
