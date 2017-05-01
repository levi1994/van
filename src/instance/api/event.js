import {tip} from '../../util/index';

export default function(Van) {

  /**
    * 触发事件，事件不断向上级组件冒泡
    * [eventName] 事件名称
    * [data] 传输的数据
    */
  Van.prototype.$emit = function(eventName, data) {

    // 直接调用父级组件的_handleEvent
    this.$parent._handleEvent(eventName, data);
  };

  /**
   * 注册事件
   */
  Van.prototype.$registEvent = function(eventName, func) {

    // 检测是否已包含该事件名称
    if (this._events.hasOwnProperty(eventName)) {
      tip('事件注册失败:该事件名称已存在', 'error');
      return false;
    }

    // 检测func类型
    if (typeof func !== 'function') {
      tip('事件注册失败:事件处理需为function', 'error');
      return false;
    }

    // 注册事件
    this._events[eventName] = func;
    return true;
  };

  /**
   * 取消已注册事件
   */
  Van.prototype.$unregistEvent = function(eventName) {

    // 判断是否已注册该事件
    if (!this._events.hasOwnProperty(eventName)) {
      tip('事件取消注册失败:未找到名为' + eventName + '的事件', 'warn');
      return false;
    }

    delete this._events[eventName];
    return true;
  };

  /**
   * 解析事件，事件执行后
   * 如果返回值为true，则继续冒泡
   * 如果返回值为false，则停止冒泡
   */
  Van.prototype._handleEvent = function(eventName, data) {
    let func = this._events[eventName];

    // 判断自身是否有处理该事件的函数
    if (!func) {
      return this.$parent._handleEvent(eventName, data);
    } else {
      let flag = func.call(this, data);

      // 如果返回值为true,则继续冒泡
      if (flag) {
        this.$parent._handleEvent(eventName, data);
      } else {
        return false;
      }
    }
  };
}
