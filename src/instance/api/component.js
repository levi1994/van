import {mergeTo} from '../../util/index';

// component related interface
export default function(Van) {
  // generate a component
  Van.component = function(options) {
    var comp = new Component(options);
    return comp;
  };

  function Component(options) {
    this.options = options;
    return this;
  }

  Component.prototype.newInstance = function(args) {

    // get param
    var instance;

    // clone options
    var options = mergeTo(this.options, {});

    // merge param and component data
    if (typeof args === 'function') {
      instance = new Van(options);
      args.call(instance);
    } else {
      options.data = mergeTo(args, options.data);
      instance = new Van(options);
    }

    instance.$isInstance = true;

    return instance;
  };

  Component.prototype.newOffInstance = function(args) {
    // get param
    var instance;

    // clone options
    var options = mergeTo(this.options, {});
    options.off = true;

    // merge param and component data
    if (typeof args === 'function') {
      instance = new Van(options);
      args.call(instance);
    } else {
      options.data = mergeTo(args, options.data);
      instance = new Van(options);
    }

    instance.$isInstance = true;

    return instance;
  };
}
