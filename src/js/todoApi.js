const API_URL = "https://playground.4geeks.com/todo";
const username = "Bagua_Joe"


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
                console.log("user has been created successfully");
                alert("you can now save tasks");
                // fetchTasks(setTasks);
            }
        })
        .catch((error) => console.error("error creating user in api:", error));
}

export const fetchTasks = (setTasks) => {
    fetch(`${API_URL}/users/${username}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("failed to fetch todo list. status: ", resp.status);
            }
            console.log(resp); 
            return resp.json(); 
        })
        .then((data) => {
            console.log("Todo list from API", data);
            if (Array.isArray(data.todos)) {
                setTasks(data.todos)
            } else {
                console.error("fetch data is not an array:", data.todos);
                setTasks([]);

            }
        }) 
        .catch((error) => console.error("there has been a problem with your fetch operation:", error));
};
  
export const addTasksToApi = async (tasks, inputValue, setTasks) => {
    try {
        const newTask = {
            "label": inputValue.trim(),
            "is_done": false
        }
        const response = await fetch(`${API_URL}/todos/${username}`, {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json"
            }
        });
        
        if (!response.ok) {
            throw new Error("failed to fetch todo list. status: ", resp.status);
        }
        const data = await response.json();
        console.log("task added to api:", data.label);
        const updatedTasks=[
            ...tasks,
            { ...newTask, id: data.id }, 
        ];
        setTasks(updatedTasks);
        fetchTasks(setTasks);
    } catch (error) {
        console.error("error adding task to api:", error);
    }
};

export const deleteTaskFromApi = async (taskId, setTasks) => {

};