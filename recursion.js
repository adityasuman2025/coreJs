const user = {
    skills: ["javaScript", "python", "react", "node"],
    name: {
        first: "aditya",
        last: "suman"
    },
    age: 23,
    address: {
        home: {
            city: "bihar sharif",
            district: "nalanda",
            pin: 803118,
            ip: {
                lang: "923.2.5",
                lat: 71
            }
        },
        office: {
            city: "bihta",
            district: "patna",
            pin: 801101,
            ip: {
                lang: "123.1.2",
                lat: 90
            }
        }
    }
};

const magicUser = {}
function magic(obj, parentKey) {
    for (let i = 0; i < Object.keys(obj).length; i++) {
        const key = Object.keys(obj)[i];
        const value = obj[key];

        const magicUserKey = parentKey + "_" + key;
        if (typeof value === "object") {
            magic(value, magicUserKey)
        } else {
            magicUser[magicUserKey] = value
        }
    }
}

magic(user, "user");
console.log("magicUser", magicUser)  