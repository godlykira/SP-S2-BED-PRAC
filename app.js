const fs = require('fs');
const chalk = require('chalk');

fs.readFile('./lab2-advanced-exercise/pokemon.csv', (err, data) => {
  if (err) {
    console.log(err.message);
    return;
  }

  const lines = data.toString().split('\n');
  const pokeArray = [];

  lines.forEach((line) => {
    const [id, name, type1, type2] = line.split(',');
    pokeArray.push({ id: id, name: name, type1: type1, type2: type2.trimEnd('\r') });
  });

  const jsonData = JSON.stringify(pokeArray);
  console.log(chalk.blue(jsonData));

  fs.writeFile('./lab2-advanced-exercise/result.json', jsonData, (err) => {
    if (err) console.log(err.message);
    else console.log('File successfully written!');
  });
});

// fs.readFile("./pokemon.csv", (err, data) => {
//   let objLog;
//   let objArray = [];

//   if (err) console.log(err.message);
//   else objLog = data.toString().split("\n");

//   objLog.forEach((line) => {
//     let objArr = line.split(",");
//     objArray.push({ id: objArr[0], name: objArr[1], type1: objArr[2], type2: objArr[3].trimEnd("\r") });
//   });

//   let jsonData = JSON.stringify(objArray);
//   console.log(jsonData);
// });
