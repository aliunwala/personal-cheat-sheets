# Quick Reference - Javascript, React
I always found having a good reference was a great way to free up brain cells to focus on complex goals and planning. To that goal this large post acts as a searchable repository of code snippets to lower context switching while writing code. A great quote I love about this is: 

> “paper is to write things down that we need to remember. Our brains are used to think.” ― Albert Einstein. 

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
# React Hooks & Modern Syntax Cheat Sheet

## Component Basics

### Functional Component
```jsx
import React from 'react';

function MyComponent() {
  return <div>Hello World</div>;
}

// Arrow function version
const MyComponent = () => {
  return <div>Hello World</div>;
};

export default MyComponent;
```

### Component with Props
```jsx
// Props with destructuring
const Greeting = ({ name, age = 18 }) => {
  return <h1>Hello {name}, you are {age} years old!</h1>;
};

// Props without destructuring
const Greeting = (props) => {
  return <h1>Hello {props.name}!</h1>;
};

// Usage
<Greeting name="Alice" age={25} />
```

### Props with TypeScript (if using TS)
```jsx
interface GreetingProps {
  name: string;
  age?: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, age = 18 }) => {
  return <h1>Hello {name}, you are {age} years old!</h1>;
};
```

## Essential Hooks

### useState
```jsx
import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });
  const [items, setItems] = useState([]);

  // Updating state
  const increment = () => setCount(count + 1);
  const incrementByAmount = () => setCount(prev => prev + 5);
  
  // Object state update
  const updateUser = () => {
    setUser(prev => ({ ...prev, name: 'John' }));
  };
  
  // Array state update
  const addItem = (newItem) => {
    setItems(prev => [...prev, newItem]);
  };

  return <div>{count}</div>;
};
```

### useEffect
```jsx
import React, { useState, useEffect } from 'react';

const DataComponent = () => {
  const [data, setData] = useState(null);

  // Run once on mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array

  // Run when specific values change
  useEffect(() => {
    updateTitle();
  }, [data]); // Runs when 'data' changes

  // Cleanup function
  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick');
    }, 1000);

    return () => clearInterval(timer); // Cleanup
  }, []);

  return <div>{data}</div>;
};
```

### useContext
```jsx
import React, { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Using context in a component
const ThemedComponent = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
};
```

### useReducer
```jsx
import React, { useReducer } from 'react';

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return initialState;
    default:
      throw new Error();
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
};
```

### useRef
```jsx
import React, { useRef, useEffect } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null);
  const countRef = useRef(0);

  useEffect(() => {
    inputRef.current.focus(); // Access DOM element
  }, []);

  const handleClick = () => {
    countRef.current += 1; // Mutable value that doesn't trigger re-render
    console.log(countRef.current);
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};
```

### useMemo & useCallback
```jsx
import React, { useState, useMemo, useCallback } from 'react';

const ExpensiveComponent = ({ items, filter }) => {
  // Memoize expensive calculations
  const filteredItems = useMemo(() => {
    return items.filter(item => item.includes(filter));
  }, [items, filter]);

  // Memoize callback functions
  const handleItemClick = useCallback((id) => {
    console.log('Clicked item:', id);
  }, []); // Dependencies array

  return (
    <div>
      {filteredItems.map(item => (
        <div key={item} onClick={() => handleItemClick(item)}>
          {item}
        </div>
      ))}
    </div>
  );
};
```

## Event Handlers

### Common Event Patterns
```jsx
const FormComponent = () => {
  const [value, setValue] = useState('');

  // Basic event handler
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Handler with parameters
  const handleClick = (id) => {
    console.log('Clicked:', id);
  };

  // Preventing default
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        value={value} 
        onChange={handleChange}
        onFocus={(e) => console.log('Focused')}
      />
      <button onClick={() => handleClick('btn1')}>Click me</button>
    </form>
  );
};
```

## Controlled Components

### Form Inputs
```jsx
const ControlledForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    isSubscribed: false,
    category: 'general'
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <form>
      {/* Text Input */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
      />

      {/* Email Input */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Email"
      />

      {/* Textarea */}
      <textarea
        name="message"
        value={formData.message}
        onChange={handleInputChange}
        placeholder="Message"
      />

      {/* Checkbox */}
      <label>
        <input
          type="checkbox"
          name="isSubscribed"
          checked={formData.isSubscribed}
          onChange={handleInputChange}
        />
        Subscribe to newsletter
      </label>

      {/* Select */}
      <select
        name="category"
        value={formData.category}
        onChange={handleInputChange}
      >
        <option value="general">General</option>
        <option value="support">Support</option>
        <option value="sales">Sales</option>
      </select>
    </form>
  );
};
```

## Conditional Rendering

```jsx
const ConditionalComponent = ({ user, isLoading, items }) => {
  return (
    <div>
      {/* Conditional rendering with && */}
      {isLoading && <div>Loading...</div>}
      
      {/* Ternary operator */}
      {user ? (
        <h1>Welcome, {user.name}!</h1>
      ) : (
        <h1>Please log in</h1>
      )}
      
      {/* Multiple conditions */}
      {items.length > 0 ? (
        <ul>
          {items.map(item => <li key={item.id}>{item.name}</li>)}
        </ul>
      ) : (
        <p>No items found</p>
      )}
    </div>
  );
};
```

## Lists and Keys

```jsx
const TodoList = ({ todos }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <TodoItem 
            todo={todo}
            onToggle={() => handleToggle(todo.id)}
            onDelete={() => handleDelete(todo.id)}
          />
        </li>
      ))}
    </ul>
  );
};

// When you don't have unique IDs (use index as last resort)
const SimpleList = ({ items }) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
```

## Props Patterns

### Children Props
```jsx
// Component that accepts children
const Card = ({ title, children }) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

// Usage
<Card title="My Card">
  <p>This is the content inside the card</p>
  <button>Click me</button>
</Card>
```

### Prop Spreading
```jsx
const Button = ({ variant, children, ...rest }) => {
  return (
    <button 
      className={`btn btn-${variant}`}
      {...rest} // Spreads remaining props like onClick, disabled, etc.
    >
      {children}
    </button>
  );
};

// Usage
<Button 
  variant="primary" 
  onClick={handleClick} 
  disabled={isDisabled}
>
  Submit
</Button>
```

### Render Props Pattern
```jsx
const MouseTracker = ({ render }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return render(position);
};

// Usage
<MouseTracker render={({ x, y }) => (
  <div>Mouse position: {x}, {y}</div>
)} />
```

## Custom Hooks

```jsx
// Custom hook for local storage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};

// Usage
const MyComponent = () => {
  const [name, setName] = useLocalStorage('name', '');
  
  return (
    <input 
      value={name} 
      onChange={(e) => setName(e.target.value)} 
    />
  );
};
```

## React-Specific Patterns

### Fragment
```jsx
// Using React.Fragment
return (
  <React.Fragment>
    <h1>Title</h1>
    <p>Paragraph</p>
  </React.Fragment>
);

// Short syntax
return (
  <>
    <h1>Title</h1>
    <p>Paragraph</p>
  </>
);
```

### Error Boundaries (Class Component Required)
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log('Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

### Lazy Loading & Suspense
```jsx
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};
```

## JSX Differences from HTML

- `className` instead of `class`
- `htmlFor` instead of `for`
- `onClick` instead of `onclick` (camelCase)
- `style={{ color: 'red', fontSize: '16px' }}` (object syntax)
- Self-closing tags must have `/`: `<img />`, `<br />`
- Comments: `{/* This is a comment */}`
