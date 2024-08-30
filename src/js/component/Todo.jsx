import React, { useState } from "react";


//create your first component
const Todo = () => {
	const [inputValue, setInputValue] = useState('');
	const [tasks, setTasks] = useState([]);

	const handleAddTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTasks([...tasks, inputValue.trim()]);
			setInputValue("");
		}
	};
	const handleDeleteTask = (index) => {
		setTasks(tasks.filter((task, i) => index !== i))
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
							onKeyDown={handleAddTodo}
							placeholder="What needs to be done?"
						/>
					</li>

					{tasks.length === 0 ? (
						<li className="list-group-item no-tasks">No tasks, add a task</li>
					) : (
						tasks.map((task, index) => (
							<li key={index} className="list-group-item">
								<div className = "list-group-item-tasks">{task}</div>
								<span className= "x-container" onClick={()=> handleDeleteTask(index)}> 
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
		</div>
	);
};

export default Todo;