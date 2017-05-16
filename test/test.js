import chai from 'chai';
import {mergeTo,
        isUndef} from '../src/util/index';
import Van from '../src/instance/Van';

var assert = chai.assert;

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

// 测试Util
describe('Util', function() {
  describe('#mergeTo()', function(){
    it('合并后的对象拥有两个对象的属性', function() {
      let obj1 = {name: 'name'};
      let obj2 = {age: 10};
      let obj3 = mergeTo(obj1, obj2);
      assert.equal(10, obj3.age);
      assert.equal('name', obj3.name);
    });
  });
  describe('#isUndef()', function(){
    it('undefined与null均返回true', function() {
      let flag1 = isUndef(undefined);
      let flag2 = isUndef(null);
      assert.equal(true, flag1);
      assert.equal(true, flag2);
    });
  });
});

describe('Instance', function() {
  describe('#mergeTo()', function(){
    it('合并后的对象拥有两个对象的属性', function() {
      let obj1 = {name: 'name'};
      let obj2 = {age: 10};
      let obj3 = mergeTo(obj1, obj2);
      assert.equal(10, obj3.age);
      assert.equal('name', obj3.name);
    });
  });

});