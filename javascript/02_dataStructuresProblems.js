/**
 * Graphs
 */
{
  // https://www.geeksforgeeks.org/depth-first-search-or-dfs-for-a-graph/
  /**
   * DFS Psuedocode
   *
   * // Step 1: Need to create this adjcencyList (by looping over all nodes once)
   * let adjList = {} // {node1->[connectedNode1,...], node2->[connectedNode1,...]}
   *
   * // Step 2: Have a visited array
   * let visited = []
   *
   * // Step 3: Make a recursive function and loop over all adjcent nodes
   * let dfs = function(startingNode){
   *    visited.push(startingNode)
   *    let adjcentNodes = adjList[startingNode]
   *    adjcentNodes.forEach((node)={
   *        if(!visited.includes(node)){
   *            dfs(node)
   *        }
   *    })
   * }
   * dfs(startingeNode)
   *
   */
}
{
  // https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/
  /**
   * BFS Psudocode
   *
   * // Step 1: Need to create this adjcencyList (by looping over all nodes once)
   * let adjList = {} // {node1->[connectedNode1,...], node2->[connectedNode1,...]}
   *
   * // Step 2: Have a visited array & queue
   * let adjLen = Object.keys(this.adjList).length
   * let visited = new Array(adjLen).fill(false)
   * let queue = [initalNode]
   *
   * // Step 3 Begin Loop
   * while(queue.length != 0){
   *     const currentNode = queue.shift();
   *     // any logic with current node goes here
   *     // LOOP over all nodes in adjList[curretNode]
   *       // IF not in visited:
   *          visited[newNode] = true
   *          queue.push(newNode)
   * }
   *
   *
   */
  // Class to represent a graph using adjacency list
  class Graph {
    constructor() {
      this.adjList = {};
    }
    addEdge(u, v) {
      if (!this.adjList[u]) this.adjList[u] = [];
      this.adjList[u].push(v);
    }

    // Function to perform Breadth First Search on a graph represented using adjacency list
    bfs(startNode) {
      // Create a queue for BFS
      const queue = [];
      const visited = new Array(Object.keys(this.adjList).length).fill(false);

      // Mark the current node as visited and enqueue it
      visited[startNode] = true;
      queue.push(startNode);

      // Iterate over the queue
      while (queue.length !== 0) {
        // Dequeue a vertex from queue and print it
        const currentNode = queue.shift();
        console.log(currentNode + " ");

        // Get all adjacent vertices of the dequeued vertex currentNode
        // If an adjacent has not been visited, then mark it visited and enqueue it
        for (const neighbor of this.adjList[currentNode] || []) {
          if (!visited[neighbor]) {
            visited[neighbor] = true;
            queue.push(neighbor);
          }
        }
      }
    }
  }

  // Create a graph
  const graph = new Graph();

  // Add edges to the graph
  graph.addEdge(0, 1);
  graph.addEdge(0, 2);
  graph.addEdge(1, 3);
  graph.addEdge(1, 4);
  graph.addEdge(2, 4);

  // Perform BFS traversal starting from vertex 0
  // console.log("Breadth First Traversal starting from vertex 0: ");
  // graph.bfs(0);
}
{
  // Recursion
  let fib = function (n) {
    if (n === 1) {
      return 1;
    }
    if (n === 0) {
      return 1;
    }
    return fib(n - 1) + fib(n - 2);
  };
  // console.log("Recursion",fib(5)); //1,1,2,3,5,8
}
{
  //Recursion + memo
  let memo = [];
  memo[0] = 1;
  memo[1] = 1;
  let fib = function (n) {
    if (memo[n]) {
      return memo[n];
    } else {
      return fib(n - 1) + fib(n - 2);
    }
  };
  // console.log("Recursion + memo",fib(5));
}
{
  // Memo / 1-dimension DP
  let fib = function (n) {
    let memo = [];
    memo[0] = 1;
    memo[1] = 1;
    for (let i = 2; i <= n; i++) {
      memo[i] = memo[i - 1] + memo[i - 2];
    }
    return memo[n];
  };
  // console.log("Memo / 1-dimension DP: ", fib(5));
}
{
  // Memo 2-d Longest Common Subsequence
  let text1 = "abcde";
  let text2 = "ace";
  let len1 = text1.length + 1;
  let len2 = text2.length + 1;

  let arr = new Array(len1).fill().map(() => new Array(len2).fill(0));

  for (let i = text1.length - 1; i >= 0; i--) {
    for (let j = text2.length - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        arr[i][j] = arr[i + 1][j + 1] + 1;
      } else {
        arr[i][j] = Math.max(arr[i + 1][j], arr[i][j + 1]);
      }
    }
  }
  // console.log(arr);
  // console.log(arr[0][0]); // Cell 0,0 has the longest subsequence
}
{
  // Sliding window - fixed window size - maximum-average-subarray
  let nums = [1, 12, -5, -6, 50, 3];
  let k = 4;
  let ptr1 = 0;
  let ptr2 = k - 1;
  let maxAvg = nums.slice(0, k).reduce((acc, e, i, arr) => {
    // Sum up initial condition, values 0-k
    return acc + e;
  }, 0);
  let currAvg = maxAvg;
  while (ptr2 < nums.length) {
    // When the window hits the end stop
    currAvg = currAvg - nums[ptr1]; // remove anything from the window
    ptr1++;
    ptr2++;
    currAvg = currAvg + nums[ptr2]; // Add anything to the window
    if (currAvg > maxAvg) {
      // check conditions
      maxAvg = currAvg;
    }
  }
  // console.log(maxAvg / k); // return value
}
{
  // https://www.mathsisfun.com/combinatorics/combinations-permutations.html
  /**
   * Permutations: order maters - WITH repetition
   * Total = n^r
   * Where n = types, r = how many times you are choosing them
   * Ex: I choose 3 combination lock numbers (0-9) = [0-9][0-9][0-9] = 10^3
   */
  {
    let array = ["apple", "banana", "lemon", "mango"];
    let result = array.flatMap((v, i) => array.map((w) => v + " " + w));
    // console.log(
    //   "Permutations: order maters - WITH repetition: ",
    //   result,
    //   result.length
    // );
  }
  /**
   * Permutations: order maters - NO repetition
   * Total = (All_Permutations)/(Uninterested_Permutations) = n!/(n-r)!
   * Where n = types, r = how many times/ways you are choosing them
   * Ex: How many ways can first and second place be awarded to 10 people? = (10!)/(10-2)! = 10*9 = 90
   */
  {
    let array = ["apple", "banana", "lemon", "mango"];
    let result = array.flatMap((v, i) =>
      array.slice(i + 1).map((w) => v + " " + w)
    );
    // console.log(
    //   "Permutations: order maters - NO repetition: ",
    //   result,
    //   result.length
    // );
  }
  /**
   * Combinations: order does NOT mater - NO repetition
   * Total = (All_Permutations)/(Uninterested_Permutations * remove_permutations) = n!/((n-r)!r!)
   * Where n = types, r = how many times/ways you are choosing them
   * Ex: Lotto number matching: each number is 0-99. 6 numbers are drawn. You want to know how many ways to get 3 matching numbers.
   * 100!/(100-3)!*(3!) = (100*99*98)/(3!)
   */
  {
    let array = ["apple", "banana", "lemon", "mango"];
    let result = array.flatMap((v, i) =>
      array.toSpliced(i, 1).map((w) => v + " " + w)
    );
    // console.log(
    //   "Combinations: order does NOT mater - NO repetition: ",
    //   result,
    //   result.length
    // );
  }
  /**
   * Combinations: order does NOT mater - WITH repetition
   * Total = (r + n − 1)! / r!(n − 1)!
   * Where n = types, r = how many times/ways you are choosing them
   *  Ex: Ice cream:
   *  Let us say there are five flavors of icecream: banana, chocolate, lemon, strawberry and vanilla.
   *  Denoted as {b, c, l, s, v}.
   *  We want to choose 3 scoops. like: {c, c, c}, {b, l, v}, or {b, v, v}
   *  We can write {c,c,c} down as ->OOO->->-> (arrow means move, circle means scoop)
   *  "how many different ways can we arrange arrows and circles?"
   *  So there are r + (n−1) positions, and we want to choose r of them to have circles
   *  So there are 7 positions, and we want to choose 3 of them to have circles.
   *  7! / (7-3)!3! = (7*6*5)/(3*2*1) = 7*5 = 35
   */
  {
    // Probably need a back tracking solution
    // (4+2-1)!/(4-1)!2! == 5!/(2*2*3) == 5*2 == 10
    let array = ["A", "B", "C", "D"];
    let res = new Set();
    let bt = function (e, depth) {
      if (depth === 2) {
        res.add(e.slice(1).split(",").sort().join(",")); // Need to make [apple,mango] === [mango,apple]
        return;
      }
      array.forEach((v, i, arr) => {
        bt(e + "," + v, depth + 1);
      });
    };
    bt("", 0);
    // console.log(
    //   "Combinations: order does NOT mater - WITH repetition",
    //   res,
    //   res.size
    // );
  }
}
{
  /** Backtracking - Combination Sum  - given candidates and a target find all valid sums:
   * Input: candidates = [2,3,5], target = 8
   * Output: [[2,2,2,2],[2,3,3],[3,5]]
   *
   * Intution: Tree/branching structure to find all possiblites.
   *           Can "cull" bad trees as solutions > target will always fail
   */

  let candidates = [2, 3, 5];
  let target = 8;
  let solutions = [];
  let bt = function (chain, sum) {
    if (sum === target) {
      // if Valid solution then record values
      solutions.push(chain);
    }
    if (sum > target) {
      // Cull any solutions that will never be correct
      return;
    }
    // Try all possible solutions
    candidates.forEach((e) => {
      bt([...chain, e], sum + e);
    });
  };
  bt([], 0);
  console.log(solutions);
}
{
  // Tree BFS:  https://www.youtube.com/watch?v=hTM3phVI6YQ
  let bfs = function (root) {
    if (root) return 0; // base case

    level = 0;
    let q = [root]; // Add first node
    while (q.length > 0) {
      //At current level, add children of every node we pop
      for (let i = 0; i < q.length; i++) {
        let tempNode = q.shift();
        if (tempNode.left) {
          q.push(tempNode.left);
        }
        if (tempNode.right) {
          q.push(tempNode.right);
        }
      }
      level++;
    }
    return level; // If interested in maximum depth/level of tree
  };
}
{
  // Tree DFS: https://www.youtube.com/watch?v=hTM3phVI6YQ
  let dfs = function (root) {
    if (!root) return;
    console.log(root.val);
    dfs(root.left);
    dfs(root.right);
  };
}
{
  // Tree DFS: (With level/depth) https://www.youtube.com/watch?v=hTM3phVI6YQ
  let maxDepth = function (root) {
    if (!root) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  };
}
