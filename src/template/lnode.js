class LNode {
  constructor(vm, node) {
    this.values = [];
    this.node = node;
    this.vm = vm;
    this.template = node.nodeValue;

    // 解析node
    // 1.resovle all value
    let reg = /{{(\w)+(\.\w*)*}}/g;
    let nodeValue = node.nodeValue;
    if (!nodeValue) return;
    let arrs = nodeValue.match(reg);
    for (let a in arrs) {
      let b = arrs[a].replace(/{{|}}/g, '');
      let ar = b.split('.');
      this.values.push(ar);
    }
  }

  // 刷新页面
  reflush() {
    let str = this.template;
    for (let invoke in this.values) {
      let newValue = this.vm._watchers
          ._invokeValue(this.vm, this.values[invoke]);
      str = str.replace('{{' + this.values[invoke].join('.') + '}}', newValue);
    }
    this.node.nodeValue = str;
  }
}

export default LNode;
