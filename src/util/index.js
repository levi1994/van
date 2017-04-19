export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export const isArray = Array.isArray;

// Recursively set the runtime environment
// for component and subcomponent
export function initCtx(van) {
  var comps = van.$components;
  for (var key in comps) {
    if (comps.hasOwnProperty(key)) {
      comps[key].$parent = van;
      comps[key].$ctx = van.$ctx;
      initCtx(comps[key]);
    }
  }
}

// merge two object
export function merge(obj1, obj2) {
  
}
