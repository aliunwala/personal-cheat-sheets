// HTML connection
// inline html
// <script src='index.js'></script>
// <script>body{background-color:blue} </script>
// <script>body{background-color:blue} </script>
// <link rel="stylesheet" href="styles.css">

/********************
 * Utility Functions
 ********************/
setTimeout(() => {}, 100); // 0.1 second timeout

// template literal
let expression = "testVar";
let templateLiteralString = `string text ${expression} string text`; // template literals

// taged template literal
function tagFn(strings, expressionVar) {
  return strings.concat(expressionVar);
}
let templateLiteralStringFn = tagFn`string text ${expression} str ing text`; //[ 'string text ', ' string text', 'testVar' ]

// Nullish coalescing operator (??)
//returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
// used to set a default value (Especially when 0 is a valid value for the variable)
const foo = null ?? "default string"; // logs 'default string'
const baz = 0 ?? 42; // logs 0

// Pass by value vs pass by reference (Its always by value. But for obj/array the value is the reference)
function changeStuff(a, b, c) {
  a = a * 10;
  b.item = "changed";
  c = { item: "changed" };
}
var num = 10;
var obj1 = { item: "unchanged" };
var obj2 = { item: "unchanged" };
changeStuff(num, obj1, obj2);
//------
console.log(num); // 10
console.log(obj1.item); // changed
console.log(obj2.item); // unchanged

/************************
 * DOM Utility Functions
 ************************/
// document.getElementById("elementID"); // Get element
// document.getElementById("elementID").innerHTML; // Get text inside element
// document.getElementById("elementID").innerHTML = "test"; // Set text inside element
// alert("hi") //make a message box with "hi"
// confirm("Are you sure") // returns true/false depending on user click
// prompt("How old are you?","0") // input with default value 0, user value returned to code
// TODO

/*************
 * Functions
 ************/
// Anonomus function
(a, b) => {
  return a + b;
};

// regular function
function add(a, b) {
  return a + b;
}
console.log("Functions add", add(1, 2));

/*************
 * Loops
 ************/
// Basic for
let arr = [1, 2, 3, 4, 5];
let s = "";
for (let i = 0; i < arr.length; i++) {
  s = s + arr[i];
}
console.log("Loops: Basic Array", s);

// For...in loop
// Best used to iterate over keys of objects
// (objects only does not work with arrays)
let objs = { a: "1", b: "2", c: "3", d: "4", e: "5" };
let s1 = "";
for (let obj in objs) {
  s1 = s1 + obj;
}
console.log("For...in: ", s1);

// For...of loop (arrays only)
// Best used to iterate over values in array
// Does not work on objects
let arr2 = [11, 22, 33, 44, 55];
let s2 = "";
for (let i of arr2) {
  s2 = s2 + i;
}
console.log("For...of: ", s2);

// while loop
let arr3 = ["a", "b", "c", "d", "e"];
let s3 = "";
let whileIndex = 0;
while (whileIndex < arr3.length) {
  s3 = s3 + arr3[whileIndex];
  whileIndex++;
}
console.log("While Loop: ", s3);

// do while loop
let arr4 = ["a", "b", "c", "d", "e"];
let s4 = "";
let doWhileIndex = 0;
do {
  s4 = s4 + arr4[doWhileIndex];
  doWhileIndex++;
} while (doWhileIndex < arr4.length);
console.log("Do while Loop: ", s4);

// break // terminates the "active loop", program control jumps to next line post-loop
// continue // skip rest of this cycle, and goes to the next one.

//For each
const arrayforEach = ["a", "b", "c"];
arrayforEach.forEach((element, idx, origArray) => console.log(element, idx));

// Obj iteration
const object1 = {
  a: { somestring: true },
  b: 42,
};
for (const [key, value] of Object.entries(object1)) {
  console.log(key, value);
}

/*************
 * Arrays
 ************/
/**
 * Inplace array solution:
 *  1) Array.push("endFlag")
 *  2) Use Array.shift() to remove values from start
 *  3) Use Array.push() to add things to the end
 * */

/**
 * Second/nth smallest element
 * Array.sort(a,b => a-b).slice(0,2)
 */

/**
 * Reverse sequence of things can be done with
 * - double pointers (fastest)
 * - stack (simplier)
 */

/**
 * Check if all values at each index are the same between 2 arrays
 * let arr = [1,1,1,1]
 * [1,1,1,1].every( (val, i, arr) => val === arr[0] )   // true
 */

let animals = ["cat", "dog", "elephant", "tiger"];
let animalsUnsorted = ["cat", "elephant", "dog", "tiger", 1, 2, 3];
let numbersUnsorted = [1, 30, 4, 21, 100000];
let myArrObjDecl = new Array("cat", "dog", "elephant", "tiger");

