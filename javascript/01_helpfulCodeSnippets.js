/*
I will use {} to add block scope that allows me to reuse variable names safely like so:
{
  let x = 50;
  console.log(x); // x === 50
}
{
  let x = 25;
  console.log(x); // x === 25
}
*/
/********************
 * Personal Checklist
 * 1) Sorted Data? Would this problem be easier to solve with sorted data? Remember you can sort data based on a arbitrary key
 * 2) Is the data monotonically increasing/decreasing?
 * 2) Multiple Pointers? Would multiple pointers make things eaiser?
 * 3) Can this problem be broken into sub problems? -- This is probably DP
 * 4) Does this problem lend itself to a tree-like structure? -- Use recursion/DP/Backtracking
 * 5) Does storing a previous value make the next value eaier to calcuate? -- Memoization
 * 6) Would a hashmap give my instant lookup?
 * 7) Do not need duplicates? Try a set.
 * 8) If working with A-Z or 1-9 use a array to keep counts (instead of a hash)
 * 9) If inplace solution add endFlag to array and work on elements and push them back onto the array
 * 10) Need Max/Min values over and over. You need a max/min heap.
 *
 ********************/

/********************
 * Utility Functions
 ********************/
{
  // ******************** Reading documtation, square brackets means optional.
  // https://stackoverflow.com/questions/17132014/how-to-interpret-documentation-for-optional-javascript-parameters
  //  For instance in axios: https://axios-http.com/docs/instance
  // *** Ex1: Documenation: axios#delete(url[, config])
  // axios#delete(url) //Valid
  // axios#delete(url,config)//Valid
  // axios#delete(config)//Not Valid
  // ------
  // *** Ex2: Documentaion: axios#patch(url[, data[, config]]) // Nested brackets mean you must have data to have config.
  // axios#patch(url) //Valid
  // axios#patch(url, data) //Valid
  // axios#patch(url, data, config) //Valid
  // axios#patch(url, config ) //Not Valid

  // ******************** Getting and reversing characters - ascii code
  // console.log("\n".charCodeAt());
  // console.log(String.fromCharCode(10))

  // ******************** Check if a tuple is in a set of tuples:
  const a1 = [
      [1, 2],
      [5, 6],
    ],
    array5 = [5, 6];
  const find = JSON.stringify(a1).includes(JSON.stringify(array5));
  // console.log(find);

  // ******************** Adding a property to an object
  let obj1 = { year: "2025", make: "toyota" };
  let obj2 = { ...obj1, year: "2026" }; //JS takes the rightmost keys, so the key for 2025 gets overwritten.
  // console.log(obj2) // {year: '2026', make: 'toyota'}

  // ******************** Comparing primative objects does not work.
  // console.log(new Number(1) === new Number(1)); // False since both are generic objects
  // console.log(new Number(1).valueOf() === new Number(1).valueOf()); // True
  // console.log(new String("1").valueOf() === new String("1").valueOf()); // True
  // ******************** Convert to base 2  (bitwise, base2)
  let h = 12;
  let base2h = h.toString(2);
  let h1count = base2h.match(/1/g);
  let h0count = base2h.match(/0/g);
  // Reverse back to decimal. base2->decimal
  let binary = "1101000"; // code for 104
  let digit = parseInt(binary, 2);
  // console.log(base2h); //"1100"
  // console.log("h1count: ", h1count, h1count.length);
  // console.log("h0count: ", h0count, h0count.length);
  // ******************** Delay some code
  setTimeout(() => {}, 100); // 0.1 second timeout

  // Template literal - Template literals coerce their expressions directly to strings,
  let expression = "testVar";
  let templateLiteralString = `string text ${expression} string text`; // template literals
  // console.log(templateLiteralString); // "string text testVar string text"

  // ******************** Taged template literal
  const person = "Mike";
  const age = 28;
  function myTag(strings, personExp, ageExp) {
    // personExp, ageExp are passed inorder of the template string from left to right
    const str0 = strings[0]; // "That "
    const str1 = strings[1]; // " is a "
    const str2 = strings[2]; // "."
    const ageStr = ageExp < 100 ? "youngster" : "centenarian";
    // We can even return a string built using a template literal
    return `${str0}${personExp}${str1}${ageStr}${str2}`;
  }
  const output = myTag`That ${person} is a ${age}.`;
  // console.log(output); // "That Mike is a youngster."

  // ******************** Quickly prints so you can see a variable
  // console.log("myVariable: ", myVariable); // OLD WAY
  // console.log({ myVariable }); // Faster

  // ******************** in keyword for checking if object keys exist
  let objs = { a: "1", b: "2", c: "3", d: "4", e: "5" };
  let checkKey = "a" in objs;
  // console.log("checkKey:", checkKey); // checkKey: true

  // ******************** Nullish coalescing operator (??)
  // returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
  // used to set a default value (Especially when 0 is a valid value for the variable)
  const foo = null ?? "default string";
  // console.log("foo:", foo); // 'default string'
  const baz = 0 ?? 42;
  // console.log("baz:", baz); // 0

  // ******************** Pass by value vs pass by reference (Its always by value. But for obj/array the value is the reference)
  // All values are pass by value in JS.
  // BUT array variables and object variables hold POINTERS to the array/object. This makes them look like pass by reference sometimes.
  // All primitive types in JS are IMMUTABLE
  function changeStuff(a, b, c) {
    a = a * 10;
    b.item = "changed";
    c = { item: "changed" };
  }
  var num = 10;
  var obj1 = { item: "unchanged" };
  var obj2 = { item: "unchanged" };
  changeStuff(num, obj1, obj2);
  // console.log(num); // 10
  // console.log(obj1.item); // changed
  // console.log(obj2.item); // unchanged

  // ******************** Remove duplicates from array
  // Version 1
  const dup = [1, 2, 2, 4, 4, 5, 13, 123, 5, 1, 2, 1];
  const removeDup = [...new Set(dup)];
  // const removeDup = Array.from(new Set(dup)); // Also works
  // console.log(removeDup);

  // Version1 w/obj unorderd [1,2,3] != [3,2,1]
  const dupobj = [
    [1, 2, 3],
    [1, 2, 3],
    [3, 2, 1],
    [1, 2, 4],
  ];
  const removeDupObj = dupobj.map((e) => JSON.stringify(e));
  const setObj = [...new Set(removeDupObj)];
  // console.log(setObj);

  // Version1 w/obj ordered  [1,2,3] === [3,2,1]
  const dupobjOrder = [
    [1, 2, 3],
    [1, 2, 3],
    [3, 2, 1],
    [1, 2, 4],
  ];
  const removeDupObjOder = dupobjOrder.map((e) =>
    JSON.stringify(
      e.sort((a, b) => {
        return a - b;
      })
    )
  );
  const setObjOrder = [...new Set(removeDupObjOder)];
  // console.log(setObjOrder);

  // Version 2
  var dup2 = ["a", 1, "a", 2, "1"];
  var unique = dup2.filter((e, idx, arr) => {
    return arr.indexOf(e) === idx;
  });
  // console.log(unique); // ['a', 1, 2, '1']

  // ******************** dynamic object key values
  let dynamic = "dynamicallySetKey";
  let myobj = { test: "testVal", [dynamic]: "dynamicVal" };
  // console.log(myobj);

  // ******************** performance checking
  let startAt = performance.now();
  for (let h = 0; h < 6969100; h++) {}
  let endAt = performance.now();
  let elapsedTime = endAt - startAt;
  // console.log(elapsedTime, "milisec to run.");

  // ******************** out of order function arguments - using destructuring
  function getFullName({ first, middle, last }) {
    console.log(first, middle, last);
  }
  let first = "A";
  let middle = "B";
  let last = "C";
  // getFullName({ middle, first, last }); // order doest matter as destructuring takes care of it.

  // ******************** optional chaining, empty/null objects, setting defaults with it
  const myperson = {
    name: "Dom",
    age: "24",
    // // This data might not be on the server
    // vehicle: {
    //   year: "2012",
    // },
  };
  // let vehicleYear = myperson.vehicle ? myperson.vehicle.year : undefined; //old way
  let vehicleYear = myperson.vehicle?.year; // new way, optional chaning
  let expiry = myperson.vehicle?.warranty?.date; //double chanining
  let drive = myperson.vehicle?.drive?.(); //checking if a function exists
  let vehicleYearWithDefault = myperson.vehicle?.year ?? 1900; // if we dont get a value we defalt to 1900
  // console.log({ vehicleYear });
  // console.log({ vehicleYearWithDefault });

  // ******************** check for undefined or null (or the opposite) https://stackoverflow.com/questions/2559318/how-to-check-for-an-undefined-or-null-variable-in-javascript
  let some_variable = undefined;
  if (some_variable == null) {
    /*some_variable is either null or undefined*/
  }
  // This is usually now done with nullish collesing operator:
  let a = {};
  if (a.speed == null) {
    // Set default if null or undefined
    a.speed = 42;
  }
  a.speed ??= 42;
  a.speed ?? (a.speed = 42);
  a.speed = a.speed ?? 42;
  //-----------------------------------
  if (some_variable != null) {
    // Same as:   if (typeof some_variable !== "undefined" && some_variable !== null) {}
    /*some_variable is not null and not undefined*/
  }
  // ******************** general falsy values
  if (!some_variable) {
    // some_variable is either null, undefined, 0, NaN, false, or an empty string
  }
  if (some_variable) {
    // we don't get here if some_variable is null, undefined, 0, NaN, false, or ""
  }

  // ******************** Make 2d array with all 0s
  // The fill() is VERY IMPORTANT as map will not work an empty array.
  let arr2d = new Array(5).fill().map(() => new Array(3).fill(0));
  // const arr2d = Array.from({ length: 5 }, () => new Array(3).fill(0)); // Another way to do it
  // console.log(arr2d);
} //Utility Functions

