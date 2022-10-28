let obj = {
    first_name: "aditya",
    second_name: "suman",
    cla_ss: [
        { i_d: 1 },
        { i_d: 2 },
        { i_d: 3 },
    ],
    stud_details: {
        contact_no: "32456",
        add_ress: {
            ci_ty: "noida",
            st_ate: "up",
            mo_re: {
                coun_try: "india",
                planet: "earth"
            }
        }
    }
};

let newObj = {};
function camelize(obj, newObj) {
    Object.keys(obj).forEach(key => {
        const value = obj[key];

        const newKey = key.split("_")
            .map((item, index) => {
                if (index !== 0) {
                    item = item[0].toUpperCase() + item.substring(1, item.length);
                }
                return item;
            })
            .join("");

        if (value && typeof value === "object") {
            if (Array.isArray(value)) {
                newObj[newKey] = []
            } else {
                newObj[newKey] = {};
            }

            camelize(value, newObj[newKey]);
        } else {
            newObj[newKey] = value;
        }
    });
}

camelize(obj, newObj);
console.log("newObj", newObj)
