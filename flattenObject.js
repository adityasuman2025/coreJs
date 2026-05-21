const obj = {
    skills: ["javaScript", "python", "react", "node"],
    name: {
        first: "aditya",
        last: "suman"
    },
    age: 23,
    college: {
        name: "IIT Patna",
        address: {
            city: "bihta",
            district: "patna",
            pin: 801101,
            locs: {
                lang: "123.1.2",
                lat: 90
            }
        },
        courses: ["CSE", "EE", "ME", "CHE", "CE", "MTE", "DS"]
    },
    projects: [
        {
            name: "project 1",
            details: {
                desc: "project 1 is magic",
                link: "https://example.com/project1",
                tech: ["node", "js", "react"]
            }
        },
        {
            name: "project 2",
            details: {
                desc: "project 2 is awesome",
                link: "https://example.com/project2",
                tech: ["python", "java", "html"]
            }
        }
    ]
};


function flatten(obj) {
    let res = {};

    function util(obj, pre) {
        let keys = Object.keys(obj);

        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let newKey = (pre ? (pre + "_") : "") + key;
            let val = obj[key];

            // console.log("key", key);
            // console.log("val", val);

            if (typeof val === "object") util(val, newKey)
            else res[newKey] = val;
        }
    }
    util(obj, "");

    return res;
}

const res = flatten(obj);
console.log("flatten obj", res);