import initMixin from './internal/init';
// import globalMixin from './api/global';
import drawMinxin from './api/draw';
import lifecycleMixin from './internal/lifecycle';
import componentMixin from './api/component';
import initComponents from '../components/index';
import initAnimate from './api/animation';
import initEvent from './api/event';

// class Van
function Van(options) {
  this._init(options);
}

// install internals
initMixin(Van);
// globalMixin(Van);
lifecycleMixin(Van);
componentMixin(Van);
drawMinxin(Van);
initComponents(Van);
initAnimate(Van);
initEvent(Van);

export default Van;
