import {mergeTo} from '../../util/index';

// component related interface
export default function(Van) {

  // create a new component instance
  // param is a object or function
  Van.prototype.newInstance = function() {

    // get param
    var param = arguments[0];
    var instance;

    // merge param and component data
    if (typeof param === 'function') {
      instance = Van.component(this.$options);
      param.call(instance);
    } else {
      this.$options.data = mergeTo(param, this.$options.data);
      instance = Van.component(this.$options);
    }

    instance.$isInstance = true;

    return instance;
  };
}
