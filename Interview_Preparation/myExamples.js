// OBJECT-ORIENTED PROGRAMMING
  // Object-oriented programming is a programming approach in which we think about a problem in terms of a collection of objects
  // that have states/properties and behaviours/methods that interact with each other. This is in contrast with
  // procedural programming where we think about a problem in terms of a series of steps to follow.

  // ADVANTAGES
    // It lets programmers think about a problem at a higher level of abstraction, which allows them to break down and solve the problem.
    // It reduces the number of dependencies in our program, which makes our code easier to maintain.
    // When done right, OOP makes our code flexible, easier to understand, and easier to change.

  // DISADVANTAGES
    // OOP programs are often much larger than their equivalent procedural programs.
    // OOP can lead to less efficient code, we may require more memory space, disk space, and computing power.

// ENCAPSULATION
  // Encapsulation is one of the fundamental concepts in OOP. It is the idea that we should bundle the data and the operations
  // associated with that data within a single entity. That is, we want to bundle together the properties and the methods that
  // operate on those properties within a single object.
  
  // In other languages, encapsulation has a broader meaning. It also refers to the idea that objects should only expose
  // properties and methods that other objects need to use the encapsulated object. Objects expose a public interface for
  // interacting with other objects and keep their implementation details hidden.
  // Therefore, other objects can't change the data of an object without going through the proper interface.
  // JS doesn't support access restrictions.

// COLLABORATORS
  // An object's state is stored in properties that refer to other values or objects.
  // Objects that help provide state within other objects are called collaborator objects, or just collaborators.
  // Collaborators represent the connections between the different classes in our program.
  // They allow us to break down a problem into different components that interact with other.

// FACTORY FUNCTION PATTERN
  // The factory function pattern is an approach to create an endless number of objects.
  // They are functions that create and return objects of a particular type.
  // The methods remain the same across all the objects but the properties can be set when we invoke the function with the help of
  // arguments.
    
  // ADVANTAGES
    // By using them, we can avoid the tidious and error-prone task of copying and pasting code to create multiple objects.
    // They help reduce code duplication.

  // DISADVANTAGES
    // All the objects created through the factory function will have a full copy of the methods. This is redundant and can place a heavy
    // load on system memory.

    // There is no way to determine whether an object was created through a factory function. It is not possible to determine the type of
    // an object created by a factory function. This can be troublesome when trying to debbug a program.

// OOP APPROACH
  // Write a textual description of the problem;
  // Extract the significant nouns (i.e., object types) and verbs (i.e., methods); and
  // Organize and associate the verbs (i.e., methods) with the nouns (i.e., object types).

  // Once we have organized our nouns and verbs into objects, we need an engine to orchestrate the objects. The engine is where the
  // procedural program flow should be.

// OBJECT FACTORIES
  // They return objects of a specific type; and
  // They reuse code.

// THE GLOBAL OBJECT
  // JS creates a global object when it starts running. The global object serves as the implicit execution context for regular 
  // function-call syntax.
  // The global object stores global values such as Infinity and NaN, and global functions, such as isNaN.
  // Whenever we assign a value to a variable without using the keywords let, const, or var, the variable gets added as a property to
  // the global object. We can even access it without using the global object as the caller.

// EXECUTION CONTEXT
  // Every JS function call has an execution context. The this keyword is available to every function in your program.
  // The execution context refers to the environement in which a function gets excuted.
  // In JS, it most commonly refers to the current value of the this keyword.
  // The only factor that determines the value of this is how we invoke the function or method not how you define it.
  // The execution context can be set explicitly through the help of the methods call, apply or bind.
  // The execution context can be implicit and determined by JS depending on how we invoke the function or method.

  // CONTEXT LOSS
  // Methods copied from an object;
  // Functions nested within methods; and
  // Functions passed to other functions as arguments.

    // Arrow functions inherit their execution context from the surrounding context. That means that an arrow function defined
    // inside another function always has the same context as the outer function's context.

