function arrayUtil(vm, arr) {
  arr.levansPush = Array.prototype.push;
  arr.levansPop = Array.prototype.pop;
  arr.levansShift = Array.prototype.shift;
  arr.levansUnshift = Array.prototype.unshift;
  arr.levansSplice = Array.prototype.splice;
  arr.levansSort = Array.prototype.sort;
  arr.levansReverse = Array.prototype.reverse;

  // 鍦ㄦ暟缁勫熬鎻掑叆鏁版嵁
  arr.push = function(val) {
    var responseObj = vm._initData(vm, val);
    let result = arr.levansPush(responseObj);
    vm.reRender();
    return result;
  };
  // 绉婚櫎骞惰繑鍥炴暟缁勬渶鍚庝竴涓暟鎹�
  arr.pop = function() {
    let result = arr.levansPop();
    vm.reRender();
    return result;
  };
    // 绉婚櫎骞惰繑鍥炴暟缁勭涓€涓€�
  arr.shift = function() {
    let result = arr.levansShift();
    vm.reRender();
    return result;
  };
    // 鍦ㄦ暟缁勫ご閮ㄦ彃鍏ユ暟鎹紝杩斿洖鎿嶄綔鍚庢暟缁勯暱搴�
  arr.unshift = function(val) {
    var responseObj = vm._initData(vm, val);
    let result = arr.levansUnshift(responseObj);
    vm.reRender();
    return result;
  };
  arr.slice = function(start, end) {
    return arr.levansSlice(start, end);
  };
  arr.sort = function(fun) {
    return arr.levansSort(fun);
  };
  arr.reverse = function() {
    return arr.levansReverse();
  };

}

export default arrayUtil;