/************************
 * DOM Utility Functions
 ************************/
{
  // document.getElementById("elementID"); // Get element
  // document.getElementById("elementID").innerHTML; // Get text inside element
  // document.getElementById("elementID").innerHTML = "test"; // Set text inside element
  // alert("hi"); //make a message box with "hi"
  // confirm("Are you sure"); // returns true/false depending on user click
  // prompt("How old are you?", "0"); // input with default value 0, user value returned to code
  // TODO;
  // localStorage //Its nice storage domain specifc... Not secure.
  // sessionStorage // Similar to local storage but only per session
  // document.cookie // Sent with every request - 5KB so very small
  //
} // DOM Utility Functions

/*************
 * Functions
 ************/
{
  // ******************** Anonomus function
  (a, b) => {
    return a + b;
  };

  // ******************** regular function aka "function declaration", or "function statement"
  function add1(a, b) {
    return a + b;
  }
  // console.log("Function add1:", add1(1, 2)); // 3

  // ******************** Function as a variable aka "Function expressions"
  // Function expressions are convenient when passing a function as an argument to another function.
  let add2 = function (a, b) {
    // Anonomus version
    return a + b;
  };
  // console.log("Function add2:", add2(1, 2)); // 3

  const factorial = function fac(n) {
    // Named version
    return n < 2 ? 1 : n * fac(n - 1);
  };
  // console.log(factorial(3)); // 6
}