// CONSTRUCTORS
  // We can think of constructors as object factories that can create an endless number of objects of the same type.

  // The following happens when we call a function with the keyword new:
    // It creates a new object;
    // It sets the prototype of the new object to reference the constructor's prototype property, which is an object;
    // It sets the execution context to the new object (i.e., this references the new object);
    // It calls the function. Since we have access to the object with this, we can set properties; and
    // It returns the new object even if we don't explicitly povide a return statement.

    // What makes constructors special is a characteristic of all function objects in JS: they all have a prototype property that we 
    // call the function prototype. JS only uses it when we call the function with the new keyword.
  
// STATIC & INSTANCE PROPERTIES
  // Any method defined in any prototype in the prototype chain of an object is considered to be an instance method of the object.

// CLASSES
  // Classes are very similar to constructors but use a different syntax which is easier to read and it also makes it easier for
  // programmers to migrate to JS from other OOP languages.

  // One significant difference is that the constructor is now a method named constructor inside our class instead of being a standalone
  // function. We must use new with classes as opposed to constructors. Otherwise, JS raises a TypeError.

  // The class statement gets translated behind the scenes to a constructor function and a prototype object, and the class name refers to
  // the constructor function.

// OLOO
  // It uses prototypes and inolves extracting properties common to all objects of the same type to a prototype object. All objects of the
  // same type then inherit from that prototype.

  // The one significant advantage of this approach over factory functions is memory efficiency.
  // An advantage of factory functions is that we can create objects with private state. Any state stored in the body of the
  // factory function instead of in the returned object is private to the returned object.

// MIXINS
  // One problem with inheritance in JS is that an object can have only one prototype object. We call this single inheritance.
  
  // A mix-in is an object that defines one or more methods that can be "mixed in" to a class. This grants that class access to all
  // the methods in the mix-in object. It is the only real workaround for the lack of multiple inheritance short of duplication.

  // Inheritance works well when one object type is positively a sub-type of another object. Whenever two object types have an "is a"
  // relationship, constructor or class inheritance makes sense.

  // When you want to provide your objects with some capability, a mix-in may be the correct choice.

  class Animal {
    constructor(species, name) {
      this.species = species;
      this.name = name;
    }
  }

  class Dog extends Animal {
    constructor(species, name, type) {
      super(species, name);
      this.type = type;
    }
  }

  class Cat extends Animal {
    constructor(species, name, type) {
      super(species, name);
      this.type = type;
    }
  }

  class Bird extends Animal {
    constructor(species, name, type) {
      super(species, name);
      this.type = type;
    }
  }

  const Swim = {
    goSwim() {
      console.log('I can swim!');
    }
  }

  Object.assign(Dog.prototype, Swim);
  Object.assign(Cat.prototype, Swim);

  let dog = new Dog('Dog', 'Bud', 'Labrador');
  let cat = new Cat('Cat','Mylo','Bengal');
  let bird = new Bird('Bird','Paco','Owl');

// POLYMORPHISM
  // Polymorphism refers to the ability of objects with different types to respond in different ways to the same method invocation.
  
  // When two or more object types have a method with the same name, we can invoke that method with any of those objects.

  // When we don't care what type of object is calling the method, we're using polymorphism.

  // We can have polymorphism through inheritance. Two object types that are related can respond to the same method call simply
  // by overriding a method inherited from a superclass.
    class Animal {
      sound() {}
    }

    class Dog extends Animal {
      sound() { console.log('Woof! Woof!'); }
    }

    class Cat extends Animal {
      sound() { console.log('Meow!'); }
    }

    class Fish extends Animal {}

    let instances = [new Dog(), new Cat(), new Fish()];
    
    instances.forEach(obj => obj.sound());

  // We can have polymorphism trough duck typing which would be for objects that are not related but use the same method name to perform
  // different but related operations.
    let str = '12345';
    let arr = ['1','2','3','4','5'];

    console.log(str.indexOf('3'));
    console.log(arr.indexOf('3'));