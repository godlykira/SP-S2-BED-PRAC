const model = require("../../src/models/playerModel");

const data = {
    name: "Jessie",
    level: 1
}

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error inserting data:", error);
    } else {
        console.log("Data inserted successfully:", results);
    }
    process.exit(); //Exiting NodeJS
}

model.insertSingle(data, callback);