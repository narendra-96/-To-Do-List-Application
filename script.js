let taskList = document.getElementById("taskList");

window.onload = loadTasks;

function addTask() {
    let input = document.getElementById("taskInput");
    let task = input.value.trim();

    if (task === "") {
        alert("Enter a task");
        return;
    }

    let tasks = getTasks();
    tasks.push({ text: task, completed: false });
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    loadTasks();
}

function loadTasks() {
    taskList.innerHTML = "";
    let tasks = getTasks();

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        };

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function getTasks() {
    return localStorage.getItem("tasks")
        ? JSON.parse(localStorage.getItem("tasks"))
        : [];
}
