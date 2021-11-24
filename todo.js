import ToDoList from './ToDoList.js';

const toDoList = new ToDoList(process.argv.slice(2));

// [
//     {"id": 1, "todo": "Kutyát sétáltatni"},
//     {"id": 2, "todo": "Tejet venni"},
//     {"id": 3, "todo": "Megcsinálni a leckét"}
// ]
