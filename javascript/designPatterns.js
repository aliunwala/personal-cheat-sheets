//See: https://www.youtube.com/watch?v=kuirGzhGhyw&list=PLFKDYTlP3abzwWleHq1WHcKyi8nCPY74s

/********************
 * Factory
 ********************/
// A factory can return multiple different objects depending on params
{
  function Developer(name) {
    this.name = name;
    this.type = "Developer";
  }

  function Tester(name) {
    this.name = name;
    this.type = "Tester";
  }

  function EmployeeFactory() {
    this.create = (name, type) => {
      switch (type) {
        case 1:
          return new Developer(name);
        case 2:
          return new Tester(name);
      }
    };
  }

  function say() {
    console.log("Hi, I am " + this.name + " and I am a " + this.type);
  }

  const employeeFactory = new EmployeeFactory();
  const employees = [];

  employees.push(employeeFactory.create("Patrick", 1));
  employees.push(employeeFactory.create("John", 2));
  employees.push(employeeFactory.create("Jamie", 1));
  employees.push(employeeFactory.create("Taylor", 1));
  employees.push(employeeFactory.create("Tim", 2));

  employees.forEach((emp) => {
    // say.call(emp);  // TO TEST UNCOMMENT HERE
  });
}
/********************
 * Singleton
 ********************/
// Limits the number of objects to at most 1
{
  const Singleton = (function () {
    let pManager;

    function ProcessManager() {
      /*...*/
    }

    function createProcessManager() {
      pManager = new ProcessManager();
      return pManager;
    }

    return {
      getProcessManager: () => {
        if (!pManager) pManager = createProcessManager();
        return pManager;
      },
    };
  })();

  const singleton = Singleton.getProcessManager();
  const singleton2 = Singleton.getProcessManager();
  // console.log(singleton === singleton2); // true // // TO TEST UNCOMMENT HERE
}
/********************
 * Strategy
 ********************/
// Lets you swap closely related algorithms in and out.
{
  function Fedex(pkg) {
    this.calculate = () => {
      // Fedex calculations ...
      return 2.45;
    };
  }

  function UPS(pkg) {
    this.calculate = () => {
      // UPS calculations ...
      return 1.56;
    };
  }

  function USPS(pkg) {
    this.calculate = () => {
      // USPS calculations ...
      return 4.5;
    };
  }

  function Shipping() {
    this.company = "";
    this.setStrategy = (company) => {
      this.company = company;
    };
    this.calculate = (pkg) => {
      return this.company.calculate(pkg);
    };
  }

  const fedex = new Fedex();
  const ups = new UPS();
  const usps = new USPS();
  const shipping = new Shipping();
  const pkg = { from: "Alabama", to: "Georgia", weight: 1.56 }; // Dummy package

  shipping.setStrategy(fedex);
  // console.log("Fedex: " + shipping.calculate(pkg)); // TO TEST UNCOMMENT HERE

  shipping.setStrategy(ups);
  // console.log("UPS: " + shipping.calculate(pkg)); // TO TEST UNCOMMENT HERE

  shipping.setStrategy(usps);
  // console.log("USPS: " + shipping.calculate(pkg)); // TO TEST UNCOMMENT HERE
}
/********************
 * Iterator
 ********************/
// Traverse a set of objects based on your own set of rules (these rules can be anything, not just next!)
{
  const items = [1, false, "Devsage", 3.14];

  function Iterator(items) {
    this.items = items;
    this.index = 0;
  }

  Iterator.prototype = {
    hasNext: function () {
      return this.index < this.items.length;
    },
    next: function () {
      return this.items[this.index++];
    },
  };

  const iter = new Iterator(items);
  // console.log("iter.hasNext()", iter.hasNext()); // TO TEST UNCOMMENT HERE
  // while (iter.hasNext()) console.log(iter.next()); // TO TEST UNCOMMENT HERE
  // console.log("iter.hasNext()", iter.hasNext()); // TO TEST UNCOMMENT HERE
}
/********************
 * Observer
 ********************/
// The observer pattern defines a one to many relationship, between a subject and multiple observers.
// The observers wait for the subject to "do something" (Usefual for event handlers)
{
  function Subject() {
    this.observers = []; // array of observer functions
  }

  Subject.prototype = {
    subscribe: function (fn) {
      this.observers.push(fn);
    },
    unsubscribe: function (fnToRemove) {
      this.observers = this.observers.filter((fn) => {
        if (fn != fnToRemove) return fn;
      });
    },
    fire: function () {
      this.observers.forEach((fn) => {
        fn.call(); //fn() also seems to work fine
      });
    },
  };

  const subject = new Subject();

  function Observer1() {
    console.log("Observer 1 Firing!");
  }

  function Observer2() {
    console.log("Observer 2 Firing!");
  }

  subject.subscribe(Observer1);
  subject.subscribe(Observer2);
  // subject.fire(); // TO TEST UNCOMMENT HERE

  subject.unsubscribe(Observer1);
  // subject.fire(); // TO TEST UNCOMMENT HERE
}
/********************
 * Proxy
 ********************/
