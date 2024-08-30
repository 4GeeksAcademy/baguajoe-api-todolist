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
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then((resp) => {
            if (!resp.ok) {
                throw new Error("failed to fetch todo list. status: ", resp.status);
            }
            console.log(resp.ok); // Will be true if the response is successful
            console.log(resp.status); // The status code=200 or code=400 etc.
            console.log(resp.text()); // Will try to return the exact result as a string
            return resp.json(); // (re
        })
}