export default function(Van) {

  // 监听鼠标事件并进行处理
  Van.prototype._resolveListener = function(type, event) {
    /**
     * 目标事件集合
     * 格式为
     * [
     *  {type:'click',target:component},
     *  {type:'mouseenter',target:component}
     * ]
     */
    let targets = [];

    // 找到事件目标
    findTarget(event, this.$root, targets);

    // 触发事件目标事件
    for (let val of targets) {
      val.target._trigger(val.type);
    }
  };

  /**
   * 内部触发事件
   */
  Van.prototype._trigger = function(type) {
    let events = this.listener[type];
    for (let key in events) {
      let func = events[key];
      func.call(this);
    }
  };

  /**
   * 外部api注册事件
   */
  Van.prototype.$addEventListener = function(type, handle) {
    this.listener[type].push(handle);
  };
}

/**
 * 找到事件目标
 * 将事件添加到targets
 * @param {*} 事件对象
 * @param {*} 当前组件
 * @param {*} 目标集合
 */
function findTarget(event, comp, targets) {

  // 验证事件发生位置是否在组件范围内
  if (comp.area && comp.area(event.offsetX, event.offsetY)) {

    // 如果在范围内
    if (event.type === 'click') {
      targets.push({type: 'click', target: comp});
    } else if (event.type === 'mousemove') {
      if (!comp._mouseFlag) {
        targets.push({type: 'mouseenter', target: comp});
      }
    }
    comp._mouseFlag = true;
  } else if (comp.area && !comp.area(event.offsetX, event.offsetY)) {

    // 如果不在范围内
    if (event.type === 'mousemove') {
      if (comp._mouseFlag) {
        targets.push({type: 'mouseleave', target: comp});
      }
    }

    comp._mouseFlag = false;
  }

  // 遍历组件子节点
  let childrens = comp.$components;
  for (let key in childrens) {
    findTarget(event, childrens[key], targets);
  }
}