/*************
 * Loops
 ************/
{
  // "for in" loops over enumerable property names of an object.
  // "for in" -> Objects will iterate over keys
  // "for in" -> Arrays DO NOT USE -> https://stackoverflow.com/questions/500504/why-is-using-for-in-for-array-iteration-a-bad-idea

  // "for of" (new in ES6) does use an object-specific iterator and loops over the values generated by that.
  // "for of" -> Arrays will iterate over elements
  // "for of" -> Objects will not work normally try -> for (const [key, value] of Object.entries(object1)) {console.log(`${key}: ${value}`);}

  // remember Object.entries(obj1) - Object.values(obj1) - Object.keys(obj1) all exist to make iterating an object eaiser

  // break // terminates the "active loop", program control jumps to next line post-loop
  // continue // skip rest of this cycle, and goes to the next one.

  // ******************** Basic for loop
  let arr = [1, 2, 3, 4, 5];
  let s = "";
  for (let i = 0; i < arr.length; i++) {
    s = s + arr[i];
  }
  // console.log("For:", s); // For: 12345

  // ******************** For...in loop
  // for in loops over enumerable property names of an object.
  // Best used to iterate over keys of objects
  // (objects only does not work with arrays)
  let objs = { a: "1", b: "2", c: "3", d: "4", e: "5" };
  // let objs = ["a", "b", "c", "d", "e"]; // DO NOT EVER USE ARRAYS WITH FOR IN
  let s1 = "";
  for (let obj in objs) {
    s1 = s1 + obj;
  }
  // console.log("For...in: ", s1); // For...in:  abcde

  // ******************** For...of loop (arrays only)
  // Best used to iterate over values in array
  // Does not work on objects
  let arr2 = ["a", "b", "c", "d", "e"];
  let s2 = "";
  for (let i of arr2) {
    s2 = s2 + i;
  }
  // console.log("For...of: ", s2); // For...of:  abcde

  //******************** For each
  const arrayforEach = ["a", "b", "c"];
  // let arrayforEach = Object.entries({ a: "1", b: "2", c: "3", d: "4", e: "5" }); // Can use with objects like this
  arrayforEach.forEach((element, idx, origArray) => {
    // console.log(element, idx, origArray);
  });

  // ******************** while loop
  let arr3 = ["a", "b", "c", "d", "e"];
  let s3 = "";
  let whileIndex = 0;
  while (whileIndex < arr3.length) {
    s3 = s3 + arr3[whileIndex];
    whileIndex++;
  }
  // console.log("While Loop: ", s3); // While Loop:  abcde

  // ******************** do while loop
  let arr4 = ["a", "b", "c", "d", "e"];
  let s4 = "";
  let doWhileIndex = 0;
  do {
    s4 = s4 + arr4[doWhileIndex];
    doWhileIndex++;
  } while (doWhileIndex < arr4.length);
  // console.log("Do while Loop: ", s4); // Do while Loop:  abcde
} // Loops

