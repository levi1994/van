export function isObject(obj) {
  return obj !== null && typeof obj === 'object';
}

export const isArray = Array.isArray;

export function initCtx(van) {
  var comps = van.components;
  for (var key in comps) {
    if (comps.hasOwnProperty(key)) {
      comps[key].parent = van;
      comps[key].$ctx = van.$ctx;
      initCtx(comps[key]);
    }
  }
}