// animals.length // returns 4
// animals[0] = "lynx"; // sets value of position 0 to lynx
// animals[9] = "lynx"; // sets value of position 9 to lynx with undefined items in the middle. Printed looks like: [ 'cat', 'dog', 'elephant', 'tiger', <5 empty items>, 'lynx' ]
// let animalsOutput = animals.join("-"); // cat-dog-elephant-tiger
// let animalsOutput = animals.pop(); // removes last elem from array and returns poped element.
// let animalsOutput = animals.push("liger"); // adds elem to last position, returns index it was added at.
// let animalsOutput = animals.shift(); // remove first element, shift all elements down one position.  and return removed element (cat is returned)
// let animalsOutput = animals.unshift("bird"); // add bird at [0] and shift all values down 1 index. Like so: [ 'bird', 'cat', 'dog', 'elephant', 'tiger' ] Returns new lenght (5)
// let animalsOutput = animals.splice(2, 0, "owl", "frog"); // splice(insertIdx, removeNumber, elem1, elem2) at insertIdx remove removeNumber of elements then insert elem1...elemn at insertIdx. return any removed values as an array . [ 'cat', 'dog', 'owl', 'frog', 'elephant', 'tiger' ]
// let animalsOutput = animals.splice(2, 1, "owl", "frog"); // splice(insertIdx, removeNumber, elem1, elem2) at insertIdx remove removeNumber of elements then insert elem1...elemn at insertIdx. return any removed values as an array. Arry: [ 'cat', 'dog', 'owl', 'frog', 'tiger' ]
// let animalsOutput = animals.concat([1, 2, 3], ["a", "b", "c"]); //[ 'cat', 'dog', 'elephant', 'tiger', 1, 2, 3, 'a', 'b', 'c' ]
// let animalsOutput = animals.concat(1, 2, 3); //[ 'cat', 'dog', 'elephant', 'tiger', 1, 2, 3 ]
// .join()/.join(seperator) // Returns a joined STRING of the values in the array.
// let animalsOutput = animals.slice(1, 3); // returns elements from 1 to 3-1 output: [ 'dog', 'elephant' ]. Original array is unchanged
// let animalsOutput = animalsUnsorted.sort(); // Automatically sorts alphabetically (NOT numercially) Output: [ 1, 2, 3, 'cat', 'dog', 'elephant', 'tiger' ]
// let animalsOutput = animals.sort((a, b) => {  /*see notes*/ }); // compareFn returns -1,1,0 depending on if(a>b); if(a<b); a=b
// animals.reverse(); // reverses the array inplace. (no need to capture return value)
// toReverse() is similar to above but is NOT INPLACE and returns the revesed array
// numbersUnsorted.sort((a, b) => { return a - b; }); // Sorts numerically, inplace, Reverse order will be "return b-a"
// let highest = numbersUnsorted[numbersUnsorted.length - 1]; // Easy way to get highest number after a sort
// numbersUnsorted.sort((a, b) => {  return 0.5 - Math.random();}); // randomizes element into the array
// some(callbackFn) //The some() method of Array instances tests whether at least one element in the array passes the test implemented by the provided function.
// at() // works just like [] to get a value. But chains better with other functions
// entries // returns iterator of key valued pairs of array iterator1 = array1.entries(); console.log(iterator1.next().value); // Expected output: Array [0, "a"]
// keys() // returns an inerator of keys (indices) of the array.const array1 = ['a', 'b', 'c']; const iterator = array1.keys();for (const key of iterator) {console.log(key);}
// values() //  returns an iterator of values of the array (elems) works like keys()
// every(callbackFn) // checks if every element passes a test.
// fill(value, start, end) // places value in index's from start to end-1
// indexOf(searchElement, fromIndex) // NO CALLBACK FN. Returns first index of searchElement
// lastIndexOf(searchElement, fromIndex) // NO CALLBACK FN. Returns last index of searchElement
// find(callbackFn) // returns FIRST element to match of callbackFn, or undefined
// findIndex(callbackFn) // returns FIRST INDEX when array elem matches callbackFn, or -1
// findLast(callbackFn) // returns LAST element to match of callbackFn, or undefined
// findLastIndex(callbackFn) // returns LAST INDEX when array elem matches callbackFn, or -1
// Array.from(iterable) // makes an array from an iterable (Like a string)
// Array.from("MakeMeIntoAnCharacterArray") // DO NOT USE THIS. TL;DR: Splitting a string into an array is about 70 times faster with 'a string'.split('') than Array.from('a string').

// Test if two arrays have same elements:
var array1 = [
  10, 6, 19, 16, 14, 15, 2, 9, 5, 3, 4, 13, 8, 7, 1, 12, 18, 11, 20, 17,
];
var array2 = [
  12, 18, 20, 11, 19, 14, 6, 7, 8, 16, 9, 3, 1, 13, 5, 4, 15, 10, 2, 17,
];
if (array1.sort().join(",") === array2.sort().join(",")) {
  alert("same members");
}

