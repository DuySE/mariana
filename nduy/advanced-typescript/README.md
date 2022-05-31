# Strict Types
1. **noImplicitAny**

**noImplicitAny** is to “raise errors on expressions and declarations with any implied any type.”
```ts
function print(arg) {
    send(arg);
}

print("hello");
print(4);
```
If we don't add a type to the function argument, TypeScript will assign the argument of type any, which will turn off type checking.

For developers who prefer safety in their code, they can utilize noImplicityAny, which will notify them of any possibilities for type any in their code. Let's see what will happen with the same print function.
```ts
function print(arg) { // Error : someArg has an implicit `any` type
    send(arg);
}
```

2. **unknown**

The unknown type is similar to the any type in that all types are assignable to the any and unknown type, but the distinction is that the any type is assignable to any other types, but the unknown type is un-assignable to any other type. The distinction can be a confusing concept, so let's take a look at an example.
```ts
function example1(arg: any) {
  const a: str = arg; // no error
  const b: num = arg; // no error
}

function example2(arg: unknown) {
  const a: str = arg; // Type 'unknown' is not assignable to type 'string'.(2322)
  const b: num = arg; // Type 'unknown' is not assignable to type 'number'.(2322)
}
```
3. **strictNullChecks**

In TypeScript, null and undefined are assignable to every type, meaning that they are in the domain of all types.
```ts
let num: number = 123;
num = null; // Ok
num = undefined; // Ok
```

Oftentimes, this can lead to unexpected errors, as we can call methods on a variable whose value is null or undefined.
```ts
interface Person {
  hello(): void;
}

const num: number = undefined;
const str: string = null;
const person: Person = null;

person.hello(); // Runtime Error!
```
# TypeScript and Object-oriented programming
1. **Classes**

Just like in ES6, classes can be implemented using the class keyword. To create an object, an instance of the class, we can use the new keyword, which will call the constructor function. See below for example

`Luna` is an instance-object of `Dog`.
```ts
class Dog
{
    age: number
    breed: string    
    
    constructor(age: number, breed: string) 
    {
        this.age = age
        this.breed = string
    }    
    
    getRelativeAge(): number
    {
        return this.age * 7
    }
}

let Luna = new Dog(2, 'Labrador')
```
2. **Inheritance**

Now that we know how to create objects, it's important to learn about inheritance in TypeScript. Inheritance allows subclasses to inherit certain attributes from its parent class.

For example, we have Animal, as a parent class.
```ts
class Animal
{
    age: number
    breed: string    
    
    constructor(age: number, breed: string)
    { 
        this.age = age
        this.breed = breed
    }    
    
    makeSound_(sound: string): void
    {
        console.log(sound)
        console.log(sound)
        console.log(sound)
    }
}
```
Then, we can create a Dog subclass. We can implement basic inheritance using the super keyword, which is used as a function in the subclass to call the corresponding parent function.
```ts
class Dog extends Animal
{
    playsFetch: boolean    constructor(age: number, breed: string, playsFetch: boolean)
    {
         super(age, breed) // call parent constructor
         this.playsFetch = playsFetch
    }    makeSound(): void
    {
        super.makeSound_('woof woof')
    }    getAgeInHumanYears(): number
    {
        return this.age * 7    // super.age will throw error
    }
}
class Cat extends Animal
{
    constructor(age: number, breed: string)
    {
        super(age, breed)
    }    makeSound(): void
    {
        super.makeSound_('meow meow')
    }
}
```
3. **Interfaces**

Interfaces are powerful in JavaScript (and TypeScript), because they have zero runtime impact. TypeScript allows we to declare the structure of the variables, which gives we even more power.
```ts
interface Point {
    x: number; y: number;
}
declare var test: Point;
```
Interfaces in TypeScript are open-ended, so another author can build upon the existing declaration of the test variable.
```ts
interface Point {
    x: number; y: number;
}
declare var myPoint: Point;

interface Point {
    z: number;
}

var myPoint.z; // Allowed
```
Classes can also implement interfaces so that they follow a pre-defined object structure by using the implements keyword.
```ts
interface Point {
    x: number; y: number;
}

class MyPoint implements Point {
    x: number; y: number; // Same as Point
}
```
Because of this implements keyword, any changes in the interface will create a compilation error so that we can easily update your codebase.
```ts
interface Point {
    x: number; y: number;
    z: number; // New member
}

class MyPoint implements Point { // ERROR : missing member `z`
    x: number; y: number;
}
```
# Types in TypeScript
1. **Union type**

Oftentimes, we may want your code to allow more than one data type. This need is especially true when accepting a null or undefined value. The union type can solve this problem, which is denoted by the | annotation.
```ts
const hello = (name: string | undefined) => { /* ... */ };
```
In this example, the type name is defined as string | undefined, meaning that any variable of type name can either be a string or undefined.

2. **Intersection type**

An intersection type combines multiple types into one, such that the new type has the features of the combined types. We can do this through the extend keyword, as seen below.
```ts
function extend<T, U>(first: T, second: U): T & U {
  return { ...first, ...second };
}

const x = extend({ a: "hello" }, { b: 42 });

// x now has both `a` and `b`
const a = x.a;
const b = x.b;
```
3. **Tuple type**

Unlike JavaScript, TypeScript offers Tuple types, which allow we to express an array with non-uniform types and a fixed number of elements. A tuple is demonstrated in the below example.

```ts
var nameNumber: [string, number];

// Allow
nameNumber = ['Ben', 12345];

// Error
nameNumber = ['Ben', '12345'];
```