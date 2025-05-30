<!-- https://www.interviewbit.com/javascript-interview-questions/ -->
<!-- https://github.com/sudheerj/javascript-interview-questions?tab=readme-ov-file -->

1. What are the different data types present in javascript?

   - Primitive types <- Basically everything except objects/arrays (Symbols, boolean, string, number, null are primitives)
   - Non-primitive types <- Objects, functions, and arrays ({}, function() and [])

2. Explain Hoisting in javascript.

   - Hoisting is the default behaviour of javascript where all the variable and function declarations are moved on top.

3. Difference between “ == “ and “ === “ operators.

   - Both are comparison operators. The difference between both the operators is that “==” is used to compare values whereas, “ === “ is used to compare both values and types.

   ```
   var x = 2;
   var y = "2";
   (x == y)  // Returns true since the value of both x and y is the same
   (x === y) // Returns false since the typeof x is "number" and typeof y is "string"
   ```

4. Difference between var and let keyword in javascript.

   - var is function scoped, allows you to declare/overwrite variables with the same names over and over. let is block scoped,

5. Explain Implicit Type Coercion in javascript.

   - Implicit type coercion in javascript is the automatic conversion of value from one data type to another. It takes place when the operands of an expression are of different data types.

6. Is javascript a statically typed or a dynamically typed language?

   - JavaScript is a dynamically typed language. In a dynamically typed language, the type of a variable is checked during run-time in contrast to a statically typed language, where the type of a variable is checked during compile-time.

7. What is NaN property in JavaScript?

   - NaN property represents the “Not-a-Number” value. It indicates a value that is not a legal number. typeof of NaN will return a Number.

8. Explain passed by value and passed by reference.

   - In JavaScript, all values are passed by value. However primitive data types are passed by value and non-primitive data types are passed by their reference.
   - https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language

9. What is an Immediately Invoked Function in JavaScript?

   - An Immediately Invoked Function ( known as IIFE and pronounced as IIFY) is a function that runs as soon as it is defined.
   - https://www.geeksforgeeks.org/immediately-invoked-function-expressions-iife-in-javascript/
   - Avoid polluting the global namespace.
   - To create closures in JavaScript.
   - IIFE is used to create private and public variables and methods.
   - It is used to execute the async and await function.

```
(function(){
  // Do something;
})();
```

11. What do you mean by strict mode in javascript and characteristics of javascript strict-mode?

    - The 'use strict' keyword is used to define strict mode at the start of the script. Strict mode is supported by all browsers.
    - In strict mode, you won't be able to use the JavaScript keyword as a parameter or function name.
    - Duplicate arguments are not allowed by developers.
    - Engineers will not be allowed to create global variables in 'Strict Mode.

12. Explain Higher Order Functions in javascript.

    - Functions that operate on other functions, either by taking them as arguments or by returning them, are called higher-order functions.

13. Explain “this” keyword.

    - The “this” keyword refers to the parent object that the invoking function is a property of.

14. What do you mean by Self Invoking Functions?

    - similar to IIFE just add () at end of function definition like so: ((e)=>{return e})()

15. Explain call(), apply() and, bind() methods.

    - call(obj, arg1, arg2, ..., argN) - method allows an object to use the method (function) of another object.

    ```
    function sayHello(){
      return "Hello " + this.name;
    }

    var obj = {name: "Sandy"};

    sayHello.call(obj);
    ```

    - apply(obj, [arg1, arg2, ..., argN]) - Same as call but takes arguments as an array.
    - bind(obj) - returns a new function, where the value of “this” keyword will be bound to the owner object, which is provided as a parameter

    ```
    var bikeDetails = {
      displayDetails: function(registrationNumber,brandName){
      return this.name+ " , "+ "bike details: "+ registrationNumber + " , " + brandName;
      }
    }

    var person1 = {name: "Vivek"};

    var detailsOfPerson1 = bikeDetails.displayDetails.bind(person1, "TS0122", "Bullet");

    // Binds the displayDetails function to the person1 object

    detailsOfPerson1();
    //Returns Vivek, bike details: TS0122, Bullet
    ```

16. What is the difference between exec () and test () methods in javascript?

    - test () and exec () are RegExp expression methods used in javascript
    - exec () to search a string for a specific pattern, and if it finds it, it'll return the pattern
    - test () to find a string for a specific pattern. It will return the Boolean value

17. What is currying in JavaScript?

    - transforms a function of arguments n, to n functions of one or fewer arguments

    ```
    function add (a) {
      return function(b){
        return a + b;
      }
    }
    add(3)(4)
    ```

