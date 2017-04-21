import {mergeTo} from '../../util/index';

// component related interface
export default function(Van) {

  // create a new component instance
  // param is a object or function
  Van.prototype.newInstance = function(args) {

    // get param
    var instance;

    // clone options
    var options = mergeTo(this.$options, {});

    // merge param and component data
    if (typeof args === 'function') {
      instance = Van.component(options);
      args.call(instance);
    } else {
      options.data = mergeTo(args, options.data);
      instance = Van.component(options);
    }

    instance.$isInstance = true;

    return instance;
  };

  // create a new component instance and
  // set it as a off-screen component
  Van.prototype.newOffInstance = function(args) {
    // get param
    var instance;

    // clone options
    var options = mergeTo(this.$options, {});
    options.off = true;

    // merge param and component data
    if (typeof args === 'function') {
      instance = Van.component(options);
      args.call(instance);
    } else {
      options.data = mergeTo(args, options.data);
      instance = Van.component(options);
    }

    instance.$isInstance = true;

    return instance;
  };
}
