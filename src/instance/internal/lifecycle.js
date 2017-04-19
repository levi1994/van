export default function(Van) {

  Van.prototype._beforeRender = function() {
    if (this.beforeRender) {
      this.beforeRender();
    }
  };

  Van.prototype._afterRender = function() {
    if (this.afterRender) {
      this.afterRender();
    }
  };

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
    this._beforeRender();

    // render
    if (this.render) {
      this.render();
    }

    // excute afterRender function
    this._afterRender();
  };

  // re render
  Van.prototype.reRender = function() {
    if (this.$isRoot) {
      console.log(this.name + 'RE RENDER');
      this.$clearRect();
      this._render();
    } else {
      if (this.$parent) {
        this.$parent.reRender();
      }
    }
  };

}
