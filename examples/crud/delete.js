const model = require("../../src/models/playerModel");

const data = {
    id: 4
}

const callback = (error, results, fields) => {
    if (error) {
        console.error("Error deleting data:", error);
    } else {
        console.log("Data deleted successfully:", results);
    }
    process.exit(); //Exiting NodeJS
}

model.deleteById(data, callback);