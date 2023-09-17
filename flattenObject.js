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

function flattenObj(obj, parentKey = "") {
    let newObj = {};

    function flattenObjUtil(obj, parentKey = "") {
        Object.keys(obj).forEach(key => {
            const val = obj[key];
            const newKey = (parentKey ? parentKey + "_" : "") + key;

            if (typeof val === "object") {
                flattenObjUtil(val, newKey)
            } else {
                newObj[newKey] = val;
            }
        });
    }
    flattenObjUtil(obj, parentKey);

    return newObj;
}

const ans = flattenObj(obj);
console.log("flatten obj", ans)