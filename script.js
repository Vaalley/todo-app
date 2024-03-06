document.addEventListener('DOMContentLoaded', () => {
	const addTodoForm = document.getElementById('addTodoForm');
	const todoList = document.getElementById('todoList');
	const filterInput = document.getElementById('filter');

	let todos = JSON.parse(localStorage.getItem('todos')) || [];

	const saveTodos = () => {
		localStorage.setItem('todos', JSON.stringify(todos));
	};

	const renderTodos = (filter = '') => {
		todoList.innerHTML = '';
		todos
			.filter(todo =>
				todo.title.toLowerCase().includes(filter.toLowerCase()) ||
				todo.description.toLowerCase().includes(filter.toLowerCase()) ||
				todo.dueDate.includes(filter) ||
				todo.priority.toLowerCase().includes(filter.toLowerCase())
			)
			.forEach((todo, index) => {
				const todoItem = document.createElement('li');
				todoItem.innerHTML = `
        <strong>${todo.title}</strong><br>
        ${todo.description}<br>
        Due: ${todo.dueDate} | Priority: ${todo.priority}
        <button onclick="editTodo(${index})">Edit</button>
        <button onclick="deleteTodo(${index})">Delete</button>`;
				todoList.appendChild(todoItem);
			});
	};

	addTodoForm.addEventListener('submit', e => {
		e.preventDefault();
		const newTodo = {
			title: document.getElementById('title').value,
			description: document.getElementById('description').value,
			dueDate: document.getElementById('dueDate').value,
			priority: document.getElementById('priority').value,
		};
		todos.push(newTodo);
		saveTodos();
		renderTodos();
		addTodoForm.reset();
	});

	window.editTodo = (index) => {
		const todo = todos[index];
		document.getElementById('title').value = todo.title;
		document.getElementById('description').value = todo.description;
		document.getElementById('dueDate').value = todo.dueDate;
		document.getElementById('priority').value = todo.priority;
		deleteTodo(index);
	};

	window.deleteTodo = (index) => {
		todos.splice(index, 1);
		saveTodos();
		renderTodos();
	};

	filterInput.addEventListener('keyup', () => {
		const filterValue = filterInput.value;
		renderTodos(filterValue);
	});

	renderTodos(); // Initial render
});