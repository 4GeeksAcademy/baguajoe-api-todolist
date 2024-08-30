import React, { useState, useEffect } from "react";
import { fetchTasks, addTasksToApi, deleteTaskFromApi, createUser } from "../todoApi";

//create your first component
const Todo = () => {
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTasks] = useState([]);

	useEffect(
		() => {
			fetchTasks(setTasks);
		}, [setTasks]
	)

	const handleAddTasks = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			const newTask = {
				id: Date.now(),
				label: inputValue.trim(), 
				done: false
			};
			setTasks([ ...tasks, newTask ]);

			addTasksToApi(tasks, inputValue, setTasks);

			setInputValue("");
		}
	};
	const handleDeleteTask = (index) => {
		const taskId = tasks[index].id;
		const taskLabel = tasks[index].label;
		const updatedTasks = tasks.filter((task, i) => index !== i);
		setTasks(updatedTasks);

		deleteTaskFromApi(taskId, setTasks);
	};

	return (
		<div className="container pb-5 px-4 rounded">
			<h1 className="mt-5 text-center text-white">To Do List</h1>
			
			<div className="card task-card mx-auto mt-5 ">
				<ul className="list-group list-group-flush">
					<li className="list-group-item">
						<input
							className="task-input"
							type="text"
							onChange={e => setInputValue(e.target.value)}
							value={inputValue}
							onKeyDown={handleAddTasks}
							placeholder="What needs to be done?"
						/>
					</li>

					{tasks.length === 0 ? (
						<li className="list-group-item no-tasks">No tasks, add a task</li>
					) : (
						tasks.map((task, index) => (
							<li key={task.id} className="list-group-item">
								<div className="list-group-item-tasks">{task.label}</div>
								<span className="x-container" onClick={() => handleDeleteTask(index)}>
									<i className="fa-solid fa-x"></i>
								</span>

							</li>
						))
					)}
				</ul>
				<div className="card-footer text-secondary">
					{tasks.length} {tasks.length === 1 ? "item" : "items"}
				</div>
			</div>
			<div className ="buttonGroup mt-4 gap-2 d-flex justify-content-center">
					<button className ="btn btn-light"type="button" onClick={() => createUser(setTasks)}>Add User To Save Tasks</button>
					<button className ="btn btn-light"type="button">Delete User & All Tasks</button>
			</div>
		</div>
	);
};
// delete tasks and delete user
export default Todo;