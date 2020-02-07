var faker = require('faker');

var database = { todos: []};

for (var i = 1; i<= 300; i++) {
  database.todos.push({
    id: i, 
    text: faker.lorem.sentences(), 
    isCompleted: false, 
    buttonText:"Done",
    dateTime: new Date().getTime()
  });
}

console.log(JSON.stringify(database));