class Truck {}

class Car {}

const towMixin = {
  tow() {
    console.log('I can tow a trailer!');
  }
};

Object.assign(Truck.prototype, towMixin);

let truck = new Truck();
truck.tow();