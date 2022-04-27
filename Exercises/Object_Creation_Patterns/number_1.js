let foo = {name: 'foo'};
let bar = Object.create(foo);
bar.name = 'bar';
let baz = Object.create(bar);
baz.name = 'baz';
let qux = Object.create(baz);
qux.name = 'qux';

foo.ancestors = function() {
  let myAncestors = [];
  let self = this;
  while (Object.getPrototypeOf(self) !== Object.prototype) {
    self = Object.getPrototypeOf(self);
    myAncestors.push(self.name);
  }
  myAncestors.push('Object.prototype');
  return myAncestors;
};

console.log(qux.ancestors());
console.log(baz.ancestors());
console.log(bar.ancestors());
console.log(foo.ancestors());