// This allows another object, the proxy, to be used in place of another. The proxy can control access to the object.
// A proxy could add extra functionality. Like a cache, like below:
{
  function CryptocurrencyAPI() {
    this.getValue = function (coin) {
      console.log("Calling External API...");
      switch (coin) {
        case "Bitcoin":
          return "$8,500";
        case "Litecoin":
          return "$50";
        case "Ethereum":
          return "$175";
        default:
          return "NA";
      }
    };
  }
  //////////////////////////

  const api = new CryptocurrencyAPI();
  // console.log("----------Without Proxy----------");  // TO TEST UNCOMMENT HERE
  // console.log(api.getValue("Bitcoin"));
  // console.log(api.getValue("Litecoin"));
  // console.log(api.getValue("Ethereum"));
  // console.log(api.getValue("Bitcoin"));
  // console.log(api.getValue("Litecoin"));
  // console.log(api.getValue("Ethereum"));

  function CryptocurrencyProxy() {
    this.api = new CryptocurrencyAPI();
    this.cache = {};

    this.getValue = function (coin) {
      if (this.cache[coin] == null) {
        // == checks undefined or null
        this.cache[coin] = this.api.getValue(coin);
      }
      return this.cache[coin];
    };
  }

  // console.log("----------With Proxy----------");  // TO TEST UNCOMMENT HERE
  // const proxy = new CryptocurrencyProxy();
  // console.log(proxy.getValue("Bitcoin"));
  // console.log(proxy.getValue("Litecoin"));
  // console.log(proxy.getValue("Ethereum"));
  // console.log(proxy.getValue("Bitcoin"));
  // console.log(proxy.getValue("Litecoin"));
  // console.log(proxy.getValue("Ethereum"));
}
/********************
 * Mediator
 ********************/
// Lets your define the "mediator object" that controls how another set of objects interact with one another
// Messages are routed to the mediator, and the mediator decides what to do
{
  function Member(name) {
    this.name = name;
    this.chatroom = null;
  }

  Member.prototype = {
    send: function (message, toMember) {
      this.chatroom.send(message, this, toMember);
    },
    receive: function (message, fromMember) {
      console.log(`${fromMember.name} to ${this.name}: ${message}`);
    },
  };

  function Chatroom() {
    this.members = {};
  }

  Chatroom.prototype = {
    addMember: function (member) {
      this.members[member.name] = member;
      member.chatroom = this;
    },
    send: function (message, fromMember, toMember) {
      toMember.receive(message, fromMember);
    },
  };

  const chat = new Chatroom();

  const bob = new Member("Bob");
  const john = new Member("John");
  const tim = new Member("Tim");

  chat.addMember(bob);
  chat.addMember(john);
  chat.addMember(tim);

  // bob.send("Hey, John", john);  // TO TEST UNCOMMENT HERE
  // john.send("What's up, Bob", bob);  // TO TEST UNCOMMENT HERE
  // tim.send("John, are you ok?", john);  // TO TEST UNCOMMENT HERE
}
/********************
 * Visitor
 ********************/
// https://stackoverflow.com/questions/9363582/difference-between-decorator-design-pattern-and-visitor-design-pattern
// Add or provide functionality from an object without changing the underlying object.
// The new logic is kept in the visitor object.
// The object you are modifting is called the "reciving object"
// The reciving object needs an "accept" method to take in the visitor
{
  function Employee(name, salary) {
    this.name = name;
    this.salary = salary;
  }

  Employee.prototype = {
    getSalary: function () {
      return this.salary;
    },
    setSalary: function (sal) {
      this.salary = sal;
    },
    accept: function (visitorFunction) {
      visitorFunction(this);
    },
  };
  /////////////////////////////////////////////

  const devsage = new Employee("DevSage", 10000);
  // console.log(devsage.getSalary()); // TO TEST UNCOMMENT HERE

  function ExtraSalary(emp) {
    // This is the visitor function
    emp.setSalary(emp.getSalary() * 2);
  }

  devsage.accept(ExtraSalary);
  // console.log(devsage.getSalary()); // TO TEST UNCOMMENT HERE
}
/********************
 * Retry
 ********************/
// The retry pattern lets you gracefully deal with and retry failed operations in your application
/**
 * retry stratiges:
 * 1) Dont retry <- e.g. you have the wrong password
 * 2) retry immediately <- something corrpted with request
 * 3) retry after delay <- server is busy. Fixed time dealy, or exponential backoff
 */
{
  async function retryOperation() {
    let currentTry = 0;

    while (true) {
      try {
        externalServiceCall();
        console.log("Succeeded!");
        break;
      } catch (error) {
        currentTry++;
        console.log(`Failed attempt ${currentTry}`);

        if (currentTry >= 10) {
          console.log("Retry maximum reached. Exiting");
          break;
        }
      }
      await sleep(3000);
    }
  }

  function externalServiceCall() {
    console.log("Calling external service...");
    const shouldPass = Math.random() < 0.4;
    if (shouldPass) return true;
    else throw "Failure";
  }

  async function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }

  // retryOperation(); // TO TEST UNCOMMENT HERE
}
/********************
 * Builder
 ********************/
/* The builder design pattern is a creational pattern that enables you to construct complex objects simply and more declaratively.
  You give various paramters to the builder and once you get enough you can call "build()" and get the object
 */
{
  function Person(name, weight, height, gender) {
    this.name = name;
    this.weight = weight;
    this.height = height;
    this.gender = gender;
  }

  function PersonBuilder(name, gender) {
    this.name = name;
    this.gender = gender;
    this.setWeight = function (weight) {
      this.weight = weight;
      return this;
    };
    this.setHeight = function (height) {
      this.height = height;
      return this;
    };
    this.build = function () {
      return new Person(this.name, this.weight, this.height, this.gender);
    };
  }

  const ali = new PersonBuilder("Ali", "male")
    .setHeight(100)
    .setWeight(50)
    .build();
  console.log(ali);
}
/********************
 *
 ********************/
{
}
/********************
 *
 ********************/
{
}
/********************
 *
 ********************/
{
}
/********************
 *
 ********************/
{
}
