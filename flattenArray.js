let arr = [
    [1, 2],
    [3, 4],
    [5, 6, [7, 8], 9],
    [10, 11, [12, [13, [14, [15, [16]]]]], 17, [18, 19, 20]],
]

function flatten(arr, depth = 1) {
    let newArr = [];

    function flat(arr, maxDepth, depth) {
        for (let i = 0; i < arr.length; i++) {
            let ele = arr[i];
            if ((typeof ele == 'object' || Array.isArray(ele)) && depth < maxDepth) {
                flat(ele, maxDepth, depth + 1)
            } else {
                newArr.push(ele)
            }
        }
    }
    flat(arr, depth, 0)

    return newArr;
}

const newArr = flatten(arr, 4);
console.log("old arr", arr);
console.log("newArr", newArr);