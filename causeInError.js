/*
    const error = new Error(message, options);
    error.message gives the message
    error.cause gives options.cause
*/

const billDetails = [
    {
        billId: "OP908", billAmount: 58960, billDiscount: 5, date: new Date("02-02-2023"),
    },
    {
        billId: "OP876", billAmount: 7813, billDiscount: 2.5, date: new Date("03-02-2023"),
    },
    {
        billId: "0P908", billAmount: 0, billDiscount: 0, date: new Date("09-02-2023"),
    },
];

function server(index) {
    try {
        billDetails[index].billDiscount;
    } catch (error) {
        throw new Error("Method: Server", {
            cause: error
        })
    }
}

function getPerItemCostByCustomerId(id) {
    try {
        server(3);
    } catch (exception) {
        console.log(`${exception.message} ${exception.cause}`);
    }
}

getPerItemCostByCustomerId(2);