/*************
 * Arrays
 ************/
{
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

  /**
   * Pointer problems...
   * Always look for increasing or decreasing variables in the subproblem - To lower the statespace
   * https://leetcode.com/problems/container-with-most-water
   * In this problem the containerArea = width*min(ptr1,ptr2)
   * Since the width is always decreasing you can really just focus on the min(ptr1,ptr2)
   */

  /**
   * Pointer problems...
   * Common pointer positions 0,1:
   * let ptr1 = 0
   * let ptr2 = 1
   *  while(ptr1 < arr.length-2){
   *    if(something){ptr1++}
   *    else{ptr2++}
   * }
   * Common pointer positions 0,n-1:
   * let ptr1 = 0
   * let ptr2 = height.length-1
   *  while(ptr1 < ptr2){
   *    if(something){ptr1++}
   *    else{ptr2--}
   * }
   */

  /**
   * QUESTIONS TO ASK MYSELF
   * Would the problem be eaiser with sorted data?
   * What is the core value to increase/decrease? (Use that to make if/else)
   * How many pointers do I need?
   * Does the window only need a +/- to get to next window
   *
   */

  // ******************** Test if two arrays have same elements:
  var arraySame1 = [
    10, 6, 19, 16, 14, 15, 2, 9, 5, 3, 4, 13, 8, 7, 1, 12, 18, 11, 20, 17,
  ];
  var arraySame2 = [
    12, 18, 20, 11, 19, 14, 6, 7, 8, 16, 9, 3, 1, 13, 5, 4, 15, 10, 2, 17,
  ];
  let same = arraySame1.sort().join(",") === arraySame2.sort().join(",");

  // ******************** Getting counts generically:
  const arrayCounts = [5, 5, 5, 2, 2, 2, 2, 2, 9, 4];
  const countsObj = {};
  for (const num of arrayCounts) {
    countsObj[num] = countsObj[num] ? countsObj[num] + 1 : 1;
  }
  // console.log("Counts:", countsObj);

  // ******************** Getting counts for characters in a string
  let wordCounts = "sssdlfjerkkkkekkwlrjeojosldnfflw";
  let arrChar = new Array(26).fill(0);
  for (let i = 0; i < wordCounts.length; i++) {
    arrChar[wordCounts.charCodeAt(i) - "a".charCodeAt(0)]++;
  }
  // console.log("Counts Char:", arrChar);

  // ******************** Set operations on Array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
  // https://stackoverflow.com/questions/1187518/how-to-get-the-difference-between-two-arrays-in-javascript
  // https://2ality.com/2015/01/es6-set-operations.html
  // https://2ality.com/2015/01/es6-maps-sets.html
  let arr1 = [1, 2, 3, 4, 5];
  let arr2 = [3, 4, 5, 6, 7];
  let intersection = arr1.filter((x) => arr2.includes(x)); // Yields values which are present in both arr1 and arr2.
  let difference = arr1.filter((x) => !arr2.includes(x)); // Yields values that are present in just arr1.
  let symDifference = arr1
    .filter((x) => !arr2.includes(x))
    .concat(arr2.filter((x) => !arr1.includes(x))); // Yields values that are only in arr1 or arr2, but not both ("exclusive or").

  // ******************** Map
  const arrayMap = [1, 4, 9, 16];
  const map1 = arrayMap.map((x, idx, arr) => {
    return x * 2; // multiply all elements of an array by 2
  });
  // console.log("Map: ", map1, "orig array:", arrayMap); // Map:  [ 2, 8, 18, 32 ] orig array: [ 1, 4, 9, 16 ]

  // ******************** Filter
  const wordFilter = ["spray", "elite", "exuberant", "destruction", "present"];
  const result = wordFilter.filter((word) => word.length > 6); // remove words bigger than 6char
  // console.log("Filter: ", result); // Filter:  [ 'exuberant', 'destruction', 'present' ]

  // ******************** Reduce
  const arrayReduce = [1, 2, 3, 4];
  const initialValue = 0;
  const sumWithInitial = arrayReduce.reduce(
    (accumulator, currentValue, idx, arr) => {
      return accumulator + currentValue; // Sum operation
    },
    initialValue
  );
  // console.log("Reduce: ", sumWithInitial); // Reduce:  10

  // ******************** Array class methods
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
} // Arrays

