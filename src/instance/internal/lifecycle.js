export default function(Van) {

  // default render function
  Van.prototype.render = function() {
    console.log('DEFULT RENDER FUNCTION');
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
    this.beforeRender();

    // render
    this.render();

    // excute afterRender function
    this.afterRender();
  };

  // re render
  Van.prototype.reRender = function() {
    console.log(this.name + 'WILL RE RENDER');
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
