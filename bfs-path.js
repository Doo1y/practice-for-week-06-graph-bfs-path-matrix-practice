function findNeighbors(node, matrix) {
  let neighbors = new Array();
  // Up
  if (matrix[node[0]][node[1]]) {
    matrix[node[0] + 1] ? neighbors.push([node[0] + 1, node[1]]) : null;
    // Down
    node[0] > 0 ? neighbors.push([node[0] - 1, node[1]]) : null;
    // Left
    node[1] > 0 ? neighbors.push([node[0], node[1] - 1]) : null;
    // Right
    matrix[node[0]][[node[1] + 1]] ? neighbors.push([node[0], node[1] + 1]) : null;
    return neighbors;

  } else return null;

}


function bfsPath(matrix, startNode, endValue) {
  let queue = [[startNode]];
  let visited = new Set([startNode.toString()]);

  while (queue.length) {
    let currPath = queue.shift();
    let node = currPath[currPath.length - 1];
    if (matrix[node[0]][node[1]] === endValue) return currPath;
    let neighbors = traverse(node, matrix);
    neighbors.forEach(v => {
      if (v && !visited.has(v.toString())) {
        visited.add(v.toString());
        queue.push([...currPath, v]);
      }
    });
  }
  return false;
}

const traverse = (v, m) => {
  const width = m[0].length - 1
  , height = m.length - 1
  , i = v[0]
  , j = v[1]
  , neighbors = new Array();

  // left neighbor of node v
  if (m[i][j - 1]) neighbors.push([i, j - 1]);

  // if there is no more left, check if there is subarray before current
  else if (!m[i][j - 1] && i > 0) neighbors.push([i - 1, width]);

  // right neighbor of node v
  if (m[i][j + 1]) neighbors.push([i, j + 1]);
    // if there is no more left, check if there is subarray after current
  else if (i < height) neighbors.push([i + 1, 0]);

  return neighbors;
}




// ***** UNCOMMENT FOR LOCAL TESTING *****

const matrix1 = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12],
  [13, 14, 15, 16]
];

// // EXAMPLE TESTS #1. Tests for findNeighbors function
// console.log(findNeighbors([1, 1], matrix1)) // Finds all 4 neighbors from an
// // internal node (left, right, down, up)
// // [ [ 0, 1 ], [ 2, 1 ], [ 1, 2 ], [ 1, 0 ] ]

// console.log(findNeighbors([0, 0], matrix1)); // Finds two neighbors from a
// // corner node // [ [ 1, 0 ], [ 0, 1 ] ]

// console.log(findNeighbors([3, 1], matrix1)); // Finds three neighbors from
// // an edge node // [ [ 2, 1 ], [ 3, 2 ], [ 3, 0 ] ]


// EXAMPLE TESTS #2. Tests for bfsPath function

console.log(bfsPath(matrix1, [0, 0], 16)); // can traverse the entire matrix
// returns an array of coordinates with no duplicates:

[
  [0, 0], [1, 0],
  [0, 1], [2, 0],
  [1, 1], [0, 2],
  [3, 0], [2, 1],
  [1, 2], [0, 3],
  [3, 1], [2, 2],
  [1, 3], [3, 2],
  [2, 3], [3, 3]
]

// Note for debugging purposes: The coordinates should represent the following matrix values, in order:
// 1 5 2 9 6 3 13 10 7 4 14 11 8 15 12 16

console.log(bfsPath(matrix1, [2, 2], 11)); // returns a single node if end
// value is located at start node
// [ [ 2, 2 ] ]

console.log(bfsPath(matrix1, [1, 2], 8)); // can handle various start nodes 
// and end values
// [ [ 1, 2 ], [ 0, 2 ], [ 2, 2 ], [ 1, 1 ], [ 1, 3 ] ]

console.log(bfsPath(matrix1, [0, 0], 17)); // can return false if end value 
// is not found
// false

/*************DO NOT MODIFY UNDER THIS LINE ***************/

module.exports = [findNeighbors, bfsPath];