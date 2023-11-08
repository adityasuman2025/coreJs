function LogMethod(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor) {
    const className = target.constructor.name; // class name taken from decorated method's class
    const originalMethod = propertyDescriptor.value; // under value is the original method itself
    const functionName = originalMethod.name // or propertyName

    propertyDescriptor.value = function (...args: any[]) {
        console.log(`Method ${propertyName} of class ${className} called with arguments: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`Method ${propertyName} returned: ${result}`);
        return result;
    };
    return propertyDescriptor;
}

class MyClass {
    @LogMethod
    greet(name: string) {
        return `Hello, ${name}!`;
    }
}

const obj = new MyClass();
obj.greet("John");