import {mergeTo, toOffCanvas, copys} from '../../util/index';

// component related interface
export default function(Van) {

  // generate a component
  Van.component = function(options) {
    var comp = new Component(options);
    return comp;
  };

  function Component(options) {
    this.options = options;
    this.name = options.name || 'anonymous';
    return this;
  }

  /**
   * 创建组件实例
   */
  Component.prototype.newInstance = function(args) {

    // get param
    var instance;

    // clone options
    var option = mergeTo(this.options, {});

    // merge param and component data
    if (typeof args === 'function') {
      instance = new Van(option);
      args.call(instance);
    } else {
      option.data = mergeTo(args, option.data);
      instance = new Van(option);
    }

    instance.$isInstance = true;

    instance.$Component = this;

    return instance;
  };

  /**
   * 拓展组件（覆盖组件参数）
   */
  Component.prototype.extends = function(args) {
    // 先把原有参数都复制一份
    let newoptions = copys(true, {}, this.options);

    // merge param and component data
    newoptions.data = mergeTo(args, newoptions.data);
    return Van.component(newoptions);
  };

  Component.prototype.newOffInstance = function(args) {
    // get param
    var instance;

    // clone options
    var option = mergeTo(this.options, {});
    option.off = true;

    // merge param and component data
    if (typeof args === 'function') {
      instance = new Van(option);
      args.call(instance);
    } else {
      option.data = mergeTo(args, option.data);
      instance = new Van(option);
    }

    instance.$isInstance = true;

    return instance;
  };

  // mount component
  Van.prototype.$mount = function(component) {
    // get uid
    let _uid = component._uid;
    component.$parent = this;
    this.$components[component.$Component.name + '_' + _uid] = component;
    if (component.$off) {
      toOffCanvas(component);
    }
  };

  // unmount component
  Van.prototype.$unmount = function(_uid) {
    if (this.$components[_uid]) {
      delete this.$components[_uid];
      this.reRender();
    }
  };
}
