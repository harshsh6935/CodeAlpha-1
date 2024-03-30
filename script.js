function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value;
    if (taskText.trim() === "") {
        alert("Please enter a task!");
        return;
    }
    var priority = document.getElementById("priority").value;
    var taskList = document.getElementById("taskList");
    var taskItem = document.createElement("div");
    taskItem.className = "task-item " + priority;
    taskItem.innerHTML = taskText + '<button onclick="deleteTask(this)">Delete</button>';
    taskList.appendChild(taskItem);
    sortTasks(); // Sort tasks after adding
    taskInput.value = "";
}

function deleteTask(taskElement) {
    taskElement.parentNode.remove();
}

function sortTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = taskList.getElementsByClassName("task-item");
    var sortedTasks = Array.from(tasks).sort((a, b) => {
        var priorityA = getPriorityOrder(a.className.split(" ")[1]);
        var priorityB = getPriorityOrder(b.className.split(" ")[1]);
        return priorityA - priorityB;
    });
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    sortedTasks.forEach(task => {
        taskList.appendChild(task);
    });
}

function getPriorityOrder(priority) {
    switch(priority) {
        case "low":
            return 1;
        case "medium":
            return 2;
        case "high":
            return 3;
        default:
            return 0;
    }
}

function filterTasks() {
    var selectedPriority = document.getElementById("filterPriority").value;
    var taskList = document.getElementById("taskList");
    var tasks = taskList.getElementsByClassName("task-item");
    Array.from(tasks).forEach(task => {
        task.style.display = "block"; // Reset display property
        if (selectedPriority !== "all" && !task.classList.contains(selectedPriority)) {
            task.style.display = "none"; // Hide task if not the selected priority
        }
    });
}