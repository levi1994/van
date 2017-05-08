export function lifecycleMixin(Van) {

  Van.prototype._render = function() {

    // render subcomponent first
    // then render self
    var self = this;
    for (var key in self.$components) {
      if (this.$components.hasOwnProperty(key)) {
        var component = self.$components[key];
        component._render();
      }
    }

    // excute beforeRender function
    callHook(this, 'beforeRender');

    // render
    if (this.render) {
      this.render();
    }

    // excute afterRender function
    callHook(this, 'afterRender');
  };

  // re render
  Van.prototype.reRender = function() {

    // if this component is root component or
    // it is off-screen component
    // render himself
    if (this.$isRoot || this.$off) {
      this.$clearRect();
      // this._render();
      this._refresh = true;
    } else {
      if (this.$parent) {
        this.$parent.reRender();
      }
    }
  };

  /**
   * 组件销毁
   */
  Van.prototype._destroy = function() {

    // 找到组件的父组件，从父组件中移除该组件
    let parent = this.$parent;
    parent.$unmount(this._uid);
  };

}

/**
 * 执行生命周期钩子
 * vm: View Model
 * hook : lifecycle name
 */
export function callHook(vm, hook) {
  const handlers = vm[hook];
  if (handlers) {
    handlers.call(vm);
  } else {

  }
}
