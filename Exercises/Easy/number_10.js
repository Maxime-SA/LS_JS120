class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.myPets = 0;
  }

  numberOfPets() {
    return this.myPets;
  }

  addPet() {
    this.myPets += 1;
  }
}

class Shelter {
  constructor() {
    this.ownerList = {};
  }

  adopt(owner, pet) {
    owner.addPet();
    if (!this.ownerList[owner.name]) {
      this.ownerList[owner.name] = [];
    }
    this.ownerList[owner.name].push(pet);
  }

  printAdoptions() {
    Object.keys(this.ownerList).forEach(owner => {
      console.log(`${owner} has adopted the following pets:`);
      this.ownerList[owner].forEach(pet => {
        console.log(`a ${pet.species} named ${pet.name}`);
      });
      console.log('');
    });
  }
}

let butterscotch = new Pet('cat', 'Butterscotch');
let pudding = new Pet('cat', 'Pudding');
let darwin = new Pet('bearded dragon', 'Darwin');
let kennedy = new Pet('dog', 'Kennedy');
let sweetie = new Pet('parakeet', 'Sweetie Pie');
let molly = new Pet('dog', 'Molly');
let chester = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();


shelter.adopt(phanson, butterscotch);
shelter.adopt(phanson, pudding);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);

shelter.printAdoptions();

console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);