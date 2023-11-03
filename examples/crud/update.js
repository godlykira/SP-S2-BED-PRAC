const model = require('../../src/models/playerModel');

const data = {
  id: 4,
  name: 'Super Jessie',
  level: 100,
};

const callback = (error, results, fields) => {
  if (error) {
    console.error('Error updating data:', error);
  } else {
    console.log('Update results:', results);
  }

  process.exit(); //Exiting NodeJS
};

model.updateById(data, callback);
