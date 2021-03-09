// Task Class
class Task {
	static counter = 1;
	constructor(task) {
		this.id = Task.counter++;
		this.checked = false;
		this.task = task;
	}
}

// ToDoList Class for UI
class ToDoList {
	static displayList() {
		const list = ListStorage.getList();
		list.forEach((task) => ToDoList.addTaskToList(task));
	}

	static addTaskToList(task) {
		const list = document.querySelector(".list");
		const taskRow = document.createElement("tr");
		taskRow.innerHTML = `
		<td><input type="checkbox" name="checkbox" /></td>
		<td>${task.task}</td>
		<td><i class="deleteBtn fas fa-trash-alt"></i></td>`;
		list.appendChild(taskRow);
	}

	static deleteTask(targetTask) {
		if (targetTask.classList.contains("deleteBtn")) {
			targetTask.parentElement.parentElement.remove();
			location.reload();
		}
	}

	static showAlert(msg, className) {
		const msgDiv = document.createElement("div");
		msgDiv.className = `alert ${className}`;
		msgDiv.appendChild(document.createTextNode(msg));
		const container = document.querySelector(".container");
		const form = document.querySelector("#task-form");
		container.insertBefore(msgDiv, form);
		//set timeout
		setTimeout(() => document.querySelector(".alert").remove(), 2000);
	}

	static clearInput() {
		document.querySelector(".task-input").value = "";
	}
}

class ListStorage {
	// get the to do list from the local storage
	static getList() {
		let list;
		if (localStorage.getItem("list") === null) {
			list = [];
		} else {
			list=JSON.parse(localStorage.getItem("list"));
		}
		return list;
	}

	static addTask(task) {
		//get the list from the local storage
		const list = ListStorage.getList();
		list.push(task);
		localStorage.setItem("list", JSON.stringify(list));
	}

	static removeTask(taskId) {
		const list = ListStorage.getList();
		list.forEach((task, index) => {
			if (task.id === parseInt(taskId)) {
				list.splice(index, 1);
			}
		});
		localStorage.setItem("list", JSON.stringify(list));
	}

}

//---- Events---//

// display to do list
document.addEventListener("DOMContentLoaded", ToDoList.displayList);

// add a task
document.querySelector("#task-form").addEventListener("submit", (e) => {
	//prevent submit default
	e.preventDefault();

	//get the user input value
	const task = document.querySelector(".task-input").value;
	if (task === "") {
		ToDoList.showAlert("Please enter a task.", "emptyInput");
	} else {
		const newTask = new Task(task);
		//add task to list and storage
		ToDoList.addTaskToList(newTask);
		ListStorage.addTask(newTask);
		//clear input field after submit
		ToDoList.clearInput();
	}
});

// remove  a task
document.querySelector(".list").addEventListener("click", (e) => {
	ToDoList.deleteTask(e.target);
	ListStorage.removeTask(
		e.target.parentElement.previousElementSibling.textContent);
});