/*************
 * Strings
 ************/
{
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
} // Strings

/*************
 * Set
 ************/
{
  //convert non array to array
  let a = new Set([1, 2, 3]); //
  const arrFromSet = [...a]; // set to array
} // Set

/*************
 * Heap / Priority Queues
 ************/
{
  // https://www.youtube.com/watch?v=wptevk0bshY
  //https://stackfull.dev/heaps-in-javascript
  // https://dandkim.com/js-heap-implementation/
} // Heap / Priority Queues

/*************
 * Sliding Window
 ************/
{
}
/*************
 * Prefix Sum (Basically memoization)
 ************/
{
  // Simple concept: Use an array to save previous solutions so you have access to them later
  // Here we make arrRes which holds the "sum" of all the values from 0-n in arr.
  let arr = [1, 2, 3, 4, 5];
  let arrRes = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    arrRes[i] = arrRes[i - 1] + arr[i];
  }
  // console.log(arrRes); // [1,3,6,10,15]
}
/*************
 * Stack
 ************/
{
  // Basic code
  var stack = [];
  stack.push(2); // stack is now [2]
  stack.push(5); // stack is now [2, 5]
  var i = stack.pop(); // stack is now [2]
  // console.log(i);            // displays 5
}
/*************
 * Queue
 ************/
{
  // Basic code
  var queue = [];
  queue.push(2); // queue is now [2]
  queue.push(5); // queue is now [2, 5]
  var i = queue.shift(); // queue is now [5]
  // console.log(i); // displays 2
}
/*************
 * Linked List
 ************/
{
  // Linked List only really used in Javascript when constant time insertion/deletion is needed from the list
  /** Loop over a list
    while(head != null){
        console.log(head.val)
        head = head.next
    }
   */
  /**Loop over a list with access to prev/curr/next nodes (For reversing a linked list)
    let prev = null;
    let next = null;
    let curr = head;
    while (curr) {
        next = curr.next;
        console.log(prev&&prev.val,curr.val,next&&next.val) //Do work here. Access to prev/curr/next
        prev = curr;
        curr = next;
    }
  */
  /** Linked list vs queue?
   * Queue == FIFO
   * Stack == LIFO
   * Linked list is a possible implementation of either a LIFO/FIFO. (Array/Trees can also do this)
   *  */
}
/*************
 * Binary Search
 ************/
{
}
/*************
 * Trie
 ************/
{
}
/*************
 * Intervals
 ************/
{
}
/*************
 * Monotonic Stack
 ************/
{
}

/*************
 * Dynamic Programing
 ************/
{
  // Can the problem be divided down into sub-problems?
  // Is recursion involved?
  // Are the sub-problems overlapping?
  // https://www.youtube.com/watch?v=aPQY__2H3tE&t=462s
  // Make a directed acyclic graph.
  // Find a subproblem
  // Generalize subproblem
} // Dynamic Programing

/*************
 * Backtracking
 ************/
{
  // https://medium.com/analytics-vidhya/the-blueprint-to-solve-any-backtracking-problem-b3640a3dcbd7
  // It incrementally builds candidates to the solutions and abandons each partial candidate as soon as it determines that the candidate cannot possibly be completed.
  /**
   *
   */
} //Backtracking

/*************
 * Binary Trees
 ************/
{
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

  // TODO BFS
} // Binary Trees

/*************
 * Graph
 ************/
{
  // DFS
  // https://leetcode.com/problems/number-of-provinces
  let isConnected = [
    [1, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
  ];
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

  // TODO BFS
} //Graph

// What data structures to use
// https://medium.com/codechef-vit/how-to-identify-which-data-structure-to-use-5a1c66ad2742

/*************
 * callback hell, async await
 ************/
{
  // Nasty nested structure of each of asnyc call ==  callbackHell
  function callbackHell() {
    setTimeout(() => {
      const data = { user: "Get user John from server" };
      // console.log(data);
      setTimeout(() => {
        // console.log("Using JohnID get his info from server");
        setTimeout(() => {
          //All dependent code has to go here...
        }, 2000);
      }, 500);
    }, 1000);
  }

  // promises better than call back hell
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      // return console.log(json);
    })
    .catch((e) => {
      // console.log(e, "we are off the map")
    });

  // async await cleanest version. Remember needs a try catch around the whole thing!!!
  async function getTodos() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos/1"
      );
      let data = await response.json();
      // console.log(data);
    } catch (e) {
      console.log("async error");
      console.log(e);
    }
  }
  getTodos();
}
