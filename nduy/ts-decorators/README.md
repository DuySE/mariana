# What are Decorators?
Decorators vary for different programming challenges but the basic point is to wrap something in it and change it's behaviour.
# Types of Decorators
There are various types of decorators which can be attached to classes, methods or instance fields. Let's look at them one by one and learn their use.
1. Class Decorator

When we attach a function to a class as a decorator, we'll receive the class constructor as the first parameter.
```ts
const classDecorator = (target: Function) => {
  // do something with your class
}

@classDecorator
class Man {}
``` 
If we want to override properties/methods within the class, we can return a new class by extending the constructor and set the new properties.
```ts
const addAgeToMan = (target: Function) => {
  // "target" is the constructor of the previous class
  return class extends target {
    age = 24
  }
}

@addAgeToMan
class Man {}
```
Now, our class Man has an age property of 24:
```ts
const man = new Man();
console.log(man.age); // 24
```
2. Method Decorator

We can also attach decorators to a class method. Our decorator receives 3 arguments i.e. target, propertyKey and descriptor.
```ts
const myDecorator = (target: Object, propertyKey: string, descriptor: PropertyDescriptor) =>  {
  // Do something
}
```
```ts
class Man {
  walk() {
    console.log('Walking in 3... 2... 1')
  }
}
```
The first parameter contains the class which contains the method(Man). The second(propertyKey) param contains the name of the method in string format. The last parameter is the property descriptor, a set of information that defines a property behavior. This can be used to observe, modify, or replace a method definition. We'll circle back to this later.

3. Property Decorators

Just like the method decorator, we'll receive the target and propertyKey parameter. The only difference is that we don't get the property descriptor.
# Use Cases
1. Code Execution Time

Let's say we want to estimate how long it takes to run a function. We can create a decorator to calculate the execution time of a method and print it on the console.

```ts
class Man {
  @measure
  walk() {
    console.log('Walking in 3... 2... 1')
  }
}
```
The Man class has a walk() method, to measure it's execution time, we can use the @measure decorator.
```ts
import { performance } from "perf_hooks";

const measure = (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args) {
    const start = performance.now();
    const result = originalMethod.apply(this, args);
    const finish = performance.now();
    console.log(`Execution time: ${finish - start} milliseconds`);
    return result;
  };

  return descriptor;
};
```
As we can see, the measure decorator replaces the original method with a new one that enables it to calculate the execution time of the original method and log it to the console.

To calculate the execution time, we'll use the Performance Hooks API from the Node.js standard library.

The result will look like this:
```ts
Launching in 3... 2... 1...
Execution time: 1.2983244 milliseconds
```
2. Decorator Factory

Often times we need to use the same decorators, so, we can use a concept called decorator factories

Decorators factories work using closures. They are functions that return decorators based on params we pass into them.
```ts
const changeValue = (value) => (target: Object, propertyKey: string) => {
  Object.defineProperty(target, propertyKey, { value });
};
```
The changeValue function returns a decorator that change the value of the property based on the value passed from your factory.
```ts
class Man {
 @changeValue(100)
 age = 24;
}

const man = new Man();
console.log(man.age); // 100
```
Now, if we bind your decorator factory to the age property, the value will be 100.

3. Error Handling

Let's implement a method called drink which requires the age to be at least 21.
```ts
class Man {
 drink() {
   console.log('Drinking!')
 }
}
```
Next, we'll create a decorator to test if the age is at least 21.
```ts
const minimumAge =
  (age: number) =>
  (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
      if (this.age > age) {
        originalMethod.apply(this, args);
      } else {
        console.log("Not enough age!");
      }
    };

    return descriptor;
  };
```
The `minimumAge` is a factory decorator. It takes the age parameter, which indicates how much age is needed to drink.

Now, we can plug the two together and set the minimum age level.
```ts
class Man {
  age = 10;

  @minimumAge(21)
   drink() {
     console.log('Drinking!')
   }
}
```
If we use this, we'll get something like this:
```ts
const man = new Man()
man.drink()

// Console shows:
Not enough age!
```