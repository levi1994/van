import initMixin from './internal/init';
import globalMixin from './api/global';

// class Van
function Van(options) {
  this._init(options);
}

// install internals
initMixin(Van);
globalMixin(Van);

export default Van;
