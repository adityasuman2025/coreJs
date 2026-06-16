/*
    https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/classnames

    Classnames
    Completed
    Languages
    Difficulty
    Medium
    Recommended duration to spend during interviews
    20 mins
    Users completed
    9.98k done
    classnames is a commonly-used utility in modern front end applications to conditionally join CSS class names together. If you've written React applications, you likely have used a similar library.

    Implement the classnames function.

    Examples


    classNames('foo', 'bar'); // 'foo bar'
    classNames('foo', { bar: true }); // 'foo bar'
    classNames({ 'foo-bar': true }); // 'foo-bar'
    classNames({ 'foo-bar': false }); // ''
    classNames({ foo: true }, { bar: true }); // 'foo bar'
    classNames({ foo: true, bar: true }); // 'foo bar'
    classNames({ foo: true, bar: false, qux: true }); // 'foo qux'
    Arrays will be recursively flattened as per the rules above.


    classNames('a', ['b', { c: true, d: false }]); // 'a b c'
    Values can be mixed.


    classNames(
    'foo',
    {
        bar: true,
        duck: false,
    },
    'baz',
    { quux: true },
    ); // 'foo bar baz quux'
    Falsey values are ignored.


    classNames(null, false, 'bar', undefined, { baz: null }, ''); // 'bar'
    In addition, the returned string should not have any leading or trailing whitespace.
*/

/**
 * @param {...(any|Object|Array<any|Object|Array>)} args
 * @return {string}
*/
export default function classNames(...args) {
    let ans = "";

    args.forEach((item) => {
        if (!item) {
        } else if (typeof item === "object") ans = handleObj(ans, item)
        else ans = append(ans, item);
    });

    return ans;
}

function append(target, str) {
    return target + (target ? " " : "") + str;
}

function handleObj(ans, obj) {
    const isArray = Array.isArray(obj);

    Object.keys(obj).forEach((key) => {
        const val = obj[key];
        if (val) {
            if (typeof val === "object") ans = handleObj(ans, val);
            else ans = append(ans, isArray ? val : key);
        }
    });

    return ans;
}