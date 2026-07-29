/*
    JavaScript: Hash Function

    Implement a class Vector that can perform basic vector math with an efficient hash function.
    The Vector class should:
    - Be initialized with parameters x, y
    - Include a valueOf() method that returns an integer hash
    - Have a class constructor/method fromHash that:
      - Takes an integer hash
      - Returns a vector derived from the hash

    The class should support these vector operations on two vectors, a = [ax, ay] and b = [bx, by], and a constant integer c:

    +------+-----------+-----------+-----------------------+
    | Type | Operation | Arguments | Resulting Vector      |
    +------+-----------+-----------+-----------------------+
    |  1   | Add       | a, b      | [ax + bx, ay + by]    |
    |  2   | Subtract  | a, b      | [ax - bx, ay - by]    |
    |  3   | Multiply  | a, c      | [ax * c, ay * c]      |
    |  4   | Divide    | a, c      | [ax / c, ay / c]      |
    +------+-----------+-----------+-----------------------+

    Note: For type 4 operations, c is always a factor of the current values of x and y.

    For each test case, there are beginning x and y values, followed by q queries.
    Each query is in the form [<operation>, <arguments>].

    Example:
    x = 1
    y = 2
    q = 4 queries
    queries = [[1, 2, 3], [2, 1, 2], [3, 4], [4, 2]]

    +-------+------+----------+-----------+---------+
    | Query | Type | vec or c | Operation |   obj   |
    +-------+------+----------+-----------+---------+
    | Initial state                       | [1, 2]  |
    |   0   |  1   | vec=[2,3]| obj + vec | [3, 5]  |
    |   1   |  2   | vec=[1,2]| obj - vec | [2, 3]  |
    |   2   |  3   |   c=4    |  obj * c  | [8, 12] |
    |   3   |  4   |   c=2    |  obj / c  | [4, 6]  |
    +-------+------+----------+-----------+---------+
*/

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    valueOf() {
        return this.x * 1000000 + this.y;
    }

    static fromHash(hash) {
        const x = Math.floor(hash / 1000000);
        const y = hash % 1000000;
        return new Vector(x, y);
    }
}

function processQueries(x, y, arr) {
    let result = [];
    let obj = new Vector(x, y);

    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] === 1) {
            let vec = new Vector(arr[i][1], arr[i][2]);
            obj = Vector.fromHash(obj + vec);
        }
        if (arr[i][0] === 2) {
            let vec = new Vector(arr[i][1], arr[i][2]);
            obj = Vector.fromHash(obj - vec);
        }
        if (arr[i][0] === 3) {
            obj = Vector.fromHash(obj * arr[i][1]);
        }
        if (arr[i][0] === 4) {
            obj = Vector.fromHash(obj / arr[i][1]);
        }

        result.push([obj.x, obj.y]);
    }

    return result;
}

console.log("--- Test Case 1 ---");
let x1 = 0, y1 = 0;
let queries1 = [
    [1, 1, 1], // Type 1, vec = [1, 1] -> [1, 1]
    [2, 1, 0]  // Type 2, vec = [1, 0] -> [0, 1]
];
let output1 = processQueries(x1, y1, queries1);
output1.forEach(vec => console.log(`${vec[0]} ${vec[1]}`));

console.log("\n--- Test Case 2 ---");
let x2 = 1, y2 = 2;
let queries2 = [
    [1, 2, 3], // Add [2, 3] -> Expected: [3, 5]
    [2, 1, 2], // Sub [1, 2] -> Expected: [2, 3]
    [3, 4],    // Mul 4      -> Expected: [8, 12]
    [4, 2]     // Div 2      -> Expected: [4, 6]
];
let output2 = processQueries(x2, y2, queries2);
output2.forEach(vec => console.log(`${vec[0]} ${vec[1]}`));

console.log("\n--- Test Case 3 ---");
let x3 = 10, y3 = 20;
let queries3 = [
    [1, 5, 5],  // Add [5, 5] -> [15, 25]
    [3, 2],     // Mul 2      -> [30, 50]
    [4, 10],    // Div 10     -> [3, 5]
    [2, 1, 1]   // Sub [1, 1] -> [2, 4]
];
let output3 = processQueries(x3, y3, queries3);
output3.forEach(vec => console.log(`${vec[0]} ${vec[1]}`));
