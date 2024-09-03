const API_URL = "https://playground.4geeks.com/todo";
const username = "Bagua_Joe";

// Function to create a new user
export const createUser = (setTasks) => {
    fetch(`${API_URL}/users/${username}`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((resp) => {
            if (resp.ok) {
                console.log("User has been created successfully");
                alert("You can now save tasks");
            }
        })
        .catch((error) => console.error("Error creating user in API:", error));
};

// Function to fetch tasks from API
export const fetchTasks = (setTasks) => {
    fetch(`${API_URL}/users/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("Failed to fetch todo list. Status: " + resp.status);
            }
            return resp.json(); 
        })
        .then((data) => {
            console.log("Todo list from API", data);
            if (Array.isArray(data.todos)) {
                setTasks(data.todos);
            } else {
                console.error("Fetch data is not an array:", data.todos);
                setTasks([]);
            }
        })
        .catch((error) => console.error("There has been a problem with your fetch operation:", error));
};

// Function to add tasks to the API
export const addTasksToApi = async (tasks, inputValue, setTasks) => {
    try {
        const newTask = {
            "label": inputValue.trim(),
            "is_done": false
        };
        const response = await fetch(`${API_URL}/todos/${username}`, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error("Failed to add task. Status: " + response.status);
        }
        const data = await response.json();
        console.log("Task added to API:", data.label);
        setTasks([...tasks, { ...newTask, id: data.id }]);
        fetchTasks(setTasks);
    } catch (error) {
        console.error("Error adding task to API:", error);
    }
};

// Function to delete a task from the API
export const deleteTaskFromApi = async (taskId, setTasks) => {
    try {
        const response = await fetch(`${API_URL}/todos/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error("Failed to delete task. Status: " + response.status);
        }
        console.log(`Task with id ${taskId} deleted successfully`);
        fetchTasks(setTasks); 
    } catch (error) {
        console.error("Error deleting task from API:", error);
    }
};

// Function to delete the user from the API
export const deleteUser = async (setTasks) => {
    // Show confirmation dialog
    const confirmed = window.confirm("Are you sure you want to delete the user and all associated tasks? This action cannot be undone.");

    // If user confirms, proceed with deletion
    if (confirmed) {
        try {
            const response = await fetch(`${API_URL}/users/${username}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Failed to delete user. Status: " + response.status);
            }

            console.log(`User ${username} deleted successfully`);
            setTasks([]); // Clear tasks from state
            alert("User and all tasks have been deleted.");
        } catch (error) {
            console.error("Error deleting user from API:", error);
        }
    } else {
        console.log("User deletion canceled.");
    }
};
