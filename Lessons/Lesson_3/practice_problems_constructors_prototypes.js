/* eslint-disable max-len */

// #1
// The issue comes from the fact that when we use method call syntax on the object Rectangle, the execution context changes
// and this now points to the Rectangle object. Since Rectangle does not have any properties named width or height,
// the mathematical operations performed on undefined return NaN.

// #2
// We need to bind the method call with an execution context, we could do something like Rectangle.area.call(this).

// #3
function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * (this.radius ** 2);
};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27
console.log(a.hasOwnProperty('area')); // => false

// #4
// true because when ninja was created, it's [[Prototype]] property was set up to point to the constructor's prototype property
// and since we are dealing with objects, we are just passing it by reference (i.e., pointing to the memory location where the object is stored).

// #5
// Because we are reassigning the Ninja.prototype object to a new object, the instance ninja object no longer points to the new
// Ninja.prototype object. Instead, it still points to an empty object. Since JS can't find the swingSword method in the prototype chain of ninja, we
// get a TypeError exception.

// #6
function Ninja() {
  this.swung = false;
}

Ninja.prototype.swing = function () {
  this.swung = this.swung === false;
  return this;
};

let ninjaA = new Ninja();
let ninjaB = new Ninja();

console.log(ninjaA.swing().swung);
console.log(ninjaB.swing().swung);

// #7
{
  const Ninja = function() {
    this.swung = false;
  };

  ninjaA = new Ninja();
}

ninjaB = new ninjaA.constructor();

console.log(ninjaA.constructor === ninjaB.constructor);

// #8
function User(first, last) {
  if (!(this instanceof User)) {
    return new User(first, last);
  }

  this.name = first + ' ' + last;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe