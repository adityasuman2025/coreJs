function detectType(data) {
    if (data === null) return 'null';
    if (data === undefined) return 'undefined';
    return data.constructor.name.toLowerCase();
}
const type = detectType(new Number(1));
console.log("type", type);

/*
    1 => 'number'  
    Number(1) => 'number'  
    new Number(1) => 'number'  
    null => 'null'  
    'string' => 'string'  
    String('string') => 'string'  
    new String('string') => 'string'  
    undefined => 'undefined'  
    1n => 'bigint'  
    true => 'boolean'  
    Boolean(true) => 'boolean'  
    new Boolean(true) => 'boolean'  
    [] => 'array'  
    new Array() => 'array'  
    new ArrayBuffer() => 'arraybuffer'  
    new Date() => 'date'  
    new Map() => 'map'  
    new Set() => 'set'  
    Symbol() => 'symbol'  
    {a: '3'} => 'object'  
    () => 3 => 'function'  
*/