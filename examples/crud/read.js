const model = require("../../src/models/playerModel");

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error reading data:", error);
    } else {
        console.log("Read results:", results);
    }
    process.exit(); //Exiting NodeJS
}

model.selectAll(callback);