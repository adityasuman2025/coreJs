const str = "___snake____case_is_my_baap___";

function camelize(str) {
    const arr = str.split("_").filter(item => item);

    let result = arr.reduce((res, i, idx) => idx === 0 ? i : res + (i[0].toUpperCase() + i.slice(1)), "");

    let i = 0;
    while (str[i] === "_") {
        result = str[i] + result;
        i++
    }

    i = str.length - 1;
    while (str[i] === "_") {
        result = result + str[i];
        i--;
    }

    return result;
}

console.log(camelize(str)); // ___snakeCaseIsMyBaap___