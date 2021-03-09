// Todo Item
class Task {
	static counter = 1;
	constructor(task) {
		this.id = Task.counter++;
		this.checked = false;
		this.task = task;
	}

	print() {
		return console.log(
			`id: ${this.id} || checked: ${this.checked} || to do: ${this.task}`
		);
	}
}
// Todo List
class TodoList {
	constructor() {
		this.list = [];
	}
	createTask(task) {
		this.list.push(task);
	}
	readList() {
		return this.list;
	}
	updateTask(taskToUpdate, taskUpdated) {
    return taskToUpdate.task=taskUpdated;
	}
	deleteTask(taskToDelete) {
    const removeTask = this.list.find((task) =>task.id === taskToDelete.id).id
    this.list.splice(removeTask-1, 1)
	}
	taskIsComplete(taskToComplete) {
    taskToComplete.checked=true;
    const completeTask = this.list.find((task) =>task.id === taskToComplete.id).id
    this.list.splice(completeTask-1, 1);
    this.list.push(taskToComplete);
	}
	taskUndoComplete(taskToUndo) {
    taskToUndo.checked=false;
    const undoComplete = this.list.find((task) =>task.id === taskToUndo.id).id
    this.list.splice(undoComplete-1, 1);
    this.list.unshift(taskToUndo);
	}
	printList() {
		this.list.forEach((item) => console.log(item));
	}
}

//---------MY TODO LIST---------//
console.log("------- This is Class Task -------");
const task1 = new Task("to do this 1");
const task2 = new Task("to do this 2");
const task3 = new Task("to do this 3");
const task4 = new Task("to do this 4");
console.log("------- This is Class ToDo List -------");
const myTodoList = new TodoList();
myTodoList.createTask(task1);
myTodoList.createTask(task2);
myTodoList.createTask(task3);
myTodoList.createTask(task4);
// myTodoList.readList()// fix read function
console.log("------- This is printList -------");
myTodoList.printList();
console.log(myTodoList);
console.log("------- This is taskUpdate -------");
// 	updateTask(taskToUpdate, taskUpdated) 
myTodoList.updateTask(task3,'update to do this 3')
console.log(myTodoList);
console.log("------- This is deleteTask -------");
//deleteTask(taskToDelete)
myTodoList.deleteTask(task2)
console.log(myTodoList);
console.log("------- This is taskIsComplete -------");
//taskIsComplete(taskToComplete)
myTodoList.taskIsComplete(task1)
myTodoList.printList()
