let obj = {
    first_name: "aditya",
    second_name: "suman",
    cl_as_s: [
        { i_d: 1 },
        { i_d: 2 },
        { i_d: 3 },
        "yo",
        {
            o_ne: "1",
            t_wo: "2",
            th_ree: [
                { i_d: 1 },
                { i_d: 2 },
            ]
        },
        ["sa", "a"]
    ],
    stud_details: {
        contact_no: "32456",
        add_ress: {
            ci_ty: "noida",
            st_ate: "up",
            mo_re: {
                coun_try: "india",
                plan_et: "earth"
            }
        }
    },
    5: "yo biro"
};

const obj2 = [
    { i_d: 1 },
    { i_d: 2 },
    { i_d: 3 },
    "yo",
    {
        o_ne: "1",
        t_wo: "2",
        th_ree: [
            { i_d: 1 },
            { i_d: 2 },
        ]
    },
    ["sa", "a"]
]


// let newObj = {};
// function camelize(obj, newObj) {
//     Object.keys(obj).forEach(key => {
//         const value = obj[key];

//         const newKey = key.split("_")
//             .map((item, index) => {
//                 if (index !== 0) {
//                     item = item[0].toUpperCase() + item.substring(1, item.length);
//                 }
//                 return item;
//             })
//             .join("");

//         if (value && typeof value === "object") {
//             if (Array.isArray(value)) {
//                 newObj[newKey] = []
//             } else {
//                 newObj[newKey] = {};
//             }

//             camelize(value, newObj[newKey]);
//         } else {
//             newObj[newKey] = value;
//         }
//     });
// }

// camelize(obj, newObj);
// console.log("newObj", newObj)


function camelize(object) {
    function camelizeArray(arr) {
        return arr.map(i => {
            if (typeof i === "object") {
                if (Array.isArray(i)) return camelizeArray(i)
                return camelizeObject(i);
            } else {
                return i;
            }
        });
    }

    function camelizeObject(obj) {
        let thisObj = {};
        Object.keys(obj).forEach(key => {
            const value = obj[key];

            const camelKey = key.split("_").reduce((acc, i, idx) => {
                if (idx === 0) {
                    return i;
                } else {
                    return (acc + (i.charAt(0).toUpperCase() + i.substring(1)))
                }
            }, "");

            if (typeof value === "object") {
                if (Array.isArray(value)) {
                    thisObj[camelKey] = camelizeArray(value);
                } else {
                    thisObj[camelKey] = camelizeObject(value)
                }
            } else {
                thisObj[camelKey] = value;
            }
        });

        return thisObj;
    }


    if (typeof object === "object") {
        if (Array.isArray(object)) return camelizeArray(object);
        return camelizeObject(object);
    } else {
        return object;
    }
}

const res = camelize(obj2)
console.log(res)