18. Explain Scope and Scope Chain in javascript.

    - There are three types of scopes in JS: Global Scope(var), Function Scope(var), and Block Scope(let). Scopes are checked in smallest to biggest order.

19. Explain Closures in JavaScript.

    - A function can remember the variables and functions that are declared in its outer scope "at its birth place".

    ```
    function randomFunc(){
      var obj1 = {name:"Vivian", age:45};

      return function(){
        console.log(obj1.name + " is "+ "awesome"); // Has access to obj1 even when the randomFunc function is executed
      }
    }
    var initialiseClosure = randomFunc(); // Returns a function
    initialiseClosure();
    ```

20. What are object prototypes?

    - Objects inherit properties from a parent object. This is how objects are able to "build" complex classes with inheritance.

21. What are callbacks?

    - functions that get passed into other functions as arguments.

22. What is memoization?

    - It is a problem solving technique where you cache previous results to solve the next result.

23. What is recursion in a programming language?

    - Calling a function repeatedly from within itself, with smaller and smaller subproblems.

24. What is the use of a constructor function in javascript?

    - To create objects in javascript. Uses the new keyword in the format: let myObj = new OBJECT_NAME()

25. What do you mean by DOM/BOM?

    - Document object Model (document object) and Browser object model (window object)
    - document === window.document

26. What are arrow functions?

    - basically a anonoumus function: ()=>{}
    - arrow functions, there is no binding of this keyword (this is set from parent scope... dangerous)

27. What do mean by prototype design pattern?

    - produces objects, but instead of returning uninitialized objects, it produces objects that have values replicated from a template (with preset values)

28. What is the rest parameter and spread operator?

    - rest parameter: function randomFunc2(a,b,...args) // args takes the "rest" of the arguments passed includes
    - spread operator: let clonedArray1 = [...array1] // array1's elements are "spread" accross clonedArray1

29. In JavaScript, how many different methods can you make an object?

    - Object: let x = {...}
    - using Class: class Rectangle{...}
    - using Function: function f(...){...} // All function declartions are objects
    - Object Constructor: let p = new Person(...)

30. What is the use of promises in javascript?

    - A way to make async requests without callback Hell
    - states: Pending, Fufilled, Rejected, Settled

    ```
    let p = new Promise((resolve,reject)=>{
      if(...) resolve("yay")
      else(...) reject("nay")
    })

    p.then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })

    ```

31. What are classes in javascript?

    - ES6 syntactic sugars of constructor functions/methods for objects
    - Classes are not hoisted. A class cannot be used before it is declared.
    - extend keyword: inherit properties and methods from other classes

    ```
    class Student{
      constructor(name){ // Before this would be function Student(name){...}
        this.name = name;
      }

      getDetails(){  // Before this would be Student.prototype.getDetails = function(){...}
        return 'Name: ${this.name}';
      }
    }
    let student2 = new Student("Garry");
    student2.getDetails(); // Returns Name: Garry, Roll no:673, Grade: 7th, Section:C
    ```

32. What are generator functions?

    - They can be stopped midway and then continue from where they had stopped. Use function\* keyword.
    - yield keyword gives next value when myGenFunction.next() is called
    - return keyword sets done to true immediately

    ```
    function* genFunc(){
      yield 3;
      yield 4;
    }
    genFunc().next(); // Returns {value: 3, done:false}
    genFunc().next(); // Returns {value: 4, done:false}
    genFunc().next(); // Returns {value: undefined, done:true}
    ```

33. Explain WeakSet in javascript.

    - like set but: 1) contains only objects 2) if an object not have a reference, it will be garbage collected 3) only has three methods, add() , delete() and has()

34. Explain WeakMap in javascript.

    - like map but: 1) contains only objects 2) if an object not have a reference, it will be garbage collected

35. What is Object Destructuring?

    ```
    const arr = [1, 2, 3, 4];
    const [first,second,third,fourth] = arr;

    const classDetails = {
      strength: 78,
      benches: 39,
      blackBoard:1
    }
    const {strength:classStrength, benches:classBenches,blackBoard:classBlackBoard} = classDetails;
    ```

36. Difference between prototypal and classical inheritance

    - Classical inheritance has strong child parent relations. prototypal inheritance is only based on the prototype method. So you can have more complex inheritance structures.

37. What is a Temporal Dead Zone?

    - Any const/let variable reference before its defitions is will throw a RefereceError. (Indicating its in a TDZ, even if its in the block scope)

38. What do you mean by JavaScript Design Patterns?
    Creational Design Patterns
    Structural Design Patterns
    Behavioral Design Patterns
    Concurrency Design Patterns
    Architectural Design Patterns

