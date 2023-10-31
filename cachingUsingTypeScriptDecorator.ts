/*
Write a TypeScript method decorator for caching the result of the method.

Requirements
You are required to write a method decorator @cache which will fulfil the following requirements:
Using node-cache the result of the method called must be stored in memory.
The method must behave exactly as it would behave without a decorator.
The result must be cached dependent on the arguments provided to the method. If the method is called with parameters a and b it should not return a cached result if it is later called with parameters b and c. Argument types should be taken into account!

this should be a cache hit:
const r1 = objectWithCache.cachedMethod('a', 'b');
const r2 = objectWithCache.cachedMethod('a', 'b'); // result taken from cache

these should not be cache hits:
const r1 = objectWithCache.cachedMethod('1', '2');
const r2 = objectWithCache.cachedMethod('1', '3'); // result not taken from cache
const r3 = objectWithCache.cachedMethod('1', 2); // result not taken from cache

If the method result for a given method with given parameters is available in the cache, the original method must not be called and the result must be returned immediately.
Methods returning promises do not have to be supported.
Methods that throw an error must be cached (there is no requirement to preserve the stack trace).
Methods that return nothing (undefined or null) must not be cached even if decorated.
@cache accepts an optional parameter number which is the TTL (expiration time, time to live) value for node-cache. The default value for TTL is 10.

Caching must work correctly for multiple methods in the same class and in multiple classes.
for example for ClassA's method1 cache should be independent from ClassB's method1:

class ClassA {
    @cache()
    method1() {}
}

class ClassB {
    @cache()
    method2() {}
}


Assumptions
You can assume none of the tested methods will return a Promise
You can assume that all the parameters used in the methods are primitives


Hints
Your solution will be evaluated based on its correctness; performance and coding style will not be assessed.
The node-cache instance is available and exported along with the cache decorator. Please do not change that.
You can choose any key you want that will allow you to fulfill all the requirements.
To get data by key from node-cache, you should use cache.get("some-key").
To set data by key with TTL value you should use cache.set("another-key", { value: 1 }, 4400).


Available packages/libraries
node-cache (5.1.2)
TypeScript (4.0.3)
node.js (12.14)


Examples
Given a decorated class method:
class TestClass {
    @cache(10) // TTL parameter passed directly to @cache
    testMethod(param1: string, param2: string) {
        // this implementation is irrelevant
        console.log('testMethod called');
        return 'result';
    }
}

Consider the following sequence (follow the comments):
const test = new TestClass();
// first call to the method - result stored in cache
const result = test.testMethod('John', 'Doe');
// call with different parameters, original method is called
const result2 = test.testMethod('Jane', 'Doe');
// result3 is returned from cache
const result3 = test.testMethod('John', 'Doe');
*/

/*
In TypeScript, a decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form @expression, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

Here's a breakdown of how decorators work in TypeScript:

Declaration: A decorator is essentially a function that is prefixed with an @ symbol and placed immediately before the declaration of a class, method, property, etc.
Metadata Injection: Decorators are called at runtime with information about the decorated declaration. They have the ability to observe, modify, or replace the decorated declaration. This is typically done through metadata reflection.
*/

// Define a simple caching class using a Map
class NodeCache {
    private memo: Map<string, any> = new Map();

    get(key: string) {
        return this.memo.get(key);
    }

    set(key: string, value: any, ttl: number = 10) {
        this.memo.set(key, value);
    }
}
const nodeCache = new NodeCache(); // instance of node-cache you should use for storing cached data

function cache(ttl: number = 10) {
    return function (
        target: any,
        propertyName: string, // method/function name
        propertyDescriptor: PropertyDescriptor,
    ) {
        const className = target.constructor.name; // class name taken from decorated method's class
        const originalMethod = propertyDescriptor.value; // under value is the original method itself
        propertyDescriptor.value = function (...args: any[]) {
            const key = `${className}_${propertyName}_${JSON.stringify(args)}`;
            const cachedResult: any = nodeCache.get(key);

            if (cachedResult) {
                if (cachedResult?.value instanceof Error) throw (cachedResult?.value)
                if (cachedResult?.value) return cachedResult.value;
            }

            let result;
            try {
                result = originalMethod.apply(this, args);
            } catch (e) {
                result = e;
            }
            nodeCache.set(key, { value: result }, ttl);

            if (result instanceof Error) throw result;
            return result;
        };

        return propertyDescriptor;
    };
}


class TestClass {
    // @ts-ignore
    @cache(10) // TTL parameter passed directly to @cache
    testMethod(param1: string, param2: string) {
        // this implementation is irrelevant
        console.log('testMethod called');
        return 'result';
    }
}

const test = new TestClass();

const result = test.testMethod('John', 'Doe'); // first call to the method - result stored in cache
const result2 = test.testMethod('Jane', 'Doe'); // call with different parameters, original method is called
const result3 = test.testMethod('John', 'Doe'); // result3 is returned from cache
