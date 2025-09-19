# JavaScript Cheat Sheet

## Array Methods

### Iteration Methods
```js
arr.forEach((item, index, array) => {})                               // execute function for each element
arr.map((item, index, array) => {})                                   // transform each element, return new array
arr.filter((item, index, array) => {})                               // keep elements that pass test
arr.find((item, index, array) => {})                                 // return first element that passes test
arr.findIndex((item, index, array) => {})                            // return index of first element that passes test
arr.some((item, index, array) => {})                                 // test if any element passes test
arr.every((item, index, array) => {})                                // test if all elements pass test
arr.reduce((acc, item, index, array) => {}, initialValue)            // reduce array to single value
arr.reduceRight((acc, item, index, array) => {}, initialValue)       // reduce from right to left
```

### Mutating Methods
```js
arr.push(item1, item2, ...)                                          // add to end, return new length
arr.pop()                                                             // remove from end, return removed item
arr.unshift(item1, item2, ...)                                       // add to start, return new length
arr.shift()                                                           // remove from start, return removed item
arr.splice(start, deleteCount, item1, item2, ...)                    // change contents by removing/replacing/adding
arr.sort((a, b) => {})                                                // sort in place
arr.reverse()                                                         // reverse in place
arr.fill(value, start, end)                                           // fill with static value
```

### Non-Mutating Methods
```js
arr.slice(start, end)                                                 // shallow copy portion
arr.concat(arr2, arr3, ...)                                          // merge arrays
arr.join(separator)                                                   // join elements into string
arr.indexOf(item, fromIndex)                                         // find first index of item
arr.lastIndexOf(item, fromIndex)                                     // find last index of item
arr.includes(item, fromIndex)                                        // check if contains item
arr.flat(depth)                                                      // flatten nested arrays
arr.flatMap((item, index, array) => {})                             // map then flatten
```

## String Methods

### Search Methods
```js
str.indexOf(searchStr, fromIndex)                                    // find first occurrence
str.lastIndexOf(searchStr, fromIndex)                               // find last occurrence
str.includes(searchStr, position)                                   // check if contains substring
str.startsWith(searchStr, position)                                 // check if starts with
str.endsWith(searchStr, length)                                     // check if ends with
str.search(regexp)                                                  // search with regex
str.match(regexp)                                                   // match against regex
str.matchAll(regexp)                                                // get all matches with regex
```

### Extraction Methods
```js
str.slice(start, end)                                               // extract section
str.substring(start, end)                                          // extract between indices
str.substr(start, length)                                          // extract from start for length (deprecated)
str.charAt(index)                                                  // character at index
str.charCodeAt(index)                                              // character code at index
```

### Transformation Methods
```js
str.toLowerCase()                                                   // convert to lowercase
str.toUpperCase()                                                   // convert to uppercase
str.trim()                                                          // remove whitespace from both ends
str.trimStart()                                                     // remove from start
str.trimEnd()                                                       // remove from end
str.padStart(length, padString)                                     // pad from start
str.padEnd(length, padString)                                       // pad from end
str.repeat(count)                                                   // repeat string
```

### Split/Replace Methods
```js
str.split(separator, limit)                                        // split into array
str.replace(searchValue, replaceValue)                             // replace first match
str.replace(regexp, (match, p1, p2, ..., offset, string) => {})   // replace first match with callback
str.replaceAll(searchValue, replaceValue)                          // replace all matches
str.replaceAll(regexp, (match, p1, p2, ..., offset, string) => {}) // replace all matches with callback
```

## Common Patterns

### Array → String
```js
arr.join(', ')          // "a, b, c"
arr.map(x => x).join()  // transform then join
```

### String → Array
```js
str.split('')           // split into characters
str.split(' ')          // split by spaces
str.split(/\s+/)        // split by whitespace (regex)
```

### Chaining
```js
arr.filter(x => x > 0).map(x => x * 2).join(', ')
str.trim().toLowerCase().split(' ')
```

### Common Callback Patterns
```js
// Sort numbers
arr.sort((a, b) => a - b)           // ascending
arr.sort((a, b) => b - a)           // descending

// Sort objects
arr.sort((a, b) => a.name.localeCompare(b.name))

// Group/count with reduce
arr.reduce((acc, item) => {
  acc[item] = (acc[item] || 0) + 1
  return acc
}, {})
```