39. Difference between Async/Await and Generators usage to achieve the same functionality.

    - generator yield by yield which means one output at a time, whereas Async-await functions are executed sequentially one after another.
    - promises.all + async await also allows for multiple async tasks to finish concurrently

40. What is the role of deferred scripts in HTML header for JavaScript?

    - Deferred, the script waits for the HTML parser to finish before executing it. This reduces the time it takes for web pages to load

41. What is event bubbling

    - Event bubbling is a type of event propagation where the event first triggers on the innermost target element, and then successively triggers on the ancestors (parents) of the target element in the same nesting hierarchy till it reaches the outermost DOM element(i.e, global window object).

42. What is event capturing

    - Event capturing is a type of event propagation where the event is first captured by the outermost element, and then successively triggers on the descendants (children) of the target element in the same nesting hierarchy till it reaches the innermost target DOM element.
    - You need to pass true value for addEventListener method to trigger event handlers in event capturing phase.

43. What is the difference between an attribute and a property

    - Attributes are defined on the HTML markup whereas properties are defined on the DOM. https://stackoverflow.com/questions/258469/what-is-the-difference-between-attribute-and-property

44. What would be the result of 3+2+”7″?

    - Here, 3 and 2 behave like an integer, and “7” behaves like a string. So 3 plus 2 will be 5. Then the output will be 5+”7″ = 57.

45. Explain Promise.all with async-await in JavaScript

    ```
    let firstPromise = () => {return new Promise((resolve, reject) => {resolve("Hello! ");}); };
    let secondPromise = () => {return new Promise((resolve, reject) => {resolve("Hi! ");}); };

    let promiseExecution = async () => { // Async function to perform execution of all promise
        let promise = await Promise.all([firstPromise(),secondPromise(),]);
        console.log(promise);
    };

    // Function call
    promiseExecution();
    ```

46. Types of design patterns
    - 1.  Creational: These patterns are designed for class instantiation. They can be either class-creation patterns or object-creational patterns.
    - 2.  Structural: These patterns are designed with regard to a class's structure and composition. The main goal of most of these patterns is to increase the functionality of the class(es) involved, without changing much of its composition.
    - 3.  Behavioral: These patterns are designed depending on how one class communicates with others.

47. Cookies vs Local Storate vs Session Storage 
    - Cookies - Small 4kb gets sent with every fetch call
    - Local Storate - Persistant, large good for application state
    - Session Storage - Does not persist after tab is closed, good for clearing data (in a form for example)

48. Optimization to make application more performant
    - Module Bundler
        - Either webpack or vite
        - polyfill - adds modern JS features to non-mondern target enviorments
        - Compression
        - Uglify/Minifications - rename variables/removes spaces
        - Obfuscation - not normally used
        - source maps - maps soruce code to final code artifact
    - Code spliting
        - try to only send code needed for inital load
    - CDN
    - Tree shaking
        - Need es6 modules: to remove unused code
49. Big image optimization
    - Dimensions: Always want to ship the minimum size
    - Compression/ Image Optimation: removes metadata/colorspace
    - WebP format (better than PNG)
    - Add images to CDN with proper cache policys
    - Lazy loading as user scrolls
    - Specify width/height so no layout shift
    - srcSet -  to ship a set of imaages that depend on the viewport
50.  Manage code quality in an team:
    - Linting
    - Ally
    - Unit Testing    
    - E2E Testing
    - Dependency Scaning
    - Ligthouse/Sentry (SEO scanners)
51. XSS Attack
    - Example: 
        1) Facebook user adds comment as JS
        2) Comment is loaded later as JS and injects code into user computer. 
    - Sanitize inputs from user AND from the server
    - Never use __dangerouslySetInnerHtml
52. What is a micro front end
    - WHen you have a larger front end team 30+ engineers 
    - Need different team to deal with different components on the page
    - Adds alot of complexity with state
53. Event loop overview:
54. Concurrent React (Async React)
55. What is is a fiber?
56. Optimize re-render
57. rehydrate?
56. Ways sibiling componets can share state:
    1) Lift state to parent
    2) Use state in context
    3) State libray - redux, zustand
57. Disadvantages of global state 
    1) Lots of rerenders
    2) Coupling lots of components makes things harder to move around
    3) Testing is harder as it needs to be mocked
58. Ways to make front end application faster:
    1) Add a cdn
    2) Compression
    3) Cacheing
    4) Bundle spliting
    5) Image optimizaion (webP)
59. Code spliting
    - helps you know what code to load depending on the route webpack can split the code and only send the needed code down.