// Getting counts generically:
const arr = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
const counts = {};
for (const num of arr) {
  counts[num] = counts[num] ? counts[num] + 1 : 1;
}

// Getting counts for characters in a string
let word1 = "sssdlfjerkkkkekkwlrjeojosldnfflw";
let arr1 = new Array(26).fill(0);
for (let i = 0; i < word1.length; i++) {
  arr1[word1.charCodeAt(i) - "a".charCodeAt(0)]++;
}

// Set operations on Array
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
// https://2ality.com/2015/01/es6-set-operations.html
// https://2ality.com/2015/01/es6-maps-sets.html
let intersection = arr1.filter((x) => arr2.includes(x)); // Yields values which are present in both arr1 and arr2.
let difference = arr1.filter((x) => !arr2.includes(x)); // Yields values that are present in just arr1.
let symDifference = arr1
  .filter((x) => !arr2.includes(x))
  .concat(arr2.filter((x) => !arr1.includes(x))); // Yields values that are only in arr1 or arr2, but not both ("exclusive or").

// Map
const array1 = [1, 4, 9, 16];
const map1 = array1.map((x) => {
  x * 2;
});
console.log("Map duplicates each element: ", array1);

// Filter
const words = ["spray", "elite", "exuberant", "destruction", "present"];
const result = words.filter((word) => word.length > 6);
console.log(
  "Filter removes any element that do not pass a length check: ",
  result
);

// Reduce
const array2 = [1, 2, 3, 4];
// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array2.reduce((accumulator, currentValue) => {
  accumulator + currentValue;
}, initialValue);
console.log("Reduce can be used to join or sum: ", sumWithInitial);
//reduceRight(callbackFn) // Starts currentValue at postion n instead of 0

/*************
 * Strings
 ************/

// String.prototype.at();
let strAt = "catdog";

// String.prototype.charAt();
// String.prototype.charCodeAt();
// String.prototype.codePointAt();
// String.prototype.concat();
// String.prototype.endsWith();
// String.fromCharCode();
// String.fromCodePoint();
// String.prototype.includes();
// String.prototype.indexOf();
// String.prototype.isWellFormed();
// String.prototype.lastIndexOf();
// String.prototype.localeCompare();
// String.prototype.match();
// String.prototype.matchAll();
// String.prototype.normalize();
// String.prototype.padEnd();
// String.prototype.padStart();
// String.raw();
// String.prototype.repeat();
// String.prototype.replace();
// String.prototype.replaceAll();
// String.prototype.search();
// String.prototype.slice();
// String.prototype.split();
// String.prototype.startsWith();
// String.prototype.substring();
// String.prototype.toLocaleLowerCase();
// String.prototype.toLocaleUpperCase();
// String.prototype.toLowerCase();
// String.prototype.toString();
// String.prototype.toUpperCase();
// String.prototype.toWellFormed();
// String.prototype.trim();
// String.prototype.trimEnd();
// String.prototype.trimStart();
// String.prototype.valueOf();

/*************
 * Functions
 ************/

/*************
 * Functions
 ************/

/*************
 * Set
 ************/
//convert non array to array
let a = new Set([1, 2, 3]);
[...a];

/*************
 * Heap / Priority Queues
 ************/
// https://www.youtube.com/watch?v=wptevk0bshY
//https://stackfull.dev/heaps-in-javascript
// https://dandkim.com/js-heap-implementation/

/*************
 * Dynamic Programing
 ************/
// Can the problem be divided down into sub-problems?
// Is recursion involved?
// Are the sub-problems overlapping?
// https://www.youtube.com/watch?v=aPQY__2H3tE&t=462s

// Make a directed acyclic graph.
// Find a subproblem
// Generalize subproblem

/*************
 * Backtracking
 ************/
// https://medium.com/analytics-vidhya/the-blueprint-to-solve-any-backtracking-problem-b3640a3dcbd7
// It incrementally builds candidates to the solutions and abandons each partial candidate as soon as it determines that the candidate cannot possibly be completed.
/**
 *
 */

/*************
 * Binary Trees
 ************/
// DFS
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

function dfs(root, res) {
  if (root === null) return;
  // preorder
  res.push(root); // move this around for diffrent order traversals
  dfs(root.left, res);
  //inorder
  dfs(root.right, res);
  // postorder
}

/*************
 * Graph
 ************/
//DFS
/**
 * @param {number[][]} isConnected
 */
let n = isConnected.length;
let seen = new Set();
let dfs = function (u) {
  if (seen.has(u)) return;
  seen.add(u);
  for (let i = 0; i < n; i++) {
    if (isConnected[u][i]) dfs(i);
  }
};
dfs(0); // Starts DFS at node 0

// https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/