# JavaScript Syntax Cheat Sheet

## Nullish Coalescing & Optional Chaining
```js
const value = obj?.prop ?? 'default';        // nullish coalescing
const method = obj?.method?.();               // optional method call
const item = arr?.[0];                       // optional array access
```

## Conditional Branching
```js
// Ternary
const result = condition ? 'yes' : 'no';

// Short-circuit
condition && doSomething();
condition || setDefault();

// Nullish assignment
obj.prop ??= 'default value';
```

## Object Iteration
```js
// Object.entries() - most versatile
for (const [key, value] of Object.entries(obj)) { }

// Other methods
Object.keys(obj).forEach(key => { });
Object.values(obj).forEach(value => { });
```

## Destructuring with Renaming
```js
// Objects
const {prop: newName, deep: {nested: alias}} = obj;
const {name = 'default', age: userAge} = user;

// Arrays
const [first, second, ...rest] = array;
const [, , third] = array;  // skip elements
```

## Class Syntax
```js
class MyClass extends Parent {
  #private = 'secret';
  
  constructor(value) {
    super();
    this.value = value;
  }
  
  method() { return this.value; }
  
  static staticMethod() { }
  
  get accessor() { return this.#private; }
  set accessor(val) { this.#private = val; }
}
```

## Prototype Inheritance
```js
// Function constructor
function Person(name) { this.name = name; }
Person.prototype.greet = function() { return `Hi, ${this.name}`; };

// Object.create
const child = Object.create(parent);
child.method = function() { };
```

## Promise Syntax
```js
// Promise chain
promise
  .then(result => result.data)
  .catch(error => console.error(error))
  .finally(() => cleanup());

// Async/await
try {
  const result = await promise;
} catch (error) {
  console.error(error);
}

// Promise utilities
Promise.all([p1, p2, p3])
Promise.race([p1, p2])
Promise.allSettled([p1, p2])
```

## Common Browser Events
```js
// Mouse
el.addEventListener('click', fn);
el.addEventListener('dblclick', fn);
el.addEventListener('mouseenter', fn);  // no bubbling
el.addEventListener('mouseover', fn);   // bubbles

// Keyboard
el.addEventListener('keydown', fn);     // repeats when held
el.addEventListener('keyup', fn);

// Form
el.addEventListener('submit', fn);
el.addEventListener('change', fn);      // after blur
el.addEventListener('input', fn);       // real-time

// Window/Document
window.addEventListener('load', fn);           // all resources
document.addEventListener('DOMContentLoaded', fn); // DOM ready
window.addEventListener('resize', fn);
window.addEventListener('scroll', fn);
```

## Fetch API
```js
// GET
const response = await fetch('/api/data');
const data = await response.json();

// POST with JSON
const response = await fetch('/api/data', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ key: 'value' })
});

// Error handling
if (!response.ok) throw new Error(`HTTP ${response.status}`);
```

## Timers
```js
// setTimeout
const timeoutId = setTimeout(() => { }, 1000);
clearTimeout(timeoutId);

// setInterval
const intervalId = setInterval(() => { }, 1000);
clearInterval(intervalId);

// Promise-based delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
await delay(1000);
```

## Array Methods (Confusing Ones)
```js
// Mutating vs Non-mutating
arr.sort()        // MUTATES original
arr.reverse()     // MUTATES original
arr.splice()      // MUTATES original

arr.slice()       // returns new array
arr.concat()      // returns new array
arr.toSorted()    // returns new array (newer)

// Reduce patterns
arr.reduce((acc, curr) => acc + curr, 0);           // sum
arr.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {}); // to object
```

## Spread & Rest
```js
// Spread
const newArr = [...arr1, ...arr2];
const newObj = { ...obj1, ...obj2 };
fn(...args);

// Rest
function fn(...args) { }
const [first, ...rest] = array;
const { prop, ...others } = object;
```

## Template Literals
```js
// Basic
const str = `Hello ${name}!`;

// Multiline
const html = `
  <div>
    <p>${content}</p>
  </div>
`;

// Tagged templates
const styled = css`color: ${color};`;
```

## Module Syntax
```js
// Export
export const value = 123;
export default MyClass;
export { fn as myFunction };

// Import
import Default, { named } from './module';
import * as Everything from './module';
import('./module').then(mod => { }); // dynamic
```

